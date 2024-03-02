"use client";

import React, { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

import { Modal, Spin } from "antd";

import Image from "next/image";

// API
import { get, post, put, patch, del } from "@/app/apiIntegrations/fetcher";
import { makeAsDefaultPlayer } from "@/app/apiIntegrations/apiClients/market";

// components
import PlayerTable from "./RosterPlayerTable";
import RosterAddPlayer from "./RosterAddPlayer";
import Toast, { toastProps } from "@/app/components/global/toast/Toast";
import TeamBoard from "./TeamBoard";
import SubstitutionModal from "./SubstitutionModal";
import Header from "./ListHeader";
import MatchDetails from "./MatchDetailsCard";
import AddPlayer from "./AddPlayer";
import PlayerDetails from "./PlayerDetailsCard";
import SubstitutionCard from "./SubstitutionCard";
import { getUserFromLocalstorage } from "@/app/lib/localstorageHelpers";

// icons
import addProp from "../../assets/addProp.svg";

type Props = {
  match: any;
  user: any;
  admin: any;
  allow: boolean;
  setSelectedTab: React.Dispatch<React.SetStateAction<any>>;
  updateMatchStatus: (id: any) => void;
  setMatchStatus: React.Dispatch<React.SetStateAction<any>>;
};

const allowedDeptChart = [
  "roster_lead",
  "roster_maker",
  "trading_lead",
  "pre_game_trader",
];

export default function RosterPage({
  match,
  user,
  allow,
  admin,
  setSelectedTab,
  updateMatchStatus,
  setMatchStatus,
}: Props) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [teamPlayerList, setTeamPlayerList] = useState<any>([]);
  const [SelectedPlayer, setSelectedPlayer] = useState<any>();
  const [playerList1, setPlayerList1] = useState<any>();
  const [playerList2, setPlayerList2] = useState<any>();
  const [activeTeam, setActiveTeam] = useState<number>();
  const [selectedPlayerDetails, setSelectedPlayerDetails] = useState<any>();
  const [substitutionModal, setSubstitutionModal] = useState(false);
  const [substitutionAction, setSubstitutionAction] = useState("pinch hitter");
  const [substitutionReason, setSubstitutionReason] = useState<string>("");
  const [substitutionPositionList, setSubstitutionPositionList] = useState<
    any[]
  >([]);
  const [reasonListData, setReasonListData] = useState<any[]>(reasonList);
  const [playerListDetails, setPlayerListDetails] = useState<any>({});
  const [selectedPlayerList, setSelectedPlayerList] = useState<any>("");
  const [teamNumber, setTeamNumber] = useState<any>("");
  const [leagueData, setLeagueData] = useState<any>({});
  const [toastPopup, setToastPopup] = useState(false);
  const [toastDetails, setToastDetails] = useState<toastProps>({
    type: "error",
    title: "",
    discription: "",
    logo: "",
  });
  const [playerListError, setPlayerListError] = useState<boolean>(false);
  const [List1UpdatedTime, setList1UpdatedTime] = useState<any>("");
  const [List2UpdatedTime, setList2UpdatedTime] = useState<any>("");
  const [depthChartCount, setDepthChartCount] = useState<Boolean>(false);
  const [depthChartCount2, setDepthChartCount2] = useState<Boolean>(false);
  const [selectedTeamLogo, setSelectedTeamLogo] = useState<any>("");

  const activeUser = getUserFromLocalstorage();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setToastPopup(false);
    }, 3000);
    return () => clearTimeout(timeOut);
  }, [toastPopup]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setPlayerListError(false);
    }, 3000);
    return () => clearTimeout(timeOut);
  }, [playerListError]);

  useEffect(() => {
    playerListApi1(match?.id, match?.team1_id);
    playerListApi2(match?.id, match?.team2_id);
    initialLeagueApi();
  }, [match]);

  useEffect(() => {
    if (playerList1?.length === 26 && playerList2?.length === 26) {
      setMatchStatus(true);
    } else {
      setMatchStatus(false);
    }
  }, [playerList1, playerList2]);

  const initialLeagueApi = async () => {
    try {
      const res = await get(`leagues`);
      setLeagueData(res?.data);
    } catch (e) {
      console.warn(e);
    }
  };

  const defaultPLayerList = async (
    matchId: any,
    teamId: any,
    listType: string
  ) => {
    const payload = {
      team_id: teamId,
      match_id: matchId,
    };
    try {
      const res = await post(`team-player`, payload);
      if (res?.data === "Record created successfully") {
        listType === "1"
          ? playerListApi1(matchId, teamId)
          : playerListApi2(matchId, teamId);
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const playerListApi1 = async (matchId: any, teamId: any) => {
    if (matchId && teamId) {
      try {
        const res = await get(`/roster-list/match/${matchId}/team/${teamId}`);
        const placingStarterValue = res?.data?.results?.map(
          (item: any, index: number) => {
            return index + 1 > 9 ? { ...item } : { ...item, is_starting: true };
          }
        );
        setPlayerList1(placingStarterValue);
        setList1UpdatedTime(res?.data?.recent_updated);

        res?.totalSize == 0 && setDepthChartCount(true);
        if (
          (res?.data?.results?.length === 0 && res?.totalSize != 0) ||
          (res?.data?.results?.length !== 0 && res?.totalSize == 0)
        ) {
          defaultPLayerList(matchId, teamId, "1");
        }
      } catch (e) {}
    } else {
      console.warn("listApi1");
    }
  };

  const playerListApi2 = async (matchId: any, teamId: any) => {
    if (matchId && teamId) {
      try {
        const res = await get(`/roster-list/match/${matchId}/team/${teamId}`);
        const placingStarterValue = res?.data?.results?.map(
          (item: any, index: number) => {
            return index + 1 > 9 ? { ...item } : { ...item, is_starting: true };
          }
        );
        setPlayerList2(placingStarterValue);
        setList2UpdatedTime(res?.data?.recent_updated);

        res?.totalSize == 0 && setDepthChartCount2(true);
        if (
          (res?.data?.results?.length === 0 && res?.totalSize != 0) ||
          (res?.data?.results?.length !== 0 && res?.totalSize == 0)
        ) {
          defaultPLayerList(matchId, teamId, "2");
        }
      } catch (e) {}
    } else {
    }
  };

  const fetchTeamPlayerList = async (
    teamId: string | number,
    modalAction: Boolean
  ) => {
    if (teamId && match?.id) {
      try {
        const res = await get(`team-player-list/${teamId}`);
        try {
          const res1 = await get(
            `team-player-list/roster/${teamId}?match_id=${match?.id}`
          );
          updateList(res.data, res1.data, modalAction);
        } catch (e) {
          console.warn(e);
        }
      } catch (e) {
        console.warn(e);
      }
    } else {
      console.warn("fetchTeamPlayerList");
    }
  };

  const updateList = (data: any, dataTwo: any, modalAction: any) => {
    const addingField = data?.result_data?.map((item: any) => {
      const nested = item?.players?.map((nestedItem: any) => {
        if (dataTwo?.length > 0) {
          const checkingStarter = dataTwo?.filter(
            (player_id: any) =>
              player_id?.team_player_id === nestedItem?.team_player_id
          );
          if (checkingStarter?.length > 0) {
            return { ...nestedItem, checked: true };
          } else {
            return { ...nestedItem, checked: false };
          }
        } else {
          if (nestedItem?.is_starter) {
            return { ...nestedItem, checked: true };
          } else {
            return { ...nestedItem, checked: false };
          }
        }
      });
      return { ...item, players: nested };
    });

    setTeamPlayerList({
      result_data: addingField,
      team_details: data?.team_details,
    });
    modalAction && setIsOpen(true);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleCancelSubstitution = () => {
    setSubstitutionModal(false);
  };

  const addPLayer = (
    teamName: string,
    teamId: number | string,
    team: number
  ) => {
    setSelectedPlayer(teamName);
    fetchTeamPlayerList(teamId, true);
    setActiveTeam(team);
  };

  const handleCheckbox = (e: any, data: any, position: any) => {
    let checkedActivePlayer: any[] = [];

    teamPlayerList?.result_data?.map((item: any) => {
      let checkingNestedValue = item?.players?.filter((nestedItem: any) => {
        return nestedItem?.checked === true;
      });
      checkedActivePlayer.push(...checkingNestedValue);
    });

    let settingValue;
    if (checkedActivePlayer?.length < 26) {
      settingValue = true;
    } else if (
      checkedActivePlayer?.length === 26 &&
      e.target.checked === false
    ) {
      settingValue = true;
    } else {
      settingValue = false;
    }

    if (settingValue) {
      let changedPlayerId: any;
      const addingField = teamPlayerList?.result_data?.map((item: any) => {
        let gettingStarter: any = [];
        let placingStarter;
        let nested: any;
        let arrangingStarter: any;

        // checking no starter
        const checkingStarter = item?.players?.filter(
          (list: any) => list?.is_starter === true
        );

        nested = item?.players?.map((nestedItem: any) => {
          if (nestedItem?.full_name === data?.full_name) {
            if (checkingStarter == 0 && e.target.checked === true) {
              // its work when no starter is founded in the list
              changedPlayerId = data?.team_player_id;
            }

            return checkingStarter == 0 && e.target.checked === true
              ? { ...nestedItem, checked: e.target.checked, is_starter: true }
              : { ...nestedItem, checked: e.target.checked };
          } else {
            return { ...nestedItem };
          }
        });

        if (
          !e.target.checked &&
          data?.is_starter &&
          position == item?.position
        ) {
          // its work when starter is unchecked
          let firstCheckedItem = nested?.filter((item: any) => item?.checked);

          if (firstCheckedItem?.length > 0) {
            arrangingStarter = nested?.map((list: any) => {
              if (firstCheckedItem[0]?.full_name == list?.full_name) {
                changedPlayerId = firstCheckedItem[0]?.team_player_id;
                return { ...list, is_starter: true };
              } else {
                return { ...list, is_starter: false };
              }
            });
          } else {
            arrangingStarter = nested?.map((list: any) => {
              if (list?.full_name === data?.full_name) {
                return { ...list, checked: true };
              } else {
                return { ...list };
              }
            });
          }
        }

        nested?.map((checkingStater: any) => {
          if (checkingStater?.full_name === data?.full_name) {
            gettingStarter = nested?.filter(
              (list: any) => list?.checked === true
            );
          }
        });

        if (gettingStarter?.length == 0) {
          placingStarter = nested?.map((forStarter: any) => {
            if (e.target.checked && forStarter?.full_name === data?.full_name) {
              // its work when no starter is founded in the changedList
              changedPlayerId = data?.team_player_id;
              return { ...forStarter, is_starter: true };
            } else if (
              !e.target.checked &&
              forStarter?.full_name === data?.full_name
            ) {
              return { ...forStarter, is_starter: false };
            } else {
              return { ...forStarter };
            }
          });
        }
        return arrangingStarter?.length > 0
          ? { ...item, players: arrangingStarter }
          : gettingStarter?.length == 0
          ? { ...item, players: placingStarter }
          : { ...item, players: nested };
      });

      setTeamPlayerList({
        result_data: addingField,
        team_details: teamPlayerList?.team_details,
      });
    } else {
      setToastPopup(true);
      setToastDetails({
        type: "error",
        title: "Player List",
        discription: "Only 26 player should be selected",
      });
      setPlayerListError(true);
    }
  };

  const checkingPlayerList = (updatedList: any) => {
    let checkedData: any = [];
    let entireList = updatedList?.result_data
      ?.slice(0, 10)
      ?.map((list: any) => {
        return (checkedData = list?.players?.some(
          (data: any) => data?.is_starter === true
        ));
      });

    let checkingList = entireList?.every((data: any) => data === true);
    return checkingList;
  };

  const confirmChanges = (
    id: any,
    activeTeam: any,
    modalAction: Boolean,
    stateList?: any
  ) => {
    const checkingList = checkingPlayerList(stateList);

    if (checkingList) {
      modalAction && setIsOpen(false);
      let selectedPlayers: any = [];
      let selectedStarterPlayers: any = [];
      stateList?.result_data?.slice(1, 10)?.map((list: any) => {
        list?.players?.map((nested: any) => {
          if (nested?.is_starter) {
            DefaultPlayerSecond(
              nested?.team_player_id,
              teamPlayerList?.team_details?.team_id,
              list?.position
            );
            selectedStarterPlayers = [
              ...selectedStarterPlayers,
              {
                team_player_id: nested?.team_player_id,
                is_starter: true,
                primary_position: list?.position,
                first_name: nested?.full_name,
              },
            ];
          }
          if (nested?.checked && !nested?.is_starter) {
            selectedPlayers = [
              ...selectedPlayers,
              {
                team_player_id: nested?.team_player_id,
                is_starter: false,
                primary_position: list?.position,
                first_name: nested?.full_name,
              },
            ];
          }
        });
      });
      stateList?.result_data?.slice(0, 1)?.map((list: any) => {
        list?.players?.map((nested: any) => {
          if (nested?.is_starter) {
            DefaultPlayerSecond(
              nested?.team_player_id,
              teamPlayerList?.team_details?.team_id,
              list?.position
            );

            selectedStarterPlayers = [
              ...selectedStarterPlayers,
              {
                team_player_id: nested?.team_player_id,
                is_starter: true,
                primary_position: list?.position,
                first_name: nested?.full_name,
              },
            ];
          }
          if (nested?.checked && !nested?.is_starter) {
            selectedPlayers = [
              ...selectedPlayers,
              {
                team_player_id: nested?.team_player_id,
                is_starter: false,
                primary_position: list?.position,
                first_name: nested?.full_name,
              },
            ];
          }
        });
      });
      stateList?.result_data?.slice(10)?.map((list: any) => {
        list?.players?.map((nested: any) => {
          if (nested?.checked) {
            selectedPlayers = [
              ...selectedPlayers,
              {
                team_player_id: nested?.team_player_id,
                is_starter: false,
                primary_position: list?.position,
                first_name: nested?.full_name,
              },
            ];
          }
        });
      });
      bulkOrderUpdate(
        [...selectedStarterPlayers, ...selectedPlayers],
        teamPlayerList?.team_details?.team_id,
        activeTeam
      );
    } else {
      console.warn("check ur list");
    }
  };

  const updatingCheckbox = (player_id: any) => {
    const addingField = teamPlayerList?.result_data?.map((item: any) => {
      const nested = item?.players?.map((nestedItem: any) => {
        if (nestedItem?.team_player_id === player_id) {
          return { ...nestedItem, checked: true };
        } else {
          return { ...nestedItem };
        }
      });
      return { ...item, players: nested };
    });

    setTeamPlayerList({
      result_data: addingField,
      team_details: teamPlayerList?.team_details,
    });
  };

  const bulkOrderUpdate = async (dataList: any, teamId: any, teamType: any) => {
    let teamData: any;
    let opponentData: any;

    if (teamType == 1) {
      teamData = {
        abbreviation: match?.team1_short_name,
        id: match?.team1_id,
      };
      opponentData = {
        abbreviation: match?.team2_short_name,
        id: match?.team2_id,
      };
    } else {
      teamData = {
        abbreviation: match?.team2_short_name,
        id: match?.team2_id,
      };
      opponentData = {
        abbreviation: match?.team1_short_name,
        id: match?.team1_id,
      };
    }

    const data = dataList?.map((d: any, i: number) => {
      return {
        id: d?.team_player_id,
        is_starting: i + 1 > 9 ? false : true,
        r_order: i + 1,
        player_name: arrangeName(d?.first_name, d?.middle_name, d?.last_name),
        position: d?.primary_position,
        home: teamType == 1 ? true : false,
        match_json: {
          date: match?.match_started_at?.split("T")[0],
          season: leagueData?.id,
          team: teamData,
          opponent: opponentData,
        },
      };
    });

    const payLoad = {
      matchId: match?.id,
      teamId: teamId,
      players: data,
    };

    if (data?.length > 0) {
      try {
        const res = await patch("bulk-update-roster", payLoad);
        teamType == 1
          ? playerListApi1(match?.id, teamId)
          : playerListApi2(match?.id, teamId);
        setToastPopup(true);
        setToastDetails({
          type: "success",
          title: "Success",
          discription: "Successfully Updated",
        });
      } catch (e) {
        console.warn(e);
      }
    }
  };

  const updateState = (id: any, position: any) => {
    const addingField = teamPlayerList?.result_data?.map((item: any) => {
      const nested = item?.players?.map((nestedItem: any) => {
        if (item?.position == position) {
          return nestedItem?.team_player_id === id
            ? { ...nestedItem, is_starter: true }
            : { ...nestedItem, is_starter: false };
        } else {
          return { ...nestedItem };
        }
      });
      return { ...item, players: nested };
    });

    setTeamPlayerList({
      result_data: addingField,
      team_details: teamPlayerList?.team_details,
    });
  };

  const DefaultPlayerSecond = async (
    id: string | number,
    team_id: string | number,
    position: string,
    activeTeam?: any,
    list?: any
  ) => {
    updateState(id, position);

    // confirmChanges(team_id, activeTeam, false, list);

    try {
      const res = await makeAsDefaultPlayer(id, team_id, position);
      // activeTeam == 1
      //   ? playerListApi1(match?.id, team_id)
      //   : playerListApi2(match?.id, team_id);
      // fetchTeamPlayerList(team_id, false);
    } catch (e) {
      console.warn(e);
    }
  };

  const selectedPlayerProfile = async (playerDetails: any, teamType: any) => {
    setPlayerListDetails(playerDetails);
    setTeamNumber(teamType);
    teamType == "1"
      ? setSelectedTeamLogo(match?.team1_logo_image)
      : setSelectedTeamLogo(match?.team2_logo_image);
    try {
      const res = await get(`player-profiles/${playerDetails?.player_id}`);
      setSelectedPlayerDetails(res?.result);
    } catch (e) {
      console.warn(e);
    }
  };

  const arrangeName = (
    first_name: string,
    middle_name: string,
    last_name: string
  ) => {
    return `${first_name ? first_name : ""} ${middle_name ? middle_name : ""} ${
      last_name ? last_name : ""
    }`;
  };

  async function handleUpdateOrder(dataList: any, teamId: any, teamType: any) {
    bulkOrderUpdate(dataList, teamId, teamType);
  }

  const deleteRosterRemoval = async (
    playerId: any,
    teamId: any,
    teamType: any
  ) => {
    if (allow) {
      try {
        const res = await del(
          `roster/${playerId}/match/${match?.id}/team/${teamId}`
        );
        teamType == 1
          ? playerListApi1(match?.id, teamId)
          : playerListApi2(match?.id, teamId);
      } catch (e) {
        console.warn(e);
      }
    }
  };

  const switchObjectsInArray = (indexA: any, indexB: any, orgData: any) => {
    const insert1 = orgData?.filter(
      (item: any, index: any) => index === indexB
    );
    const insert2 = orgData?.filter(
      (item: any, index: any) => index === indexA
    );

    insert1?.length > 0 && orgData?.splice(indexA, 1, insert1[0]);
    insert2?.length > 0 && orgData?.splice(indexB, 1, insert2[0]);

    return orgData;
  };

  const substitutionUpdate = async () => {
    const payLoad = {
      substitute_player_id: Number(playerListDetails?.team_player_id),
      new_player_id: Number(selectedPlayerList),
      sub_position: substitutionAction,
      reason: substitutionReason,
    };
    updateOrder();
    try {
      const res = await put(
        `substitution/match/${match?.id}/team/${playerListDetails?.team_id}`,
        payLoad
      );
    } catch (e) {
      console.warn(e);
    }
  };
  const updateOrder = async () => {
    let change1;
    let change2;
    if (teamNumber == 1) {
      change1 = playerList1?.findIndex((item: any, ind: number) => {
        return item?.team_player_id == playerListDetails?.team_player_id;
      });
      change2 = playerList1?.findIndex((item: any, ind: number) => {
        return item?.team_player_id == selectedPlayerList;
      });

      const switchedObject = switchObjectsInArray(
        change1,
        change2,
        playerList1
      );

      const updatingOrder = switchedObject?.map((item: any, index: number) => {
        return {
          ...item,
          r_order: index + 1,
          is_starting: index > 8 ? false : true,
        };
      });

      bulkOrderUpdate(updatingOrder, playerListDetails?.team_id, teamNumber);
    }

    if (teamNumber == 2) {
      change1 = playerList2?.findIndex((item: any, ind: number) => {
        if (item?.team_player_id === playerListDetails?.team_player_id)
          return ind;
      });
      change2 = playerList2?.findIndex((item: any, ind: number) => {
        if (item?.team_player_id === selectedPlayerList) return ind;
      });
      const switchedObject = switchObjectsInArray(
        change1,
        change2,
        playerList2
      );

      const updatingOrder = switchedObject?.map((item: any, index: number) => {
        return {
          ...item,
          r_order: index + 1,
          is_starting: index > 8 ? false : true,
        };
      });
      bulkOrderUpdate(updatingOrder, playerListDetails?.team_id, teamNumber);
    }
  };

  const handleSubstitution = () => {
    setSubstitutionModal(true);
    setSelectedPlayerList("");
    setSubstitutionReason("");
    setSubstitutionPositionList([]);
    setReasonListData(reasonList);

    const checkPlayerList1 = playerList1?.some((item: any) => {
      return item?.team_id === playerListDetails?.team_id;
    });

    const checkPlayerList2 = playerList2?.some((item: any) => {
      return item?.team_id === playerListDetails?.team_id;
    });

    let filteredPositionData;

    if (checkPlayerList1) {
      filteredPositionData = playerList1?.filter((item: any) => {
        return item?.primary_position === playerListDetails?.primary_position;
      });
    }

    if (checkPlayerList2) {
      filteredPositionData = playerList2?.filter((item: any) => {
        return item?.primary_position === playerListDetails?.primary_position;
      });
    }
    let addingField: any = [];
    filteredPositionData?.map((item: any) => {
      if (
        playerListDetails?.team_player_id != item?.team_player_id &&
        !item?.old_player_id
      ) {
        addingField = [...addingField, { ...item, checked: false }];
      }
    });
    setSubstitutionPositionList(addingField);
  };

  const handleSubstitutionPlayer = (data: any) => {
    setSelectedPlayerList(data?.team_player_id);
    setSubstitutionPositionList((prev: any) => {
      const newState = prev?.map((item: any) => {
        if (item?.team_player_id === data?.team_player_id) {
          return { ...item, checked: true };
        } else {
          return { ...item, checked: false };
        }
      });
      return newState;
    });
  };

  const handleReason = (val: boolean, data: any) => {
    setReasonListData((prev: any) => {
      const newState = prev?.map((item: any) => {
        if (data?.title === item?.title) {
          setSubstitutionReason(data?.title);
          return { ...item, checked: val };
        } else return { ...item, checked: false };
      });
      return newState;
    });
  };

  const updateListState = (prev: any, data: any, value: boolean) => {
    let newState: any;
    if (data?.primary_position == "SP") {
      newState = prev?.map((item: any) => {
        if (item?.primary_position == "SP") {
          return { ...item, is_starting: value };
        } else if (item?.primary_position == "DH") {
          return { ...item, is_starting: value == true ? false : true };
        } else {
          return { ...item };
        }
      });
    }
    if (data?.primary_position == "DH") {
      newState = prev?.map((item: any) => {
        if (item?.primary_position == "DH") {
          return { ...item, is_starting: value };
        } else if (item?.primary_position == "SP") {
          return { ...item, is_starting: value == true ? false : true };
        } else {
          return { ...item };
        }
      });
    }

    return newState;
  };

  const handleCheckboxRoster = (
    value: any,
    data: any,
    teamType: any,
    teamID: any
  ) => {
    if (allow) {
      if (data?.primary_position == "SP" || data?.primary_position == "DH") {
        if (teamType == 1) {
          setPlayerList1((prev: any) => {
            const newState = updateListState(prev, data, value);
            updatingBulkData(newState, teamType, teamID);
            return newState;
          });
        }
        if (teamType == 2) {
          setPlayerList2((prev: any) => {
            const newState = updateListState(prev, data, value);
            updatingBulkData(newState, teamType, teamID);
            return newState;
          });
        }
      }
    }
  };

  const updatingBulkData = async (data: any, teamType: any, teamID: any) => {
    const changingStarting = [...data]?.slice(0, 10)?.sort((a, b) => {
      return b.is_starting - a.is_starting;
    });
    bulkOrderUpdate(
      [...changingStarting, ...data?.slice(10)],
      teamID,
      teamType
    );
  };

  const handleOnchangeReason = (val: any) => {
    setSubstitutionReason(val);
    setReasonListData((prev: any) => {
      const newState = prev?.map((item: any) => {
        return { ...item, checked: false };
      });
      return newState;
    });
  };

  return (
    <div className="w-full h-[83vh] flex gap-3 overflow-scroll">
      <Toast
        type={toastDetails.type}
        title={toastDetails.title}
        discription={toastDetails.discription}
        logo={toastDetails.logo}
        toggle={toastPopup}
      />
      <div className="w-[35%] h-[82vh]">
        <div className="w-full bg-white border rounded-[10px] h-[90%] overflow-y-scroll overflow-hidden">
          <TeamBoard
            logo={match?.team1_logo_image}
            teamName={match?.team1_name}
            teamPreference={"Home"}
          />
          <div className="px-5">
            <Header
              lastUpdatedTime={match?.matches_updated_at}
              handleFunc={() => {
                if (allow) handleUpdateOrder(playerList1, match?.team1_id, "1");
              }}
              allow={allow}
              stateStatus={playerList1}
              teamLastUpdate={List1UpdatedTime}
            />
          </div>
          <div className="overflow-y-scroll listScroll overflow-hidden  h-[56vh]">
            {depthChartCount ? (
              <div className="w-full h-[55vh] flex justify-center items-center">
                <span
                  className="cursor-pointer text-[#4285F4] mr-1.5"
                  onClick={() => {
                    if (user && allowedDeptChart.includes(user?.title))
                      router.push(
                        `/app/${user?.title}/teams/${match?.team2_id}/depth-chart`
                      );
                  }}
                >
                  Depth Chart
                </span>{" "}
                List is Incomplete
              </div>
            ) : (
              <>
                {playerList1?.length > 0 ? (
                  <PlayerTable
                    tableList={playerList1}
                    selectedPlayerProfile={selectedPlayerProfile}
                    deletePLayer={deleteRosterRemoval}
                    team="1"
                    handleUpdateOrder={handleUpdateOrder}
                    selectedPlayerDetails={selectedPlayerDetails}
                    handleCheckbox={handleCheckboxRoster}
                    allow={allow}
                  />
                ) : (
                  <div className="w-full h-full flex justify-center items-center">
                    <div className="flex items-center">
                      <Spin size="small" />
                      <div className="pr-2 ml-2 font-medium text-[#6B7280]">
                        Loading...
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        {depthChartCount ? (
          <button
            className={`w-[100%] py-3  flex justify-center items-center h-[40px] text-white mt-4 rounded-[4px] cursor-not-allowed bg-[#4285F450] `}
          >
            <Image
              src={addProp}
              alt="add"
              className=" mr-2 "
              width={26}
              height={26}
            />
            Add Player
          </button>
        ) : (
          <AddPlayer
            allow={allow}
            addingPlayer={() => {
              if (allow) {
                addPLayer(match?.team1_name, match?.team1_id, 1);
              }
            }}
            permission={depthChartCount}
          />
        )}
      </div>
      <div className="w-[30%] h-[82vh] bg-white border p-5 rounded-[10px] flex flex-col  items-center">
        <MatchDetails match={match} user={user} />
        {selectedPlayerDetails?.hasOwnProperty("player_id") && (
          <PlayerDetails
            selectedPlayerDetails={selectedPlayerDetails}
            logo={selectedTeamLogo}
          />
        )}
        {(activeUser?.title === "trading_lead" && match?.m_status === 2) ||
          (activeUser?.title === "in_game_trader" && match?.m_status === 2 && (
            <SubstitutionCard
              setSelectedTab={setSelectedTab}
              playerListDetails={playerListDetails}
              setSubstitutionAction={setSubstitutionAction}
              substitutionAction={substitutionAction}
              substitutionUpdate={substitutionUpdate}
              handleSubstitution={handleSubstitution}
            />
          ))}
      </div>
      <div className="w-[35%] h-[82vh]">
        <div className="w-full bg-white border rounded-[10px] h-[90%] overflow-y-scroll overflow-hidden">
          <TeamBoard
            logo={match?.team2_logo_image}
            teamName={match?.team2_name}
            teamPreference={"Away"}
          />
          <div className="px-5">
            <Header
              lastUpdatedTime={match?.matches_updated_at}
              handleFunc={() => {
                if (allow) handleUpdateOrder(playerList1, match?.team1_id, "1");
              }}
              allow={allow}
              stateStatus={playerList2}
              teamLastUpdate={List2UpdatedTime}
            />
          </div>
          <div className="overflow-y-scroll listScroll overflow-hidden h-[56vh]">
            {depthChartCount2 ? (
              <div
                className="w-full h-[55vh] flex justify-center items-center"
                onClick={() => {
                  if (user && allowedDeptChart.includes(user?.title))
                    router.push(
                      `/app/${user?.title}/teams/${match?.team2_id}/depth-chart`
                    );
                }}
              >
                <span className="cursor-pointer text-[#4285F4] mr-1.5">
                  Depth Chart
                </span>{" "}
                List is Incomplete
              </div>
            ) : (
              <>
                {playerList2?.length > 0 ? (
                  <PlayerTable
                    tableList={playerList2}
                    selectedPlayerProfile={selectedPlayerProfile}
                    deletePLayer={deleteRosterRemoval}
                    team="2"
                    handleUpdateOrder={handleUpdateOrder}
                    selectedPlayerDetails={selectedPlayerDetails}
                    handleCheckbox={handleCheckboxRoster}
                    allow={allow}
                  />
                ) : (
                  <div className="w-full h-full flex justify-center items-center">
                    <div className="flex items-center">
                      <Spin size="small" />
                      <div className="pr-2 ml-2 font-medium text-[#6B7280]">
                        Loading...
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        {depthChartCount2 ? (
          <button
            className={`w-[100%] py-3  flex justify-center items-center h-[40px] text-white mt-4 rounded-[4px] cursor-not-allowed bg-[#4285F450] `}
          >
            <Image
              src={addProp}
              alt="add"
              className=" mr-2 "
              width={26}
              height={26}
            />
            Add Player
          </button>
        ) : (
          <AddPlayer
            allow={allow}
            addingPlayer={() => {
              if (allow) {
                addPLayer(match?.team2_name, match?.team2_id, 2);
              }
            }}
            permission={depthChartCount2}
          />
        )}
      </div>
      <Modal
        open={isOpen}
        footer={false}
        closeIcon={false}
        className="rosterModal"
        closable={false}
        centered
        onCancel={handleCancel}
      >
        <RosterAddPlayer
          SelectedPlayer={SelectedPlayer}
          playerList={teamPlayerList}
          DefaultPlayer={DefaultPlayerSecond}
          handleCheckbox={handleCheckbox}
          confirmChanges={confirmChanges}
          handleCancel={handleCancel}
          activeTeam={activeTeam}
          checkingPlayerList={checkingPlayerList}
          playerListError={playerListError}
          updatingCheckbox={updatingCheckbox}
        />
      </Modal>
      <Modal
        open={substitutionModal}
        footer={false}
        closeIcon={false}
        className="substitutionModal"
        closable={false}
        centered
        onCancel={handleCancelSubstitution}
      >
        <SubstitutionModal
          playerListDetails={playerListDetails}
          reasonListData={reasonListData}
          setSubstitutionReason={setSubstitutionReason}
          handleReason={handleReason}
          substitutionReason={substitutionReason}
          substitutionPositionList={substitutionPositionList}
          selectedPlayerList={selectedPlayerList}
          handleOnchangeReason={handleOnchangeReason}
          handleCancelSubstitution={handleCancelSubstitution}
          handleSubstitutionPlayer={handleSubstitutionPlayer}
        />
      </Modal>
    </div>
  );
}

// export default RosterPage;

const reasonList = [
  { id: 1, title: "INJURY", checked: false },
  { id: 2, title: "REGULAR", checked: false },
  { id: 3, title: "SUSPENSION", checked: false },
  { id: 4, title: "OTHER", checked: false },
];
