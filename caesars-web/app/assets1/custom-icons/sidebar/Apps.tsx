import { IconProps } from '../default-types';

export default function Apps(props: IconProps) {
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
        d='M14.1666 8.33341H15.8333C17.5 8.33341 18.3333 7.50008 18.3333 5.83341V4.16675C18.3333 2.50008 17.5 1.66675 15.8333 1.66675H14.1666C12.5 1.66675 11.6666 2.50008 11.6666 4.16675V5.83341C11.6666 7.50008 12.5 8.33341 14.1666 8.33341Z'
        stroke={color}
        stroke-width='1.5'
        stroke-miterlimit='10'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M4.16663 18.3334H5.83329C7.49996 18.3334 8.33329 17.5001 8.33329 15.8334V14.1667C8.33329 12.5001 7.49996 11.6667 5.83329 11.6667H4.16663C2.49996 11.6667 1.66663 12.5001 1.66663 14.1667V15.8334C1.66663 17.5001 2.49996 18.3334 4.16663 18.3334Z'
        stroke={color}
        stroke-width='1.5'
        stroke-miterlimit='10'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M4.99996 8.33341C6.84091 8.33341 8.33329 6.84103 8.33329 5.00008C8.33329 3.15913 6.84091 1.66675 4.99996 1.66675C3.15901 1.66675 1.66663 3.15913 1.66663 5.00008C1.66663 6.84103 3.15901 8.33341 4.99996 8.33341Z'
        stroke={color}
        stroke-width='1.5'
        stroke-miterlimit='10'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M15 18.3334C16.8409 18.3334 18.3333 16.841 18.3333 15.0001C18.3333 13.1591 16.8409 11.6667 15 11.6667C13.159 11.6667 11.6666 13.1591 11.6666 15.0001C11.6666 16.841 13.159 18.3334 15 18.3334Z'
        stroke={color}
        stroke-width='1.5'
        stroke-miterlimit='10'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  );
}
