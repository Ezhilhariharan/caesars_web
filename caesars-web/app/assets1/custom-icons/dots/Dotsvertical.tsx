import React from 'react';
import { IconProps } from '../default-types';

export default function DotsVertical(props: IconProps) {
  const { color = '#14171C', size = 20 } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 4 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M2 -8.74228e-08C3.10457 -3.91405e-08 4 0.89543 4 2C4 3.10457 3.10457 4 2 4C0.89543 4 -1.35705e-07 3.10457 -8.74228e-08 2C-3.91405e-08 0.89543 0.89543 -1.35705e-07 2 -8.74228e-08Z'
        fill={color}
      />
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M2 5C3.10457 5 4 5.89543 4 7C4 8.10457 3.10457 9 2 9C0.89543 9 -1.35705e-07 8.10457 -8.74228e-08 7C-3.91405e-08 5.89543 0.89543 5 2 5Z'
        fill={color}
      />
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M4 12C4 10.8954 3.10457 10 2 10C0.89543 10 -3.91392e-08 10.8954 -8.74228e-08 12C-1.35706e-07 13.1046 0.89543 14 2 14C3.10457 14 4 13.1046 4 12Z'
        fill={color}
      />
    </svg>
  );
}
