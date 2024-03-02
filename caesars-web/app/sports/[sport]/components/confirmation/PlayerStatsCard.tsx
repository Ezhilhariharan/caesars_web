import React from 'react';
import Image, { StaticImageData } from 'next/image';

// icons
import tick from '../../assets/confirmation/tick-white.svg';

// lib
import AbbriviationForRoster from '@/app/lib/AbbriviationForRoster';

// components
import Avatar from '@/app/components/global/Avatar';
import BatterStatsTable from './BatterStatsTable';
import PitcherStatsCard from './PitcherStatsCard';
import dateConverter from '@/app/lib/dateConverter';

type Props = {
  homeTeam: {
    id: string | number;
    logo: string | StaticImageData;
    name: string;
    shortName: string;
  };
  awayTeam: {
    id: string | number;
    logo: string | StaticImageData;
    name: string;
    shortName: string;
  };
  matchStartAt: string;
  updateDataConfirmation: (statId: string | number, playerType: string) => void;
};

const PlayerStatsCard = (props: Props) => {
  const { homeTeam, awayTeam, matchStartAt, updateDataConfirmation, ...d } =
    props;
  let data: any = { ...d };

  const batterTypes = ['infielder', 'outfielder', 'catcher', 'batter'];

  return (
    <div className='w-full bg-white border border-[#E0E3E8] p-5 rounded-lg'>
      <div className='border border-[#E0E3E8] rounded-t-lg'>
        <div className='flex items-center justify-between px-5 py-2.5'>
          <div className='text-[#54577A] flex items-center gap-10 text-sm font-normal'>
            <div className='w-auto flex items-center gap-2.5'>
              <Avatar name={data?.player_name} width={35} height={35} />
              <p className='text-[#141522] font-semibold'>
                {data?.player_name}
              </p>
              <div className='capitalize'>
                <AbbriviationForRoster value={data?.player_type} />
              </div>
            </div>
            <div className='flex gap-2.5'>
              <p>vs</p>
              <p>
                {homeTeam.id === data?.team_id ? awayTeam.shortName : ''}{' '}
                {awayTeam.id === data?.team_id ? homeTeam.shortName : ''}{' '}
                {/* CIN */}@ STL {dateConverter(matchStartAt).timeString}
              </p>
            </div>
          </div>
          <div className='flex items-center gap-5 text-sm text-[#14171C] font-medium'>
            {data?.is_data_confirmed ? (
              <button
                className={`bg-[#34A770] text-white px-5 py-1.5 flex items-center rounded-full gap-2.5`}
              >
                Data Confirmed
              </button>
            ) : (
              <>
                <button
                  className={`bg-[#D6D6D6] text-[#14171C]] rounded-full px-5 py-1.5`}
                >
                  Unconfirmed
                </button>
                <button
                  className={`bg-[#34A770] text-white px-5 py-1.5 flex items-center rounded-md gap-2.5`}
                  onClick={() => {
                    updateDataConfirmation(data?.stat_id, data?.player_type);
                  }}
                >
                  <Image src={tick} alt='tick mark' />
                  <p>Confirm</p>
                </button>
              </>
            )}
          </div>
        </div>
        {batterTypes.includes(data?.player_type) ? (
          <BatterStatsTable
            singles={data.singles}
            doubles={data.doubles}
            triples={data.triples}
            homeRuns={data.home_runs}
            totalBases={data.total_bases}
            hits={data.hits}
            hrr={data.hrr}
            Runs={data.runs}
            rbis={data.rbis}
            stolenBases={data.stolen_bases}
            batterStrikeouts={data.batter_strikeouts}
            batterWalks={data.batter_walks}
          />
        ) : (
          <PitcherStatsCard
            strikeouts={data.strikeouts}
            winProbability={data.win_probability}
            hitsAllowed={data.hits_allowed}
            earnedRuns={data.earned_runs}
            outs={data.outs}
            walks={data.walks}
            // Hits={data.hits_allowed}
          />
        )}
      </div>
    </div>
  );
};

export default PlayerStatsCard;
