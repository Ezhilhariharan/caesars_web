import { IconProps } from '../default-types';

export default function ArrowLeft(props: IconProps) {
  const { color = '#54577A', size = 20, strokeWidth = '1.5' } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M12.5 16.6001L7.0667 11.1668C6.42503 10.5251 6.42503 9.47515 7.0667 8.83348L12.5 3.40015'
        stroke={color}
        stroke-width={strokeWidth}
        stroke-miterlimit='10'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  );
}
