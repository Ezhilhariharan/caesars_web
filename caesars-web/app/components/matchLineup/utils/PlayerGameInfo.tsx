import React from 'react';

type Props = {
  matchData: {
    id: number;
    teamName?: string;
    atBat?: number;
    run?: number;
    hit?: number;
    homeRun?: number;
    runBattedIn?: number;
    bb?: number;
    so?: number;
  }[];
};

const PlayerGameInfo = (props: Props) => {
  const { matchData } = props;

  return (
    <table className='w-full rounded-[4px] overflow-hidden'>
      <thead>
        <tr className='h-10 flex items-center bg-[#4285F4] px-2 text-center text-xs text-white'>
          <th className='w-2/5 text-left'>Last 3 Games</th>
          <th className='w-1/6'>AB</th>
          <th className='w-1/6'>R</th>
          <th className='w-1/6'>H</th>
          <th className='w-1/6'>HR</th>
          <th className='w-1/6'>RBI</th>
          <th className='w-1/6'>BB</th>
          <th className='w-1/6'>SO</th>
        </tr>
      </thead>
      <tbody>
        {matchData?.map((data) => {
          return (
            <tr
              key={data?.id}
              className='h-12 flex items-center text-center px-2 text-[#333] border border-[#ededed] border-t-0 text-xs'
            >
              <td className='w-2/5 h-full flex items-center text-[11px] font-normal text-left border-r border-[#ededed]'>
                {data?.teamName}
              </td>
              <td className='w-1/6 text-xs'>{data?.atBat}</td>
              <td className='w-1/6'>{data?.run}</td>
              <td className='w-1/6'>{data?.hit}</td>
              <td className='w-1/6'>{data?.homeRun}</td>
              <td className='w-1/6'>{data?.runBattedIn}</td>
              <td className='w-1/6'>{data?.bb}</td>
              <td className='w-1/6'>{data?.so}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default PlayerGameInfo;
