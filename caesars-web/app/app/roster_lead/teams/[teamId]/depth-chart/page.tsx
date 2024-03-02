'use client';
import React, { useEffect, useState } from 'react';

// API
import { get, post, put } from '@/app/apiIntegrations/fetcher';

// components
import Title from '@/app/components/global/title/Title';
import LoadingComponent from '@/app/components/global/LoadingComponent';
import PlayerListCard, {
  playerSelectionProps,
} from '@/app/components/teams/PlayerListCard';

type Props = {
  params: {
    teamId: string | number;
  };
};

const DepthChartPage = (props: Props) => {
  const { params } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [teamPlayerList, setTeamPlayerList] = useState<any>([]);
  const [playerList, setPlayerList] = useState<any>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<playerSelectionProps>({
    position: '',
    player_id: [],
  });

  useEffect(() => {
    fetchTeamPlayerList(params.teamId, true);
  }, []);

  useEffect(() => {
    fetchPlayerList(params.teamId);
  }, [teamPlayerList]);

  // fetch the team players list based
  const fetchTeamPlayerList = async (
    teamId: string | number,
    load: boolean
  ) => {
    if (load) setIsLoading(true);
    try {
      const res = await get(`team-player-list/${teamId}`);
      setTeamPlayerList(res.data);
      if (load) setIsLoading(false);
    } catch (e) {
      console.warn(e);
      if (load) setIsLoading(false);
    }
  };

  // make the player as a starter
  const makeAsDefaultPlayer = async (
    id: string | number,
    team_id: string | number,
    position: string
  ) => {
    try {
      const params = {
        position: position,
        team_id: team_id,
      };
      await put(`team-player/${id}`, params);
      fetchTeamPlayerList(team_id, false);
    } catch (e) {
      console.warn(e);
    }
  };

  // fetch all the players in the the team
  const fetchPlayerList = async (teamId: string | number) => {
    const res = await get(`player-list/${teamId}`);
    // if (res.data) setPlayerList(res.data);

    if (res.data) {
      // return only players id
      const getPlayersId = new Set(
        res?.data?.map((p: any) => p.team_player_id)
      );

      // return players details already added to the team players list
      const getExistingPlayerDetails = teamPlayerList?.result_data?.flatMap(
        (data: any) =>
          data?.players?.filter((obj: any) =>
            getPlayersId.has(obj.team_player_id)
          )
      );

      // return players id already added to the team players list
      const getExistingPlayerId = getExistingPlayerDetails?.map(
        (op: any) => op.team_player_id
      );

      const lists = res?.data?.map((p: any) => {
        if (getExistingPlayerId?.includes(p?.team_player_id))
          return { ...p, is_selected: true };
        else return { ...p, is_selected: false };
      });

      setPlayerList(lists);
    }
  };

  // remove the player from particular position
  const removePlayer = async (playerId: string | number) => {
    const res = await put(`team-player-position/${playerId}`);
    fetchTeamPlayerList(params.teamId, false);
    // fetchPlayerList(params.teamId);
  };

  // handle the player selection
  const handleSelectPlayer = (position: string, playerId: number) => {
    const isPlayerExist = selectedPlayer?.player_id?.filter(
      (id) => id === playerId
    );

    if (isPlayerExist?.length === 0) {
      setSelectedPlayer({
        position: position,
        player_id: [...selectedPlayer?.player_id, playerId],
      });
      const update = playerList.map((p: any) => {
        if (p.team_player_id === playerId) return { ...p, is_select: true };
        return p;
      });
      setPlayerList(update);
    } else {
      const removeExisId = selectedPlayer?.player_id?.filter(
        (id) => id !== playerId
      );
      setSelectedPlayer({
        position: position,
        player_id: removeExisId,
      });
      const update = playerList.map((p: any) => {
        if (p.team_player_id === playerId) return { ...p, is_select: false };
        return p;
      });
      setPlayerList(update);
    }
  };

  const clearSelection = () => {
    const removedSelectedPlayers = playerList.map((p: any) => {
      if (selectedPlayer.player_id.includes(p?.team_player_id))
        return { ...p, is_select: false };
      else return p;
    });

    setPlayerList(removedSelectedPlayers);
  };

  // add player to the particular position
  const addPlayers = async () => {
    await post(`team-player/${params.teamId}`, selectedPlayer);
    fetchTeamPlayerList(params.teamId, false);
    // fetchPlayerList(params.teamId);
    setSelectedPlayer({ position: '', player_id: [] });
  };


  return (
    <>
      {isLoading ? (
        <LoadingComponent text='Loading' />
      ) : (
        <div className='bg-white border p-5 rounded-lg'>
          <Title
            title={`${
              teamPlayerList?.team_details
                ? teamPlayerList?.team_details?.team_name
                : ''
            } Depth Chart`}
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: '#1F2937',
            }}
          />
          <p className='text-sm font-normal text-[#718096] -mt-1'>
            Add players to the depth chart
          </p>

          <div className='grid grid-cols-6 gap-x-5 gap-y-10 mt-5'>
            {teamPlayerList?.result_data?.map((team: any) => {
              return (
                <PlayerListCard
                  key={team?.position}
                  team_id={teamPlayerList?.team_details?.team_id}
                  position={team?.position}
                  lists={team?.players}
                  makeAsDefaultPlayer={makeAsDefaultPlayer}
                  team_name={teamPlayerList?.team_details?.team_name}
                  playerList={playerList}
                  setSelectedPlayer={setSelectedPlayer}
                  handleSelectPlayer={handleSelectPlayer}
                  addPlayers={addPlayers}
                  removePlayer={removePlayer}
                  clearSelection={clearSelection}
                  handleCheckbox={() => {}}
                  updatingCheckbox={() => {}}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default DepthChartPage;
