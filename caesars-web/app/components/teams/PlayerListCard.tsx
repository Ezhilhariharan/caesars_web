// 'use client';
// import Image from 'next/image';
// import React, { useEffect, useState } from 'react';

// // icons
// import add from '../assets/add.svg';

// // components
// import PlayerCard from './PlayerCard';
// import AddPlayerModal from './AddPlayerModal';
// import { playerSelectionProps } from '../[teamId]/depth-chart/page';

// type Props = {
//   team_id: string | number;
//   team_name: string;
//   position: string;
//   lists: any[];
//   playerList: any[];
//   setSelectedPlayer: React.Dispatch<React.SetStateAction<playerSelectionProps>>;
//   handleSelectPlayer: (position: string, playerId: number) => void;
//   addPlayers: () => void;
//   removePlayer: (playerId: string | number) => void;
//   clearSelection: () => void;
//   makeAsDefaultPlayer: (
//     id: string | number,
//     team_id: string | number,
//     position: string,
//     teamType?: any
//   ) => void;
//   type?: string;
//   handleCheckbox: (e: any, id: any, position: any) => void;
//   activeTeam?: any;
// };

// // positions
// const pitcher = ['SP', 'BN', 'CLOSER'];
// const infileder = ['1B', '2B', '3B', 'SS'];
// const outfileder = ['LF', 'CF', 'RF'];
// const catcher = ['C'];

// // Don't want to add starter in the position in the list
// const optionalStarterPositionList = ['BN', 'CLOSER'];

// const PlayerListCard = (props: Props) => {
//   const {
//     position,
//     lists,
//     team_id,
//     team_name,
//     playerList,
//     setSelectedPlayer,
//     handleSelectPlayer,
//     addPlayers,
//     removePlayer,
//     clearSelection,
//     makeAsDefaultPlayer,
//     type,
//     handleCheckbox,
//     activeTeam,
//   } = props;

//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     checkIsStarter();
//   }, []);

//   const checkIsStarter = () => {
//     const starter = lists.filter((l) => l.is_starter === true);
//     if (lists?.length !== 0 && starter?.length === 0) {
//       if (type == 'roster') {
//         makeAsDefaultPlayer(
//           lists[0]?.team_player_id,
//           team_id,
//           position,
//           activeTeam
//         );
//       } else {
//         if (!optionalStarterPositionList.includes(position)) {
//           makeAsDefaultPlayer(lists[0]?.team_player_id, team_id, position);
//         }
//       }
//     }
//   };

//   const closeModal = () => {
//     clearSelection();
//     setIsOpen(false);
//     setSelectedPlayer({
//       position: '',
//       player_id: [],
//     });
//   };

//   const checkPosition = (p: string) => {
//     if (pitcher.includes(p)) return ['pitcher'];
//     else if (infileder.includes(p)) return ['infielder'];
//     else if (outfileder.includes(p)) return ['outfielder'];
//     else if (catcher.includes(p)) return ['catcher'];
//     else if (p === 'DH') return ['infielder', 'outfielder', 'catcher'];
//     return [];
//   };

//   const checkingStarter = (lists: any) => {
//     const checkedData = lists?.filter((data: any) => data?.is_starter);
//     return checkedData?.length > 0 ? false : type === 'roster' ? true : false;
//   };

//   return (
//     <div className='w-full'>
//       <div
//         title='Starter is mandatory'
//         className={` uppercase py-1.5 bg-[#F5F6F7] flex justify-center items-center ${
//           checkingStarter(lists) && position != 'BN' && position != 'CLOSER'
//             ? 'border border-[#FB532E]'
//             : ''
//         }`}
//       >
//         {position}
//         <span className='text-[10px] font-normal text-[#718096] ml-2'>
//           {checkingStarter(lists) && position != 'BN' && position != 'CLOSER'
//             ? '(min 1)'
//             : ''}
//         </span>
//       </div>
//       <div className='flex flex-col items-start'>
//         {lists?.map((l: any) => {
//           return (
//             <PlayerCard
//               key={l.team_player_id}
//               id={l.team_player_id}
//               team_id={team_id}
//               isStarter={l.is_starter}
//               name={l.full_name}
//               position={position}
//               makeAsDefaultPlayer={makeAsDefaultPlayer}
//               removePlayer={removePlayer}
//               type={type}
//               checked={l?.checked}
//               item={l}
//               handleCheckbox={handleCheckbox}
//               activeTeam={activeTeam}
//             />
//           );
//         })}
//       </div>
//       {type != 'roster' && (
//         <div className='flex flex-col items-center mt-5'>
//           <button
//             className='w-2/3 h-8 text-[#4285F4] border border-[rgb(66,133,244)] flex items-center justify-center gap-2.5 rounded-[4px]'
//             onClick={() => setIsOpen(true)}
//           >
//             <Image src={add} alt='add icon' width={16} height={16} />
//             <span className='text-sm font-semibold'>Add Player</span>
//           </button>
//         </div>
//       )}
//       {type != 'roster' && (
//         <AddPlayerModal
//           isOpen={isOpen}
//           teamName={team_name}
//           closeModal={closeModal}
//           teamId={team_id}
//           position={position}
//           playerList={playerList}
//           handleSelectPlayer={handleSelectPlayer}
//           addPlayers={addPlayers}
//           checkPosition={checkPosition}
//         />
//       )}
//     </div>
//   );
// };

// export default PlayerListCard;

"use client";
import React, { useEffect, useState } from "react";

// custom-icons
import Plus from "@/app/assets1/custom-icons/Plus";

// components
import PlayerCard from "./PlayerCard";
import AddPlayerModal from "./AddPlayerModal";

export type playerSelectionProps = {
  position: string;
  player_id: number[];
};

type Props = {
  team_id: string | number;
  team_name: string;
  position: string;
  lists: any[];
  playerList: any[];
  setSelectedPlayer: React.Dispatch<React.SetStateAction<playerSelectionProps>>;
  handleSelectPlayer: (position: string, playerId: number) => void;
  addPlayers: () => void;
  removePlayer: (playerId: string | number) => void;
  clearSelection: () => void;
  makeAsDefaultPlayer: (
    id: string | number,
    team_id: string | number,
    position: string,
    teamType?: any
  ) => void;
  type?: string;
  handleCheckbox: (e: any, id: any, position: any) => void;
  activeTeam?: any;
  updatingCheckbox: (id: any) => void;
};

// positions
const pitcher = ["SP", "BN", "CLOSER"];
const infileder = ["1B", "2B", "3B", "SS"];
const outfileder = ["LF", "CF", "RF"];
const catcher = ["C"];

// Don't want to add starter in the position in the list
export const optionalStarterPositionList = ["BN", "CLOSER"];

const PlayerListCard = (props: Props) => {
  const {
    position,
    lists,
    team_id,
    team_name,
    playerList,
    setSelectedPlayer,
    handleSelectPlayer,
    addPlayers,
    removePlayer,
    clearSelection,
    makeAsDefaultPlayer,
    type,
    handleCheckbox,
    activeTeam,
    updatingCheckbox,
  } = props;

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    checkIsStarter();
  }, [lists]);

  const checkIsStarter = () => {
    const starter = lists.filter((l) => l.is_starter === true);

    if (lists?.length !== 0 && starter?.length === 0) {
      if (type == "roster") {
        // makeAsDefaultPlayer(
        //   lists[0]?.team_player_id,
        //   team_id,
        //   position,
        //   activeTeam
        // );
      } else {
        if (!optionalStarterPositionList.includes(position)) {
          makeAsDefaultPlayer(lists[0]?.team_player_id, team_id, position);
        }
      }
    }
  };

  const closeModal = () => {
    clearSelection();
    setIsOpen(false);
    setSelectedPlayer({
      position: "",
      player_id: [],
    });
  };

  const checkPosition = (p: string) => {
    if (pitcher.includes(p)) return ["pitcher", "default"];
    else if (infileder.includes(p)) return ["infielder", "default"];
    else if (outfileder.includes(p)) return ["outfielder", "default"];
    else if (catcher.includes(p)) return ["catcher", "default"];
    else if (p === "DH")
      return [
        "infielder",
        "outfielder",
        "catcher",
        "default",
        "designated hitter",
      ];
    return [];
  };

  const checkingStarter = (lists: any) => {
    const checkedData = lists?.filter((data: any) => data?.is_starter);
    return checkedData?.length > 0 ? false : type === "roster" ? true : false;
  };

  return (
    <div className="w-full ">
      <div
        title="Starter is mandatory"
        className={` uppercase py-1.5 bg-[#F5F6F7] flex justify-center items-center ${
          checkingStarter(lists) && position != "BN" && position != "CLOSER"
            ? "border border-[#FB532E]"
            : ""
        }`}
      >
        {position}
        <span className="text-[10px] font-normal text-[#718096] ml-2">
          {checkingStarter(lists) && position != "BN" && position != "CLOSER"
            ? "(min 1)"
            : ""}
        </span>
      </div>
      <div className="flex flex-col items-start h-[23vh] listScroll overflow-scroll">
        {lists?.length > 0 &&
          lists?.map((l: any) => {
            return (
              <PlayerCard
                key={l.team_player_id}
                id={l.team_player_id}
                team_id={team_id}
                isStarter={l.is_starter}
                name={l.full_name}
                position={position}
                makeAsDefaultPlayer={makeAsDefaultPlayer}
                removePlayer={removePlayer}
                type={type}
                checked={l?.checked}
                item={l}
                handleCheckbox={handleCheckbox}
                activeTeam={activeTeam}
              />
            );
          })}
        {lists?.length === 0 && (
          <div className="w-full h-full flex items-center justify-center text-[#718096] font-medium text-sm">
            No Players
          </div>
        )}
      </div>
      {type != "roster" && (
        <div className="flex flex-col items-center mt-5">
          <button
            className="w-2/3 h-8 text-[#4285F4] border border-[rgb(66,133,244)] flex items-center justify-center gap-2.5 rounded-[4px]"
            onClick={() => setIsOpen(true)}
          >
            <Plus color="#4285F4" size={16} />
            <span className="text-sm font-semibold">Add Player</span>
          </button>
        </div>
      )}
      {type != "roster" && (
        <AddPlayerModal
          isOpen={isOpen}
          teamName={team_name}
          closeModal={closeModal}
          teamId={team_id}
          position={position}
          playerList={playerList}
          handleSelectPlayer={handleSelectPlayer}
          addPlayers={addPlayers}
          checkPosition={checkPosition}
        />
      )}
    </div>
  );
};

export default PlayerListCard;
