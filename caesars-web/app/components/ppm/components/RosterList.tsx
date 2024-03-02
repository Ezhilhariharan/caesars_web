"use client";
import React from "react";

// components
import { StaticImageData } from "next/image";
import CardContainer from "../../global/cardContainer/CardContainer";
import Avatar from "../../global/Avatar";
import TeamPlayerList from "../../playerPropMarket/components/TeamPlayerList";

type Props = {
  matchId?: number;
  selectedTeam: string;
  rosterData: any[];
  searchKey: string;
  selectedRoster: any;
  onRosterClick: (r: any) => void;
  showTabs?: boolean;
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
  onTabClick: (team: any) => void;
};

const RosterList = (props: Props) => {
  const {
    matchId,
    showTabs,
    selectedTeam,
    selectedRoster,
    searchKey,
    team1,
    team2,
    rosterData,
    onTabClick,
    onRosterClick,
  } = props;

  const tabs = [
    {
      id: 1,
      filter: "all",
      short_name: "ALL",
      name: null,
      logo: null,
      onClick: (t: any) => onTabClick(t),
    },
    {
      id: 2,
      filter: "team1",
      short_name: team1?.short_name,
      name: team1?.name,
      logo: team1?.logo,
      onClick: (t: any) => onTabClick(t),
    },
    {
      id: 1,
      filter: "team2",
      short_name: team2?.short_name,
      name: team1?.name,
      logo: team2?.logo,
      onClick: (t: any) => onTabClick(t),
    },
  ];

  return (
    <CardContainer
      header="Select Player"
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "4px",
        overflow: "hidden",
        // overflowY: 'scroll',
      }}
      headerStyle={{
        padding: 20,
      }}
    >
      {/* <div className='my-5 px-5'>Select Player</div> */}
      <div className="flex items-center justify-between border-b px-5 bg-white">
        {tabs.map((t: any) => {
          return (
            <div
              className={`w-1/3 h-10 mx-1 text-[13px] font-medium text-[#14171C] flex items-center justify-center cursor-pointer capitalize ${
                selectedTeam === t.filter ? "bg-[#F0F1F3]" : "bg-transparent"
              }`}
              onClick={() => t.onClick(t)}
            >
              {t.logo && (
                <Avatar
                  image={t.logo}
                  name={t.short_name}
                  width={30}
                  height={30}
                />
              )}
              <p className="pl-1">{t.short_name}</p>
            </div>
          );
        })}
      </div>
      <div className="h-[calc(95%)] overflow-y-scroll">
        <TeamPlayerList
          rosterData={rosterData}
          searchKey={searchKey}
          selectedRoster={selectedRoster}
          onPlayerClick={onRosterClick}
        />
      </div>
    </CardContainer>
  );
};

export default RosterList;
