import { IconProps } from '../default-types';

export default function ArrowRight(props: IconProps) {
  const { color = '#54577A', size = 20 } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M7.42493 16.6001L12.8583 11.1668C13.4999 10.5251 13.4999 9.47515 12.8583 8.83348L7.42493 3.40015'
        stroke={color}
        stroke-width='1.18719'
        stroke-miterlimit='10'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  );
}
