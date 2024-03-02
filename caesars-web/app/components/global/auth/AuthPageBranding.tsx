import React from 'react';
import AuthPageLogoBranding from './AuthPageLogoBranding';
import AuthPageBrandingCarousel from './AuthPageBrandingCarousel';

type Props = {};

const AuthPageBranding = (props: Props) => {
  return (
    <div className='flex flex-1 object-center justify-center items-center'>
      <div className='flex flex-col items-center justify-center'>
        <AuthPageLogoBranding />
        <div className='text-4xl font-bold mt-5'>Player Props System</div>
        <AuthPageBrandingCarousel />
        <div className='mt-2 text-base text-center font-normal leading-none text-[#292731]'>
          <div>To access Caesers Player Props System,</div>
          <div className='mt-2'>you must have a valid account.</div>
        </div>
        <div className='text-center mt-5 text-base font-normal leading-none text-[#292731]'>
          <div>
            Trouble logging in?
            <a className='text-[#4285F4] cursor-pointer pl-1'>
              Contact support for assistance here.
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPageBranding;
