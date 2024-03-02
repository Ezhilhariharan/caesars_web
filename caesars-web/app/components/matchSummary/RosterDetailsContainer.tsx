import React, { useEffect } from 'react';
import { useState } from 'react';
import CardContainer from '../global/cardContainer/CardContainer';
import Image from 'next/image';
import RosterDetailsCard from '../global/roster/RosterDetailsCard';
import addIcon from '../../assets/icons/add.svg';
import { Button, Modal } from 'antd';
import { Checkbox } from 'antd';
import { get, patch } from '@/app/apiIntegrations/fetcher';
import Avatar from '../global/Avatar';
import { toastProps } from '../global/toast/Toast';
import { getMinimumPlayer } from '@/app/sports/[sport]/utils/getMinimumPlayer';

type Props = {
  match: any;
  toastPopup: boolean;
  setToastPopup: React.Dispatch<React.SetStateAction<boolean>>;
  toastDetails: {};
  setToastDetails: React.Dispatch<React.SetStateAction<toastProps>>;
  allowToContinue: boolean;
  setAllowToContinue: React.Dispatch<React.SetStateAction<boolean>>;
  isAdmin: boolean;
  user: any;
  allow: boolean;
};

const RosterDetailsContainer = (props: Props) => {
  const {
    match,
    toastPopup,
    setToastPopup,
    toastDetails,
    setToastDetails,
    isAdmin,
    user,
    allow,
    allowToContinue,
    setAllowToContinue,
  } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [teamToAdd, setTeamToAdd] = useState<any>([]);
  const [selectedTeamId, setSelectedTeamId] = useState<any>(null);
  const [team1Roster, setTeam1Roster] = useState<any>([]);
  const [loadingTeam1, setLoadingTeam1] = useState(false);
  const [loadingTeam2, setLoadingTeam2] = useState(false);
  const [team2Roster, setTeam2Roster] = useState([]);
  // const [allow, setAllow] = useState<boolean>(false);

  let selectedPlayers: any = {};
  let minimum: any = false;

  useEffect(() => {
    if (match && match?.id && match?.team1_id && match?.team2_id) {
      loadRoster(match.team1_id, match.id, 1);
      loadRoster(match.team2_id, match.id, 2);
    }
  }, [match]);

  useEffect(() => {
    if (
      team1Roster.length >= getMinimumPlayer('mlb') &&
      team2Roster.length >= getMinimumPlayer('mlb')
    ) {
      setAllowToContinue(true);
    } else {
      setAllowToContinue(false);
    }
  }, [team1Roster, team2Roster]);

  // useEffect(() => {
  //   if (isAdmin) setAllow(true);
  //   else if (user?.user_role_id === '1' && match?.match_assignments_status < 3)
  //     setAllow(true);
  //   else if (user?.user_role_id === '2' && match?.match_assignments_status < 2)
  //     setAllow(true);
  //   else if (user?.user_role_id === '3' && match?.match_assignments_status > 2)
  //     setAllow(true);
  //   else if (user?.user_role_id === '4' && match?.match_assignments_status < 6)
  //     setAllow(true);
  // }, [user, isAdmin]);

  const showModal = () => setIsModalOpen(true);

  const showModal1 = () => setIsModalOpen1(true);

  const handleOk = async () => {
    // setIsModalOpen(false);
    try {
      const res = await patch('bulk-update-roster', {
        players: selectedPlayers,
        matchId: match?.id,
        teamId: selectedTeamId,
      } as any);
      loadRoster(match?.team1_id, match?.id, 1);
      loadRoster(match?.team2_id, match?.id, 2);
      setIsModalOpen(false);
      setToastPopup(true);
      setToastDetails({
        type: 'success',
        title: 'Success',
        discription: 'Players has been added to the roster.',
        logo: '',
      });
    } catch (e) {
      console.warn(e);
    }
  };

  const handleOk1 = async () => {
    // setIsModalOpen(false);
    try {
      await patch('bulk-update-roster', {
        players: selectedPlayers,
        matchId: match?.id,
        teamId: selectedTeamId,
      } as any);
      loadRoster(match?.team1_id, match?.id, 1);
      loadRoster(match?.team2_id, match?.id, 2);
      setIsModalOpen1(false);
      setToastPopup(true);
      setToastDetails({
        type: 'success',
        title: 'Success',
        discription: 'Players has been added to the Roster.',
        logo: '',
      });
    } catch (e) {
      console.warn(e);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setTeamToAdd([]);
  };

  const handleCancel1 = () => {
    setIsModalOpen1(false);
    setTeamToAdd([]);
  };

  async function handleDelete(id: any) {
    if (id) {
      loadRoster(match?.team1_id, match?.id, 1);
      loadRoster(match?.team2_id, match?.id, 2);

      setToastPopup(true);
      setToastDetails({
        type: 'alert',
        title: 'Alert',
        discription: 'Player has been Removed from Roster.',
        logo: '',
      });
    }
  }

  async function loadTeam(id: any, team: any) {
    // setAllow(true);
    setSelectedTeamId(id);
    try {
      const res = await get(`/team-players?team_id=${id}`);
      mergeData(team, res.data);
      setToastDetails({
        type: 'success',
        title: 'Success',
        discription: '',
        logo: '',
      });
    } catch (e) {
      console.warn(e);
    }
  }

  async function loadTeam1(id: any, team: any) {
    // setTeamToAdd
    setSelectedTeamId(id);
    try {
      const res = await get(`/team-players?team_id=${id}`);
      // setTeamToAdd(res.data);
      mergeData(team, res.data);
      setToastDetails({
        type: 'success',
        title: 'Success',
        discription: '',
        logo: '',
      });
    } catch (e) {
      console.warn(e);
    }
  }

  async function loadRoster(teamId: any, matchId: any, team: any) {
    if (team === 1) setLoadingTeam1(true);
    if (team === 2) setLoadingTeam2(true);
    try {
      const res = await get(`/rosters?match_id=${matchId}&team_id=${teamId}`);

      if (team === 1) {
        setTeam1Roster(res.data);
        setLoadingTeam1(false);
      }
      if (team === 2) {
        setTeam2Roster(res.data);
        setLoadingTeam2(false);
      }
    } catch (e) {
      if (team === 1) setLoadingTeam1(false);
      if (team === 2) setLoadingTeam2(false);
      console.warn(e);
    }
  }

  async function mergeData(teamId: any, datas: any) {
    const data = await datas.map((team: any) => {
      if (teamId === 1) {
        const filter = team1Roster.find(
          (roster: any) => team.player_id === roster.team_player_id
        );
        if (filter) {
          return { ...team, is_selected: true };
        } else {
          return { ...team, is_selected: false };
        }
      }

      if (teamId === 2) {
        const filter = team2Roster.find(
          (roster: any) => team.player_id === roster.team_player_id
        );
        if (filter) {
          return { ...team, is_selected: true };
        } else {
          return { ...team, is_selected: false };
        }
      }
    });
    setTeamToAdd(data);
    if (teamId === 1) showModal();
    if (teamId === 2) showModal1();
  }

  const checkboxOnchange = (e: any, data: any) => {
    selectedPlayers[data] = {
      selected: e,
    };
  };

  const addPlayer = (team: any) => {
    if (isAdmin) loadTeam(match?.team1_id, team);
    else {
      if (user?.user_role_id === '1' && match?.match_assignments_status < 3) {
        if (team === 1) loadTeam(match?.team1_id, team);
        if (team === 2) loadTeam(match?.team2_id, team);
      } else if (
        user?.user_role_id === '2' &&
        match?.match_assignments_status < 2
      ) {
        if (team === 1) loadTeam(match?.team1_id, team);
        if (team === 2) loadTeam(match?.team2_id, team);
      } else if (
        user?.user_role_id === '3' &&
        match?.match_assignments_status > 2
      ) {
        if (team === 1) loadTeam(match?.team1_id, team);
        if (team === 2) loadTeam(match?.team2_id, team);
      } else if (
        user?.user_role_id === '4' &&
        match?.match_assignments_status < 6
      ) {
        if (team === 1) loadTeam(match?.team1_id, team);
        if (team === 2) loadTeam(match?.team2_id, team);
      }
    }
  };

  return (
    <div>
      <CardContainer
        header='Roster Details'
        headerStyle={{
          width: '250px',
        }}
        leftSideComponent={
          <div className='font-bold'>
            <Avatar
              image={match?.team1_logo_image}
              name={match?.team1_name}
              width={50}
              height={50}
            />
          </div>
        }
        rightSideComponent={
          <div className='font-bold'>
            <Avatar
              image={match?.team2_logo_image}
              name={match?.team2_name}
              width={50}
              height={50}
            />
          </div>
        }
        style={{
          width: '100%',
          height: '100%',
          padding: '15px 20px 0',
          border: '1px solid #E0E3E8',
        }}
      >
        <div className='flex mt-5 h-full overflow-scroll'>
          <div className='w-1/2 overflow-hidden'>
            <div className='h-11 bg-[#F0F1F3] flex items-center justify-between p-3'>
              <div className='flex items-center'>
                <div>
                  <Avatar
                    image={match?.team1_logo_image}
                    name={match?.team1_name}
                    width={25}
                    height={25}
                  />
                </div>
                <p className='text-[13px] pl-2'> {match?.team1_name}</p>
              </div>
              <div className='flex items-center gap-2'>
                <p className='w-[100px] border-l pl-2 text-[13px] max-[1600px]:w-[70px]'>
                  Position
                </p>
                <div
                  className={`${
                    allow ? 'cursor-pointer' : 'cursor-not-allowed'
                  }`}
                  onClick={(e) => addPlayer(1)}
                >
                  <Image src={addIcon} alt='' width={15} />
                </div>
              </div>
            </div>
            <div className='h-[600px] max-[1600px]:h-[550px] border overflow-y-scroll'>
              {team1Roster.map((p: any, i: any) => {
                return (
                  <div key={'b' + i}>
                    <RosterDetailsCard
                      onDelete={handleDelete}
                      allow={allow}
                      rosterId={p}
                      name={
                        p.team_players.players.first_name +
                        ' ' +
                        p.team_players.players.last_name
                      }
                      position={p.team_players.players.primary_position}
                    />
                  </div>
                );
              })}
            </div>
            <div
              onClick={(e) => addPlayer(1)}
              className={`w-full h-12 items-center px-2 flex justify-center text-sm font-normal text-[#929292] ${
                !loadingTeam2 && allow ? 'cursor-pointer' : 'cursor-not-allowed'
              }`}
            >
              <Image src={addIcon} alt='' />
              <p className='pl-2'>Add Player</p>
            </div>
          </div>
          <div className='w-1/2 overflow-hidden'>
            <div className='h-11 bg-[#F0F1F3] flex items-center justify-between p-3'>
              <div className='flex items-center'>
                <div>
                  <Avatar
                    image={match?.team2_logo_image}
                    name={match?.team2_name}
                    width={25}
                    height={25}
                  />
                </div>
                <p className='text-[13px] pl-2'> {match?.team2_name}</p>
              </div>
              <div className='flex items-center gap-2'>
                <p className='w-[100px] border-l pl-2 text-[13px] max-[1600px]:w-[70px]'>
                  Position
                </p>
                <div
                  className={`${
                    allow ? 'cursor-pointer' : 'cursor-not-allowed'
                  }`}
                  onClick={(e) => addPlayer(2)}
                >
                  <Image src={addIcon} alt='' width={15} />
                </div>
              </div>
            </div>
            <div className='h-[600px] max-[1600px]:h-[550px] border overflow-y-scroll'>
              {team2Roster.map((p: any, i) => {
                return (
                  <div key={'team2' + i}>
                    <RosterDetailsCard
                      allow={allow}
                      onDelete={handleDelete}
                      rosterId={p}
                      name={
                        p.team_players.players.first_name +
                        ' ' +
                        p.team_players.players.last_name
                      }
                      position={p.team_players.players.primary_position}
                    />
                  </div>
                );
              })}
            </div>
            <div
              onClick={(e) => addPlayer(2)}
              className={`w-full h-12 items-center px-2 flex justify-center text-sm font-normal text-[#929292] ${
                !loadingTeam2 && allow ? 'cursor-pointer' : 'cursor-not-allowed'
              }`}
            >
              <Image src={addIcon} alt='' />
              <p className='pl-2'>Add Player</p>
            </div>
          </div>
          <>
            <Modal
              title='Add Players'
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={[
                <Button key='cancel' onClick={handleCancel}>
                  Cancel
                </Button>,
                <Button key='back' onClick={handleOk}>
                  Ok
                </Button>,
              ]}
            >
              <div style={{ maxHeight: 500, overflow: 'scroll' }}>
                {teamToAdd.map((data: any, i: any) => {
                  return (
                    <div className='flex' key={'data.name' + '' + i}>
                      <div
                        className='flex items-center  justify-cente'
                        style={{ marginRight: 10 }}
                      >
                        <Checkbox
                          defaultChecked={data.is_selected}
                          // checked={data.is_selected}
                          onChange={(e) =>
                            checkboxOnchange(e.target.checked, data.id)
                          }
                        ></Checkbox>
                      </div>
                      <RosterDetailsCard
                        hideDelete={true}
                        onDelete={handleDelete}
                        name={
                          data?.players.first_name +
                          ' ' +
                          data?.players.last_name
                        }
                        image={''}
                        position={data?.primary_position}
                      />
                    </div>
                  );
                })}
              </div>
            </Modal>
            <Modal
              title='Add Players'
              open={isModalOpen1}
              onOk={handleOk1}
              onCancel={handleCancel1}
              footer={[
                <Button key='cancel' onClick={handleCancel1}>
                  Cancel
                </Button>,
                <Button key='back' onClick={handleOk1}>
                  Ok
                </Button>,
              ]}
            >
              <div style={{ maxHeight: 500, overflow: 'scroll' }}>
                {teamToAdd.map((data: any, i: any) => {
                  return (
                    <div className='flex' key={'data.name' + '' + i}>
                      <div
                        className='flex items-center  justify-cente'
                        style={{ marginRight: 10 }}
                      >
                        <Checkbox
                          defaultChecked={data.is_selected}
                          // checked={data.is_selected}
                          onChange={(e) =>
                            checkboxOnchange(e.target.checked, data.id)
                          }
                        ></Checkbox>
                      </div>{' '}
                      <RosterDetailsCard
                        hideDelete={true}
                        onDelete={handleDelete}
                        name={
                          data?.players.first_name +
                          ' ' +
                          data?.players.last_name
                        }
                        image={''}
                        position={data?.primary_position}
                      />
                    </div>
                  );
                })}
              </div>
            </Modal>
          </>
        </div>
      </CardContainer>
    </div>
  );
};

export default RosterDetailsContainer;
