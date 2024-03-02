'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// icons
import smallLogo from '../../assets/logos/smallLogo.svg';

// API
import { post } from '../../apiIntegrations/fetcher';

// components
import LoginBranding from './components/LoginBranding';
import Copyrights from '../../components/app/Copyrights';
import { Input } from '../../components/dataEntry/Input';
import { Button } from '../../components/Button';

// react-hook-form
import { useForm, SubmitHandler } from 'react-hook-form';
import { useEffect, useState } from 'react';
import Toast, { toastProps } from '@/app/components/global/toast/Toast';

interface ILoginFormInput {
  admin_id: string;
  password: string;
}
export default function LoginPage() {
  const router = useRouter();
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

  const onSubmit: SubmitHandler<ILoginFormInput> = (data) => {
    if (data.admin_id && data.password) login(data.admin_id, data.password);
  };

  async function login(admin_id: string, password: string) {
    try {
      const response = await post('admin/login', { admin_id, password });
      const { auth_token, admin } = response;

      if (auth_token) {
        localStorage.setItem('sessionToken', auth_token);
        localStorage.setItem('admin', JSON.stringify(admin));

        router.push('/admin/app/overview');
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

  useEffect(() => {
    localStorage.removeItem('admin');
  }, []);

  return (
    <div className='absolute  overflow-hidden flex w-full h-full'>
      <Toast
        type={toastDetails.type}
        title={toastDetails.title}
        discription={toastDetails.discription}
        logo={toastDetails.logo}
        toggle={toastPopup}
      />

      <LoginBranding />
      <div className='flex flex-1 flex-col'>
        <div className='flex flex-1 justify-center items-center'>
          <div>
            <Image src={smallLogo} alt={'CASERS'} />
            <div className='font-bold text-[30px] mt-5 text-[#292731]'>
              Welcome back!
            </div>

            <div className='font-normal text-base leading-[170%] mt-5 text-[#292731]'>
              Please login to access your account.
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='mt-[30px]'>
                <Input
                  label='E-mail'
                  style={{ width: 440, marginTop: 20 }}
                  placeholder='Type your E-mail'
                  formProps={register('admin_id', {
                    pattern: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
                    required: true,
                  })}
                />
                {errors.admin_id && (
                  <div className='h-[30px] text-[#ff4001c7] text-xs pt-2.5 pl-7'>
                    Admin Id required
                  </div>
                )}
                <Input
                  label='Password'
                  type={'password'}
                  style={{ width: 440, marginTop: 30 }}
                  placeholder='Type your Password'
                  formProps={register('password', {
                    // pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/,
                    required: true,
                  })}
                />
                {errors.password && (
                  <div className='h-[30px] text-[#ff4001c7] text-xs pt-2.5 pl-7'>
                    Password required
                  </div>
                )}
              </div>
              <div className='pt-5'>
                <Link
                  className='text-[#4285F4]'
                  href='/admin/request-password-reset'
                >
                  Forgot Password?
                </Link>
              </div>
              <div className='mt-[30px]'>
                <Button
                  type='submit'
                  label='Admin Log In'
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
