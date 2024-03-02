import React from 'react';
import { IconProps } from '../default-types';

export default function Markets(props: IconProps) {
  const { color = '#14171C', size = 20 } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M2.91406 15.0001V5.83341C2.91406 2.50008 3.7474 1.66675 7.08073 1.66675H12.9141C16.2474 1.66675 17.0807 2.50008 17.0807 5.83341V14.1667C17.0807 14.2834 17.0807 14.4001 17.0724 14.5167'
        stroke={color}
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M5.28906 12.5H17.0807V15.4167C17.0807 17.025 15.7724 18.3333 14.1641 18.3333H5.83073C4.2224 18.3333 2.91406 17.025 2.91406 15.4167V14.875C2.91406 13.5667 3.98073 12.5 5.28906 12.5Z'
        stroke={color}
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M6.66406 5.83325H13.3307'
        stroke={color}
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M6.66406 8.75H10.8307'
        stroke={color}
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  );
}
