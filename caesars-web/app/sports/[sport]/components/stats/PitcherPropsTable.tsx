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
    statId: string | number,
    externalMatchId: string | number,
    externalPlayerId: string | number
  ) => void;
};

const PitcherPropsTable = (props: Props) => {
  const { data, loading, homeTeam, awayTeam, onChange } = props;

  return (
    <div className='mt-5 text-[#14171C]'>
      <table className='w-full h-auto border rounded-[8px]'>
        <tr className='w-full h-10 text-sm'>
          <th className='border-r px-2.5 font-semibold max-w-[25%]'>
            Pitchers
          </th>
          <th className='border-r px-2.5 max-w-[10%] font-semibold'>
            Strikeouts
          </th>
          <th className='border-r px-2.5 max-w-[10%] font-semibold'>
            Win Probability
          </th>
          <th className='border-r px-2.5 max-w-[10%] font-semibold'>
            Hits Allowed
          </th>
          <th className='border-r px-2.5 max-w-[10%] font-semibold'>
            Earned Runs
          </th>
          <th className='border-r px-2.5 max-w-[10%] font-semibold'>Outs</th>
          {/* <th className='border-r px-2.5 max-w-[10%] font-semibold'>Hits</th> */}
          <th className='border-r px-2.5 max-w-[10%] font-semibold'>Walks</th>
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
                <td className='border-r px-2.5 w-full max-w-[20%] text-center text-base justify-between'>
                  {d.player_name}
                </td>
                <td className='border-r px-2.5 max-w-[10%] text-center'>
                  <TableCel
                    id={d.player_id}
                    statId={d.stat_id}
                    name={'strikeouts'}
                    value={d.strikeouts}
                    onChange={onChange}
                    updatedStatValue={getTimeStamp('strikeouts')}
                    externalMatchId={d.external_match_id}
                    externalPlayerId={d.external_player_id}
                  />
                </td>
                <td className='border-r px-2.5 max-w-[10%] text-center'>
                  <TableCel
                    id={d.player_id}
                    statId={d.stat_id}
                    name={'win_probability'}
                    value={d.win_probability}
                    onChange={onChange}
                    updatedStatValue={getTimeStamp('win_probability')}
                    externalMatchId={d.external_match_id}
                    externalPlayerId={d.external_player_id}
                  />
                </td>
                <td className='border-r px-2.5 max-w-[10%] text-center'>
                  <TableCel
                    id={d.player_id}
                    statId={d.stat_id}
                    name={'hits_allowed'}
                    value={d.hits_allowed}
                    onChange={onChange}
                    updatedStatValue={getTimeStamp('hits_allowed')}
                    externalMatchId={d.external_match_id}
                    externalPlayerId={d.external_player_id}
                  />
                </td>
                <td className='border-r px-2.5 max-w-[10%] text-center'>
                  <TableCel
                    id={d.player_id}
                    statId={d.stat_id}
                    name={'earned_runs'}
                    value={d.earned_runs}
                    onChange={onChange}
                    updatedStatValue={getTimeStamp('earned_runs')}
                    externalMatchId={d.external_match_id}
                    externalPlayerId={d.external_player_id}
                  />
                </td>
                <td className='border-r px-2.5 max-w-[10%] text-center'>
                  <TableCel
                    id={d.player_id}
                    statId={d.stat_id}
                    name={'outs'}
                    value={d.outs}
                    onChange={onChange}
                    updatedStatValue={getTimeStamp('outs')}
                    externalMatchId={d.external_match_id}
                    externalPlayerId={d.external_player_id}
                  />
                </td>
                {/* <td className='border-r px-2.5 max-w-[10%] text-center'>
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
              </td> */}
                <td className='border-r px-2.5 max-w-[10%] text-center'>
                  <TableCel
                    id={d.player_id}
                    statId={d.stat_id}
                    name={'walks'}
                    value={d.walks}
                    onChange={onChange}
                    updatedStatValue={getTimeStamp('walks')}
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
          No Data
        </div>
      )}
    </div>
  );
};

export default PitcherPropsTable;
