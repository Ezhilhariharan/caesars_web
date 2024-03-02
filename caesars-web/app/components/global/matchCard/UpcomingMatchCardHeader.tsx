import React from 'react';

// components
import Avatar from '../Avatar';
import DotsVertical from '@/app/assets1/custom-icons/dots/Dotsvertical';

type MatchCardHeaderProps = {
  team1_image?: any;
  team2_image?: any;
  team1_name?: string | null;
  team2_name?: string | null;
  toggle?: boolean;
  setToggle?: React.Dispatch<React.SetStateAction<boolean>>;
  style?: {};
  primary?: boolean;
};

const UpcomingMatchCardHeader = (props: MatchCardHeaderProps) => {
  const {
    primary = true,
    team1_image,
    team2_image,
    team1_name,
    team2_name,
    toggle,
    setToggle,
    ...prop
  } = props;

  return (
    <article
      className={`flex items-enter pt-6 px-6 ${
        toggle ? 'h-10 justify-between' : 'h-[100px] justify-center'
      }`}
      {...prop}
    >
      <div
        className={`flex items-center py-3 ${
          toggle ? 'w-[150px] justify-start' : 'w-[280px] justify-center'
        }`}
      >
        <Avatar
          image={team1_image}
          name={team1_name}
          width={toggle ? 40 : 60}
          height={toggle ? 40 : 60}
          primary={true}
        />
        <p
          className={`font-semibold text-black ${
            toggle ? 'text-sm px-1' : 'text-xl px-7'
          }`}
        >
          VS
        </p>
        <Avatar
          image={team2_image}
          name={team2_name}
          width={toggle ? 40 : 60}
          height={toggle ? 40 : 60}
          primary={true}
        />
      </div>
      {primary && (
        <div
          className='flex items-start justify-end p-1 cursor-pointer'
          onClick={() => {
            if (setToggle) setToggle(!toggle);
          }}
        >
          <DotsVertical color='#6B6B6B' size={18} />
        </div>
      )}
    </article>
  );
};

export default UpcomingMatchCardHeader;
