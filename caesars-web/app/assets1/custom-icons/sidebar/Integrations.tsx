import { IconProps } from '../default-types';

export default function Integrations(props: IconProps) {
  const { color = '#14171C', size = 20, subColor = '#292D32' } = props;

  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M7.4974 18.3333H12.4974C16.6641 18.3333 18.3307 16.6667 18.3307 12.5V7.49999C18.3307 3.33332 16.6641 1.66666 12.4974 1.66666H7.4974C3.33073 1.66666 1.66406 3.33332 1.66406 7.49999V12.5C1.66406 16.6667 3.33073 18.3333 7.4974 18.3333Z'
        stroke={color}
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M12.9766 15.4167V12.1667'
        stroke={color}
        stroke-width='1.5'
        stroke-miterlimit='10'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M12.9766 6.20834V4.58334'
        stroke={color}
        stroke-width='1.5'
        stroke-miterlimit='10'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M12.9714 10.5417C14.168 10.5417 15.138 9.57163 15.138 8.37501C15.138 7.17839 14.168 6.20834 12.9714 6.20834C11.7747 6.20834 10.8047 7.17839 10.8047 8.37501C10.8047 9.57163 11.7747 10.5417 12.9714 10.5417Z'
        stroke={color}
        stroke-width='1.5'
        stroke-miterlimit='10'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M7.02344 15.4167V13.7917'
        stroke={subColor}
        stroke-width='1.5'
        stroke-miterlimit='10'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M7.02344 7.83334V4.58334'
        stroke={subColor}
        stroke-width='1.5'
        stroke-miterlimit='10'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M7.02604 13.7917C8.22266 13.7917 9.19271 12.8216 9.19271 11.625C9.19271 10.4284 8.22266 9.45834 7.02604 9.45834C5.82943 9.45834 4.85938 10.4284 4.85938 11.625C4.85938 12.8216 5.82943 13.7917 7.02604 13.7917Z'
        stroke={subColor}
        stroke-width='1.5'
        stroke-miterlimit='10'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  );
}
