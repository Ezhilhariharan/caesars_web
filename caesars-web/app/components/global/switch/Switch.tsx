'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import './switch.css';

// icons
import tickMark from '../../../assets/icons/tick.svg';
import xMark from '../../../assets/icons/x.svg';

type Props = {
  isToggle: boolean;
};

const Switch = (props: Props) => {
  const { isToggle = false } = props;

  const [toggle, setToggle] = useState<boolean>(isToggle);

  return (
    <div
      className={`w-10 h-5 rounded-full relative flex items-center transition-all duration-200 ease-in-out cursor-pointer ${
        toggle ? 'bg-[#4285F4]' : 'bg-[#C1C7D1]'
      }`}
      onClick={() => setToggle(!toggle)}
    >
      <div
        className={`w-4 h-4 bg-white text-xs font-bold rounded-full flex justify-center items-center ml-[2px] transition-all duration-200 ease-in-out ${
          toggle && 'translate-x-5 -ml-[2.85px]'
        }`}
      >
        <Image
          src={toggle ? tickMark : xMark}
          alt='tick mark'
          width={12}
          height={12}
          className='font-bold'
        />
      </div>
    </div>
  );
};

export default Switch;
