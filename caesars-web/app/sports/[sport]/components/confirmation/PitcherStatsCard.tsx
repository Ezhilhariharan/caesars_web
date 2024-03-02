import React from 'react';

type Props = {
  strikeouts: string | number;
  winProbability: string | number;
  hitsAllowed: string | number;
  earnedRuns: string | number;
  outs: string | number;
  walks: string | number;
};

const PitcherStatsCard = (props: Props) => {
  const { strikeouts, winProbability, hitsAllowed, earnedRuns, outs, walks } =
    props;
  return (
    <div className='w-full text-sm text-[#14171C]'>
      <div className='w-full h-10 font-semibold bg-[#F0F1F3] text-center flex items-center'>
        <div className='w-[15%]'>SO</div>
        <div className='w-[15%] border-l'>WP</div>
        <div className='w-[15%] border-l'>HA</div>
        <div className='w-[15%] border-l'>ER</div>
        <div className='w-[15%] border-l'>Outs</div>
        <div className='w-[15%] border-l'>W</div>
      </div>
      <div className='w-full h-10 font-normal text-center flex items-center'>
        <div className='w-[15%]'>{strikeouts}</div>
        <div className='w-[15%] border-l'>{winProbability}</div>
        <div className='w-[15%] border-l'>{hitsAllowed}</div>
        <div className='w-[15%] border-l'>{earnedRuns}</div>
        <div className='w-[15%] border-l'>{outs}</div>
        <div className='w-[15%] border-l'>{walks}</div>
      </div>
    </div>
  );
};

export default PitcherStatsCard;
