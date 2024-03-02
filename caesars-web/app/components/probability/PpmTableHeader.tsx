import React from 'react';

import Image from 'next/image';

import OddsDropDown from '../ppm/components/OddsDropDown';

import {
  Checkbox,
  Popover,
  Switch,
  Tooltip,
  Dropdown,
  MenuProps,
  Spin,
} from 'antd';

import SearchBar from '../global/SearchBar';

type Props = {
  selectedOdds: any;
  onOddsItemChange: (oldOddsType: string, newOddsType: string) => void;
  loader: any;
  filterItems: any;
  filterPlayer: any;
  propMarketSearch: (e: any) => void;
};

const PpmTableHeader = ({
  selectedOdds,
  onOddsItemChange,
  loader,
  filterItems,
  filterPlayer,
  propMarketSearch,
}: Props) => {
  return (
    <div className='flex items-center justify-between'>
      <div className='w-full flex items-center justify-between pr-3'>
        <div>
          <div className='text-2xl font-semibold text-[#141522]'>
            Player Prop Markets
          </div>
          <div className='text-sm font-light  text-[#718096] flex items-center gap-2.5 mt-2'>
            <div className='flex items-center gap-2.5'>
              <div className='w-4 h-4 contents-[""] border-2 border-[#E0E3E8] rounded-[2px] bg-[#ECF3FE]'></div>
              <div>Balanced Lines</div>
            </div>
            <div className='flex items-center gap-2.5'>
              <div className='w-4 h-4 contents-[""] border-2 border-[#E0E3E8] rounded-[2px] bg-white'></div>
              <div>Alternate Lines</div>
            </div>
          </div>
        </div>

        <div className=' flex items-center'>
          {/* <div className=" flex items-center">
            {loader ? (
              <>
                <Spin size="small" />
                <div className="pr-2 font-medium text-[#6B7280]">
                  {" "}
                  Saving...
                </div>
              </>
            ) : (
              ""
            )}
          </div> */}

          <div
            className='border border-[#E0E3E8] rounded-[5px]'
            style={{ width: '150px' }}
          >
            <OddsDropDown
              // allow={allow}
              selectedOdds={selectedOdds}
              onOddsItemChange={onOddsItemChange}
              // showUpdate={showUpdate}
            />
          </div>
        </div>
      </div>

      <div className='flex items-center gap-5'>
        <div style={{ width: '300px' }}>
          <SearchBar
            searchKey={filterPlayer}
            setSearchKey={(e) => propMarketSearch(e)}
            placeholder={'Search Prop'}
          />
        </div>

        <div className='flex items-center gap-2.5'>
          <Dropdown menu={{ items: filterItems }} trigger={['click', 'hover']}>
            <button
              className=' flex justify-center items-center  py-2 px-4 text-[#282E38] bg-[#E0E3E8] rounded-[4px]'
              style={{ fontSize: '17px', fontWeight: '500' }}
              onClick={() => {}}
            >
              Actions
            </button>
          </Dropdown>

          {/* <button
              className=" flex justify-center items-center  py-2 px-4 text-white bg-[#4285F4] rounded-[4px]"
              onClick={() => {}}
              style={{ fontSize: "17px", fontWeight: "500" }}
            >
              Update
            </button> */}
        </div>
      </div>
    </div>
  );
};

export default PpmTableHeader;
