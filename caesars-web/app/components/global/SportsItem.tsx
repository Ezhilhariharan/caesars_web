import Image from 'next/image';
import React from 'react';

// lib
import { getIcon } from '@/app/lib/getIcon';

// antd
import { Dropdown, MenuProps } from 'antd';

type Props = {
  selectedSport: any;
  onSportsChange: (sport: string) => void;
  loading?: boolean;
};

const SportsItem = (props: Props) => {
  const { selectedSport, onSportsChange, loading } = props;

  const sportsItems: MenuProps['items'] = [
    {
      key: '0',
      label: (
        <div className={`p-2.5 ${loading ? 'cursor-wait' : 'cursor-pointer'}`}>
          All Sports
        </div>
      ),
      icon: <Image src={getIcon('All Sports')} alt={'All Sports'} />,
      onClick: () => {
        if (!loading) onSportsChange('All Sports');
      },
    },
    {
      key: '1',
      label: (
        <div className={`p-2.5 ${loading ? 'cursor-wait' : 'cursor-pointer'}`}>
          MLB
        </div>
      ),
      icon: <Image src={getIcon('MLB')} alt={'mlb'} />,
      onClick: () => {
        if (!loading) onSportsChange('MLB');
      },
    },
    {
      key: '2',
      label: (
        <div className={`p-2.5 ${loading ? 'cursor-wait' : 'cursor-pointer'}`}>
          NFL
        </div>
      ),
      icon: <Image src={getIcon('NFL')} alt={'nfl'} />,
      onClick: () => {
        if (!loading) onSportsChange('NFL');
      },
    },
    {
      key: '3',
      label: (
        <div className={`p-2.5 ${loading ? 'cursor-wait' : 'cursor-pointer'}`}>
          CFB
        </div>
      ),
      icon: <Image src={getIcon('CFB')} alt={'CFB'} />,
      onClick: () => {
        if (!loading) onSportsChange('CFB');
      },
    },
    {
      key: '4',
      label: (
        <div className={`p-2.5 ${loading ? 'cursor-wait' : 'cursor-pointer'}`}>
          NBA
        </div>
      ),
      icon: <Image src={getIcon('NBA')} alt={'NBA'} />,
      onClick: () => {
        if (!loading) onSportsChange('NBA');
      },
    },
    {
      key: '5',
      label: (
        <div className={`p-2.5 ${loading ? 'cursor-wait' : 'cursor-pointer'}`}>
          CBB
        </div>
      ),
      icon: <Image src={getIcon('CBB')} alt={'CBB'} />,
      onClick: () => {
        if (!loading) onSportsChange('CBB');
      },
    },
    {
      key: '6',
      label: (
        <div className={`p-2.5 ${loading ? 'cursor-wait' : 'cursor-pointer'}`}>
          NHL
        </div>
      ),
      icon: <Image src={getIcon('NHL')} alt={'NHL'} />,
      onClick: () => {
        if (!loading) onSportsChange('NHL');
      },
    },
  ];

  return (
    <Dropdown menu={{ items: sportsItems }}>
      <div className='px-5 py-1 border border-[#EDEDED] bg-white flex rounded-[5px] cursor-pointer'>
        <div className='h-[45px] flex items-center'>
          <Image
            src={getIcon(selectedSport)}
            alt='allSports'
            style={{ maxHeight: '100%' }}
          />
        </div>
        <div className='h-[45px] flex items-center'>
          <span className='text-[#141522] font-medium ml-5 cursor-pointer'>
            {selectedSport}
          </span>
        </div>
      </div>
    </Dropdown>
  );
};

export default SportsItem;
