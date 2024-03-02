import { useState } from 'react';
import DraggableList from 'react-draggable-list';
import { useEffect, useRef } from 'react';
import dragger from '../../../assets/icons/dragger.svg';
import Image from 'next/image';
import Avatar from '@/app/components/global/Avatar';
import AbbriviationForRoster from '@/app/lib/AbbriviationForRoster';

type Props = {
  team: any;
  allow: boolean;
  selectedPlayer: any;
  onPlayerClick: (item: any) => void;
  onOrderChange: (list: any) => void;
};

export default function App({
  team,
  allow,
  onPlayerClick,
  selectedPlayer,
  onOrderChange,
}: Props) {
  const Item = ({ item, itemSelected, dragHandleProps }: any) => {
    const { onMouseDown, onTouchStart } = dragHandleProps;

    return (
      <div
        className={`disable-select m-[1px] flex items-center bg-[#fff] select-none border-b border-[#ddd] cursor-pointer`}
      >
        <div
          className={`select-none dragHandle ml-2.5 ${
            allow ? 'cursor-pointer' : 'cursor-not-allow'
          }`}
          onTouchStart={(e) => {
            e.preventDefault();
            if (allow) {
              (e.target as any).style.backgroundColor = 'blue';
              document.body.style.overflow = 'hidden';
              onTouchStart(e);
            }
          }}
          onMouseDown={(e) => {
            if (allow) {
              document.body.style.overflow = 'hidden';
              onMouseDown(e);
            }
          }}
          onTouchEnd={(e) => {
            if (allow) {
              (e.target as any).style.backgroundColor = 'black';
              document.body.style.overflow = 'visible';
            }
          }}
          onMouseUp={() => {
            if (allow) document.body.style.overflow = 'visible';
          }}
        >
          <Image src={dragger} alt={'drag'} />
        </div>
        <div
          className='flex items-center flex-1 ml-5 pb-[5px] cursor-pointer'
          onClick={(e) => {
            onPlayerClick(item);
          }}
        >
          <div className='bg-[#F0F1F3] w-10 h-10 rounded-[60px] flex justify-center items-center text-[#555] font-semibold text-xs uppercase'>
            <Avatar
              name={`${item.team_players.players.first_name}
                ${item.team_players.players.last_name}`}
            />
          </div>
          <span
            className={`ml-5 flex-1 text-sm ${
              item?.team_player_id === selectedPlayer?.team_player_id
                ? 'text-[#3b82f6]'
                : 'text-[#14171C]'
            }`}
          >
            {item.team_players.players.first_name}{' '}
            {item.team_players.players.last_name}
          </span>
          <span className='text-xs text-[#3b82f6] uppercase mr-[5px]'>
            <AbbriviationForRoster
              value={item.team_players.players.primary_position}
            />
          </span>
        </div>
      </div>
    );
  };

  const [list, setList] = useState(team);
  useEffect(() => {
    setList(team);
  }, [team]);

  const containerRef = useRef(null);

  const _onListChange = (newList: any) => {
    onOrderChange(newList);
    setList(newList);
  };
  return (
    <div className='App'>
      <div ref={containerRef} style={{ touchAction: 'pan-y' }}>
        <DraggableList
          itemKey='id'
          template={Item as any}
          list={list}
          onMoveEnd={(newList: any) => {
            if (allow) _onListChange(newList);
          }}
          container={() => containerRef.current}
        />
      </div>
    </div>
  );
}
