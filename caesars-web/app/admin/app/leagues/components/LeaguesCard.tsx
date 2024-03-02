import React from 'react';
import Image from 'next/image';

// types
import { leagueType } from '../page';

// assets
import bg from '../../../assets/leagues/leaguesCardBg.svg';

// lib
import { getIcon } from '@/app/lib/getIcon';

type CardProps = {
  name: string;
  shortName: string;
  logo: string;
  selectedLeague: leagueType;
};

export default function LeaguesCard(props: CardProps) {
  const { name, shortName, logo, selectedLeague } = props;

  return (
    <div
      className='w-full h-full border-[2px] rounded-[18px] relative'
      style={{
        borderColor: selectedLeague?.name === name ? '#4285F4' : '#575757',
        boxShadow:
          selectedLeague?.name === name
            ? '0px 4px 16px 0px rgba(16, 20, 39, 0.25)'
            : '',
      }}
    >
      <div className='absolute top-0 left-0 w-full h-full'>
        <Image src={bg} alt='' />
      </div>
      <div className='absolute top-0 left-0 p-5'>
        <div className='w-full flex items-start justify-center'>
          <Image
            src={getIcon(shortName.toUpperCase())}
            alt={`${shortName} logo`}
            width={140}
            height={140}
          />
        </div>
        <div className='h-[80px] text-lg font-bold text-[#0A1629] flex items-center'>
          {name}
        </div>
        <div>
          <button className='text-sm font-normal text-[#91929E]'>
            View Full Details
          </button>
        </div>
      </div>
    </div>
  );
}
