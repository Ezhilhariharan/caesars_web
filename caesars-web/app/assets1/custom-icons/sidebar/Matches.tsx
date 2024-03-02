import { IconProps } from '../default-types';

export default function Matches(props: IconProps) {
  const { color = '#292D32', size = 20 } = props;

  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M17.5 5.83341V14.1667C17.5 16.6667 16.25 18.3334 13.3333 18.3334H6.66667C3.75 18.3334 2.5 16.6667 2.5 14.1667V5.83341C2.5 3.33341 3.75 1.66675 6.66667 1.66675H13.3333C16.25 1.66675 17.5 3.33341 17.5 5.83341Z'
        stroke={color}
        stroke-width='1.5'
        stroke-miterlimit='10'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M13.5417 9.16675H6.45833C5.65833 9.16675 5 8.50842 5 7.70842V5.62508C5 4.82508 5.65833 4.16675 6.45833 4.16675H13.5417C14.3417 4.16675 15 4.82508 15 5.62508V7.70842C15 8.50842 14.3417 9.16675 13.5417 9.16675Z'
        stroke={color}
        stroke-width='1.5'
        stroke-miterlimit='10'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M8.58072 12.7334L6.66406 14.6501'
        stroke={color}
        stroke-width='1.5'
        stroke-miterlimit='10'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M6.69531 12.7583L8.61197 14.675'
        stroke={color}
        stroke-width='1.5'
        stroke-miterlimit='10'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M13.7422 12.7749H13.7589'
        stroke={color}
        stroke-width='2'
        stroke-miterlimit='10'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M12.0781 14.5833V14.5667'
        stroke={color}
        stroke-width='2'
        stroke-miterlimit='10'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  );
}
