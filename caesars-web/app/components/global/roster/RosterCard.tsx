import React from 'react';
import Image, { StaticImageData } from 'next/image';
import Avatar from '../Avatar';

type RosterCardProps = {
  name?: string | any;
  image?: string | StaticImageData;
  position?: string;
  width?: number;
  height?: number;
  color?: string;
  background?: string;
  highLightName?: boolean;
  style?: {};
};

const RosterCard = (props: RosterCardProps) => {
  const {
    name,
    image,
    width,
    height,
    color,
    background,
    position,
    highLightName,
    ...prop
  } = props;

  return (
    <div className='w-full flex items-center'>
      <div
        className='flex items-center justify-center text-xs text-[#555]  uppercase font-semibold w-10 h-10 rounded-[60px]'
        style={{
          background: `${background ? background : ''}`,
        }}
      >
        <Avatar
          image={image}
          name={name}
          width={width}
          height={height}
          background={background}
        />
      </div>
      <p
        className={`pl-3 font-normal   ${highLightName ? 'title' : ''}`}
        style={{
          color: color ? color : '#14171C',
        }}
      >
        {name}
      </p>
      <p
        className='pl-3 text-[#298ed2] text-sm font-small'
        style={{ fontSize: 12 }}
      >
        {position}
      </p>
    </div>
  );
};

export default RosterCard;
