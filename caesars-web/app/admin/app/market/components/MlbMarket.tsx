'use client';
import React, { useEffect, useState } from 'react';
import '../market.css';

// icons
import editIcon from '../../../assets/market/edit.svg';
import duplicateIcon from '../../../assets/market/duplicate.svg';
import deleteIcon from '../../../assets/market/delete.svg';
import cancelIcon from '../../../../assets/icons/close-red.svg';

//components
import CardContainer from '@/app/components/global/cardContainer/CardContainer';

// antd
import { Dropdown, MenuProps, Popover, Switch } from 'antd';

import Image from 'next/image';
import LoadingComponent from '@/app/components/global/LoadingComponent';

type Props = {
  title: string;
  markets: any[];
  loading: boolean;
  setMarkets: React.Dispatch<React.SetStateAction<any[]>>;
  configData: any;
  setConfigData: React.Dispatch<React.SetStateAction<any>>;
  changeStatus: (m: any, player_type: string) => void;
  onConfigChange: (key: any, value: any) => void;
  updateConfig: (id: any, player_type: string) => void;
};

// global variables

let count = 0;

const MlbMarket = (props: Props) => {
  const {
    title,
    markets,
    loading,
    setMarkets,
    configData,
    setConfigData,
    changeStatus,
    onConfigChange,
    updateConfig,
  } = props;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMarketEditOpen, setIsMarketEditOpen] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState<any>({});
  const [editMarket, setEditMarket] = useState<boolean>(false);

  const onChange = (id: any) => {
    const changeMarketStatus = markets.map((m: any) => {
      if (m.id === id) {
        if (m.status === 0) return { ...m, status: 1 };
        if (m.status === 1) return { ...m, status: 0 };
        return { ...m };
      }
      return { ...m };
    });
    setMarkets(changeMarketStatus);
  };

  const marketItems: MenuProps['items'] = [
    {
      key: '0',
      label: <div style={{ padding: 10 }}>Over Under Market</div>,
      onClick: async (e) => {
        // setconfigData({ ...configData, type: 'Over Under Market' });
        onConfigChange('type', 'Over Under Market');
      },
    },
    // {
    //   key: '1',
    //   label: <div style={{ padding: 10 }}>Yes/No Market</div>,
    //   onClick: async (e) => {
    //     // setconfigData({ ...configData, type: 'Yes/No Market' });
    //     onConfigChange('type', 'Yes/No Market');
    //   },
    // },
  ];

  return (
    <>
      <CardContainer
        header={title}
        headerStyle={{
          height: 50,
          paddingBottom: 10,
        }}
        cardClassName='w-full'
        style={{
          padding: '20px 20px',
          border: '1px solid #E0E3E8',
        }}
      >
        <div className='h-[50px] flex items-center text-center text-sm font-medium text-[#6B7280] border-y border-[#E5E7EB]'>
          <div className='w-1/5 text-left pl-5'>Market</div>
          <div className='w-1/4'>Type of Market</div>
          <div className='w-1/5'>Min. Line</div>
          <div className='w-1/5'>Max. Line</div>
          <div className='w-1/5'>Status</div>
          <div className='w-32'></div>
        </div>

        <div className='w-full'>
          {loading && <LoadingComponent text='Loading' />}
          {!loading && markets?.length === 0 && <div>No data</div>}
          {!loading &&
            markets?.map((m: any, i) => {
              return (
                <div
                  key={`members---${i}`}
                  className={`flex items-center justify-between border-b text-center h-16 ${
                    m.status === 0
                      ? 'bg-gray-50'
                      : editMarket && selectedMarket.id === m.id
                      ? 'bg-gray-100'
                      : 'bg-transparent'
                  }`}
                >
                  <div className='w-1/5 text-[rgb(17,24,39)] font-normal capitalize text-sm text-left pl-5'>
                    {m?.name}
                  </div>
                  <div className='text-center w-1/4 text-sm font-normal text-[#111827] capitalize gap-1 relative'>
                    <Dropdown
                      trigger={
                        editMarket && selectedMarket.id === m.id
                          ? ['click']
                          : []
                      }
                      menu={{ items: marketItems }}
                    >
                      <div
                        className='w-full cursor-pointer relative'
                        // onClick={() => {
                        //   setSelectedMarket(m);
                        // }}
                      >
                        {editMarket && selectedMarket.id === m.id
                          ? configData.type
                          : m?.config?.type}
                      </div>
                    </Dropdown>
                  </div>
                  <div className='text-center px-2.5 w-1/5 text-sm font-normal text-[#111827]'>
                    {editMarket && selectedMarket.id === m.id ? (
                      <input
                        type='text'
                        className='w-full py-2 text-center'
                        value={configData.min}
                        onChange={(e) => {
                          onConfigChange('min', e.target.value);
                        }}
                      />
                    ) : (
                      <>{m?.config?.min}</>
                    )}
                  </div>

                  <div className='text-center px-2.5 w-1/5 text-sm font-normal text-[#111827]'>
                    {editMarket && selectedMarket.id === m.id ? (
                      <input
                        type='text'
                        className='w-full py-2 text-center'
                        value={configData.max}
                        onChange={(e) => {
                          onConfigChange('max', e.target.value);
                        }}
                      />
                    ) : (
                      <>{m?.config?.max}</>
                    )}
                  </div>
                  <div className='market-status p-2.5 w-1/5 text-sm font-normal text-[#111827]'>
                    <div className='ml-5'>
                      <Switch
                        checked={m?.status === 0 ? false : true}
                        onClick={() => {
                          if (!editMarket) {
                            onChange(m.id);
                            changeStatus(m, m.player_type);
                          } else {
                            alert('save changes');
                          }
                        }}
                      />
                    </div>{' '}
                  </div>
                  <div className='w-32 h-8 cursor-pointer px-3 flex gap-2 items-center'>
                    {editMarket && selectedMarket.id === m.id && (
                      <div
                        className='cursor-pointer'
                        onClick={() => {
                          setEditMarket(false);
                        }}
                      >
                        <Image
                          src={cancelIcon}
                          alt='cancel'
                          width={50}
                          height={50}
                        />{' '}
                      </div>
                    )}
                    {editMarket && selectedMarket.id === m.id ? (
                      <button
                        className='w-full h-full flex justify-center items-center text-sm font-semibold text-white bg-[#4285F4] rounded-[4px]'
                        onClick={() => {
                          if (selectedMarket.id === m.id) {
                            updateConfig(m.id, selectedMarket.player_type);
                            setEditMarket(false);
                            setConfigData({
                              type: '',
                              min: '',
                              max: '',
                            });
                          }
                        }}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        className='w-full h-full flex justify-center items-center text-sm font-semibold text-[#282E38] bg-[#E0E3E8] rounded-[4px]'
                        onClick={() => {
                          setIsMarketEditOpen(!isMarketEditOpen);
                          setEditMarket(true);
                          setSelectedMarket(m);
                          setConfigData({
                            type: m.config.type,
                            min: m.config.min,
                            max: m.config.max,
                          });
                        }}
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </CardContainer>
    </>
  );
};

export default MlbMarket;
