import React from 'react';
import Image from 'next/image';

// icons
import opened from '../assets/opened-assign-match.svg';
import notOpened from '../assets/not-opened-assign-match.svg';

// lib
import { getIcon } from '@/app/lib/getIcon';

// components
import CardContainer from '@/app/components/global/cardContainer/CardContainer';
import UpcomingMatchProgress from '@/app/components/global/matchCard/UpcomingMatchCardProgress';
import Avatar from '@/app/components/global/Avatar';
import ContributorsCard from '@/app/components/global/matchCard/ContributorsCard';

type Props = {
  matchData: any;
  users: {
    id: number;
    first_name: string;
    last_name: string;
    middle_name: string;
  }[];
  width?: number;
  height?: number;
  avatarStyle?: {};
};

const AssignedMatchesCard = (props: Props) => {
  const { matchData, users, width, height, avatarStyle } = props;

  const taskStatus = matchData?.match_status > 0 ? opened : notOpened;

  return (
    <CardContainer cardClassName='w-full h-[240px] px-4 py-6 cursor-pointer'>
      <div className='w-full h-full'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <div>
              <Avatar
                image={matchData?.team1_logo_image}
                name={`${matchData?.team1_name}`}
                width={45}
                height={45}
              />
            </div>
            <div className='text-xs px-3'>vs</div>
            <div>
              <Avatar
                image={matchData?.team2_logo_image}
                name={`${matchData?.team2_name}`}
                width={45}
                height={45}
              />
            </div>
          </div>
          {matchData?.league_name && (
            <div>
              <Image
                src={getIcon(matchData?.league_name)}
                alt='sport image'
                width={45}
                height={45}
              />
            </div>
          )}
        </div>
        <div className='mt-4'>
          <div className='h-full flex flex-col justify-between py-1 text-sm font-semibold text-[#141522]'>
            <h2 className='text-sm font-semibold text-[#141522]'>
              {matchData?.team1_short_name} <span className='h-3'>VS</span>{' '}
              {matchData?.team2_short_name}
            </h2>
            <div className='h-7 leading-4'>
              <p className='text-[10px] font-normal text-[#54577A]'>
                {matchData?.location_name},{matchData?.city_name},{' '}
                {matchData?.province_name}, {matchData?.country_short_name}
              </p>
            </div>
          </div>
        </div>
        <UpcomingMatchProgress
          percentage={matchData?.match_assignments_overall_task_progress || 0}
          barHeight={7}
          style={{
            padding: 0,
            fontSize: 14,
          }}
        />
        <div className='h-8 flex items-center justify-between'>
          <div className='h-full flex items-center gap-1.5'>
            <Image src={taskStatus} alt='status icon' width={20} height={20} />
            <p className='text-xs'>
              {matchData?.match_status > 0 ? 'opened' : 'Not Opened'}
            </p>
          </div>
          <div className='h-full flex items-center'>
            <ContributorsCard
              user={users}
              width={width}
              height={height}
              style={avatarStyle}
            />
          </div>
        </div>
      </div>
    </CardContainer>
  );
};

export default AssignedMatchesCard;
