'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

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
  const [toastPopup, setToastPopup] = useState(false);
  const [toastDetails, setToastDetails] = useState<toastProps>({
    type: 'alert',
    title: '',
    discription: '',
    logo: '',
  });

  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ILoginFormInput>();

  const onSubmit: SubmitHandler<ILoginFormInput> = (data) => {
    if (data.user_id && data.password) login(data.user_id, data.password);
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setToastPopup(false);
    }, 3000);
    return () => clearTimeout(timeOut);
  }, [toastPopup]);

  useEffect(() => {
    localStorage.removeItem('user');
  }, []);

  async function login(user_id: string, password: string) {
    try {
      const response = await post('user/login', { user_id, password });
      const { auth_token, user } = response;
      if (auth_token) {
        localStorage.setItem('sessionToken', auth_token);
        localStorage.setItem('user', JSON.stringify(user));

        if (user?.title === 'roster_lead') {
          router.push('/app/roster_lead/overview');
        }
        if (user?.title === 'roster_maker') {
          router.push('/app/roster_maker/overview');
        }
        if (user?.title === 'trading_lead') {
          router.push('/app/trading_lead/overview');
        }
        if (user?.title === 'pre_game_trader') {
          router.push('/app/pre_game_trader/overview');
        }
        if (user?.title === 'in_game_trader') {
          router.push('/app/in_game_trader/overview');
        }

        // if (user.user_role_id === '1')
        //   router.push('/app/roster_admin/overview');
        // if (user.user_role_id === '2')
        //   router.push('/app/roster_manager/overview');
        // if (user.user_role_id === '3')
        //   router.push('/app/in_game_manager/overview');
        // if (user.user_role_id === '4')
        //   router.push('/app/in_game_trader/overview');
      } else {
        setToastPopup(true);
        setToastDetails({
          type: 'error',
          title: 'Login failed!',
          discription: 'token not returened from server',
        });
      }
    } catch (e: any) {
      setToastPopup(true);
      setToastDetails({
        type: 'error',
        title: 'Login failed!',
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
      <div className='h-full flex flex-1 flex-col bg-white rounded-tl-[20px] rounded-bl-[20px]'>
        <div className='flex flex-1 justify-center items-center'>
          <div>
            <Image src={smallLogo} alt={'CAESARS'} />
            <div className='font-bold text-[30px] mt-5 text-[#292731]'>
              Welcome back!
            </div>
            <div className='font-normal text-base leading-[170%] mt-5 text-[#292731]'>
              Please login to access your account.
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='mt-[30px]'>
                <Input
                  label='Email'
                  style={{ width: 440, marginTop: 20 }}
                  placeholder='Type your email'
                  formProps={register('user_id', {
                    pattern: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
                    required: true,
                  })}
                  min={8}
                />
                {errors.user_id && (
                  <div className='h-[30px] text-[#ff4001c7] text-xs pt-2.5 pl-7'>
                    Email Id required
                  </div>
                )}
                <Input
                  label='Password'
                  type={'password'}
                  style={{ width: 440, marginTop: 25 }}
                  placeholder='Type your password'
                  formProps={register('password', {
                    // pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/,
                    required: true,
                    // min: 8,
                    // max: 20,
                  })}
                />
                {errors.password && (
                  <div className='h-[30px] text-[#ff4001c7] text-xs pt-2.5 pl-7'>
                    Password required
                  </div>
                )}
              </div>
              <div className='pt-3'>
                <Link className='text-[#4285F4]' href='/request-password-reset'>
                  Forgot Password?
                </Link>
              </div>
              <div className='mt-6'>
                <Button
                  type='submit'
                  label='Log In'
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
