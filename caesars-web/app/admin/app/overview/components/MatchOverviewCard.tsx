import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';
import { useLocal } from '@/app/hooks/useLocal';

type Props = {
  icon: string | StaticImageData;
  color?: string;
  type: 'pre-game' | 'in-game';
  userType1: string;
  userType2: string;
  userMatches1: number;
  userMatches2: number;
};

const MatchOverviewCard = (props: Props) => {
  const {
    icon,
    color,
    type,
    userType1,
    userType2,
    userMatches1,
    userMatches2,
  } = props;
  const router = useRouter();

  const [matchesTab, setMatchesTab] = useLocal('matches tab', {});

  const strokeOffset = 150 * (78 / 100);

  return (
    <div
      className='bg-white px-8 py-5 flex rounded-[20px] mb-10 w-full h-[180px] items-center transition-all duration-300 ease-linear justify-between cursor-pointer hover:pt-2 hover:px-5 hover:items-start hover:flex-col group'
      onClick={() => {
        // localStorage.setItem('matches tab', type);
        setMatchesTab({
          team: type,
          tab:
            type === 'pre-game'
              ? 'Inprogress Matches'
              : type === 'in-game' && 'Live Matches',
        });
        router.push('/admin/app/matches');
      }}
    >
      <div className='flex-1 group-hover:flex items-center group-hover:gap-2 group-hover:w-full group-hover:h-full'>
        <div className='group-hover:scale-50'>
          <Image src={icon} alt={'file'} />
        </div>
        <p className='hidden capitalize text-[#54577A] text-sm font-medium group-hover:block'>
          {type} Matches
        </p>
      </div>
      <div className='flex-1 flex items-center flex-col group-hover:hidden'>
        <div className='w-[50px] h-[50px] relative'>
          <div className='w-[50px] h-[50px] rounded-full flex justify-center items-center bg-[#7D8592] opacity-20'></div>
          <div className='w-[41.5px] h-[41.5px] rounded-full flex justify-center items-center bg-white z-20 absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>
            {userMatches1 + userMatches2}
          </div>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            version='1.1'
            width='50px'
            height='50px'
            className='absolute top-0 left-0'
          >
            <circle
              cx='25'
              cy='25'
              r='23'
              strokeLinecap='round'
              className='fill-none stroke-[4px]'
            />
          </svg>
        </div>
        <div className='w-[130px] text-sm font-medium text-[#54577A] mt-2 capitalize'>
          {type} Matches
        </div>
      </div>
      <div className='w-full hidden group-hover:flex flex-col mb-3 px-3'>
        <div className='pt-3 flex items-center justify-between w-full'>
          <p className='text-[#54577A] text-base font-medium'>
            {userType1} Matches
          </p>
          <p className='w-10 text-2xl font-medium text-black'>{userMatches1}</p>
        </div>
        <div className='pt-3 flex items-center justify-between w-full'>
          <p className='text-[#54577A] text-base font-medium'>
            {userType2} Matches
          </p>
          <p className='w-10 text-2xl font-medium text-black'>{userMatches2}</p>
        </div>
      </div>
      <style jsx>{`
        svg {
          stroke-dasharray: 150;
          stroke-dashoffset: ${150 - strokeOffset};
          stroke: ${color};
          transform: rotate(-25deg);
        }
      `}</style>
    </div>
  );
};

export default MatchOverviewCard;
