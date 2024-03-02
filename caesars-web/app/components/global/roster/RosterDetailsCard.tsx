import React, { useState } from 'react';
import Image from 'next/image';

// API
import { del } from '@/app/apiIntegrations/fetcher';

// libs
import AbbriviationForRoster from '../../../lib/AbbriviationForRoster';

// components
import RosterDetails from './RosterCard';
import close from '@/app/assets/icons/close-red.svg';

const RosterDetailsCard = (props: any) => {
  const {
    name,
    image,
    position,
    rosterId,
    onDelete,
    allow,
    hideDelete = false,
  } = props;

  const [showClose, setShowClose] = useState(false);

  return (
    <div
      onMouseEnter={(e) => {
        if (allow) setShowClose(true);
      }}
      onMouseLeave={(e) => {
        setShowClose(false);
      }}
      className='w-full h-12 flex items-center justify-between border-b px-2'
      style={{ background: '#fff' }}
    >
      <RosterDetails name={name} image={image} width={35} height={35} />
      {showClose && !hideDelete && (
        <div
          style={{ marginRight: 30, cursor: 'pointer' }}
          onClick={async (e) => {
            try {
              await del(`rosters/${rosterId?.id}`);
              onDelete(rosterId.team_id);
            } catch (e) {
              console.warn(e);
            }
          }}
        >
          <Image src={close} alt={'x'} />
        </div>
      )}
      <div className='text-[#3B82F6]'>
        <AbbriviationForRoster value={position} />
      </div>
    </div>
  );
};

export default RosterDetailsCard;
