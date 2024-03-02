import React from 'react';
import { Dropdown, MenuProps, Menu } from 'antd';
import Image from 'next/image';
// import angleDownArrow from "../../../assets/icons/arrow-down.svg";
import addProp from '../../../assets/addProp.svg';

type Props = {
  items: any;
  selectedProp?: any;
  propsLoading?: boolean;
  loading?: boolean;
  // allow to update the market
  allow?: boolean;
  list?: any;
  SelectedList?: (data: any) => void;
};

const PropsDropDown = (props: Props) => {
  const { selectedProp, items, loading, propsLoading, list, SelectedList } =
    props;

  return (
    <div
      className={`w-full group ${
        loading ? 'cursor-not-allowed' : ' cursor-pointer'
      }`}
    >
      {list?.length > 0 ? (
        <Dropdown
          menu={{ items: items }}
          // overlay={overlay}
          trigger={['click', 'hover']}
          dropdownRender={(items) => {
            if (propsLoading)
              return (
                <div className='w-full min-h-[60vh] flex items-center justify-center text-[#121212] shadow-xl z-50 rounded-[10px]'>
                  Loading...
                </div>
              );
            return <div>{!propsLoading && items}</div>;
          }}
        >
          <div
            className='flex items-center justify-center text-sm rounded py-2.5 bg-[#4285F4] text-[#FFF]'
            style={{ width: '115px' }}
          >
            {/* <span
            className={`pr-2 text-sm font-medium text-[#282E38] transition-all duration-300 ease-linear  ${
              loading ? "cursor-not-allowed" : " cursor-pointer"
            }`}
          >
            {selectedProp ? selectedProp?.name : "Select Prop"}
          </span>
          <Image
            src={angleDownArrow}
            alt=""
            className="w-auto transition-all duration-300 ease-linear group-hover:rotate-180 "
          /> */}
            <Image src={addProp} alt='add' className='w-auto pr-1 ' />
            Add Prop
            {/* <div> Add Prop</div> */}
          </div>
        </Dropdown>
      ) : (
        <div
          className='flex items-center justify-center text-sm font-medium rounded py-2.5 bg-[#4285F4] text-[#FFF] cursor-not-allowed'
          style={{ width: '115px' }}
        >
          Starter
        </div>
      )}
    </div>
  );
};

export default PropsDropDown;
