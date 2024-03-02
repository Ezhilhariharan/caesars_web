import { IconProps } from '../default-types';

export default function Members(props: IconProps) {
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
        d='M17.5665 7.14999V12.85C17.5665 13.7833 17.0665 14.65 16.2581 15.125L11.3081 17.9833C10.4998 18.45 9.4998 18.45 8.68314 17.9833L3.73314 15.125C2.9248 14.6583 2.4248 13.7916 2.4248 12.85V7.14999C2.4248 6.21665 2.9248 5.34995 3.73314 4.87495L8.68314 2.01663C9.49147 1.54996 10.4915 1.54996 11.3081 2.01663L16.2581 4.87495C17.0665 5.34995 17.5665 6.20832 17.5665 7.14999Z'
        stroke={color}
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M10.0003 9.16664C11.0726 9.16664 11.9419 8.29731 11.9419 7.22496C11.9419 6.1526 11.0726 5.28333 10.0003 5.28333C8.92791 5.28333 8.05859 6.1526 8.05859 7.22496C8.05859 8.29731 8.92791 9.16664 10.0003 9.16664Z'
        stroke={color}
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M13.3337 13.8833C13.3337 12.3833 11.842 11.1666 10.0003 11.1666C8.15866 11.1666 6.66699 12.3833 6.66699 13.8833'
        stroke={color}
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  );
}
