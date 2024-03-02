import React from 'react';
import PlayerProfile from '../matchLineup/utils/PlayerProfile';
import PlayerInfo from '../matchLineup/utils/PlayerInfo';
import PlayerGameInfo from '../matchLineup/utils/PlayerGameInfo';
import Image, { StaticImageData } from 'next/image';
import playrProfile from '../../../app/assets/player-profile.svg';
import Avatar from '../global/Avatar';

type PlayerDetailsProps = {
  name: string;
  image?: string | StaticImageData;
  fullName?: string;
  position?: string;
  playerProfile?: any;

  draft?: {
    year?: number;
    teamName?: string;
    round: number;
    overAllPick?: any;
  };
  teamName?: string;
  teamLogo: string;
  matchData?: {
    id: number;
    teamName?: string;
    atBat?: number;
    run?: number;
    hit?: number;
    homeRun?: number;
    runBattedIn?: number;
    bb?: number;
    so?: number;
  }[];
};

const PlayerDetails = (props: PlayerDetailsProps) => {
  const {
    name,
    image,
    fullName,
    position,
    draft,
    matchData,
    teamName,
    teamLogo,
    playerProfile,
  } = props;

  return (
    <div className='px-3 pt-3 pb-5'>
      <h2 className='text-[20px] font-semibold flex items-center text-[#141522] mb-5 max-[1600px]:text-md'>
        <Avatar image={teamLogo} name={teamName} width={40} height={40} />
        <p className='pl-2'>{teamName} Player Details</p>
      </h2>
      <div className=''>
        <div className='flex gap-5 max-[1600px]:flex-col max-[1600px]:justify-center'>
          <div className='flex-1'>
            <PlayerProfile playerName={name} />
          </div>
          <div className='flex-1'>
            <PlayerInfo
              playerProfile={playerProfile}
              fullName={fullName}
              position={position}
              draft={draft}
            />
          </div>
        </div>
        <div className='mt-5'>
          {/* <PlayerGameInfo matchData={matchData} /> */}
        </div>
      </div>
    </div>
  );
};

export default PlayerDetails;
