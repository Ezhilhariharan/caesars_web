import React from 'react';
import { StaticImageData } from 'next/image';
import Avatar from '../../global/Avatar';

type PlayerProfileProps = {
  playerName?: string;
  // playerImage: string | StaticImageData;
};

const PlayerProfile = (props: PlayerProfileProps) => {
  const { playerName } = props;
  return (
    <div className='w-[141px] h-full py-3 flex flex-col justify-center items-center border border-[#E0E3E8] rounded-[4px]'>
      <h2
        className='text-[15px] font-semibold mb-2 text-[#3C4653]'
        style={{ textAlign: 'center' }}
      >
        {playerName}
      </h2>
      <Avatar
        // image={playerImage}
        name={playerName}
        width={70}
        height={70}
        primary={false}
      />
    </div>
  );
};

export default PlayerProfile;
