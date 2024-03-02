import { IconProps } from '../default-types';

export default function ArrowDown(props: IconProps) {
  const { color = '#54577A', size = 20, strokeWidth } = props;

  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 12 12'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M9.95998 4.4751L6.69998 7.7351C6.31498 8.1201 5.68498 8.1201 5.29998 7.7351L2.03998 4.4751'
        stroke={color}
        stroke-width={strokeWidth}
        stroke-miterlimit='10'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  );
}
