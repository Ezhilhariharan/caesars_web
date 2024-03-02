import React from 'react';
import { StaticImageData } from 'next/image';

// components
import LoadingComponent from '@/app/components/global/LoadingComponent';
import TableCel from './TabelCell';

type Props = {
  data: any[];
  loading: boolean;
  homeTeam: {
    id: string | number;
    name: string;
    shortName: string;
    logo: string | StaticImageData;
  };
  awayTeam: {
    id: string | number;
    name: string;
    shortName: string;
    logo: string | StaticImageData;
  };
  onChange: (
    e: any,
    id: any,
    stateId: string | number,
    externalMatchId: string | number,
    externalPlayerId: string | number
  ) => void;
};

const BatterPropTable = (props: Props) => {
  const { data, loading, homeTeam, awayTeam, onChange } = props;

  return (
    <div className='text-[#14171C]'>
      <table className='w-full h-auto border border-[#E0E3E8] rounded-[8px]'>
        <tr className='w-full h-[60px] text-sm'>
          <th className='border-r font-semibold min-w-[150px] max-w-[25%]'>
            Batters
          </th>
          <th className='border-r max-w-[10%] font-semibold'>Singles</th>
          <th className='border-r max-w-[10%] font-semibold'>Doubles</th>
          <th className='border-r max-w-[10%] font-semibold'>Triples</th>
          <th className='border-r max-w-[10%] font-semibold'>Home Runs</th>
          <th className='border-r max-w-[10%] font-semibold'>Total Bases</th>
          <th className='border-r max-w-[10%] font-semibold'>Hits</th>
          <th className='border-r max-w-[10%] font-semibold'>
            Hits+Runs +Rbis
          </th>
          <th className='border-r max-w-[10%] font-semibold'>Runs</th>
          <th className='border-r max-w-[10%] font-semibold'>RBIs</th>
          <th className='border-r max-w-[10%] font-semibold'>Stolen Bases</th>
          <th className='border-r max-w-[10%] font-semibold text-sm'>
            Batter Strikeouts
          </th>
          <th className=' font-semibold text-sm'>Batter Walks</th>
        </tr>

        {!loading &&
          data?.map((d) => {
            const getTimeStamp = (statName: string) => {
              const statsData = d.stats.filter(
                (s: any) => s.stat_name === statName
              );
              return statsData.length > 0 ? statsData[0] : '';
            };

            return (
              <tr
                key={d.player_id}
                className='w-full border-t h-10 font-normal text-sm'
              >
                <td className='border-r w-full max-w-[20%] text-center text-base justify-between'>
                  {d.player_name}
                </td>
                <td className='border-r max-w-[10%] text-center'>
                  <TableCel
                    id={d.player_id}
                    statId={d.stat_id}
                    name={'singles'}
                    value={d.singles}
                    onChange={onChange}
                    updatedStatValue={getTimeStamp('singles')}
                    externalMatchId={d.external_match_id}
                    externalPlayerId={d.external_player_id}
                  />
                </td>
                <td className='border-r max-w-[10%] text-center'>
                  <TableCel
                    id={d.player_id}
                    statId={d.stat_id}
                    name={'doubles'}
                    value={d.doubles}
                    onChange={onChange}
                    updatedStatValue={getTimeStamp('doubles')}
                    externalMatchId={d.external_match_id}
                    externalPlayerId={d.external_player_id}
                  />
                </td>
                <td className='border-r max-w-[10%] text-center'>
                  <TableCel
                    id={d.player_id}
                    statId={d.stat_id}
                    name={'triples'}
                    value={d.triples}
                    onChange={onChange}
                    updatedStatValue={getTimeStamp('triples')}
                    externalMatchId={d.external_match_id}
                    externalPlayerId={d.external_player_id}
                  />
                </td>
                <td className='border-r max-w-[10%] text-center'>
                  <TableCel
                    id={d.player_id}
                    statId={d.stat_id}
                    name={'home_runs'}
                    value={d.home_runs}
                    onChange={onChange}
                    updatedStatValue={getTimeStamp('home_runs')}
                    externalMatchId={d.external_match_id}
                    externalPlayerId={d.external_player_id}
                  />
                </td>
                <td className='border-r max-w-[10%] text-center'>
                  <TableCel
                    id={d.player_id}
                    statId={d.stat_id}
                    name={'total_bases'}
                    value={d.total_bases}
                    onChange={onChange}
                    updatedStatValue={getTimeStamp('total_bases')}
                    externalMatchId={d.external_match_id}
                    externalPlayerId={d.external_player_id}
                  />
                </td>
                <td className='border-r max-w-[10%] text-center'>
                  <TableCel
                    id={d.player_id}
                    statId={d.stat_id}
                    name={'hits'}
                    value={d.hits}
                    onChange={onChange}
                    updatedStatValue={getTimeStamp('hits')}
                    externalMatchId={d.external_match_id}
                    externalPlayerId={d.external_player_id}
                  />
                </td>
                <td className='border-r max-w-[10%] text-center'>
                  <TableCel
                    id={d.player_id}
                    statId={d.stat_id}
                    name={'hrr'}
                    value={d.hrr}
                    onChange={onChange}
                    updatedStatValue={getTimeStamp('hrr')}
                    externalMatchId={d.external_match_id}
                    externalPlayerId={d.external_player_id}
                  />
                </td>
                <td className='border-r max-w-[10%] text-center'>
                  <TableCel
                    id={d.player_id}
                    statId={d.stat_id}
                    name={'runs'}
                    value={d.runs}
                    onChange={onChange}
                    updatedStatValue={getTimeStamp('runs')}
                    externalMatchId={d.external_match_id}
                    externalPlayerId={d.external_player_id}
                  />
                </td>
                <td className='border-r max-w-[10%] text-center'>
                  <TableCel
                    id={d.player_id}
                    statId={d.stat_id}
                    name={'rbis'}
                    value={d.rbis}
                    onChange={onChange}
                    updatedStatValue={getTimeStamp('rbis')}
                    externalMatchId={d.external_match_id}
                    externalPlayerId={d.external_player_id}
                  />
                </td>
                <td className='border-r max-w-[10%] text-center'>
                  <TableCel
                    id={d.player_id}
                    statId={d.stat_id}
                    name={'stolen_bases'}
                    value={d.stolen_bases}
                    onChange={onChange}
                    updatedStatValue={getTimeStamp('stolen_bases')}
                    externalMatchId={d.external_match_id}
                    externalPlayerId={d.external_player_id}
                  />
                </td>
                <td className='border-r max-w-[10%] text-center'>
                  <TableCel
                    id={d.player_id}
                    statId={d.stat_id}
                    name={'batter_strikeouts'}
                    value={d.batter_strikeouts}
                    onChange={onChange}
                    updatedStatValue={getTimeStamp('batter_strikeouts')}
                    externalMatchId={d.external_match_id}
                    externalPlayerId={d.external_player_id}
                  />
                </td>
                <td className='max-w-16 text-center'>
                  <TableCel
                    id={d.player_id}
                    statId={d.stat_id}
                    name={'batter_walks'}
                    value={d.batter_walks}
                    onChange={onChange}
                    updatedStatValue={getTimeStamp('batter_walks')}
                    externalMatchId={d.external_match_id}
                    externalPlayerId={d.external_player_id}
                  />
                </td>
              </tr>
            );
          })}
      </table>
      {loading && (
        <div className='w-full h-10 font-normal text-sm border border-t-0'>
          <LoadingComponent text='Loading' />
        </div>
      )}

      {!loading && data?.length === 0 && (
        <div className='w-full h-10 font-normal text-sm border border-t-0 flex items-center justify-center'>
          No Data{' '}
        </div>
      )}
    </div>
  );
};

export default BatterPropTable;
