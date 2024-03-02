'use client';
import React, { useEffect, useState } from 'react';
import Image, { StaticImageData } from 'next/image';

// icons
import angleDownArrow from '../../../../assets/icons/arrow-down.svg';
import allPlayer from '../../assets/stats/all_player.svg';
import batter from '../../assets/stats/batter.svg';
import pitcher from '../../assets/stats/pitcher.svg';

// API
import { updateStats } from '@/app/apiIntegrations/apiClients/stats';

// components
import SearchBar from '@/app/components/global/SearchBar';

// antd
import BatterPropTable from './BatterPropTable';
import PitcherPropsTable from './PitcherPropsTable';

// antd
import { Dropdown } from 'antd';
import { getOldStats } from './getOldStats';
import { fetchConfirmedData } from '@/app/apiIntegrations/apiClients/confirmation';
import Batter from '@/app/assets1/custom-icons/player-types/Batter';
import AllPlayer from '@/app/assets1/custom-icons/player-types/AllPlayer';
import Pitcher from '@/app/assets1/custom-icons/player-types/Pitcher';

// allow to fetch data based on the roles
const allowedBatterTypes = ['all', 'batter'];
const allowedPitcherTypes = ['all', 'pitcher'];

type Props = {
  matchId: number | string;
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
};

const typeOfPlayer = [
  {
    id: 1,
    label: 'all',
    icon: AllPlayer,
  },
  {
    id: 2,
    label: 'batter',
    icon: Batter,
  },
  {
    id: 1,
    label: 'pitcher',
    icon: Pitcher,
  },
];

const TeamItems = [
  {
    id: 0,
    title: 'All Team',
  },
  {
    id: 1,
    title: 'Home Team',
  },
  {
    id: 1,
    title: 'Away Team',
  },
];

const legends = [
  {
    id: 1,
    label: '5s',
    color: '#CF5914',
  },
  {
    id: 2,
    label: '30s',
    color: '#FDA038',
  },
  {
    id: 1,
    label: '1m',
    color: '#FEF6C0',
  },
];

const StatsTableContainer = (props: Props) => {
  const { matchId, homeTeam, awayTeam } = props;
  const [loading, setLoading] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const [playerType, setPlayerType] = useState('all');
  const [selectedTeam, setSelectedTeam] = useState(TeamItems[0]);
  const [updatedStat, setUpdatedStat] = useState<{
    batters: any[];
    pitchers: any[];
  }>({
    batters: [],
    pitchers: [],
  });
  const [showUpdate, setShowUpdate] = useState(false);

  const [dataSource, setDataSource] = useState<{
    batters: any[];
    pitchers: any[];
  }>({
    batters: [],
    pitchers: [],
  });

  // useEffect(() => {
  //   fetchLiveStats(
  //     matchId,
  //     selectedTeam.title,
  //     playerType,
  //     searchKey,
  //     homeTeam.id,
  //     awayTeam.id,
  //     true
  //   );
  // }, []);

  useEffect(() => {
    fetchLiveStats(
      matchId,
      selectedTeam.title,
      playerType,
      searchKey,
      homeTeam.id,
      awayTeam.id,
      true
    );
  }, [playerType, selectedTeam, searchKey]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchLiveStats(
        matchId,
        selectedTeam.title,
        playerType,
        searchKey,
        homeTeam.id,
        awayTeam.id,
        false
      );
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  async function fetchLiveStats(
    matchId: string | number,
    team: string,
    playerType: string,
    playerName?: string,
    homeTeamId?: string | number,
    awayTeamId?: string | number,
    load?: boolean
  ) {
    if (load) setLoading(true);
    // setShowUpdate(false);
    // setDataSource({
    //   batters: [],
    //   pitchers: [],
    // });
    try {
      const res = await fetchConfirmedData(
        matchId,
        team,
        playerType,
        playerName,
        homeTeamId,
        awayTeamId
      );
      // set the updated value in local storage
      localStorage.setItem('stats data', JSON.stringify(res));
      setDataSource(res);
    } catch (e) {
      console.warn(e);
    } finally {
      if (load) setLoading(false);
    }
  }

  const onBatterStatsChange = async (
    e: any,
    id: any,
    statId: string | number,
    externalMatchId: string | number,
    externalPlayerId: string | number
  ) => {
    const { name, value } = e.target;

    const editData = dataSource.batters.map((item: any) => {
      return item.player_id === id && name ? { ...item, [name]: value } : item;
    });
    setDataSource({ ...dataSource, batters: editData });

    // save the changes
    saveUpdatedStat(
      id,
      name,
      value,
      statId,
      externalMatchId,
      externalPlayerId,
      'batter'
    );
    setShowUpdate(true);
  };

  const onPitcherStatsChange = async (
    e: any,
    id: any,
    statId: string | number,
    externalMatchId: string | number,
    externalPlayerId: string | number
  ) => {
    const { name, value } = e.target;

    const editData = dataSource.pitchers.map((item: any) =>
      item.player_id === id && name ? { ...item, [name]: value } : item
    );
    setDataSource({ ...dataSource, pitchers: editData });

    // save the changes
    saveUpdatedStat(
      id,
      name,
      value,
      statId,
      externalMatchId,
      externalPlayerId,
      'pitcher'
    );
    setShowUpdate(true);
  };

  const saveUpdatedStat = async (
    id: string | number,
    name: string,
    value: string,
    statId: string | number,
    externalMatchId: string | number,
    externalPlayerId: string | number,
    playerType: 'batter' | 'pitcher'
  ) => {
    const oldStat = await getOldStats(id, name, playerType);
    const newStat = {
      stat_id: +statId,
      stats: [
        {
          old_value: oldStat.toString(),
          new_value: value,
          stat_name: name,
        },
      ],
      external_player_id: externalPlayerId,
      external_match_id: externalMatchId,
      match_id: matchId.toString(),
    };

    let addNewStats = {
      old_value: oldStat.toString(),
      new_value: value,
      stat_name: name,
    };

    // for batters
    if (playerType === 'batter')
      if (updatedStat?.batters.length !== 0) {
        // check the player is exist
        const checkStatId = updatedStat.batters.filter(
          (s: any) => s.stat_id === statId
        );

        if (checkStatId.length === 0) {
          setUpdatedStat({
            ...updatedStat,
            batters: [...updatedStat.batters, newStat],
          });
        } else {
          const newStats = updatedStat?.batters?.map((s: any) => {
            if (s.stat_id === statId) {
              // check the stat is exist
              const checkStatExist = s.stats.filter(
                (s: any) => s.stat_name === name
              );

              // if stat is exist in the array
              if (checkStatExist.length !== 0) {
                const updatedValue = s.stats.map((stat: any) => {
                  if (stat.stat_name === name)
                    return {
                      ...stat,
                      old_value: oldStat.toString(),
                      new_value: value,
                    };
                  else return stat;
                });
                return { ...s, stats: updatedValue };
              } else {
                return {
                  ...s,
                  stats: [...s.stats, addNewStats],
                };
              }
            } else return s;
          });
          setUpdatedStat({
            ...updatedStat,
            batters: newStats,
          });
          // setUpdatedStat(newStats);
        }
      } else {
        setUpdatedStat({
          ...updatedStat,
          batters: [newStat],
        });
      }

    // for pitchers
    if (playerType === 'pitcher')
      if (updatedStat.pitchers.length !== 0) {
        // check the player is exist
        const checkStatId = updatedStat.pitchers.filter(
          (s: any) => s.stat_id === statId
        );

        if (checkStatId.length === 0) {
          setUpdatedStat({
            ...updatedStat,
            pitchers: [...updatedStat.pitchers, newStat],
          });
        } else {
          const newStats = updatedStat?.pitchers?.map((s: any) => {
            if (s.stat_id === statId) {
              // check the stat is exist
              const checkStatExist = s.stats.filter(
                (s: any) => s.stat_name === name
              );

              // if stat is exist in the array
              if (checkStatExist.length !== 0) {
                const updatedValue = s.stats.map((stat: any) => {
                  if (stat.stat_name === name)
                    return {
                      ...stat,
                      old_value: oldStat.toString(),
                      new_value: value,
                    };
                  else return stat;
                });
                return { ...s, stats: updatedValue };
              } else {
                return {
                  ...s,
                  stats: [...s.stats, addNewStats],
                };
              }
            } else return s;
          });
          setUpdatedStat({
            ...updatedStat,
            pitchers: newStats,
          });
          // setUpdatedStat(newStats);
        }
      } else {
        setUpdatedStat({
          ...updatedStat,
          pitchers: [newStat],
        });
      }
  };

  const handleUpdate = async () => {
    await updateStats(updatedStat);
    setShowUpdate(false);
    setUpdatedStat({
      batters: [],
      pitchers: [],
    });
    fetchLiveStats(
      matchId,
      selectedTeam.title,
      playerType,
      searchKey,
      homeTeam.id,
      awayTeam.id,
      true
    );
  };

  return (
    <div className='bg-white rounded-[8px] border border-[#E0E3E8] p-5 h-[67vh]'>
      <div className='flex justify-between items-center pb-5'>
        <div>
          <div className='text-[#1F2937] text-3xl font-bold'>Live stats</div>
          <div className='flex items-center gap-5 text-[#718096]'>
            {legends.map((legend) => {
              return (
                <div className='flex items-center gap-1.5'>
                  <span
                    style={{
                      background: legend.color,
                    }}
                    className={`w-3.5 h-3.5 contents-[''] rounded-[3px]`}
                  />
                  <span className='text-[#718096] text-sm'>{legend.label}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className='w-auto h-[40px] flex items-center gap-5'>
          <div className='h-full border rounded-[8px] min-w-[140px] w-auto'>
            <Dropdown
              className='h-11'
              trigger={['hover']}
              dropdownRender={(menu) => (
                <div className='bg-white w-[150px] rounded-lg border shadow-md p-5'>
                  {TeamItems.map((team) => {
                    return (
                      <div
                        className={`w-full flex items-center justify-between cursor-pointer pt-2.5 first:pt-0`}
                        onClick={() => {
                          setSelectedTeam(team);
                        }}
                      >
                        <p>{team.title}</p>
                        <input
                          type='radio'
                          checked={selectedTeam.title === team.title}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            >
              <div
                className={`flex items-center justify-center px-3 cursor-pointer h-full`}
              >
                <span className='pr-2 text-base font-medium text-[#718096] transition-all duration-300 ease-linear'>
                  {selectedTeam.title}
                </span>
                <Image
                  src={angleDownArrow}
                  alt=''
                  className='w-auto transition-all duration-300 ease-linear group-hover:rotate-180'
                />
              </div>
            </Dropdown>
          </div>
          <SearchBar
            searchKey={searchKey}
            setSearchKey={setSearchKey}
            placeholder='Search Players'
            style={{
              color: '#54577A',
              height: '100%',
              border: '1px solid #E0E3E8',
            }}
          />
          <div className='w-auto h-full border border-[#E0E3E8] rounded-[5px] flex items-center gap-2.5 px-1.5'>
            {typeOfPlayer?.map((pt, i) => {
              return (
                <div
                  key={i}
                  className={`capitalize h-8 px-5 text-center flex items-center justify-center gap-1.5 rounded-full cursor-pointer ${
                    playerType === pt.label ? 'bg-[#f1f2f4] text-[#3B82F6]' : ''
                  }`}
                  onClick={() => {
                    setPlayerType(pt.label);
                  }}
                >
                  {/* <Image src={pt.icon} alt={pt.label} /> */}
                  <pt.icon
                    color={`${playerType === pt.label ? '#3B82F6' : '#54577A'}`}
                    size={20}
                  />
                  {pt.label === 'all' && <span>{pt.label}</span>}
                </div>
              );
            })}
          </div>
          <button
            className={`border w-24 h-full rounded-[5px] border-[#E0E3E8] text-white text-sm font-semibold ${
              showUpdate
                ? 'bg-[#4285F4] cursor-pointer'
                : 'bg-[#4285F450] cursor-not-allowed'
            }`}
            onClick={() => {
              if (showUpdate) handleUpdate();
            }}
          >
            Update
          </button>
        </div>
      </div>
      <div className='overflow-y-scroll overflow-hidden h-[56vh]'>
        {allowedBatterTypes.includes(playerType) && (
          <BatterPropTable
            data={dataSource.batters}
            loading={loading}
            homeTeam={homeTeam}
            awayTeam={awayTeam}
            onChange={onBatterStatsChange}
          />
        )}
        {allowedPitcherTypes.includes(playerType) && (
          <PitcherPropsTable
            data={dataSource.pitchers}
            loading={loading}
            homeTeam={homeTeam}
            awayTeam={awayTeam}
            onChange={onPitcherStatsChange}
          />
        )}
      </div>
    </div>
  );
};

export default StatsTableContainer;
