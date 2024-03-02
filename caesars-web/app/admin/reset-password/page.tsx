'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// icons
import smallLogo from '../../assets/logos/smallLogo.svg';
import resetPasswordFormImage from './assets/resetPasswordFormImage.svg';

// API
import { post } from '@/app/apiIntegrations/fetcher';

// components
import LoginBranding from './components/ResetBranding';
import Copyrights from '../../components/app/Copyrights';
import { Input } from '../../components/dataEntry/Input';
import { Button } from '../../components/Button';
import { toastProps } from '@/app/components/global/toast/Toast';

// react-hook-form
import { SubmitHandler, useForm } from 'react-hook-form';

interface ILoginFormInput {
  confirm_password: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ILoginFormInput>();

  const [toastPopup, setToastPopup] = useState(false);
  const [toastDetails, setToastDetails] = useState<toastProps>({
    type: 'alert',
    title: '',
    discription: '',
    logo: '',
  });

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setToastPopup(false);
    }, 3000);
    return () => clearTimeout(timeOut);
  }, [toastPopup]);

  const onSubmit: SubmitHandler<ILoginFormInput> = async (data) => {
    if (data.confirm_password === data.password) {
      const password_reset_token = localStorage.getItem('password-reset-token');

      if (password_reset_token) {
        const res = await post('admin/change-password', {
          password: data.password,
          token: password_reset_token,
        });

        setToastPopup(true);
        setToastDetails({
          type: 'success',
          title: 'Reset Success',
          discription: 'Password reset success',
        });
        router.push('/admin/login');
      }
    } else {
      setError('confirm_password', {
        type: 'manual',
        message: 'Password and confirm password did not match',
      });
    }
  };

  return (
    <div className='absolute  overflow-hidden flex w-full h-full'>
      <LoginBranding />
      <div className='flex flex-1 flex-col'>
        <div className='flex flex-1 justify-center items-center flex-col'>
          <div>
            <div>
              <Image src={smallLogo} alt={'CASERS'} />
            </div>
            <div className='font-bold text-[30px] text-[#292731] mt-5'>
              Reset your Password
            </div>
            <div className='pt-[30px]'>
              <Image src={resetPasswordFormImage} alt={'CASERS'} />
            </div>
            <div className='mt-5'>Enter the New Password</div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='mt-[15px]'>
                <Input
                  type='password'
                  style={{ width: 440, marginTop: 20 }}
                  placeholder='Enter New Password'
                  formProps={register('password', {
                    pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/,
                    required: true,
                    min: 8,
                    max: 20,
                  })}
                />
                {errors.password && (
                  <div className='h-[30px] text-[#ff4001c7] text-xs pt-2.5 pl-7'>
                    Password required
                  </div>
                )}

                <Input
                  type='password'
                  style={{ width: 440, marginTop: 0 }}
                  placeholder='Re-Enter New Password '
                  formProps={register('confirm_password', {
                    pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/,
                    required: true,
                    min: 8,
                    max: 20,
                  })}
                />
                {!errors.confirm_password?.message &&
                  errors.confirm_password && (
                    <div className='h-[30px] text-[#ff4001c7] text-xs pt-2.5 pl-7'>
                      Confirm password required
                    </div>
                  )}
                {errors.confirm_password?.message && (
                  <div className='h-[30px] text-[#ff4001c7] text-xs pt-2.5 pl-7'>
                    {errors.confirm_password?.message}
                  </div>
                )}
              </div>
              <div className='mt-6'>
                <Button
                  type='submit'
                  label='Reset Password'
                  primary
                  style={{ width: 440, marginTop: 20, height: 48 }}
                  size='large'
                />
              </div>
            </form>
          </div>
        </div>
        <Copyrights />
      </div>
    </div>
  );
}
