'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

// icons
import smallLogo from '../../assets/logos/smallLogo.svg';

// API
import axios from 'axios';
import { get, post } from '@/app/apiIntegrations/fetcher';

// components
import Copyrights from '../../components/app/Copyrights';
import { Input } from '../../components/dataEntry/Input';
import { Button } from '../../components/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import Toast, { toastProps } from '@/app/components/global/toast/Toast';
import AuthPageBranding from '@/app/components/global/auth/AuthPageBranding';

interface ILoginFormInput {
  confirm_password: string;
  password: string;
}
export default function LoginPage() {
  const router = useRouter();
  const search = useSearchParams();

  const [showPage, setshowPage] = useState(false);

  const tokens = search.get('token');
  // const mailId = search.get('email');

  const {
    register,
    handleSubmit,
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

  useEffect(() => {
    checkIsTokenValid();
  }, []);

  const checkIsTokenValid = async () => {
    try {
      if (tokens) {
        // need to change baseUrl dynamically based on dev and preprod
        const res = await get(`/admin/token-validate?token=${tokens}`);
        if (res?.data === 'ok') {
          setshowPage(true);
        } else {
          router.push('/token-invalid');
        }
      }
    } catch (e) {
      console.warn(e);
      router.push('/token-invalid');
    }
  };

  const onSubmit: SubmitHandler<ILoginFormInput> = async (data) => {
    if (data.confirm_password === data.password) {
      try {
        const res = await post('/admin/change-password', {
          password: data.password,
          token: tokens,
        });
        if (res?.data == 'ok') {
          setToastPopup(true);
          setToastDetails({
            type: 'success',
            title: 'Reset Success',
            discription: 'Password created success',
          });
          router.push('/admin/login');
        }
      } catch (e) {
        setToastPopup(true);
        setToastDetails({
          type: 'error',
          title: 'Failed!',
          discription: 'API Error',
        });
      }
    } else {
      setToastPopup(true);
      setToastDetails({
        type: 'error',
        title: 'Failed!',
        discription: 'password and confirmation password did not match',
      });
    }
  };

  return (
    <>
      {showPage ? (
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
            <div className='flex flex-1 justify-center items-center flex-col'>
              <div>
                <div>
                  <Image src={smallLogo} alt={'CASERS'} />
                </div>
                <div className='font-bold text-[30px] text-[#292731] mt-5'>
                  Create your Password
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
                      })}
                      min={8}
                      max={20}
                    />
                    <div className='h-[30px] text-[#ff4001c7] text-xs pt-2.5 pl-7'>
                      {errors.password && 'Password  required'}
                    </div>
                    <Input
                      type='password'
                      style={{ width: 440, marginTop: 0 }}
                      placeholder='Re-Enter New Password '
                      formProps={register('confirm_password', {
                        pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/,
                        required: true,
                      })}
                      min={8}
                      max={20}
                    />
                    <div className='h-[30px] text-[#ff4001c7] text-xs pt-2.5 pl-7'>
                      {errors.confirm_password && 'Confirm password required'}
                    </div>
                  </div>
                  <div className='mt-2.5'>
                    <Button
                      type='submit'
                      label='Submit'
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
      ) : (
        <div className='flex-1 w-full h-screen flex items-center justify-center'>
          Loading...
        </div>
      )}
    </>
  );
}
