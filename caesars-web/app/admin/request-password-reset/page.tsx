'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// icons
import smallLogo from '../../assets/logos/smallLogo.svg';

// API
import { post } from '@/app/apiIntegrations/fetcher';

// components
import Toast, { toastProps } from '@/app/components/global/toast/Toast';
import AuthPageBranding from '@/app/components/global/auth/AuthPageBranding';
import { Button } from '@/app/components/Button';
import Copyrights from '@/app/components/app/Copyrights';
import { Input } from '@/app/components/dataEntry/Input';

// react-hook-form
import { SubmitHandler, useForm } from 'react-hook-form';

interface ILoginFormInput {
  admin_id: string;
}

export default function LoginPage() {
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

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInput>();
  const onSubmit: SubmitHandler<ILoginFormInput> = (data) => {
    if (data.admin_id) requestCode(data.admin_id);
  };

  async function requestCode(admin_id: string) {
    try {
      const res = await post('admin/forgot-password', {
        admin_id,
      });

      if (res) {
        localStorage.setItem('reset-password-email', admin_id);
        router.push('/admin/password-reset-token-verify');
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
            <div className='font-bold text-[30px] mt-5 text-[#292731]'>
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
                  formProps={register('admin_id', { required: true })}
                />
                {errors.admin_id && (
                  <div className='h-[30px] text-[#ff4001c7] text-xs pt-2.5 pl-7'>
                    Email Id required
                  </div>
                )}
              </div>
              <div className='mt-6'>
                <Button
                  type='submit'
                  label='Send code'
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
