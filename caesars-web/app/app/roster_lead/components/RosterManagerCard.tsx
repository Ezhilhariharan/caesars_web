import Avatar from '@/app/components/global/Avatar';
import { StaticImageData } from 'next/image';
import React from 'react';

type RosterManagerCard = {
  primary?: boolean;
  image?: string | StaticImageData;
  name?: string;
  taskInProgress?: number;
  width?: number;
  height?: number;
};

const RosterManagerCard = (props: RosterManagerCard) => {
  const { primary, image, name, taskInProgress, width, height } = props;

  return (
    <div className={`h-10 flex items-center gap-5 max-[1600px]:gap-5`}>
      <Avatar
        image={image}
        name={name}
        width={width ? width : 38}
        height={height ? height : 32}
      />
      <div
        className={`w-full flex max-[1600px]:flex-col max-[1600px]:items-start ${
          primary
            ? 'flex-col items-start'
            : 'flex-row items-center justify-between'
        }`}
      >
        <p className='text-sm font-normal text-[#121212] capitalize'>{name}</p>
        <p className='text-xs font-normal text-[#54577A] max-[1600px]:mt-1'>
          {taskInProgress}{' '}
          {taskInProgress && taskInProgress > 1 ? 'Matches' : 'Match'} in
          Progress
        </p>
      </div>
    </div>
  );
};

export default RosterManagerCard;
