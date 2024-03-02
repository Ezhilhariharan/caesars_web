'use client';
import React, { useState } from 'react';

// components
import RosterCard from './RosterCard';

// antd
import { Modal } from 'antd';
import SearchBar from '../global/SearchBar';

type Props = {
  teamName: string;
  teamId: string | number;
  position: string;
  isOpen: boolean;
  playerList: any[];
  handleSelectPlayer: (position: string, playerId: number) => void;
  checkPosition: (p: string) => string[];
  addPlayers: () => void;
  closeModal: () => void;
};

const AddPlayerModal = (props: Props) => {
  const {
    teamName,
    teamId,
    isOpen,
    position,
    playerList,
    handleSelectPlayer,
    checkPosition,
    addPlayers,
    closeModal,
  } = props;
  const [searchKey, setSearchKey] = useState('');

  let list: any = [];

  const pl = playerList.filter((p) =>
    `${p?.first_name} ${p?.last_name}`
      ?.toLowerCase()
      ?.includes(searchKey?.toLowerCase())
  );

  list = [...pl];

  const selectedPlayer = playerList?.filter((p) => p?.is_select);

  return (
    <Modal
      centered
      className='max-w-[100%] min-w-[50%]'
      open={isOpen}
      footer={false}
      closeIcon={false}
      onCancel={() => closeModal()}
    >
      <div className='flex items-center justify-between h-10'>
        <div className='flex justify-center text-[28px] font-semibold text-[#1F2937] capitalize'>
          {teamName} {position !== 'DH' ? `${position}` : 'Roster'} List
        </div>
        <SearchBar
          searchKey={searchKey}
          setSearchKey={setSearchKey}
          style={{
            maxWidth: 300,
          }}
        />
      </div>
      <div className='max-h-[45vh] grid grid-cols-2 mt-5 overflow-y-scroll [&>:nth-child(4n)]:bg-[#F9F9F9] [&>:nth-child(4n-1)]:bg-[#F9F9F9]'>
        {list?.length > 0 &&
          list?.map((p: any) => {
            return (
              // checkPosition(position).includes(p?.p_primary_position) &&
              !p?.is_selected && (
                <div
                  key={p?.player_id}
                  className={`w-full h-12 flex items-center gap-2.5 odd:pr-5 even:pl-5 ${
                    p?.is_selected ? 'cursor-not-allowed' : 'cursor-pointer'
                  }`}
                  onClick={() => {
                    if (!p?.is_selected)
                      handleSelectPlayer(position, p?.team_player_id);
                  }}
                >
                  <input
                    type='checkbox'
                    checked={
                      p?.is_selected ? true : p?.is_select ? true : false
                    }
                    className={`w-1/12 ${
                      p?.is_selected ? 'cursor-not-allowed' : 'cursor-pointer'
                    }`}
                    // onChange={() => {
                    //   if (!p?.is_selected)
                    //     handleSelectPlayer(position, p?.team_player_id);
                    // }}
                  />
                  <div className='w-11/12'>
                    <RosterCard
                      id={p?.player_id}
                      name={`${p?.first_name} ${p?.last_name}`}
                      position={p?.p_primary_position}
                    />
                  </div>
                </div>
              )
            );
          })}
      </div>
      {list?.length === 0 && (
        <div className='w-full h-full'>
          <div className='flex items-center justify-center'>No Players</div>{' '}
        </div>
      )}
      <div className='flex justify-end items-center gap-5 mt-10'>
        <button
          className='w-auto h-10 text-base font-semibold px-5 border-2 border-[#4285F4] text-[#4285F4] rounded-[4px]'
          onClick={() => closeModal()}
        >
          Cancel
        </button>
        <button
          className={`w-auto h-10 text-base font-semibold px-5 text-white rounded-[4px] ${
            selectedPlayer.length > 0
              ? 'bg-[#4285F4] cursor-pointer'
              : 'bg-[#4285F450] cursor-not-allowed'
          }`}
          onClick={() => {
            if (selectedPlayer.length > 0) {
              addPlayers();
              closeModal();
            }
          }}
        >
          Add Player
        </button>
      </div>
    </Modal>
  );
};

export default AddPlayerModal;
