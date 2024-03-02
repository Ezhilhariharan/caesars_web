import React from 'react';

type Props = {
  id: any;
  top: number;
  left: number;
  menu: any[];
  deatils: any;
  onClick: (d: any, item: any) => void;
};

const MenuList = (props: Props) => {
  const { id, top, left, menu, deatils, onClick } = props;

  return (
    <div
      className={`px-5 py-2.5 min-w-[100px] bg-white flex flex-col justify-center text-left rounded-md z-20 absolute shadow-lg`}
      style={{
        top: top + 'px',
        left: left + 'px',
      }}
    >
      {menu.map((m) => {
        return (
          <p
            key={m.id}
            className='py-1 text-sm font-medium capitalize'
            onClick={() => {
              if (deatils?.matchId === id) onClick(deatils, m);
            }}
          >
            {m.name === 'pin' ? (deatils.isPinned ? 'Unpin' : 'pin') : m.name}
          </p>
        );
      })}
    </div>
  );
};

export default MenuList;
