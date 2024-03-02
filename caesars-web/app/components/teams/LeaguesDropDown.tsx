import Image from 'next/image';
import React from 'react';

// lib
import { getLeaguesIcon } from './getLeaguesIcon';

// antd
import { Dropdown, MenuProps } from 'antd';

type Props = {
  selectedLeague: any;
  loading?: boolean;
  style?: {};
};

const LeaguesDropDown = (props: Props) => {
  const { selectedLeague, loading, style } = props;

  const leaguesItems: MenuProps['items'] = [
    {
      key: '0',
      label: (
        <div className={`p-2.5 ${loading ? 'cursor-wait' : 'cursor-pointer'}`}>
          Baseball
        </div>
      ),
      icon: <Image src={getLeaguesIcon('Baseball')} alt={'Baseball'} />,
      onClick: () => {},
    },
  ];

  return (
    <Dropdown menu={{ items: leaguesItems }}>
      <div
        className='px-5 py-0.5 bg-white border border-[#EDEDED] flex rounded-[5px] cursor-pointer'
        style={style}
      >
        <Image
          src={getLeaguesIcon(selectedLeague)}
          alt='allSports'
          style={{ maxHeight: '100%' }}
        />
        <div className='h-[45px] flex items-center'>
          <span className='text-[#141522] font-medium ml-5 cursor-pointer'>
            {selectedLeague}
          </span>
        </div>
      </div>
    </Dropdown>
  );
};

export default LeaguesDropDown;
