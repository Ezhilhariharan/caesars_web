'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import './AssignMatch.css';

// icons
import editIcon from '../../../../assets/icons/edit.svg';
import plusCircle from '../../../roster_lead/assets/plus-circle.svg';
import MLB from '../../../../assets/icons/sports-icon/mlb.svg';
import Megnafying from '@/app/assets1/custom-icons/Megnafying';
import UserPlus from '@/app/assets1/custom-icons/UserPlus';

// API fetchers
import { get, post } from '@/app/apiIntegrations/fetcher';
import { getTradingTeamMatchesWithCount } from '@/app/apiIntegrations/apiClients/tradingTeamMatches';

// libs
import dateConverter from '@/app/lib/dateConverter';

// components
import { toastProps } from '@/app/components/global/toast/Toast';
import Avatar from '@/app/components/global/Avatar';
import RosterManagerCard from '@/app/app/roster_lead/components/RosterManagerCard';

// antd
import { Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

type Props = {
  match?: any;
  // user?: any;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  toastPopup?: boolean;
  setToastPopup?: React.Dispatch<React.SetStateAction<boolean>>;
  toastDetails?: toastProps;
  setToastDetails?: React.Dispatch<React.SetStateAction<toastProps>>;
  loadMatch?: (sport?: any, skip?: any) => void;
  loadActivites?: (status?: any) => void;
};

// global variables
const today = new Date();
const todayFormat = dateConverter(today);
let count: any = null;
let page = 0;

const sportsName: any = { Baseball: 'Major League Baseball' };

const AssignMatch = (props: Props) => {
  const {
    open,
    setOpen,
    match,
    // user,
    toastPopup,
    setToastPopup,
    toastDetails,
    setToastDetails,
    loadActivites,
    loadMatch,
  } = props;
  const [sports, setSports] = useState([]);
  const [matches, setMatches] = useState([]);
  const [selectedSport, setSelectedSport] = useState<any>(null);
  const [selectedMatch, setSelectedMatch] = useState<any>(null);
  const [selectedPregameTrader, setSelectedPregameTrader] = useState<any>(null);
  const [selectedIngameTrader, setSelectedIngameTrader] = useState<any>(null);
  const [preGameTraders, setpreGameTraders] = useState([]);
  const [inGameTraders, setInGameTraders] = useState([]);
  const [matchSkip, setmatchSkip] = useState(0);

  useEffect(() => {
    loadSports();
    loadMatches();
    loadMembers('', null);
  }, []);

  async function loadSports() {
    try {
      const res = await get('/sports');

      setSports(res?.data);
    } catch (e) {
      console.warn(e);
    }
  }

  async function loadMatches(limit = 10, skip = 0) {
    try {
      const res = await getTradingTeamMatchesWithCount({
        limit,
        skip,
        query: {
          status: 0,
          match_asignment_status: 3,
          // start_date: `${todayFormat.year}-${todayFormat.month}-${todayFormat.date}`,
        },
      });

      setMatches(res.data);
      count = res?.count / 10;
    } catch (e) {
      console.warn(e);
    }
  }

  async function loadMembers(
    search: string | null,
    role: 'pre_game_trader' | 'in_game_trader' | null
  ) {
    try {
      let qry = '';
      if (search) {
        qry = '&search=' + search;
      }
      const res = await get(`/members?limit=100&skip=0${qry}`);
      if (!role || role === 'pre_game_trader') {
        const preGameTraders = res?.data.filter(
          (m: any) => m?.role === 'pre_game_trader'
        );
        setpreGameTraders(preGameTraders);
      }
      if (!role || role === 'in_game_trader') {
        const inGameTraders = res?.data.filter(
          (m: any) => m?.role === 'in_game_trader'
        );
        setInGameTraders(inGameTraders);
      }
    } catch (e) {
      console.warn(e);
    }
  }

  return (
    <div className='py-8 px-5 bg-white rounded-[10px]'>
      <div className='pl-2 flex mb-5'>
        <div>
          <Image src={editIcon} alt='logo' />
        </div>
        <div className='text-base text-[#14171C] p-2.5'>Assign a Match</div>
      </div>

      <Dropdown
        menu={{
          items: sports.map((s: any, i: number) => {
            return {
              label: (
                <div
                  className='flex'
                  onClick={(e) => {
                    setSelectedSport(i);
                  }}
                >
                  <div>
                    <Image src={MLB} alt='mlb' />
                  </div>
                  <div className='flex items-center ml-2.5'>
                    {sportsName[s?.name] || s?.name}
                  </div>
                </div>
              ),
              key: i,
            };
          }),
        }}
        trigger={['click']}
      >
        <div className='text-sm font-normal border-b border-[#ccc] px-2 h-[45px] w-full flex text-[#B6B6B6] cursor-pointer'>
          {!match && selectedSport === null && (
            <div className='flex-1 text-[#B6B6B6] pt-2.5'>
              Select the league
            </div>
          )}

          {!match && selectedSport !== null && (
            <div className='flex flex-1 text-[#666]'>
              <div>
                <Image src={MLB} alt='mlb' />
              </div>
              <div className='flex items-center ml-2.5'>
                {sportsName[(sports[selectedSport] as any).name]}
              </div>
            </div>
          )}
          {match && (
            <div className='flex flex-1 text-[#666]'>
              <div>
                <Image src={MLB} alt='mlb' />
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: 10,
                }}
              >
                {sportsName[match?.sport_name]}
              </div>
            </div>
          )}
          <DownOutlined />
        </div>
      </Dropdown>
      <Dropdown
        menu={{
          items: matches?.map((m: any, i: number) => ({
            label: (
              <div
                className='flex items-center justify-between'
                onClick={(e) => {
                  setSelectedMatch(i);
                }}
              >
                <p>{m?.fixture_name}</p>

                <p className='text-sm font-normal text-[#B6B6B6]'>
                  {dateConverter(m?.fixture_start_at).date}{' '}
                  {dateConverter(m?.fixture_start_at).monthInString}
                </p>
              </div>
            ),
            key: i,
          })),
        }}
        dropdownRender={(menu) => (
          <div
            className='bg-white p-1'
            style={{
              boxShadow:
                '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
            }}
          >
            {matches?.length > 0 ? (
              menu
            ) : (
              <div className='py-5 text-center'>No matches found</div>
            )}
            <div className='pagintion-action'>
              <div
                className='pagnation-btn'
                onClick={(e) => {
                  if (matchSkip >= 10) {
                    loadMatches(10, matchSkip - 10);
                    setmatchSkip(matchSkip - 10);
                    page--;
                  }
                }}
              >
                {'<<'}
              </div>
              <div style={{ flex: 1 }}></div>
              <div
                className='pagnation-btn'
                onClick={(e) => {
                  page++;
                  if (page <= count) {
                    loadMatches(10, matchSkip + 10);
                    setmatchSkip(matchSkip + 10);
                  } else {
                    page--;
                  }
                }}
              >
                {'>>'}
              </div>
            </div>
          </div>
        )}
        trigger={['click']}
      >
        <div
          className='text-sm font-normal border-b border-[#ccc] p-2 mb-2  w-full flex text-[#B6B6B6] cursor-pointer'
          style={{ paddingBottom: 15, marginTop: 15 }}
        >
          {!match && selectedMatch === null && (
            <div style={{ flex: 1 }}>Select the Match </div>
          )}

          {!match && selectedMatch !== null && (
            <div style={{ flex: 1, color: '#666' }}>
              {(matches[selectedMatch] as any)?.fixture_name}
            </div>
          )}
          {match && (
            <div style={{ flex: 1, color: '#666' }}>{match.fixture_name}</div>
          )}
          <DownOutlined />
        </div>
      </Dropdown>
      <Dropdown
        trigger={['click']}
        dropdownRender={(menu) => (
          <div className='bg-white border border-[#ccc] rounded-lg overflow-hidden'>
            <div className='p-[5px] flex items-center border border-[#ccc] m-1 bg-[#fff] rounded-[5px] gap-1.5'>
              <Megnafying color='#12121250' size={16} />
              <input
                placeholder='Search Name'
                className='p-[5px] flex-1 text-base font-light'
                onChange={(e) => {
                  loadMembers(e.target.value, 'pre_game_trader');
                }}
              />
            </div>
            <div className='w-full h-full max-h-[400px] overflow-y-scroll'>
              {menu}
            </div>
          </div>
        )}
        menu={{
          items: preGameTraders.map((member: any, i: number) => ({
            key: member.id,
            label: (
              <div
                key={'member-' + i}
                onClick={(e) => {
                  setSelectedPregameTrader(member);
                }}
              >
                <RosterManagerCard
                  image={''}
                  name={`${member.first_name} ${member.last_name}`}
                  primary={true}
                  taskInProgress={member.in_progress_count}
                  width={35}
                  height={35}
                />
              </div>
            ),
          })),
        }}
      >
        <div
          className='text-sm font-normal border-b border-[#ccc] p-2 mb-2 w-full flex text-[#B6B6B6] cursor-pointer '
          style={{ paddingBottom: 15, marginTop: 15 }}
        >
          {selectedPregameTrader === null && (
            <div
              className='flex items-center justify-between'
              style={{ flex: 1 }}
            >
              <div className='flex gap-2 items-center'>
                <UserPlus color='#C4CAD3' size={20} />
                <p>Assign Pre-game Match</p>
              </div>
              <Image src={plusCircle} alt='plus' />
            </div>
          )}
          {selectedPregameTrader !== null && (
            <div style={{ flex: 1, color: '#666', display: 'flex' }}>
              <Avatar
                image={''}
                name={`${(selectedPregameTrader as any)?.first_name}  ${
                  (selectedPregameTrader as any)?.last_name
                }`}
                width={30}
                height={30}
              />
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: 10,
                }}
                className='capitalize'
              >
                {(selectedPregameTrader as any)?.first_name}{' '}
                {(selectedPregameTrader as any)?.last_name}
              </div>
            </div>
          )}
          {/* {user && (
            <div style={{ flex: 1, color: '#666', display: 'flex' }}>
              <Avatar
                image={''}
                name={`${user?.first_name}  ${user?.last_name}`}
                width={30}
                height={30}
              />
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: 10,
                }}
                className='capitalize'
              >
                {user?.first_name} {user?.last_name}
              </div>
            </div>
          )} */}
        </div>
      </Dropdown>

      <Dropdown
        trigger={['click']}
        dropdownRender={(menu) => (
          <div className='bg-white border border-[#ccc] rounded-lg overflow-hidden'>
            <div className='p-[5px] flex items-center border border-[#ccc] m-1 bg-[#fff] rounded-[5px] gap-1.5'>
              <Megnafying color='#12121250' size={16} />
              <input
                placeholder='Search Name'
                className='p-[5px] flex-1 text-base font-light'
                onChange={(e) => {
                  loadMembers(e.target.value, 'pre_game_trader');
                }}
              />
            </div>
            <div className='w-full h-full max-h-[400px] overflow-y-scroll'>
              {menu}
            </div>
          </div>
        )}
        menu={{
          items: inGameTraders.map((member: any, i: number) => ({
            key: member.id,
            label: (
              <div
                key={'member-' + i}
                onClick={(e) => {
                  setSelectedIngameTrader(member);
                }}
              >
                <RosterManagerCard
                  image={''}
                  name={`${member.first_name} ${member.last_name}`}
                  primary={true}
                  taskInProgress={member.in_progress_count}
                  width={35}
                  height={35}
                />
              </div>
            ),
          })),
        }}
      >
        <div
          className='text-sm font-normal border-b border-[#ccc] p-2 mb-2 w-full flex text-[#B6B6B6] cursor-pointer '
          style={{ paddingBottom: 15, marginTop: 15 }}
        >
          {selectedIngameTrader === null && (
            <div
              className='flex items-center justify-between'
              style={{ flex: 1 }}
            >
              <div className='flex gap-2 items-center'>
                <UserPlus color='#C4CAD3' size={20} />
                <p>Assign In-game Match</p>
              </div>
              <Image src={plusCircle} alt='plus' />
            </div>
          )}
          {selectedIngameTrader !== null && (
            <div style={{ flex: 1, color: '#666', display: 'flex' }}>
              <Avatar
                image={''}
                name={`${(selectedIngameTrader as any)?.first_name}  ${
                  (selectedIngameTrader as any)?.last_name
                }`}
                width={30}
                height={30}
              />
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: 10,
                }}
                className='capitalize'
              >
                {(selectedIngameTrader as any)?.first_name}{' '}
                {(selectedIngameTrader as any)?.last_name}
              </div>
            </div>
          )}
        </div>
      </Dropdown>

      <div className='mt-3' style={{ display: 'flex', padding: 0 }}>
        <div
          style={{
            background: '#4285F4',
            padding: 10,
            color: '#fff',
            flex: 1,
            borderRadius: 5,
            textAlign: 'center',
            cursor: 'pointer',
            marginTop: 25,
          }}
          onClick={async (e) => {
            if (!match && selectedSport === null) {
              if (setToastPopup) setToastPopup(true);
              if (setToastDetails)
                setToastDetails({
                  type: 'alert',
                  title: 'Alert',
                  discription: 'Select the league',
                });
              return;
            }

            if (!match && selectedSport !== null && selectedMatch === null) {
              if (setToastPopup) setToastPopup(true);
              if (setToastDetails)
                setToastDetails({
                  type: 'alert',
                  title: 'Alert',
                  discription: 'Select the Match',
                });
              return null;
            }

            if (selectedPregameTrader === null) {
              if (setToastPopup) setToastPopup(true);
              if (setToastDetails)
                setToastDetails({
                  type: 'alert',
                  title: 'Alert',
                  discription: 'Select the Pre-game Trader',
                });
              return;
            }

            if (selectedIngameTrader === null) {
              if (setToastPopup) setToastPopup(true);
              if (setToastDetails)
                setToastDetails({
                  type: 'alert',
                  title: 'Alert',
                  discription: 'Select the In-game Trader',
                });
              return;
            }

            let selectedMatchId = null;
            let selectedFixtureName = null;
            let selectedPregame = null;
            let selectedIngame = null;

            let matchDate = match
              ? dateConverter(match.fixture_start_at)?.dateString
              : dateConverter((matches[selectedMatch] as any)?.fixture_start_at)
                  .dateString;

            try {
              // not match and user is pass as a prop
              if (
                !match &&
                selectedMatch !== null &&
                selectedSport !== null &&
                selectedPregameTrader !== null &&
                selectedIngameTrader !== null
              ) {
                selectedMatchId = (matches[selectedMatch] as any)?.id;
                selectedFixtureName = (matches[selectedMatch] as any)
                  ?.fixture_name;
                selectedPregame = (selectedPregameTrader as any)?.id;
                selectedIngame = (selectedIngameTrader as any)?.id;
              }

              // not user is pass as a prop
              if (
                match &&
                selectedPregameTrader !== null &&
                selectedIngameTrader !== null
              ) {
                selectedMatchId = match?.id;
                selectedFixtureName = match?.fixture_name;
                selectedPregame = (selectedPregameTrader as any)?.id;
                selectedIngame = (selectedIngameTrader as any)?.id;
              }

              // user is pass as a prop
              // if (user) {
              //   selectedMatchId = (matches[selectedMatch] as any)?.id;
              //   selectedFixtureName = (matches[selectedMatch] as any)
              //     ?.fixture_name;
              //   selectedPregame = (selectedPregameTrader as any)?.id;
              //   selectedIngame = (selectedPregameTrader as any)?.id;
              // }

              if (
                selectedMatchId !== null &&
                selectedFixtureName !== null &&
                selectedPregame !== null &&
                selectedIngame !== null
              ) {
                const assign = await post('/match-assignment/', {
                  match_id: selectedMatchId,
                  fixtureName: selectedFixtureName,
                  user_id: selectedPregame,
                  // in_game_trader_id: selectedIngame,
                  due_date: matchDate,
                });
                const assign1 = await post('/match-assignment/', {
                  match_id: selectedMatchId,
                  fixtureName: selectedFixtureName,
                  // user_id: selectedPregame,
                  user_id: selectedIngame,
                  due_date: matchDate,
                });

                setToastPopup?.(true);
                setToastDetails?.({
                  type: 'success',
                  title: 'Success',
                  discription: 'Match assigned successfully',
                });
                setSelectedMatch(null);
                setSelectedSport(null);
                setSelectedPregameTrader(null);
                setSelectedIngameTrader(null);
                // // setDueDate(null);
                // // setDueDateBinder(null);
                if (loadMatches) loadMatches(10, 0);
                if (setOpen) setOpen(false);
                if (loadMatch) loadMatch(3, 0);
                // if (loadActivites) loadActivites(3);
              }
            } catch (e) {
              console.warn(e);
            }
          }}
        >
          Assign
        </div>
      </div>
    </div>
  );
};

export default AssignMatch;
