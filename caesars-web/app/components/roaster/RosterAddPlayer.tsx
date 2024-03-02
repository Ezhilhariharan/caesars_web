"use client";
import React, { useState, useEffect } from "react";

import { Tooltip } from "antd";
import moment from "moment";

// components
import Title from "@/app/components/global/title/Title";
import PlayerListCard from "../teams/PlayerListCard";

type Props = {
  SelectedPlayer: any;
  playerList: any;
  activeTeam: number | any;
  DefaultPlayer: (
    id: string | number,
    team_id: string | number,
    position: string,
    teamType: any,
    list?: any
  ) => void;
  handleCheckbox: (e: any, data: any, position: any) => void;
  confirmChanges: (
    id: any,
    activeTeam: any,
    modalAction: Boolean,
    dataList: any
  ) => void;
  // confirmChanges: (id: any, activeTeam: any, modalAction: Boolean) => void;
  handleCancel: () => void;
  checkingPlayerList: (list: any) => void;
  playerListError: boolean;
  updatingCheckbox: (id: any) => void;
};

const RosterAddPlayer = ({
  SelectedPlayer,
  playerList,
  DefaultPlayer,
  handleCheckbox,
  confirmChanges,
  activeTeam,
  handleCancel,
  checkingPlayerList,
  playerListError,
  updatingCheckbox,
}: Props) => {
  let checkedList: any[] = [];
  const [state, setState] = useState<any>();

  useEffect(() => {
    let playerListCondition = checkingPlayerList(playerList);
    setState(playerListCondition);
  }, [playerList]);

  playerList?.result_data?.map((item: any) => {
    const List = item?.players?.filter((nestedItem: any) => {
      return nestedItem?.checked == true;
    });

    List?.length > 0 && checkedList.push(...List);
  });

  return (
    <div className="bg-white  rounded-lg h-[70vh] ">
      <div className="w-full flex justify-between items-center">
        <div>
          <Title
            title={`${SelectedPlayer} Players list (${checkedList?.length})`}
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#1F2937",
            }}
          />
          <p className="text-sm font-normal text-[#718096] -mt-1 ">
            Select max. of 26 players (28 players in September)
          </p>
        </div>
        <div className="text-[#FB532E] font-normal text-lg">
          {playerListError && "Only 26 player should be selected"}
        </div>
      </div>

      <div className="grid grid-cols-6 gap-x-5 gap-y-10 mt-5 border h-[55vh]  overflow-scroll">
        {playerList?.result_data?.map((team: any) => {
          return (
            <PlayerListCard
              key={team?.position}
              team_id={playerList?.team_details?.team_id}
              position={team?.position}
              lists={team?.players}
              makeAsDefaultPlayer={DefaultPlayer}
              team_name={playerList?.team_details?.team_name}
              playerList={[]}
              setSelectedPlayer={() => {}}
              handleSelectPlayer={() => {}}
              addPlayers={() => {}}
              removePlayer={() => {}}
              clearSelection={() => {}}
              handleCheckbox={handleCheckbox}
              type="roster"
              activeTeam={activeTeam}
              updatingCheckbox={updatingCheckbox}
              // entireList={playerList}
            />
          );
        })}
      </div>
      <div className="flex w-[100%] items-center justify-end mt-5 mb-3">
        <button
          onClick={() => handleCancel()}
          className="w-[150px] py-1.5 text-base font-semibold flex justify-center items-center border-2 border-[#4285F4] text-[#4285F4] rounded-[4px] mr-5"
        >
          Cancel
        </button>
        {state ? (
          <button
            onClick={() =>
              confirmChanges(
                playerList?.team_details?.team_id,
                activeTeam,
                true,
                playerList
              )
            }
            className={`w-[200px] py-2 text-base font-semibold flex justify-center items-center  bg-[#4285F4] text-white rounded-[4px]`}
          >
            Confirm
          </button>
        ) : (
          <Tooltip
            placement="top"
            title={"Starter is mandatory in all Position"}
          >
            <button
              className={`w-[200px] py-2 text-base font-semibold flex justify-center items-center  bg-[#4285F4] text-white rounded-[4px] cursor-not-allowed`}
            >
              Confirm
            </button>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default RosterAddPlayer;
