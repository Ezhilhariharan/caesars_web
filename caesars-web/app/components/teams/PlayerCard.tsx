// import React from 'react';
// import Image from 'next/image';

// // icons
// import xMark from '../assets/close.svg';
// import dots from '../assets/dots-vertical.svg';

// // components
// import Avatar from '@/app/components/global/Avatar';

// // antd
// import { Popover, Checkbox } from 'antd';

// type Props = {
//   id: string | number;
//   name: string;
//   isStarter: boolean;
//   position: string;
//   team_id: string | number;
//   makeAsDefaultPlayer: (
//     id: string | number,
//     team_id: string | number,
//     position: string,
//     teamType: any
//   ) => void;
//   removePlayer: (id: string | number) => void;
//   type?: string;
//   checked?: boolean;
//   item?: any;
//   handleCheckbox: (e: any, id: any, position: any) => void;
//   activeTeam: any;
// };

// const PlayerCard = (props: Props) => {
//   const {
//     id,
//     name,
//     isStarter,
//     position,
//     team_id,
//     makeAsDefaultPlayer,
//     removePlayer,
//     type,
//     checked,
//     handleCheckbox,
//     item,
//     activeTeam,
//   } = props;

//   const playerActions = (
//     <div className='w-auto h-auto p-2.5'>
//       {type === 'roster' && (
//         <div
//           className={`py-1 ${
//             checked ? 'cursor-pointer' : 'cursor-not-allowed'
//           }`}
//           onClick={() => {
//             checked && makeAsDefaultPlayer(id, team_id, position, activeTeam);
//           }}
//         >
//           Make as Default Starter
//         </div>
//       )}
//       {type !== 'roster' && (
//         <div
//           className={`py-1 cursor-pointer`}
//           onClick={() => {
//             makeAsDefaultPlayer(id, team_id, position, activeTeam);
//           }}
//         >
//           Make as Default Starter
//         </div>
//       )}
//       {/* <div className='py-1'>Change the MPL</div>
//       <div className='py-1'>Change the Playing Likelihood</div> */}
//     </div>
//   );

//   const handleStarter = (position: any, type: any) => {
//     if (position === 'BN' && type === 'roster') return false;
//     else if (position === 'CLOSER' && type === 'roster') return false;
//     else return true;
//   };

//   return (
//     <div className='w-full h-12 flex items-center justify-between border-b border-[#E0E3E8]'>
//       <div className='h-full flex items-center gap-1.5'>
//         {handleStarter(position, type) && (
//           <div
//             className={`w-4 h-full flex items-center justify-center text-xs text-white bg-[${
//               isStarter ? '#4285F4' : ''
//             }]`}
//           >
//             {isStarter && 'S'}
//           </div>
//         )}
//         <div className='flex items-center gap-1.5'>
//           <Avatar
//             name={name}
//             width={25}
//             height={25}
//             iconStyle={{
//               fontSize: 11,
//             }}
//           />
//           <p className='text-xs font-normal text-[#0066CC] pr-1'>{name}</p>
//         </div>
//       </div>
//       <div className='flex items-center justify-between gap-2.5'>
//         <Popover trigger={['click']} placement='bottom' content={playerActions}>
//           <Image src={dots} alt='action icon' className='cursor-pointer' />
//         </Popover>
//         {type === 'roster' ? (
//           <Checkbox
//             checked={checked}
//             onChange={(e) => handleCheckbox(e, item, position)}
//             className='mr-2'
//           />
//         ) : (
//           <Image
//             src={xMark}
//             alt='remove icon'
//             className='cursor-pointer'
//             onClick={() => removePlayer(id)}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default PlayerCard;

import React from "react";
import Image from "next/image";

// icons
import xMark from "./assets/close.svg";
import dots from "./assets/dots-vertical.svg";

// components
import Avatar from "@/app/components/global/Avatar";

// antd
import { Checkbox, Dropdown, MenuProps } from "antd";
import Xmark from "@/app/assets1/custom-icons/Xmark";
import DotsHorizontal from "@/app/assets1/custom-icons/dots/DotsHorizontal";
import { optionalStarterPositionList } from "./PlayerListCard";

type Props = {
  id: string | number;
  name: string;
  isStarter: boolean;
  position: string;
  team_id: string | number;
  makeAsDefaultPlayer: (
    id: string | number,
    team_id: string | number,
    position: string,
    teamType: any
  ) => void;
  removePlayer: (id: string | number) => void;
  type?: string;
  checked?: boolean;
  item?: any;
  handleCheckbox: (e: any, id: any, position: any) => void;
  activeTeam: any;
};

const PlayerCard = (props: Props) => {
  const {
    id,
    name,
    isStarter,
    position,
    team_id,
    makeAsDefaultPlayer,
    removePlayer,
    type,
    checked,
    handleCheckbox,
    item,
    activeTeam,
  } = props;

  const playerActions = (
    <div className="w-auto  p-2.5 ">
      {type === "roster" && (
        <div
          className={`py-1 ${
            checked ? "cursor-pointer" : "cursor-not-allowed"
          }`}
          onClick={() => {
            checked && makeAsDefaultPlayer(id, team_id, position, activeTeam);
          }}
        >
          Make as Default Starter
        </div>
      )}
      {type !== "roster" && (
        <div
          className={`py-1 cursor-pointer`}
          onClick={() => {
            makeAsDefaultPlayer(id, team_id, position, activeTeam);
          }}
        >
          Make as Default Starter
        </div>
      )}
      {/* <div className='py-1'>Change the MPL</div>
      <div className='py-1'>Change the Playing Likelihood</div> */}
    </div>
  );

  const handleStarter = (position: any, type: any) => {
    if (position === "BN" && type === "roster") return false;
    else if (position === "CLOSER" && type === "roster") return false;
    else return true;
  };

  const items: MenuProps["items"] = [
    {
      key: 0,
      onClick: () => {
        if (type === "roster" && checked) {
          makeAsDefaultPlayer(id, team_id, position, activeTeam);
        } else {
          type !== "roster" &&
            makeAsDefaultPlayer(id, team_id, position, activeTeam);
        }
      },
      label: (
        <div
          className={`py-1 ${
            (type === "roster" && checked) || type !== "roster"
              ? "cursor-pointer"
              : "cursor-not-allowed"
          }`}
        >
          Make as Default Starter
        </div>
      ),
    },
  ];

  return (
    <div className="w-full min-h-[50px] flex items-center justify-between border-b border-[#E0E3E8]">
      <div className="h-full flex items-center gap-1.5">
        {handleStarter(position, type) && (
          <div
            className={`w-4 h-full flex items-center justify-center text-xs text-white bg-[${
              isStarter ? "#4285F4" : ""
            }]`}
          >
            {isStarter && "S"}
          </div>
        )}

        <div className="flex items-center gap-1.5">
          <Avatar
            name={name}
            width={25}
            height={25}
            iconStyle={{
              fontSize: 11,
            }}
          />
          <p className="text-xs font-normal text-[#0066CC] pr-1">{name}</p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-2.5">
        {!optionalStarterPositionList.includes(position) && (
          <Dropdown
            trigger={["click"]}
            arrow
            placement="bottom"
            menu={{
              items: items,
            }}
          >
            <div className="cursor-pointer">
              <DotsHorizontal color="#64748B" size={20} />
            </div>
          </Dropdown>
        )}

        {type === "roster" ? (
          <Checkbox
            checked={checked}
            onChange={(e) => handleCheckbox(e, item, position)}
            className="mr-2"
          />
        ) : (
          <button
            className="w-4 h-4 flex justify-center bg-[#F96767] rounded-[4px]"
            onClick={() => removePlayer(id)}
          >
            <Xmark size={16} color="#fff" />
          </button>
        )}
      </div>
    </div>
  );
};

export default PlayerCard;
