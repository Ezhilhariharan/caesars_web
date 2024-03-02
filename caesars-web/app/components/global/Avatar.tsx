'use client';
import Image, { StaticImageData } from 'next/image';
import React from 'react';

type Props = {
  primary?: boolean;
  image?: string | StaticImageData;
  name?: string | null;
  width?: number;
  height?: number;
  background?: string;
  style?: {};
  iconStyle?: {};
};

const Avatar = ({
  primary = false,
  image,
  name,
  width,
  height,
  background,
  style,
  iconStyle,
  ...prop
}: Props) => {
  let logo = '';

  const nameShort = name?.split(' ');
  nameShort?.map((name) => (logo += name?.slice(0, 1)));

  return (
    <div
      className=''
      style={{
        width: `${width}px`,
        height: `${height}px`,
        ...style,
      }}
    >
      {image ? (
        <div className='w-full h-full flex justify-center items-center overflow-hidden'>
          {image && (
            <Image
              src={image}
              alt='alt'
              width={width && Math.round(width / 1.5)}
              height={height && Math.round(height / 1.5)}
            />
          )}
        </div>
      ) : (
        <div
          className='w-full text-sm h-full tracking-wide rounded-full flex justify-center font-bold items-center bg-gray-100'
          style={{
            width: width,
            height: height,
            background: background,
            ...iconStyle,
          }}
        >
          {primary ? name : logo.toUpperCase()}
        </div>
      )}
    </div>
  );
};

export default Avatar;
