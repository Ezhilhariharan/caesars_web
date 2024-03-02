import dateConverter from '@/app/lib/dateConverter';
import React from 'react';

type PlayerInfoProps = {
  fullName?: string;
  position?: string;
  playerProfile?: any;
  // born?: any;
  draft?: {
    year?: number;
    teamName?: string;
    round: number;
    overAllPick?: number;
  };
};

const PlayerInfo = (props: PlayerInfoProps) => {
  const { fullName, position, draft, playerProfile } = props;

  const DOB = `${dateConverter(playerProfile?.date_of_birth).date}/${
    dateConverter(playerProfile?.date_of_birth).month
  }/${dateConverter(playerProfile?.date_of_birth).year}`;

  return (
    <div className='w-[303px] px-3 py-3 border border-[#E0E3E8] rounded-[4px] text-[#333] max-[1600px]:w-[100%]'>
      <p className='h-[25px] text-sm font-bold'>{fullName}</p>
      <p className='text-[13px] h-6 font-bold'>
        Position:
        <span className='font-normal pl-1 capitalize'>{position}</span>
      </p>
      <p className='text-[13px] h-6 font-bold'>
        DOB:
        <span className='font-normal pl-1'>
          {playerProfile?.date_of_birth ? DOB : '--'}
        </span>
        <span className='font-normal'>
          {playerProfile?.nationality && `, ${playerProfile?.nationality}`}
        </span>
      </p>
      <div className='flex font-bold text-[13px]'>
        Height:
        <p className='font-normal pl-1'>
          {playerProfile?.height ? `${playerProfile?.height} cm` : '--'}{' '}
        </p>
      </div>
      <div className='flex font-bold pt-1 text-[13px]'>
        Weigth:
        <p className='font-normal pl-1'>
          {playerProfile?.weigth ? `${playerProfile?.weigth} kg` : '--'}
        </p>
      </div>
    </div>
  );
};

export default PlayerInfo;
