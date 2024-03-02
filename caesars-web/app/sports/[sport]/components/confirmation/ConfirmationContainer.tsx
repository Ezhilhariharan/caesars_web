'use client';
import React, { useEffect, useState } from 'react';
import { StaticImageData } from 'next/image';

// icons
import allPlayer from '../../assets/stats/all_player.svg';
import batter from '../../assets/stats/batter.svg';
import pitcher from '../../assets/stats/pitcher.svg';

// API
import {
  fetchConfirmedData,
  updateStatConfirmation,
} from '@/app/apiIntegrations/apiClients/confirmation';

// components
import SearchBar from '@/app/components/global/SearchBar';
import PlayerStatsCard from './PlayerStatsCard';
import FilterCard from './FilterCard';
import LoadingComponent from '@/app/components/global/LoadingComponent';

type TeamsProps = {
  id: number;
  title: string;
};

type Props = {
  // temp
  match: any;
  matchId: number | string;
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
};

const TypeOfPlayer = [
  {
    id: 1,
    title: 'all',
    icon: allPlayer,
    allowedTypes: ['outfielder', 'infielder', 'catcher', 'pitcher'],
  },
  {
    id: 2,
    title: 'batter',
    icon: batter,
    allowedTypes: ['outfielder', 'infielder', 'catcher'],
  },
  {
    id: 3,
    title: 'pitcher',
    icon: pitcher,
    allowedTypes: ['pitcher'],
  },
];

const ConfirmationContainer = (props: Props) => {
  const { match, matchId, homeTeam, awayTeam } = props;

  const TeamItems = [
    {
      id: 0,
      title: 'All Team',
      icon: allPlayer,
    },
    {
      id: 1,
      title: 'Home Team',
      icon: homeTeam.logo,
    },
    {
      id: 1,
      title: 'Away Team',
      icon: awayTeam.logo,
    },
  ];

  const [confirmationData, setConfirmationData] = useState<any[]>([]);
  const [searchKey, setsearchKey] = useState('');
  const [selectedTeam, setSelectedTeam] = useState(TeamItems[0]);
  const [playerType, setPlayerType] = useState(TypeOfPlayer[0]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchConfirmationData();
  }, [selectedTeam, playerType]);

  const fetchConfirmationData = async () => {
    setLoading(true);
    try {
      const res = await fetchConfirmedData(
        matchId,
        selectedTeam.title,
        playerType.title,
        '',
        homeTeam.id,
        awayTeam.id
      );

      setConfirmationData([...res.batters, ...res.pitchers]);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.warn(e);
    }
  };

  const updateDataConfirmation = async (
    statId: string | number,
    playerType: string
  ) => {
    const batter = ['infielder', 'outfielder', 'catcher'];
    await updateStatConfirmation(
      statId,
      batter.includes(playerType) ? 'batter' : 'pitcher'
    );
    fetchConfirmationData();
  };

  const onTeamChange = (team: any) => setSelectedTeam(team);

  const onTypeChange = (t: any) => setPlayerType(t);

  return (
    <div className='w-full overflow-hidden'>
      <div className='flex items-center gap-5 mb-5'>
        <div className='w-full max-w-[450px]'>
          <SearchBar
            placeholder='Search Player'
            searchKey={searchKey}
            setSearchKey={setsearchKey}
            style={{
              width: '100%',
            }}
          />
        </div>
        <FilterCard
          TeamItems={TeamItems}
          selectedTeam={selectedTeam}
          onTeamChange={onTeamChange}
          TypeOfPlayer={TypeOfPlayer}
          playerType={playerType}
          onTypeChange={onTypeChange}
        />
      </div>
      <div className='h-[calc(100vh-23vh)] overflow-hidden overflow-y-scroll '>
        {!loading &&
          confirmationData?.map((d, i) => {
            const searchResult =
              d.player_name.toLowerCase().includes(searchKey.toLowerCase()) &&
              d.player_name;
            return (
              searchResult && (
                <div key={i} className='py-2.5 first:pt-0'>
                  <PlayerStatsCard
                    matchStartAt={match?.fixture_start_at}
                    homeTeam={homeTeam}
                    awayTeam={awayTeam}
                    updateDataConfirmation={updateDataConfirmation}
                    {...d}
                  />
                </div>
              )
            );
          })}
        {loading && <LoadingComponent text='Loading' />}
        {!loading && confirmationData.length === 0 && (
          <div className='w-full h-full flex items-center justify-center'>
            No Data
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmationContainer;
