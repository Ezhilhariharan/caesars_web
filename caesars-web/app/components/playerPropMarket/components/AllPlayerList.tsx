import React from "react";
import RosterCard from "../../global/roster/RosterCard";
import { getMarket } from "../../../apiIntegrations/apiClients/market";

type Props = {
  rosterData: any;
  selectedPlayer?: any;
  filterPlayer?: any;
  setSelectedPlayer?: React.Dispatch<React.SetStateAction<{}>>;
  playerPropId: any;
  setPlayerPropId?: React.Dispatch<React.SetStateAction<number>>;
  setgetOdds?: React.Dispatch<React.SetStateAction<any[]>>;
};

const AllPlayerList = ({
  rosterData,
  selectedPlayer,
  filterPlayer,
  setSelectedPlayer,
  playerPropId,
  setPlayerPropId,
  setgetOdds,
}: Props) => {
  return (
    <div className="h-[90%]  last:border-b-0">
      {rosterData.length > 0 ? (
        rosterData?.map((roster: any, i: number) => {
          const searchPlayer = `${roster?.first_name}+${roster?.last_name}`
            .toLowerCase()
            .includes(filterPlayer?.toLowerCase());
          return (
            searchPlayer && (
              <div
                key={i}
                className={`py-2 px-5 border-b border-l-4 cursor-pointer ${
                  roster.team_player_id === selectedPlayer?.team_player_id
                    ? "bg-[#ecf3fe] border-l-[#4285F4]"
                    : "bg-transparent border-l-transparent"
                }`}
                onClick={async () => {
                  setSelectedPlayer?.(roster);
                  try {
                    let market = await getMarket(
                      roster?.match_id,
                      roster?.team_player_id,
                      playerPropId
                    );
                    setgetOdds?.(market.data);
                  } catch (e) {
                    console.warn(e);
                  }
                }}
              >
                <RosterCard
                  name={roster?.first_name + " " + roster?.last_name}
                  image={roster?.image}
                  width={40}
                  height={40}
                />
              </div>
            )
          );
        })
      ) : (
        <div className="text-xs text-center pt-10 pb-5">
          {" "}
          No Players Available
        </div>
      )}
    </div>
  );
};

export default AllPlayerList;
