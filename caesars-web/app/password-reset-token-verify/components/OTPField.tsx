import React, { FC, useEffect, useRef, useState } from 'react';

interface Props {}

let currentOtpIndex: number = 0;

const OTPField: FC<Props> = (props): JSX.Element => {
  const [otp, setOtp] = useState<string[]>(new Array(4).fill(''));
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);

  const handleChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = target;
    const newOTP: string[] = [...otp];
    newOTP[currentOtpIndex] = value.substring(value.length - 1);

    if (!value) setActiveOtpIndex(currentOtpIndex - 1);
    else setActiveOtpIndex(currentOtpIndex + 1);

    setOtp(newOTP);
  };

  const handleKeyDown = (
    { key }: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    currentOtpIndex = index;
    if (key === 'Backspace') setActiveOtpIndex(currentOtpIndex - 1);
  };

  return (
    <div className='h-screen flex justify-center items-center space-x-2'>
      {otp.map((_, index) => {
        return (
          <React.Fragment key={index}>
            <input
              ref={index === activeOtpIndex ? inputRef : null}
              type='number'
              value={otp[index]}
              className={`${
                otp[index] !== ''
                  ? 'border-[#4285F4] focus:border-[#4285F4]'
                  : 'border-gray-400 focus:border-gray-700'
              }  w-12 h-12 border-2 rounded bg-transparent outline-none text-center font-semibold text-xl spin-button-none focus:text-gray-700 text-gray-400 transition`}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
            {index === otp.length - 1 ? null : (
              <span className='w-2 h-2 py-0.5 bg-transparent' />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default OTPField;
