import React, { useEffect, useState } from 'react';

import PlayerDetailsContainer from './PlayerDetailsContainer';
import { get, patch } from '@/app/apiIntegrations/fetcher';
import PlayerDetails from '../matchSummary/PlayerDetails';
import { getUserFromLocalstorage } from '@/app/lib/localstorageHelpers';

type Props = {
  match: any;
  user: any;
  admin: any;
};

const LineupPageContainer = ({ match, user, admin }: Props) => {
  const [team1, setTeam1] = useState([]);
  const [team2, setTeam2] = useState([]);
  const [playerProfile, setPlayerProfile] = useState<any>({});
  const [selectedPlayer, setSelectedPlayer] = useState<any>({});
  const [allow, setAllow] = useState<boolean>(false);

  useEffect(() => {
    if (match) {
      loadTeam1();
      loadTeam2();
    }
  }, [match]);

  useEffect(() => {
    if (admin) setAllow(true);
    else if (user?.user_role_id === '1' && match?.match_assignments_status < 3)
      setAllow(true);
    else if (user?.user_role_id === '2' && match?.match_assignments_status < 2)
      setAllow(true);
    else if (user?.user_role_id === '3' && match?.match_assignments_status > 2)
      setAllow(true);
    else if (user?.user_role_id === '4' && match?.match_assignments_status < 6)
      setAllow(true);
  }, [user]);

  async function loadTeam1() {
    try {
      const res = await get(
        `/rosters?match_id=${match?.id}&team_id=${match?.team1_id}`
      );
      setTeam1(res?.data);
    } catch (e) {
      console.warn(e);
    }
  }
  async function loadTeam2() {
    try {
      const res = await get(
        `/rosters?match_id=${match?.id}&team_id=${match?.team2_id}`
      );
      setTeam2(res?.data);
    } catch (e) {
      console.warn(e);
    }
  }


  return (
    <div className='flex'>
      <div className='w-1/2 flex flex-col'>
        <PlayerDetailsContainer
          matchId={match?.id}
          fixtureName={match?.fixture_name}
          rosters={team1}
          teamTitle={match?.team1_name}
          logo={match?.team1_logo_image}
          status={match?.match_assignments_status}
          user={user}
          allow={allow}
          selectedPlayer={selectedPlayer}
          onPlayerClick={async (player: any) => {
            setSelectedPlayer(player);
            try {
              const profile = await get(
                `player-profiles/${player?.team_player_id}`
              );
              if (profile) setPlayerProfile(profile?.data);
            } catch (e) {
              console.warn(e);
            }
          }}
          onOrderChange={(list: any) => {}}
        />
      </div>
      <div className='w-1/2'>
        {!selectedPlayer?.team_players && (
          <div style={{ textAlign: 'center', color: '#999' }}>
            Select a Player
          </div>
        )}
        {selectedPlayer?.team_players && (
          <PlayerDetails
            playerProfile={playerProfile}
            draft={{
              overAllPick: '--',
              round: 1,
              teamName: 'pittsburgh pirates',
              year: 2015,
            }}
            fullName={
              selectedPlayer?.team_players?.players?.first_name +
              ' ' +
              selectedPlayer?.team_players?.players?.last_name
            }
            teamName={selectedPlayer?.teams?.full_name}
            teamLogo={selectedPlayer?.teams?.logo_image}
            name={
              selectedPlayer?.team_players?.players?.first_name +
              ' ' +
              selectedPlayer?.team_players?.players?.last_name
            }
            position={selectedPlayer?.team_players?.players?.primary_position}
          />
        )}
      </div>
      <div className='w-1/2 flex flex-col gap-5'>
        <PlayerDetailsContainer
          matchId={match?.id}
          fixtureName={match?.fixture_name}
          rosters={team2}
          selectedPlayer={selectedPlayer}
          logo={match?.team2_logo_image}
          status={match?.match_assignments_status}
          user={user}
          allow={allow}
          teamTitle={match?.team2_name}
          onPlayerClick={async (player: any) => {
            setSelectedPlayer(player);
            try {
              const profile = await get(
                `player-profiles/${player?.team_player_id}`
              );

              if (profile) setPlayerProfile(profile?.data);
            } catch (e) {
              console.warn(e);
            }
          }}
          onOrderChange={(order: any) => {
          }}
        />
      </div>
    </div>
  );
};

export default LineupPageContainer;
