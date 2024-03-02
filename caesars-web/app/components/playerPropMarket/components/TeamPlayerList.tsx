import React from "react";
import RosterCard from "../../global/roster/RosterCard";

type Props = {
  rosterData: any;
  selectedRoster?: any;
  searchKey?: any;
  onPlayerClick: (r: any) => void;
};

const TeamPlayerList = ({
  rosterData,
  selectedRoster,
  searchKey,
  onPlayerClick,
}: Props) => {
  return (
    <div className="h-[90%] overflow-y-scroll last:border-b-0">
      {rosterData.length > 0 ? (
        rosterData?.map((roster: any, i: number) => {
          const searchPlayer = `${roster?.first_name}+${roster?.last_name}`
            .toLowerCase()
            .includes(searchKey.toLowerCase());
          return (
            searchPlayer && (
              <div
                key={i}
                className={`py-2 border-b border-l-4 cursor-pointer px-5 ${
                  selectedRoster?.team_player_id === roster.team_player_id
                    ? "bg-[#ecf3fe] border-l-[#4285F4]"
                    : "bg-transparent border-l-transparent"
                }`}
                onClick={() => onPlayerClick(roster)}
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
          No Players Available
        </div>
      )}
    </div>
  );
};

export default TeamPlayerList;
