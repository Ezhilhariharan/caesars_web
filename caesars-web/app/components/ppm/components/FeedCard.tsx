import React from 'react';
import Avatar from '../../global/Avatar';
import { StaticImageData } from 'next/image';

type Props = {
  image: string | StaticImageData;
  name: string;
  type: string;
  message: string;
  score: string;
  time: any;
  homeTeamLogo?: string | StaticImageData;
  awayTeamLogo?: string | StaticImageData;
};

const FeedCard = (props: Props) => {
  const {
    image,
    name,
    type,
    message,
    score,
    time,
    homeTeamLogo,
    awayTeamLogo,
  } = props;

  const match_score = score.split(':');
  const occured = new Date(time).toLocaleTimeString('en-US');

  return (
    <div className='w-full flex gap-5 my-5'>
      <div className='text-gray-600 mt-1 bg-gray-100 min-w-12 h-10 flex items-center justify-center rounded-full'>
        <Avatar
          image={
            type === 'home' ? homeTeamLogo : type === 'away' ? awayTeamLogo : ''
          }
          name={type.slice(0, 1)}
          width={40}
          height={40}
        />
      </div>
      <div className='w-full text-[17px] max-[1600px]:text-sm'>
        <div className='flex items-center gap-2 text-gray-600 font-semibold'>
          {/* <Image src={baseImg} alt='' width={16} /> */}
          <p>
            {match_score[0]} - {match_score[1]}
          </p>
        </div>
        <div className='mt-2 px-5 py-1 border border-[#008EFF] text-[#008EFF] text-xs font-semibold rounded-full w-fit capitalize'>
          {type}
        </div>
        <div className='font-normal text-sm mt-2'>{message}</div>
        <div className='w-full flex justify-end text-xs'>
          {/* {dateConverter(occured).timeStringWithMilliSec} */}
          {occured}
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
