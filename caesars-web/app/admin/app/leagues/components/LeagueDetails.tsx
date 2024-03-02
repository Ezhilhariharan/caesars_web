import React from 'react';

// types
import { leagueType } from '../page';
import Image from 'next/image';
import { getIcon } from '@/app/lib/getIcon';
import ViewMore from './ViewMore';
import LeaguesSmallCard from './LeaguesSmallCard';
import addIcon from '../../../assets/leagues/add.svg';
import Title from '@/app/components/global/title/Title';

type LeagueDetailsProps = {
  selectedLeague: leagueType;
};

export default function LeagueDetails(props: LeagueDetailsProps) {
  const { selectedLeague } = props;

  return (
    <div className='border border-[#E0E3E8] bg-white rounded-[16px]'>
      <Title
        title='Leagues Details'
        size='large'
        style={{
          borderBottom: '1px solid #E0E3E8',
          padding: '16px 20px',
        }}
      />

      <div className='w-full h-auto flex items-center justify-center py-5 border-b'>
        <div className='w-[288px] h-[183px] bg-[#F4F9FD] border border-[#4285F4] flex items-center justify-center rounded-[14px]'>
          <Image
            src={getIcon(selectedLeague?.shortName.toUpperCase())}
            alt={`${selectedLeague?.shortName} icon`}
            width={200}
            height={200}
          />
        </div>
      </div>
      <div className='p-5 border-b border-[#E0E3E8]'>
        <div className='w-full h-10 flex items-center justify-between'>
          <Title
            title='Roster Lead'
            style={{
              fontSize: 18,
            }}
          />
          <div className=''>
            <ViewMore />
          </div>
        </div>
        <div className='text-sm font-normal text-[#91929E]'>Primary</div>
        <div className='mt-5 gap-5 flex'>
          <LeaguesSmallCard logo={getIcon('NFL')} />
          <LeaguesSmallCard logo={getIcon('CFB')} />
          <LeaguesSmallCard logo={addIcon} type='add' />
        </div>
        <div className='mt-5 text-sm font-normal text-[#91929E]'>Secondary</div>
        <div className='mt-5 gap-5 flex'>
          <LeaguesSmallCard logo={getIcon('NFL')} />
          <LeaguesSmallCard logo={getIcon('CFB')} />
          <LeaguesSmallCard logo={addIcon} type='add' />
          <LeaguesSmallCard logo={addIcon} type='add' />
        </div>
      </div>
      <div className='p-5 border-b border-[#E0E3E8]'>
        <div className='w-full h-10 flex items-center justify-between'>
          <Title
            title='Trading Lead'
            style={{
              fontSize: 18,
            }}
          />
          <div className=''>
            <ViewMore />
          </div>
        </div>
        <div className='text-sm font-normal text-[#91929E]'>Primary</div>
        <div className='mt-5 gap-5 flex'>
          <LeaguesSmallCard logo={getIcon('NFL')} />
          <LeaguesSmallCard logo={getIcon('CFB')} />
          <LeaguesSmallCard logo={addIcon} type='add' />
        </div>
        <div className='mt-5 text-sm font-normal text-[#91929E]'>Secondary</div>
        <div className='mt-5 gap-5 flex'>
          <LeaguesSmallCard logo={getIcon('NFL')} />
          <LeaguesSmallCard logo={getIcon('CFB')} />
          <LeaguesSmallCard logo={addIcon} type='add' />
          <LeaguesSmallCard logo={addIcon} type='add' />
        </div>
      </div>
      <div className='p-5'>
        <button className='w-full h-10 bg-[#4285F4] opacity-50 text-white rounded-[5px]'>
          League Compositions
        </button>
      </div>
    </div>
  );
}
