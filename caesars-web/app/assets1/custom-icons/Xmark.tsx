import React from 'react';
import { IconProps } from './default-types';

export default function Xmark(props: IconProps) {
  const { color = '#14171C', size = 20 } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 17 16'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M11.168 5.3335L5.83466 10.6668'
        stroke={color}
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M5.83594 5.3335L11.1692 10.6668'
        stroke={color}
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  );
}
