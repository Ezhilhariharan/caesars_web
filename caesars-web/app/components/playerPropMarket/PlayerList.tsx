"use client";
import React, { useEffect, useState } from "react";
import "./playerPropMarket.css";

// API
import { get } from "@/app/apiIntegrations/fetcher";

// components
import CardContainer from "../global/cardContainer/CardContainer";
import AllPlayerList from "./components/AllPlayerList";
import TeamPlayerList from "./components/TeamPlayerList";
import Avatar from "../global/Avatar";
import SearchBar from "../global/SearchBar";

type Props = {
  match: any;
  selectedPlayer?: {};
  playerPropId: any;
  setPlayerPropId: React.Dispatch<React.SetStateAction<number>>;
  setSelectedPlayer: React.Dispatch<React.SetStateAction<{}>>;
  setgetOdds?: React.Dispatch<React.SetStateAction<any[]>>;
};

const PlayerList = ({
  match,
  selectedPlayer,
  setSelectedPlayer,
  playerPropId,
  setPlayerPropId,
  setgetOdds,
}: Props) => {
  const [selectedTab, setSelectedTab] = useState("all");
  const [allPlayer, setAllPlayer] = useState<any[]>([]);
  const [filterPlayer, setFilterPlayer] = useState("");
  const [team1Roster, setTeam1Roster] = useState([]);
  const [team2Roster, setTeam2Roster] = useState([]);

  useEffect(() => {
    if (match) {
      loadTeam1();
      loadTeam2();
    }
  }, [match]);

  useEffect(() => {
    setAllPlayer([...team1Roster, ...team2Roster]);
    team1Roster?.length > 0 && setSelectedPlayer(team1Roster[0]);
  }, [team1Roster, team2Roster]);

  async function loadTeam1() {
    try {
      const res = await get(
        `/roster-lineupPlayers?match_id=${match?.id}&team_id=${match?.team1_id}`
      );
      setTeam1Roster(res.data);
    } catch (e) {
      console.warn(e);
    }
  }
  async function loadTeam2() {
    try {
      const res = await get(
        `/roster-lineupPlayers?match_id=${match?.id}&team_id=${match?.team2_id}`
      );
      setTeam2Roster(res.data);
    } catch (e) {
      console.warn(e);
    }
  }

  return (
    <div
      className="w-full h-[100%] overflow-hidden"
      // style={{ border: "1px solid red" }}
    >
      <div className="w-full mb-3 border rounded-[4px]">
        <SearchBar
          searchKey={filterPlayer}
          setSearchKey={setFilterPlayer}
          placeholder={"Search Player"}
        />
      </div>
      <div className="h-[78vh]">
        <CardContainer
          header="Select Player"
          contentDescription="Add Markets Only for Starting Lineup"
          style={{
            border: "1px solid #E0E3E8",
            borderRadius: "4px",
            padding: 10,
          }}
          headerStyle={{
            padding: "5px 10px 5px 10px",
          }}
        >
          <div className="flex items-center justify-between border-b px-3 dataSource sticky top-0">
            <div
              className={`w-1/3 h-10  text-[13px] font-medium text-[#14171C] flex items-center justify-center cursor-pointer ${
                selectedTab === "all" ? "bg-[#F0F1F3]" : "bg-transparent"
              }`}
              onClick={(e) => setSelectedTab("all")}
            >
              ALL
            </div>
            <div
              className={`w-1/3 h-10 text-[13px] font-medium text-[#14171C] flex items-center justify-center cursor-pointer ${
                selectedTab === "team1" ? "bg-[#F0F1F3]" : "bg-transparent"
              }`}
              onClick={(e) => setSelectedTab("team1")}
            >
              <Avatar
                image={match?.team1_logo_image}
                name={match?.team1_short_name}
                width={25}
                height={25}
              />
              <p className="pl-1">{match?.team1_short_name}</p>
            </div>
            <div
              className={`w-1/3 h-10 text-[13px] font-medium text-[#14171C] flex items-center justify-center cursor-pointer ${
                selectedTab === "team2" ? "bg-[#F0F1F3]" : "bg-transparent"
              }`}
              onClick={(e) => setSelectedTab("team2")}
            >
              <Avatar
                image={match?.team2_logo_image}
                name={match?.team2_short_name}
                width={25}
                height={25}
              />
              <p className="pl-1">{match?.team2_short_name}</p>
            </div>
          </div>
          <div className="overflow-scroll listScroll min-h-full max-h-[66vh]">
            {selectedTab === "all" && (
              <AllPlayerList
                rosterData={allPlayer}
                filterPlayer={filterPlayer}
                selectedPlayer={selectedPlayer}
                setSelectedPlayer={setSelectedPlayer}
                playerPropId={playerPropId}
                setPlayerPropId={setPlayerPropId}
                setgetOdds={setgetOdds}
              />
            )}
            {selectedTab === "team1" && (
              <TeamPlayerList
                rosterData={team1Roster}
                searchKey={filterPlayer}
                selectedRoster={selectedPlayer}
                onPlayerClick={(r: any) => setSelectedPlayer?.(r)}
              />
            )}
            {selectedTab === "team2" && (
              <TeamPlayerList
                rosterData={team2Roster}
                searchKey={filterPlayer}
                selectedRoster={selectedPlayer}
                onPlayerClick={(r: any) => setSelectedPlayer?.(r)}
              />
            )}
          </div>
        </CardContainer>
      </div>
    </div>
  );
};

export default PlayerList;
