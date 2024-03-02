'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import Image from 'next/image';

// icons
import smallLogo from '../assets/logos/smallLogo.svg';
import resetPasswordFormImage from './assets/resetPasswordFormImage.svg';

// API
import { get, post } from '@/app/apiIntegrations/fetcher';

// components
import LoginBranding from './components/ResetBranding';
import Toast, { toastProps } from '@/app/components/global/toast/Toast';
import OtpInput from '@/app/components/global/auth/otp-input';
import { Button } from '../components/Button';
import Copyrights from '../components/app/Copyrights';

export default function LoginPage() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem('reset-password-email');
    if (email) setEmail(email);
  }, []);

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

  const [email, setEmail] = useState('');

  function getEmailString() {
    if (email) {
      const s_email = email.split('@');
      return s_email[0][0] + s_email[0][1] + s_email[0][2] + '***@***.com';
    }
    return 'Please Wait Loading email ...';
  }

  async function requestCode() {
    try {
      const user_id = localStorage.getItem('reset-password-email');
      if (user_id) {
        const res = await post('user/forgot-password', {
          user_id,
        });

        if (res?.status === 200) {
          localStorage.setItem('reset-password-email', user_id);
          router.push('/password-reset-token-verify');
        }
      }
    } catch (e: any) {
      setToastPopup(true);
      setToastDetails({
        type: 'error',
        title: 'Request failed!',
        discription: e.response?.data?.error,
      });
    }
  }

  const onOtpSubmit = async (otp: any) => {
    setCode(otp);
    if (error) setError(false);
  };

  const handleOTPSubmit = async (e: any) => {
    e.preventDefault();
    if (code.length === 4)
      try {
        const res = await get('user/otp-validate', {
          user_id: email,
          otp_number: code,
        });
        if (res?.status === true) {
          localStorage.setItem('password-reset-token', res.token);
          router.push('/reset-password');
        } else {
          setError(true);
          setToastPopup(true);
          setToastDetails({
            type: 'error',
            title: 'Request  failed!',
            discription: 'Invalid OTP',
          });
        }
      } catch (e: any) {
        setError(true);
        setToastPopup(true);
        setToastDetails({
          type: 'error',
          title: 'Failed!',
          discription: e.response?.data?.error,
        });
      }
  };

  return (
    <>
      <Toast
        type={toastDetails.type}
        title={toastDetails.title}
        discription={toastDetails.discription}
        logo={toastDetails.logo}
        toggle={toastPopup}
      />
      <div className='absolute  overflow-hidden flex w-full h-full'>
        <LoginBranding />
        <div className='flex flex-1 flex-col'>
          <div className='flex flex-1 justify-center items-center'>
            <div>
              <Image src={smallLogo} alt={'CASERS'} />
              <div className='font-bold text-[30px] mt-5 text-[#292731]'>
                Verification
              </div>
              <div className='pt-[30px]'>
                <Image src={resetPasswordFormImage} alt={'CASERS'} />
              </div>
              <div className='mt-5'>
                Enter the verification code we sent to
                <div>{getEmailString()}</div>
              </div>
              <form onSubmit={handleOTPSubmit}>
                <div className='mt-6'>
                  <OtpInput
                    length={4}
                    onOtpSubmit={onOtpSubmit}
                    error={error}
                  />
                </div>
                <div className='mt-6'>
                  <Button
                    type='submit'
                    label='Submit'
                    primary
                    style={{ width: 440, marginTop: 20, height: 48 }}
                    size='large'
                  />
                </div>
              </form>

              <div style={{ padding: 10, textAlign: 'center' }}>
                Didn’t receive the code?{' '}
                <button
                  className='text-[#4285F4]'
                  onClick={() => {
                    requestCode();
                  }}
                >
                  Resend
                </button>
              </div>
            </div>
          </div>
          <Copyrights />
        </div>
      </div>
    </>
  );
}
