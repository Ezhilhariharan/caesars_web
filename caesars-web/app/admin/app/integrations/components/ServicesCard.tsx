import React from 'react';
import Image, { StaticImageData } from 'next/image';

// icons
import settings from '../../../assets/Settings.svg';
import Switch from '@/app/components/global/switch/Switch';

type Props = {
  id: number;
  logo: string | StaticImageData;
  title: string;
  text: string;
  status: number;
  onStatusChange: (id?: number) => void;
};

const ServicesCard = (props: Props) => {
  const { id, logo, title, text, status, onStatusChange } = props;

  return (
    <div className='w-[270px] h-[200px] bg-[#E0E3E8] rounded-lg'>
      <div className='bg-white p-5 rounded-lg'>
        <div className='flex items-center justify-between'>
          <Image src={logo} alt='logo' height={30} />
          <Image src={settings} alt='icon' height={30} />
        </div>
        <div className='my-5 mb-2'>
          <p className='text-sm font-semibold text-black'>{title}</p>
          <p className='text-[13px] font-normal text-[#6B7280]'>{text}</p>
        </div>
      </div>
      <div className='px-5 py-3.5 flex items-center justify-between'>
        <div className='px-2 py-1 bg-[#FCFCFC] rounded-[4px]'>
          {status === 1 ? 'Connected' : 'Connect'}
        </div>
        <div onClick={() => onStatusChange(id)}>
          <Switch isToggle={status === 1 ? true : false} />
        </div>
      </div>
    </div>
  );
};

export default ServicesCard;
