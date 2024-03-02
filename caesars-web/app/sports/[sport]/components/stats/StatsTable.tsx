import React from 'react';

// components
import TableRow from './TableRow';

type Props = {
  data: any[];
};

const StatsTable = (props: Props) => {
  const { data } = props;
  return (
    <div className='mt-5 text-[#14171C]'>
      <table className='w-full h-auto border rounded-[8px]'>
        <tr className='w-full h-10 text-sm'>
          <th className='border-r px-2.5 font-semibold max-w-[25%]'>Players</th>
          <th className='border-r px-2.5 max-w-[10%] font-semibold'>Singles</th>
          <th className='border-r px-2.5 max-w-[10%] font-semibold'>Doubles</th>
          <th className='border-r px-2.5 max-w-[10%] font-semibold'>Triples</th>
          <th className='border-r px-2.5 max-w-[10%] font-semibold'>
            Home Runs
          </th>
          <th className='border-r px-2.5 max-w-[10%] font-semibold'>
            Total Bases
          </th>
          <th className='border-r px-2.5 max-w-[10%] font-semibold'>Hits</th>
          <th className='border-r px-2.5 max-w-[10%] font-semibold'>
            Hits+Runs +Rbis
          </th>
          <th className='border-r px-2.5 max-w-[10%] font-semibold'>Runs</th>
          <th className='border-r px-2.5 max-w-[10%] font-semibold'>RBIs</th>
          <th className='border-r px-2.5 max-w-[10%] font-semibold'>
            Stolen Bases
          </th>
          <th className='border-r px-2.5 max-w-[10%]  font-semibold text-sm'>
            Batter Strikeouts
          </th>
          <th className='px-2.5  font-semibold text-sm'>Batter Walks</th>
        </tr>
        {data.map((d) => {
          return (
            <TableRow
              Players={d.player_name}
              singles={d.singles}
              doubles={d.doubles}
              triples={d.triples}
              homeRuns={d.home_runs}
              totalBases={d.total_bases}
              hits={d.hits}
              hitsRunsRbis={d.hitsRunsRbis}
              runs={d.runs}
              RBIs={d.rbis}
              stolenBases={d.stolen_bases}
              batterStrikeouts={d.batter_strikeouts}
              batterWalks={d.batter_walks}
            />
          );
        })}
      </table>
    </div>
  );
};

export default StatsTable;

// const data = [
//   {
//     id: 1,
//     Players: 'Mukesh',
//     singles: '2',
//     doubles: '3',
//     triples: '1',
//     homeRuns: '2',
//     totalBases: '1',
//     hits: '5',
//     hitsRunsRbis: '6',
//     runs: '4',
//     RBIs: '3',
//     stolenBases: '1',
//     batterStrikeouts: '2',
//     batterWalks: '4',
//   },

//   {
//     id: 1,
//     Players: 'Kumar',
//     singles: '2',
//     doubles: '3',
//     triples: '1',
//     homeRuns: '2',
//     totalBases: '1',
//     hits: '5',
//     hitsRunsRbis: '6',
//     runs: '4',
//     RBIs: '3',
//     stolenBases: '1',
//     batterStrikeouts: '2',
//     batterWalks: '4',
//   },
// ];
