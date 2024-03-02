'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// icons
import smallLogo from '../assets/logos/smallLogo.svg';

// API
import { post } from '../apiIntegrations/fetcher';

// components
import { Input } from '../components/dataEntry/Input';
import { Button } from '../components/Button';
import Copyrights from '../components/app/Copyrights';
import AuthPageBranding from '../components/global/auth/AuthPageBranding';
import Toast, { toastProps } from '../components/global/toast/Toast';

// react-hook-form
import { useForm, SubmitHandler } from 'react-hook-form';

interface ILoginFormInput {
  user_id: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInput>();
  const onSubmit: SubmitHandler<ILoginFormInput> = (data) => {
    if (data.user_id) requestCode(data.user_id);
  };

  async function requestCode(user_id: string) {
    try {
      const res = await post('user/forgot-password', {
        user_id,
      });

      if (res) {
        localStorage.setItem('reset-password-email', user_id);
        router.push('/password-reset-token-verify');
      }
    } catch (e: any) {
      setToastPopup(true);
      setToastDetails({
        type: 'error',
        title: 'Request  failed!',
        discription: e.response?.data?.error,
      });
    }
  }
  return (
    <div className='absolute bg-[#ECF3FE] overflow-hidden flex w-full h-full'>
      <Toast
        type={toastDetails.type}
        title={toastDetails.title}
        discription={toastDetails.discription}
        logo={toastDetails.logo}
        toggle={toastPopup}
      />

      <AuthPageBranding />
      <div className='flex flex-1 flex-col bg-white rounded-tl-[20px] rounded-bl-[20px]'>
        <div className='flex flex-1 justify-center items-center'>
          <div>
            <Image src={smallLogo} alt={'CASERS'} />
            <div className='font-bold text-[30px] leading-[170%] mt-5 text-[#292731]'>
              Enter Email
            </div>

            <div className='font-normal text-base leading-[170%] mt-5 text-[#292731]'>
              Please enter valid mail id to send the code.
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='mt-2.5'>
                <Input
                  label='Email'
                  style={{ width: 440, marginTop: 20 }}
                  placeholder='Type your email'
                  formProps={register('user_id', { required: true })}
                />
                <div className='h-[30px] text-[#ff4001c7] text-xs pt-2.5 pl-7'>
                  {errors.user_id && 'Email Id required'}
                </div>
              </div>

              <Button
                type='submit'
                label='Send code'
                primary
                style={{ width: 440, marginTop: 20, height: 48 }}
                size='large'
              />
            </form>
          </div>
        </div>
        <Copyrights />
      </div>
    </div>
  );
}
