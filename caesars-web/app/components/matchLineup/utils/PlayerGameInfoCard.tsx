import React from "react";

type PlayerGameInfoCardProps = {
  teamName?: string;
  atBat?: string;
  run?: string;
  hit?: string;
  homeRun?: string;
  runBattedIn?: string;
};

const PlayerGameInfoCard = (props: PlayerGameInfoCardProps) => {
  const { teamName, atBat, run, hit, homeRun, runBattedIn } = props;
  return (
    <div className="h-12 flex items-center text-center px-2 text-[#333] border border-[#ededed] border-t-0 text-xs">
      <p className="w-[124px] h-full flex items-center text-[11px] font-normal text-left border-r border-[#ededed]">
        {teamName}
      </p>
      <p className="w-14 text-xs">{atBat}</p>
      <p className="w-8">{run}</p>
      <p className="w-8">{hit}</p>
      <p className="w-11">{homeRun}</p>
      <p className="w-12">{runBattedIn}</p>
    </div>
  );
};

export default PlayerGameInfoCard;
