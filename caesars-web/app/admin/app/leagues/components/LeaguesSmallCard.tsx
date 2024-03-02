import React from 'react';
import Image, { StaticImageData } from 'next/image';

import closeIcon from '../../../assets/leagues/close.svg';

type Props = {
  type?: 'add';
  logo: string | StaticImageData;
};

export default function LeaguesSmallCard(props: Props) {
  const { type, logo } = props;
  return (
    <div className='w-14 h-14 border border-[#54577A] rounded-lg flex items-center justify-center relative'>
      <Image src={logo} alt='' />
      {type !== 'add' && (
        <Image
          src={closeIcon}
          alt=''
          width={12}
          height={12}
          className='absolute -top-1 -right-1 cursor-pointer'
        />
      )}
    </div>
  );
}
