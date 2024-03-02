import React from 'react';
import { IconProps } from '../default-types';

export default function DotsHorizontal(props: IconProps) {
  const { color = '#14171C', size = 20 } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 21 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='3.51953' cy='10' r='2' fill={color} />
      <circle cx='10.5195' cy='10' r='2' fill={color} />
      <circle cx='17.5195' cy='10' r='2' fill={color} />
    </svg>
  );
}
