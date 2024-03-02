import Avatar from '@/app/components/global/Avatar';
import React from 'react';

type Props = {
  id: string;
  name: string;
  position: string;
};

const RosterCard = (props: Props) => {
  const { id, name, position } = props;
  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center gap-2.5'>
        <Avatar name={name} width={30} height={30} />
        <p className='text-[#0066CC] text-sm font-normal capitalize'>{name}</p>
      </div>
      <div className='uppercase text-sm font-normal text-[#6C6D6F]'>
        {position}
      </div>
    </div>
  );
};

export default RosterCard;
