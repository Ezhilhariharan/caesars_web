import React from 'react';

type Props = {
  singles: string | number;
  doubles: string | number;
  triples: string | number;
  homeRuns: string | number;
  totalBases: string | number;
  hits: string | number;
  hrr: string | number;
  Runs: string | number;
  rbis: string | number;
  stolenBases: string | number;
  batterStrikeouts: string | number;
  batterWalks: string | number;
};

const BatterStatsTable = (props: Props) => {
  const {
    singles,
    doubles,
    triples,
    homeRuns,
    totalBases,
    hits,
    hrr,
    Runs,
    rbis,
    stolenBases,
    batterStrikeouts,
    batterWalks,
  } = props;

  return (
    <div className='w-full text-sm text-[#14171C]'>
      <div className='w-full h-10 font-semibold bg-[#F0F1F3] text-center flex items-center'>
        <div className='w-1/12'>S</div>
        <div className='w-1/12 border-l'>D</div>
        <div className='w-1/12 border-l'>T</div>
        <div className='w-1/12 border-l'>HR</div>
        <div className='w-1/12 border-l'>TB</div>
        <div className='w-1/12 border-l'>H</div>
        <div className='w-1/12 border-l'>HRR</div>
        <div className='w-1/12 border-l'>R</div>
        <div className='w-1/12 border-l'>SB</div>
        <div className='w-1/12 border-l'>RBIs</div>
        <div className='w-1/12 border-l'>BS</div>
        <div className='w-1/12 border-l'>BW</div>
      </div>
      <div className='w-full h-10 font-normal text-center flex items-center'>
        <div className='w-1/12'>{singles}</div>
        <div className='w-1/12 border-l'>{doubles}</div>
        <div className='w-1/12 border-l'>{triples}</div>
        <div className='w-1/12 border-l'>{homeRuns}</div>
        <div className='w-1/12 border-l'>{totalBases}</div>
        <div className='w-1/12 border-l'>{hits}</div>
        <div className='w-1/12 border-l'>{hrr}</div>
        <div className='w-1/12 border-l'>{Runs}</div>
        <div className='w-1/12 border-l'>{rbis}</div>
        <div className='w-1/12 border-l'>{stolenBases}</div>
        <div className='w-1/12 border-l'>{batterStrikeouts}</div>
        <div className='w-1/12 border-l'>{batterWalks}</div>
      </div>
    </div>
  );
};

export default BatterStatsTable;
