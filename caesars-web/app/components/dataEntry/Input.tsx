'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import eye from '../../assets/icons/passwordEye.svg';
import eyeOpen from '../../assets/icons/passwordEyeOpen.svg';
interface InputProps {
  label?: string;
  type?: string;
  value?: string;
  backgroundColor?: string;
  placeholder?: string;
  inputStyle?: {};
  style?: {};
  formProps?: {};
  onChange?: (e: any) => void;
  min?: number;
  max?: number;
  required?: boolean;
}
/**
 * Primary UI component for user interaction
 */
export const Input = ({
  backgroundColor = '#F0F1F3',
  label,
  type,
  placeholder,
  inputStyle = {},
  value,
  formProps,
  onChange,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div {...props}>
      <style jsx>{`
        input {
          padding-left: 25px;
        }
      `}</style>
      <div className='text-[16px] font-medium py-2.5 text-left text-[#455360]'>
        {label}
      </div>
      <div className='flex'>
        <input
          type={showPassword ? 'text' : type}
          placeholder={placeholder}
          style={{
            ...inputStyle,
            background: backgroundColor,
            width: '100%',
            height: 48,
          }}
          {...formProps}
        />
        {type === 'password' && (
          <div className='relative w-0'>
            <div className='relative w-5'>
              <Image
                className='cursor-pointer relative z-50 -left-[30px] top-[18px]'
                onClick={(e) => setShowPassword(!showPassword)}
                src={showPassword ? eyeOpen : eye}
                alt='show/hide'
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
