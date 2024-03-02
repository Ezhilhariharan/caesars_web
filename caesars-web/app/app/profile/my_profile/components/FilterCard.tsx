import { get } from '@/app/apiIntegrations/fetcher';
import CardContainer from '@/app/components/global/cardContainer/CardContainer';
import React from 'react';

type Props = {
  primary?: boolean;
  background?: string;
  label: string | any;
  count?: any;
  filter?: any;
  setFilter: React.Dispatch<React.SetStateAction<any>>;
};

const FilterCard = (props: Props) => {
  const { background, label, count, filter, setFilter } = props;

  return (
    <div
      className='w-full h-full p-5 bg-white rounded-[16px] cursor-pointer'
      style={{
        border: `2px solid ${filter?.label === label ? background : '#E0E3E8'}`,
      }}
      // onClick={() => {
      //   setFilter(label);
      // }}
    >
      <div
        className={`w-[54px] h-[54px] flex justify-center items-center mt-5 rounded-lg text-white text-2xl font-black mx-5`}
        style={{
          background: background,
        }}
      >
        {count}
      </div>
      <div className='mt-5'>
        <p className='text-[18px] font-bold text-[#0A1629]'>{label}</p>
        {/* <p>{filter}</p> */}
      </div>
    </div>
  );
};

export default FilterCard;
