import Dropdown from 'antd/es/dropdown/dropdown';
import React from 'react';
import Image from 'next/image';

// icons
import angleDownArrow from '../../../../assets/icons/arrow-down.svg';

type TeamsProps = {
  id: number;
  title: string;
  icon: string;
};

type TypeOfPlayerProps = {
  id: number;
  title: string;
  icon: string;
};

type Props = {
  TeamItems: TeamsProps[];
  selectedTeam: TeamsProps;
  onTeamChange: (team: TeamsProps) => void;
  TypeOfPlayer: TypeOfPlayerProps[];
  playerType: TypeOfPlayerProps;
  onTypeChange: (t: TypeOfPlayerProps) => void;
};

const FilterCard = (props: Props) => {
  const {
    TeamItems,
    selectedTeam,
    TypeOfPlayer,
    playerType,
    onTeamChange,
    onTypeChange,
  } = props;

  return (
    <div className='w-full h-11 flex gap-2.5'>
      <Dropdown
        className='border rounded-[4px]'
        trigger={['click']}
        dropdownRender={(menu) => (
          <div className='bg-white w-[clamp(150px,100%,100%)] rounded-lg border shadow-md p-5'>
            {TeamItems.map((team) => {
              return (
                <div
                  className={`w-full flex items-center justify-between cursor-pointer pt-2.5 gap-5 first:pt-0`}
                  onClick={() => {
                    onTeamChange(team);
                  }}
                >
                  <div className='w-full flex items-center gap-2.5'>
                    <div className='w-7'>
                      <Image
                        src={team.icon}
                        alt=''
                        width={team.id === 0 ? 18 : 25}
                        height={team.id === 0 ? 18 : 25}
                      />
                    </div>
                    <p className='min-w-[40px]'>{team.title}</p>
                  </div>
                  <input
                    type='radio'
                    checked={selectedTeam.title === team.title}
                  />
                </div>
              );
            })}
          </div>
        )}
      >
        <div
          className={`min-w-[200px] flex items-center justify-center p-4 cursor-pointer h-full bg-white rounded-[4px]`}
        >
          <Image
            src={selectedTeam.icon}
            alt=''
            width={selectedTeam.id === 0 ? 18 : 25}
            height={selectedTeam.id === 0 ? 18 : 25}
          />
          <span className='pr-2 text-sm font-medium text-[#54577A] transition-all duration-300 ease-linear'>
            {selectedTeam.title}
          </span>
          <Image
            src={angleDownArrow}
            alt=''
            className='w-auto transition-all duration-300 ease-linear group-hover:rotate-180'
          />
        </div>
      </Dropdown>
      <Dropdown
        className='border rounded-[4px]'
        trigger={['click']}
        dropdownRender={(menu) => (
          <div className='bg-white w-[clamp(180px,100%,100%)] rounded-lg border shadow-md p-5'>
            {TypeOfPlayer.map((t) => {
              return (
                <div
                  className={`w-full flex items-center justify-between capitalize cursor-pointer pt-2.5 gap-5 first:pt-0`}
                  onClick={() => {
                    onTypeChange(t);
                  }}
                >
                  <div className='w-full flex items-center gap-2.5'>
                    <div className='w-7'>
                      <Image src={t.icon} alt='icons' width={20} height={20} />
                    </div>
                    <p>{t.title}</p>
                  </div>
                  <input type='radio' checked={playerType.title === t.title} />
                </div>
              );
            })}
          </div>
        )}
      >
        <div
          className={`min-w-[180px] flex items-center justify-center p-4 cursor-pointer h-full bg-white gap-2.5 rounded-[4px]`}
        >
          <Image
            src={playerType.icon}
            alt='player type icon'
            width={20}
            height={20}
          />
          <span className='text-sm font-medium text-[#54577A] transition-all duration-300 ease-linear capitalize'>
            {playerType.title}
          </span>
          <Image
            src={angleDownArrow}
            alt='arrow down icon'
            width={20}
            height={20}
            className='w-auto transition-all duration-300 ease-linear group-hover:rotate-180'
          />
        </div>
      </Dropdown>
    </div>
  );
};

export default FilterCard;
