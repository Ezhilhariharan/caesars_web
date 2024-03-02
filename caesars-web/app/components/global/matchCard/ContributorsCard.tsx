import Image, { StaticImageData } from 'next/image';
import React from 'react';
import Avatar from '../Avatar';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  middle_name: string;
}

type Props = {
  user?: User[];
  width?: number;
  height?: number;
  style?: {};
};

const ContributorsCard = ({ user, width = 40, height = 40, style }: Props) => {
  return (
    <div className='max-w-auto h-auto flex items-center'>
      {user?.map((data) => {
        return (
          <div key={data?.id} className='w-6 h-6 -ml-2'>
            <Avatar
              image={''}
              name={`${data?.first_name} ${data?.last_name}`}
              width={width}
              height={height}
              iconStyle={style}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ContributorsCard;
