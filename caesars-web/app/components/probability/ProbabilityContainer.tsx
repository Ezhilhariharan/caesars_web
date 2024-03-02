"use client";
import { get, post } from "@/app/apiIntegrations/fetcher";
import React, { useEffect, useState } from "react";
import PlayerList from "../playerPropMarket/PlayerList";
import ProbabilityMarketTable from "./probabilityMarketTable";
import { StaticImageData } from "next/image";
import dateConverter from "@/app/lib/dateConverter";
import { searchPlayerPosition } from "@/app/lib/searchPlayerFrame";

import { MenuProps } from "antd";
import Toast, { toastProps } from "@/app/components/global/toast/Toast";

//component
import PlayerPropDropdown from "../ppm/components/PropsDropDown";

//icon
import Image from "next/image";
import Team1 from "../../assets/Team1.svg";
import Team2 from "../../assets/Team2.svg";
import propsPlayerLogo from "../../assets/propsPlayerLogo.svg";
import MoneyLineTable from "./moneyLIneTable";

type Props = {
  match: any;
  team1: {
    id: number;
    logo: string | StaticImageData;
    name: string;
    short_name: string;
  };
  team2: {
    id: number;
    logo: string | StaticImageData;
    name: string;
    short_name: string;
  };
};

const ProbabilityContainer = ({ match, team1, team2 }: Props) => {
  const [team1Roster, setTeam1Roster] = useState([]);
  const [team2Roster, setTeam2Roster] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);
  const [propId, setpropId] = useState<any>(0);
  const [propsList, setPropsList] = useState<any[]>([]);
  const [dataSource, setDataSource] = useState<any[]>();
  const [unchangedDataSource, setUnchangedDataSource] = useState<any[]>();
  const [loader, setLoader] = useState<Boolean>(false);
  const [tableList, setTableList] = useState<any[]>([]);
  const [statsDetails, setStatsDetails] = useState<any>();

  // handling the toast notification
  const [toastPopup, setToastPopup] = useState(false);
  const [toastDetails, setToastDetails] = useState<toastProps>({
    type: "alert",
    title: "",
    discription: "",
    logo: "",
  });

  useEffect(() => {
    if (toastPopup === true) {
      const timeOut = setTimeout(() => {
        setToastPopup(false);
      }, 2000);
      return () => clearTimeout(timeOut);
    }
  }, [toastPopup]);

  useEffect(() => {
    if (match) {
      loadTeam1();
      loadTeam2();
      matchMarketInfo();
    }
  }, [match]);

  useEffect(() => {
    if (match?.id)
      loadMarketData(match?.id, selectedPlayer?.team_player_id, true);

    if (selectedPlayer?.id) {
      fetchStatsData(selectedPlayer?.id, selectedPlayer?.position);
    }

    const interval = setInterval(() => {
      if (match?.id)
        loadMarketData(match?.id, selectedPlayer?.team_player_id, false);
    }, 7000);
    return () => clearInterval(interval);
  }, [selectedPlayer]);

  useEffect(() => {
    if (match?.id && selectedPlayer?.team_player_id) {
      loadMarketData(match?.id, selectedPlayer?.team_player_id, true);
    }
  }, []);

  const fetchStatsData = async (id: any, position: any) => {
    const positionType = searchPlayerPosition(position);
    try {
      const res = await get(
        `/player-prop-overview/${id}?player_type=${positionType}`
      );
      setStatsDetails(res?.data);
    } catch (e) {
      console.warn(e);
    }
  };

  // useEffect(() => {
  //   PropList();
  // }, [dataSource]);

  // const PropList = async () => {
  //   try {
  //     const res = await get(`/player-props-list`);

  //     const filteringPosition = res?.data?.filter(
  //       (item: any) =>
  //         item?.player_type === selectedPlayer?.team_players?.primary_position
  //     );

  //     const filteredArray = filteringPosition?.filter(
  //       (item: any) =>
  //         !dataSource?.some((item2: any) => item2?.props_name === item?.name)
  //     );

  //     setPropsList(filteredArray);
  //   } catch (e) {
  //     console.warn(e);
  //   }
  // };

  async function loadTeam1() {
    try {
      const res = await get(
        `/rosters?match_id=${match?.id}&team_id=${match?.team1_id}`
      );
      setTeam1Roster(res.data);
    } catch (e) {
      console.warn(e);
    }
  }

  async function loadTeam2() {
    try {
      const res = await get(
        `/rosters?match_id=${match?.id}&team_id=${match?.team2_id}`
      );
      setTeam2Roster(res.data);
    } catch (e) {
      console.warn(e);
    }
  }

  async function matchMarketInfo() {
    // /match-market/${match?.id}7152
    try {
      const res = await get(`/match-market/${match?.id}`);

      let createObject1: any = {};
      let createObject2: any = {};

      res?.data?.map((item: any) => {
        if (item?.team_name === match?.team1_name) {
          createObject1 = Object.assign(
            createObject1,
            !createObject1?.team && {
              team: item?.team_name,
            }
          );
          if (item?.mmt_name === "Money Line") {
            Object.assign(createObject1, {
              moneyLine: item?.under?.american_odds,
            });
          }
          if (item?.mmt_name === "Total Points") {
            Object.assign(createObject1, {
              total: item?.over?.american_odds,
            });
          }
          Object.assign(createObject1, {
            teamLogo: match?.team1_logo_image,
            teamShortName: match?.team1_short_name,
          });
        } else if (item?.team_name === match?.team2_name) {
          createObject2 = Object.assign(
            createObject2,
            !createObject2?.team && {
              team: item?.team_name,
            }
          );
          if (item?.mmt_name === "Money Line") {
            Object.assign(createObject2, {
              moneyLine: item?.over?.american_odds,
            });
          }
          if (item?.mmt_name === "Total Points") {
            Object.assign(createObject2, {
              total: item?.under?.american_odds,
            });
          }
          Object.assign(createObject2, {
            teamLogo: match?.team2_logo_image,
            teamShortName: match?.team2_short_name,
          });
        }
      });
      setTableList([createObject1, createObject2]);
    } catch (e) {
      console.warn(e);
    }
  }

  async function loadMarketData(matchId: any, playerId: any, load: boolean) {
    if (playerId && matchId) {
      if (load) setLoader(true);
      try {
        const res = await get(
          `/player-prop-marketList?match_id=${matchId}&team_player_id=${playerId}`
        );
        // const res = await get(`/player-props-market-probabilities?player_id=343`);
        // setTimeout(() => {
        //   setLoader(false);
        // }, 1000);
        // if (res.data.length === 0) {
        //   const res = await getMarket(
        //     selectedPlayer?.match_id,
        //     selectedPlayer?.team_player_id
        //   );
        //   updateData(res.data);
        //   if (load) setLoader(false);
        // } else {
        res.data?.length > 0 && updateData(res.data);
        if (load) setLoader(false);
        // }
      } catch (e) {
        console.warn(e);
        if (load) setLoader(false);
      }
    }
  }

  async function createOrUpdateProp(payLoad: any) {
    try {
      const res = await post(`/player-prop-market`, payLoad);

      loadMarketData(match?.id, selectedPlayer?.team_player_id, true);
      // updateData(res.data);
    } catch (e) {
      console.warn(e);
    }
  }

  const updateData = (data: any) => {
    let updatingData = data?.map((item: any) => {
      const newState = item?.data?.map((nestedItem: any) => {
        return {
          ...nestedItem,
          checked: false,
          over: nestedItem?.over_probability
            ? (1 / nestedItem?.over_probability).toFixed(2)
            : "-",
          under: nestedItem?.under_probability
            ? (1 / nestedItem?.under_probability).toFixed(2)
            : "-",
        };
      });
      return { ...item, data: newState };
    });

    setDataSource(updatingData);
    setUnchangedDataSource(updatingData);
  };

  const handleCreateOrUpdateProp = (data: any) => {
    createOrUpdateProp(data);
    // setDataSource(updatingData);
  };

  const SelectedList = (data: any) => {
    const createList = {
      match_id: match?.id,
      team_player_id: selectedPlayer?.team_player_id,
      player_prop_id: data?.id,
      balanced_line: 0.5,
      over: null,
      under: null,
      notes: null,
    };
    handleCreateOrUpdateProp(createList);
  };

  const propsItems: MenuProps["items"] = propsList?.map((d: any) => {
    return {
      key: d?.id,
      label: (
        <div className="p-2 text-base text-[#6C6D6F] font-normal">{d.name}</div>
      ),
      onClick: async (e) => SelectedList(d),
    };
  });

  // if (loader) return <LoadingComponent text='Loading' />;

  return (
    <div className="probabilityClamp flex items-start gap-4 pr-2">
      <div
        className="h-1/3"
        style={{
          width: `clamp(200px, 20%, 300px)`,
        }}
      >
        <PlayerList
          match={match}
          selectedPlayer={selectedPlayer}
          setSelectedPlayer={setSelectedPlayer}
          playerPropId={propId}
          setPlayerPropId={setpropId}
        />
      </div>
      <div className="tableClamp h-[100%] ">
        {selectedPlayer?.hasOwnProperty("team_player_id") ? (
          <>
            <div className=" flex gap-4">
              <div className="w-7/12">
                {/* <ActiveMarketCard
                  matchId={match?.id}
                  selectedRoster={selectedPlayer}
                  loadMarket={() => {}}
                  allow={false}
                  showSuspend={false}
                  team1={team1}
                  place={match?.country_alpha2_code}
                  fixtureStartAt={match?.fixture_start_at}
                  team2={team2}
                /> */}
                <div className="w-full flex justify-between items-center h-auto bg-white border mb-3.5 px-4 py-3 rounded-[10px]">
                  <div className="rounded-[10px] w-[120px] h-[180px] border  border-[#e0e3e8] overflow-hidden">
                    <div className="bg-[#001E45] flex justify-center items-center w-[100%] h-[65%] ">
                      <Image
                        src={propsPlayerLogo}
                        alt="logo"
                        width={75}
                        height={70}
                      />
                    </div>
                    <div className="w-[100%] h-[35%] py-1">
                      <p className="overflow-hidden truncate ... px-1.5 text-base h-[50%] font-semibold text-[#141522] pt-1">
                        {selectedPlayer?.first_name} {selectedPlayer?.last_name}
                      </p>
                      <div className="flex justify-evenly items-center h-[50%]">
                        {selectedPlayer?.team_logo && (
                          <Image
                            src={selectedPlayer?.team_logo}
                            alt="cancel"
                            width={23}
                            height={20}
                          />
                        )}
                        <div className="text-base font-semibold text-[#4285F4] capitalize">
                          {selectedPlayer?.position}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" flex flex-col justify-center items-center text-sm text-[#54577A]">
                    {selectedPlayer?.team_id && (
                      <div className="gap-1.5 flex items-center">
                        {/* <p className="text-lg"> {team1?.short_name}</p> */}
                        <p className="text-[14px]">VS</p>
                        <p className=""> {team2?.short_name}</p>
                      </div>
                    )}
                    <div className="flex ">
                      {match?.country_alpha2_code && (
                        <p className="pl-1.5">@</p>
                      )}
                      <p className="px-1.5">
                        {match?.country_alpha2_code &&
                          `${match?.country_alpha2_code}`}
                      </p>
                      <p className="">
                        {dateConverter(match?.fixture_start_at).timeString}
                      </p>
                    </div>
                  </div>
                  <div className="w-[55%] h-[180px] overflow-scroll listScroll">
                    {statsDetails?.batterDetail?.show && (
                      <div className="w-full">
                        <div className="w-[100%] py-3 text-center font-bold text-[#14171C] text-base ">
                          Batter Stats
                        </div>
                        <table className="w-full h-full text-center text-sm font-normal text-[#14171C]">
                          <thead>
                            <tr className="h-10 bg-[#F0F1F3] rounded-t-[10px]">
                              <td className="w-[calc(100%/6)]">S</td>
                              <td className="w-[calc(100%/6)]">D</td>
                              <td className="w-[calc(100%/6)]">T</td>
                              <td className="w-[calc(100%/6)]">HR</td>
                              <td className="w-[calc(100%/6)]">TB</td>
                              <td className="w-[calc(100%/6)]">H</td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="h-10 border-x border-b last:rounded-b-[10px]">
                              <td className="w-[calc(100%/6)] border-x">
                                {statsDetails?.batterDetail?.singles}
                              </td>
                              <td className="w-[calc(100%/6)] border-x">
                                {statsDetails?.batterDetail?.doubles}
                              </td>
                              <td className="w-[calc(100%/6)]">
                                {statsDetails?.batterDetail?.triples}
                              </td>
                              <td className="w-[calc(100%/6)] border-x">
                                {statsDetails?.batterDetail?.home_runs}
                              </td>
                              <td className="w-[calc(100%/6)] border-x">
                                {statsDetails?.batterDetail?.total_bases}
                              </td>
                              <td className="w-[calc(100%/6)]">
                                {statsDetails?.batterDetail?.hits}
                              </td>
                            </tr>
                          </tbody>
                          <div className="h-[10px]" />
                          <thead>
                            <tr className="h-10 bg-[#F0F1F3] rounded-t-[10px]">
                              <td className="w-[calc(100%/6)]">HRR</td>
                              <td className="w-[calc(100%/6)]">R</td>
                              <td className="w-[calc(100%/6)]">RBI</td>
                              <td className="w-[calc(100%/6)]">SB</td>
                              <td className="w-[calc(100%/6)]">BS</td>
                              <td className="w-[calc(100%/6)]">BW</td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="h-10 border-x border-b last:rounded-b-[10px]">
                              <td className="w-[calc(100%/6)] border-x">
                                {statsDetails?.batterDetail?.hrr}
                              </td>
                              <td className="w-[calc(100%/6)] border-x">
                                {statsDetails?.batterDetail?.runs}
                              </td>
                              <td className="w-[calc(100%/6)]">
                                {statsDetails?.batterDetail?.rbis}
                              </td>
                              <td className="w-[calc(100%/6)] border-x">
                                {statsDetails?.batterDetail?.stolen_bases}
                              </td>
                              <td className="w-[calc(100%/6)] border-x">
                                {statsDetails?.batterDetail?.batter_strikeouts}
                              </td>
                              <td className="w-[calc(100%/6)]">
                                {statsDetails?.batterDetail?.batter_walks}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    )}
                    <div className="h-[10px]" />
                    {statsDetails?.pitcherDetail?.show && (
                      <div>
                        <div className="w-[100%] py-3 text-center font-bold text-[#14171C] text-base">
                          Pitcher Stats
                        </div>
                        <table className="w-full h-full text-center text-sm font-normal text-[#14171C]">
                          <thead className="mt-[10px]">
                            <tr className="h-10 bg-[#F0F1F3] rounded-t-[10px]">
                              <td className="w-[calc(100%/6)]">SO</td>
                              <td className="w-[calc(100%/6)]">WP</td>
                              <td className="w-[calc(100%/6)]">HA</td>
                              <td className="w-[calc(100%/6)]">ER</td>
                              <td className="w-[calc(100%/6)]">O</td>
                              <td className="w-[calc(100%/6)]">W</td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="h-10 border-x border-b last:rounded-b-[10px]">
                              <td className="w-[calc(100%/6)] border-x">
                                {statsDetails?.pitcherDetail?.strikeouts}
                              </td>
                              <td className="w-[calc(100%/6)] border-x">
                                {statsDetails?.pitcherDetail?.strikeouts}
                              </td>
                              <td className="w-[calc(100%/6)]">
                                {statsDetails?.pitcherDetail?.hits_allowed}
                              </td>
                              <td className="w-[calc(100%/6)] border-x">
                                {statsDetails?.pitcherDetail?.earned_runs}
                              </td>
                              <td className="w-[calc(100%/6)] border-x">
                                {statsDetails?.pitcherDetail?.outs}
                              </td>
                              <td className="w-[calc(100%/6)]">
                                {statsDetails?.pitcherDetail?.walks}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  {/* <div className=" flex flex-col items-center justify-center ">
                    <PlayerPropDropdown
                      items={propsItems}
                      list={propsList}
                      SelectedList={SelectedList}
                    />
                  </div> */}
                </div>
              </div>
              <div className="flex justify-around h-auto bg-white border mb-3.5 py-3.5 px-4 rounded-[10px] w-5/12 ">
                <MoneyLineTable
                  matchId={match?.id}
                  team1={team1}
                  team2={team2}
                />
              </div>
            </div>

            <ProbabilityMarketTable
              match={match}
              selectedPlayer={selectedPlayer}
              setDataSource={setDataSource}
              dataSource={dataSource}
              loadMarketData={loadMarketData}
              unchangedDataSource={unchangedDataSource}
              handleCreateOrUpdateProp={handleCreateOrUpdateProp}
              loader={loader}
              setLoader={setLoader}
            />
          </>
        ) : (
          <div className="flex justify-center items-center">
            Select a Player
          </div>
        )}
      </div>
    </div>
  );
};

export default ProbabilityContainer;
