'use client';
import React from 'react';
import Image from 'next/image';

import addProp from '../../assets/addProp.svg';

type Props = { addingPlayer: () => void; allow: any; permission: Boolean };

const AddPlayer = ({ addingPlayer, allow, permission }: Props) => {
  return (
    <button
      onClick={() => addingPlayer()}
      className={`w-[100%] py-3  flex justify-center items-center h-[40px] text-white mt-4 rounded-[4px] 
      ${
        allow
          ? 'cursor-pointer bg-[#4285F4]'
          : 'cursor-not-allowed bg-[#4285F450]'
      }
`}
    >
      <Image
        src={addProp}
        alt='add'
        className=' mr-2 '
        width={26}
        height={26}
      />
      Add Player
    </button>
  );
};

export default AddPlayer;
