import { title } from 'process';
import React from 'react';

type Props = {
  title?: string;
  tabs: any;
  selectedTab: any;
  onTabChange: (f: any) => void;
  loading?: boolean;
  style?: {};
};

const Tabs = (props: Props) => {
  const { title, tabs, selectedTab, onTabChange, loading, ...prop } = props;
  return (
    <div
      className={`page-section-header flex mt-5 items-center pb-[15px] border-[#eee] ${
        title ? 'border-b' : 'border-0'
      }`}
      {...prop}
    >
      {title && <div className='pr-5'>{title}</div>}
      <div className='flex flex-1 items-center text-sm'>
        {tabs.map((f: any, i: number) => {
          return (
            <div
              key={f.title}
              className={`py-[5px] px-5 font-medium rounded-[5px] capitalize ${
                loading ? 'cursor-wait' : 'cursor-pointer'
              }`}
              style={{
                color: selectedTab?.title === f.title ? '#4285F4' : '#64748B',
                background: selectedTab?.title !== f.title ? '' : '#ECF3FE',
              }}
              onClick={() => {
                if (!loading) onTabChange(f);
              }}
            >
              {f.title}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tabs;
