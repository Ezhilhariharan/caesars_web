'use client';
import React, { useEffect, useState } from 'react';
import FeedsContainer from './FeedsContainer';
import PlayerList from './PlayerList';
import PlayerPropMarket from './PlayerPropMarket';
import { get } from '@/app/apiIntegrations/fetcher';
import FeedCardContainer from '../ppm/components/FeedCardContainer';

type Props = {
  match: any;
  user: any;
};

const PlayerPropMarketPageContainer = ({ match, user }: Props) => {
  const [team1, setTeam1] = useState([]);
  const [team2, setTeam2] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);
  const [propId, setpropId] = useState<any>(null);
  const [getOdds, setgetOdds] = useState<any[]>([]);

  useEffect(() => {
    if (match) {
      loadTeam1();
      loadTeam2();
    }
  }, [match]);

  async function loadTeam1() {
    try {
      const res = await get(
        `/rosters?match_id=${match?.id}&team_id=${match?.team1_id}`
      );
      setTeam1(res.data);
    } catch (e) {
      console.warn(e);
    }
  }

  async function loadTeam2() {
    try {
      const res = await get(
        `/rosters?match_id=${match?.id}&team_id=${match?.team2_id}`
      );
      setTeam2(res.data);
    } catch (e) {
      console.warn(e);
    }
  }

  return (
    <div className='flex items-start gap-5'>
      <div className='w-1/4 h-[100%] border'>
        {/* <FeedsContainer
          match={match}
          user={user}
          id={match?.id}
          homeTeamLogo={match?.team1_logo_image}
          awayTeamLogo={match?.team2_logo_image}
        /> */}
        <FeedCardContainer
          user={user}
          match={match}
          id={match?.id}
          homeTeamLogo={match?.team1_logo_image}
          awayTeamLogo={match?.team2_logo_image}
        />
      </div>
      <div className='w-1/4 h-[100%] max-h-[70vh]'>
        <PlayerList
          match={match}
          selectedPlayer={selectedPlayer}
          setSelectedPlayer={setSelectedPlayer}
          playerPropId={propId}
          setPlayerPropId={setpropId}
          setgetOdds={setgetOdds}
        />
      </div>
      <div className='w-1/2 h-[100%]'>
        {selectedPlayer ? (
          <PlayerPropMarket
            selectedPlayer={selectedPlayer}
            // setSelectedPlayer={setSelectedPlayer}
            playerPropId={propId}
            setPlayerPropId={setpropId}
          />
        ) : (
          <div className='flex justify-center items-center'>
            Select a Player
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerPropMarketPageContainer;
