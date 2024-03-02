import { IconProps } from '../default-types';

export default function Book(props: IconProps) {
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
        d='M18.3333 13.9501V3.89174C18.3333 2.89174 17.5167 2.15008 16.525 2.23341H16.475C14.725 2.38341 12.0667 3.27508 10.5833 4.20841L10.4417 4.30008C10.2 4.45008 9.80001 4.45008 9.55834 4.30008L9.35001 4.17508C7.86667 3.25008 5.21667 2.36674 3.46667 2.22508C2.475 2.14174 1.66667 2.89174 1.66667 3.88341V13.9501C1.66667 14.7501 2.31667 15.5001 3.11667 15.6001L3.35834 15.6334C5.16667 15.8751 7.95834 16.7917 9.55834 17.6667L9.59167 17.6834C9.81667 17.8084 10.175 17.8084 10.3917 17.6834C11.9917 16.8001 14.7917 15.8751 16.6083 15.6334L16.8833 15.6001C17.6833 15.5001 18.3333 14.7501 18.3333 13.9501Z'
        stroke={color}
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M10 4.57495V17.075'
        stroke={color}
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M6.45833 7.07495H4.58333'
        stroke={color}
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M7.08333 9.57495H4.58333'
        stroke={color}
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  );
}
