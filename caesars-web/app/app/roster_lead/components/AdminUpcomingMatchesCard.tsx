import React from 'react';
import { StaticImageData } from 'next/image';

// libs
import dateConverter from '@/app/lib/dateConverter';

// components
import Avatar from '@/app/components/global/Avatar';

type Props = {
  team1_name?: string;
  team1_short_name?: string;
  team1_image: string | StaticImageData;
  team2_name?: string;
  team2_short_name?: string;
  team2_image: string | StaticImageData;
  date?: Date;
  primary?: boolean;
  style?: {};
};

const AdminupcomingMatchesCard = (props: Props) => {
  const {
    team1_name,
    team1_short_name,
    team1_image,
    team2_name,
    team2_short_name,
    team2_image,
    date,
    primary,
    ...prop
  } = props;
  const match_start_at = dateConverter(date);

  return (
    <div className='flex py-2 text-sm items-center justify-between' {...prop}>
      <div className='h-full flex items-center font-semibold'>
        <div className='flex items-center'>
          <Avatar
            image={team1_image}
            name={team1_name}
            width={40}
            height={40}
          />
          <p className={`pl-2 max-[1700px]:${primary ? 'hidden' : 'block'}`}>
            {team1_name}
          </p>
          <p className={`pl-2 max-[1700px]:${primary ? 'block' : 'hidden'}`}>
            {team1_short_name}
          </p>
        </div>{' '}
        <div className='px-3'>vs</div>
        <div className='flex items-center h-full'>
          <p className={`pl-2 max-[1700px]:${primary ? 'hidden' : 'block'}`}>
            {team2_name}
          </p>
          <p className={`pl-2 max-[1700px]:${primary ? 'block' : 'hidden'}`}>
            {team2_short_name}
          </p>
          <Avatar
            image={team2_image}
            name={team2_name}
            width={40}
            height={40}
          />
        </div>
      </div>
      {date && (
        <div className='text-sm font-normal text-[#B6B6B6]'>
          {match_start_at.date} {match_start_at.monthInString}
        </div>
      )}
    </div>
  );
};

export default AdminupcomingMatchesCard;
