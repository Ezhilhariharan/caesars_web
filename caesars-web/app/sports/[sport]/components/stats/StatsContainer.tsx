import React from 'react';
import { StaticImageData } from 'next/image';

// components
import MatchInfo from './MatchInfo';
import StatsTableContainer from './StatsTableContainer';
import FeedCardContainer from '@/app/components/ppm/components/FeedCardContainer';

type Props = {
  matchId: number | string;
  user?: any;
  homeTeam: {
    id: string | number;
    logo: string | StaticImageData;
    name: string;
    shortName: string;
  };
  awayTeam: {
    id: string | number;
    logo: string | StaticImageData;
    name: string;
    shortName: string;
  };
};

const StatsContainer = (props: Props) => {
  const { matchId, homeTeam, awayTeam, user } = props;

  return (
    <div className='flex gap-5 w-full h-[83vh]'>
      <div className='w-1/4 h-full border rounded-[8px]'>
        <FeedCardContainer id={matchId} user={user} />
      </div>
      <div className='w-3/4'>
        <div className='mb-5'>
          <MatchInfo
            matchId={matchId}
            homeTeam={homeTeam}
            awayTeam={awayTeam}
          />
        </div>
        <div>
          <StatsTableContainer
            matchId={matchId}
            homeTeam={homeTeam}
            awayTeam={awayTeam}
          />{' '}
        </div>
      </div>
    </div>
  );
};

export default StatsContainer;
