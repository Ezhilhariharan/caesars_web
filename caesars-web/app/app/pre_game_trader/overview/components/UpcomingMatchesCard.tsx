import Avatar from '@/app/components/global/Avatar';
import dateConverter from '@/app/lib/dateConverter';
import Image from 'next/image';
import React from 'react';
import mlbIcon from '../../../../assets/icons/sports-icon/mlb.svg';
import cbbIcon from '../../../../assets/icons/sports-icon/cbb.svg';
import cfbIcon from '../../../../assets/icons/sports-icon/cfb.svg';
import nbaIcon from '../../../../assets/icons/sports-icon/nba.svg';
import nhlIcon from '../../../../assets/icons/sports-icon/nhl.svg';
import nflIcon from '../../../../assets/icons/sports-icon/nlf.svg';
import { getIcon } from '@/app/lib/getIcon';

type Props = {
  match: any;
  primary?: boolean;
  width?: number;
  height?: number;
  style?: {};
};

const UpcomingMatchesCard = (props: Props) => {
  const { match, primary, width, height, ...prop } = props;
  const liveDate = dateConverter(match.fixture_start_at);

  const sportsIcon = getIcon(match?.league_name);

  return (
    <div
      className='px-1 py-2.5 flex items-center justify-between gap-2.5'
      {...prop}
    >
      {/* {JSON.stringify(match)} */}
      <div className=''>
        <Image
          src={sportsIcon}
          alt='sport icon'
          width={width}
          height={height}
        />
      </div>
      <div className='flex items-center text-[#141522] text-base font-semibold'>
        <Avatar
          image={match.team1_logo_image}
          name={`${match.team1_short_name}`}
          width={width}
          height={height}
        />
        <p className='px-.5 text-sm'>{match.fixture_name}</p>
        <Avatar
          image={match.team2_logo_image}
          name={`${match.team2_short_name}`}
          width={width}
          height={height}
        />
      </div>
      <div className='text-[#bbb] text-xs font-medium'>
        {primary
          ? `Live in ${dateConverter(match.fixture_start_at).timeString}`
          : `${dateConverter(match.fixture_end_at).monthInString} ${
              dateConverter(match.fixture_end_at).date
            }`}
      </div>
    </div>
  );
};

export default UpcomingMatchesCard;
