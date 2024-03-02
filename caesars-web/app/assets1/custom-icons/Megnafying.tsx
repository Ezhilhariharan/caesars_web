import React from 'react';
import { IconProps } from './default-types';

export default function Megnafying(props: IconProps) {
  const { color = '#14171C', size = 20 } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clip-path='url(#clip0_55_3364)'>
        <path
          d='M9.58335 17.5C13.9556 17.5 17.5 13.9555 17.5 9.58329C17.5 5.21104 13.9556 1.66663 9.58335 1.66663C5.2111 1.66663 1.66669 5.21104 1.66669 9.58329C1.66669 13.9555 5.2111 17.5 9.58335 17.5Z'
          stroke={color}
          stroke-width='1.5'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <path
          d='M18.3334 18.3333L16.6667 16.6666'
          stroke={color}
          stroke-width='1.5'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
      </g>
      <defs>
        <clipPath id='clip0_55_3364'>
          <rect width='20' height='20' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}
