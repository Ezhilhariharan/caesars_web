import React from 'react';

type Props = {
  Players?: string;
  singles?: string;
  doubles?: string;
  triples?: string;
  homeRuns?: string;
  totalBases?: string;
  hits?: string;
  hitsRunsRbis?: string;
  runs?: string;
  RBIs?: string;
  stolenBases?: string;
  batterStrikeouts?: string;
  batterWalks?: string;
  strikeouts?: string;
  winProbability?: string;
  hitsAllowed?: string;
  earnedRuns?: string;
  outs?: string;
  walks?: string;
  firstSO?: string;
  firstER?: string;
};

const TableRow = (props: Props) => {
  const {
    Players,
    singles,
    doubles,
    triples,
    homeRuns,
    totalBases,
    hits,
    hitsRunsRbis,
    runs,
    RBIs,
    stolenBases,
    batterStrikeouts,
    batterWalks,
    strikeouts,
    winProbability,
    hitsAllowed,
    earnedRuns,
    outs,
    walks,
    firstSO,
    firstER,
  } = props;
  return (
    <tr className='w-full border-t h-10 font-normal text-sm'>
      <td className='border-r px-2.5 w-full max-w-[20%] text-center text-base'>
        {Players}
      </td>
      <td className='border-r px-2.5 max-w-[10%] text-center'>{singles}</td>
      <td className='border-r px-2.5 max-w-[10%] text-center'>{doubles}</td>
      <td className='border-r px-2.5 max-w-[10%] text-center'>{triples}</td>
      <td className='border-r px-2.5 max-w-[10%] text-center'>{homeRuns}</td>
      <td className='border-r px-2.5 max-w-[10%] text-center'>{totalBases}</td>
      <td className='border-r px-2.5 max-w-[10%] text-center'>{hits}</td>
      <td className='border-r px-2.5 max-w-[10%] text-center'>
        {hitsRunsRbis}
      </td>
      <td className='border-r px-2.5 max-w-[10%] text-center'>{runs}</td>
      <td className='border-r px-2.5 max-w-[10%] text-center'>{RBIs}</td>
      <td className='border-r px-2.5 max-w-[10%] text-center'>{stolenBases}</td>
      <td className='border-r px-2.5 max-w-[10%] text-center'>
        {batterStrikeouts}
      </td>
      <td className='px-2.5 max-w-16 text-center'>{batterWalks}</td>
    </tr>
  );
};

export default TableRow;
