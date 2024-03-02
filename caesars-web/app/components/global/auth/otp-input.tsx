/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';

type OtpInputProps = {
  length: number;
  onOtpSubmit: (otp: any) => void;
  error: boolean;
};

const OtpInput = ({
  length = 4,
  onOtpSubmit = () => {},
  error,
}: OtpInputProps) => {
  const [otp, setOtp] = useState(new Array(length).fill(''));
  const inputRefs = useRef<any>([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index: any, e: any) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    // allow only one input
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // submit trigger
    const combinedOtp = newOtp.join('');
    if (combinedOtp.length === length) onOtpSubmit(combinedOtp);

    // Move to next input if current field is filled
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClick = (index: any) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    // optional
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf('')].focus();
    }
  };

  const handleKeyDown = (index: any, e: any) => {
    if (
      e.key === 'Backspace' &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      // Move focus to the previous input field on backspace
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className='w-12 h-12 flex items-center '>
      {otp.map((value, index) => {
        return (
          <input
            key={index}
            type='text'
            ref={(input) => (inputRefs.current[index] = input)}
            value={value}
            onChange={(e) => handleChange(index, e)}
            onClick={() => handleClick(index)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className={`w-10 h-10 m-2.5 text-center text-lg border-2 rounded-md bg-[#F0F1F3] ${
              error
                ? 'border-[#FB532E]'
                : value
                ? 'border-[#4285F4]'
                : 'border-[#F0F1F3]'
            }`}
          />
        );
      })}
    </div>
  );
};

export default OtpInput;
