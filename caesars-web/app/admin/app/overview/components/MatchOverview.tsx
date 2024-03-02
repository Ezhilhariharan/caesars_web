import Image from 'next/image';
import yellowFile from '../assets/yellowFile.svg';
import greenFile from '../assets/greenFile.svg';
import MatchOverviewCard from './MatchOverviewCard';

type props = {
  data?: any;
};

export default function MatchOverview({ data }: props) {
  return (
    <div className='w-full rounded-[20px]'>
      <MatchOverviewCard
        icon={yellowFile}
        color='#00D097'
        type='pre-game'
        userType1='R.Lead'
        userType2='R.Maker'
        userMatches1={data.roster_admin_matches | 0}
        userMatches2={data.roster_managers_matches | 0}
      />
      <MatchOverviewCard
        icon={greenFile}
        color='#FDC748'
        type='in-game'
        userType1='Pre-game'
        userType2='In-game'
        userMatches1={data.in_game_managers_matches | 0}
        userMatches2={data.in_game_traders_matches | 0}
      />
    </div>
  );
}
