import Image, { StaticImageData } from 'next/image';
import React from 'react';

// icons
import errorIcon from '../../../assets/icons/toast/error.svg';
import successIcon from '../../../assets/icons/toast/success.svg';
import alertIcon from '../../../assets/icons/toast/alert.svg';

export type toastProps = {
  logo?: string | StaticImageData;
  logoText?: string;
  type: 'error' | 'warning' | 'alert' | 'success';
  title?: string;
  discription?: string;
  backgroundColor?: string;
  titleColor?: string;
  descriptionColor?: string;
  borderColor?: string;
  toggle?: boolean;
};

const Toast = (props: toastProps) => {
  const {
    logo,
    logoText,
    type,
    title,
    discription,
    backgroundColor,
    titleColor,
    descriptionColor,
    borderColor,
    toggle,
  } = props;

  const typeOfIcon =
    type === 'error'
      ? errorIcon
      : type === 'success'
      ? successIcon
      : type === 'alert'
      ? alertIcon
      : '';

  const errorStyles = 'bg-[#FFF8F8] border-[#F85640] text-[#F85640]';
  const alertStyles = 'bg-[#FFF8EF] border-[#FBA63C]';
  const warningStyles = 'bg-[#DCF3EB] border-[#34A770]';
  const successStyles = 'bg-[#DCF3EB] border-[#34A770] text-[#13854E]';

  return (
    <div
      className={`w-[408px] backdrop-blur-[4px] h-[73px] flex z-50 items-center justify-center  rounded-lg border absolute top-5 transition-transform duration-300 ease-linear shadow-[0px_2px_1px_0px_#4048520D] ${
        toggle ? 'right-5' : '-right-[30%] hidden'
      } ${
        type === 'error'
          ? errorStyles
          : type === 'warning'
          ? warningStyles
          : type === 'alert'
          ? alertStyles
          : type === 'success' && successStyles
      }
      `}
      style={{
        backgroundColor: `${backgroundColor}`,
        borderColor: borderColor,
      }}
    >
      <div className='flex items-center px-5'>
        <div>
          <Image
            src={typeOfIcon}
            alt='notification icon'
            width={28}
            height={28}
          />
        </div>
        <div className='w-[350px] pl-5'>
          <p
            className={`text-[13px] font-normal pb-1`}
            style={{
              color: titleColor,
            }}
          >
            {title}
          </p>
          <p
            className={`text-[11px] font-normal`}
            style={{
              color: descriptionColor,
            }}
          >
            {discription}
          </p>
        </div>
        {logo && (
          <div className=''>
            {logoText && <p>{logoText}</p>}
            <Image src={logo} alt='logo' width={40} height={40} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Toast;
