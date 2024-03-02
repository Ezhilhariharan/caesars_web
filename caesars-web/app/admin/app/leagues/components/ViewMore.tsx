import { Dropdown, MenuProps } from 'antd';
import React from 'react';

import Image from 'next/image';
import angleDownArrow from '../../../../assets/icons/arrow-down.svg';

type Props = {};

const ViewMore = (props: Props) => {
  const {} = props;

  const oddsItems: MenuProps['items'] = [];

  return (
    <div className={`w-full group cursor-not-allowed`}>
      <Dropdown trigger={[]} menu={{ items: oddsItems }}>
        <div
          className={`flex items-center justify-center px-3 py-2 cursor-pointer`}
        >
          <span className='pr-2 text-sm font-medium text-[#3F8CFF] transition-all duration-300 ease-linear'>
            View More
          </span>
          <Image
            src={angleDownArrow}
            alt=''
            className='w-auto transition-all duration-300 ease-linear group-hover:rotate-180'
          />
        </div>
      </Dropdown>
    </div>
  );
};

export default ViewMore;
