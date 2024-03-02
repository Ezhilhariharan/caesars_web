import { Dropdown, MenuProps } from 'antd';
import React from 'react';

import Image from 'next/image';
import angleDownArrow from '../../../assets/icons/arrow-down.svg';

type Props = {
  selectedMargin: number;
  onMarginChange: (m: number) => void;
  // allow to update the market
  allow: boolean;
  loading: boolean;
  showUpdate: boolean;
};

const MarginDropDown = (props: Props) => {
  const { selectedMargin, onMarginChange, allow, loading, showUpdate } = props;

  const marginItems: MenuProps['items'] = [
    {
      key: '0',
      label: <div>Margin 0%</div>,
      onClick: async () => onMarginChange(0),
    },
    {
      key: '1',
      label: <div>Margin 2.5%</div>,
      onClick: async () => onMarginChange(2.5),
    },
    {
      key: '2',
      label: <div>Margin 5%</div>,
      onClick: async () => onMarginChange(5),
    },
    {
      key: '3',
      label: <div>Margin 7.5%</div>,
      onClick: async () => onMarginChange(7.5),
    },
    {
      key: '4',
      label: <div>Margin 10%</div>,
      onClick: async () => onMarginChange(10),
    },
    {
      key: '5',
      label: <div>Margin 15%</div>,
      onClick: async () => onMarginChange(15),
    },
    {
      key: '6',
      label: <div>Margin 20%</div>,
      onClick: async () => onMarginChange(20),
    },
    {
      key: '7',
      label: <div>Margin 25%</div>,
      onClick: async () => onMarginChange(25),
    },
    {
      key: '8',
      label: <div>Margin 30%</div>,
      onClick: async () => onMarginChange(30),
    },
    {
      key: '9',
      label: <div>Margin 35%</div>,
      onClick: async () => onMarginChange(35),
    },
    {
      key: '10',
      label: <div>Margin 40%</div>,
      onClick: async () => onMarginChange(40),
    },
    {
      key: '11',
      label: <div>Margin 45%</div>,
      onClick: async () => onMarginChange(45),
    },
    {
      key: '12',
      label: <div>Margin 50%</div>,
      onClick: async () => onMarginChange(50),
    },
  ];

  return (
    <div
      className={`w-full group ${
        loading || showUpdate ? 'cursor-not-allowed' : ' cursor-pointer'
      }`}
    >
      <Dropdown
        menu={{ items: marginItems }}
        trigger={loading || showUpdate ? [] : ['click', 'hover']}
      >
        <div
          className={`flex items-center justify-center px-3 py-2 ${
            loading || showUpdate ? 'cursor-not-allowed' : ' cursor-pointer'
          }`}
        >
          <span className='pr-2 text-sm font-medium text-[#282E38] transition-all duration-300 ease-linear'>
            {`Margin ${selectedMargin}%`}
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

export default MarginDropDown;
