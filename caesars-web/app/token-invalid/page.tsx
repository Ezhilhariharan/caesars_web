import React from 'react';
import Image from 'next/image';

// assets
import tokenInvalid from './assets/token-invalid.svg';

export default function page() {
  return (
    <div className='h-screen w-full flex justify-center items-center bg-[#EDEDED]'>
      <div className='flex flex-col justify-center items-center'>
        <Image
          src={tokenInvalid}
          alt=''
          width={500}
          height={500}
          className=''
        />
        <div className='font-bold text-[#252F40] text-5xl mt-5'>
          Token Expired
        </div>
        <div className='font-normal text-[#AEAEAE] text-xl w-[55%] mt-5 text-center'>
          "Sorry, We Came Up Empty-Handed. Its Look Like You are Off the Grid
        </div>
        <div className='text-center mt-5 text-base font-normal leading-none text-[#292731]'>
          <div>
            Are you having problems signing in?
            <a className='text-[#4285F4] cursor-pointer pl-1'>
              Contact support for assistance here.
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
