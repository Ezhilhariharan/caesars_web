import React from 'react';
import { IconProps } from './default-types';

export default function Plus(props: IconProps) {
  const { color = '#14171C', size = 20 } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 15 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M14.4844 7.98438H8.48438V13.9844H6.51562V7.98438H0.515625V6.01562H6.51562V0.015625H8.48438V6.01562H14.4844V7.98438Z'
        fill={color}
      />
    </svg>
  );
}
