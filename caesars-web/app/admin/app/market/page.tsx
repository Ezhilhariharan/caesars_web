'use client';
import React, { useEffect, useState } from 'react';

// API fetchers
import { get, patch } from '@/app/apiIntegrations/fetcher';

// libs
import { getAdminFromLocalstorage } from '@/app/lib/localstorageHelpers';

// component
import PageHeader from '@/app/components/app/PageHeader';
import MlbMarket from './components/MlbMarket';
import SearchBar from '@/app/components/global/SearchBar';
import Tabs from '@/app/components/global/Tabs';

// static data
import { tabs } from './utils/tabs';

type Props = {};

const Market = (props: Props) => {
  const [user, setUser] = useState<any>({});
  const [selectedTab, setSelectedTab] = useState<any>(tabs[0]);
  const [searchKey, setSearchKey] = useState<any>(null);
  const [isBatterPropsLoading, setIsBatterPropsLoading] = useState(false);
  const [isPitcherPropsLoading, setIsPitcherPropsLoading] = useState(false);
  const [batterMarket, setBatterMarket] = useState<any[]>([]);
  const [pitcherMarket, setPitcherMarket] = useState<any[]>([]);

  const [configData, setconfigData] = useState<any>({
    type: '',
    min: '',
    max: '',
  });

  useEffect(() => {
    setUser(getAdminFromLocalstorage());
    loadProps('batter', null);
    loadProps('pitcher', null);
  }, []);

  useEffect(() => {
    loadProps('batter', searchKey);
    loadProps('pitcher', searchKey);
  }, [searchKey]);

  async function loadProps(playerType: string, search: string | null) {
    if (playerType === 'batter') setIsBatterPropsLoading(true);
    if (playerType === 'pitcher') setIsPitcherPropsLoading(true);

    try {
      let qry = '';
      if (search) qry = `&search=${search}`;
      const res = await get(
        `player-props?player_type=${playerType}&sports_id=1${qry}`
      );
      if (playerType === 'batter') {
        setBatterMarket(res.data);
        setIsBatterPropsLoading(false);
      }
      if (playerType === 'pitcher') {
        setPitcherMarket(res.data);
        setIsPitcherPropsLoading(false);
      }
    } catch (e) {
      if (playerType === 'batter') setIsBatterPropsLoading(false);
      if (playerType === 'pitcher') setIsPitcherPropsLoading(false);
      console.warn(e);
    }
  }

  async function changeMarketStatus(m: any, player_type: string) {
    try {
      let updatedStatus = 0;
      if (m.status === 1) updatedStatus = 0;
      if (m.status === 0) updatedStatus = 1;
      const res = await patch(`player-props/${m.id}`, {
        status: updatedStatus,
      });
      if (player_type === 'batter') loadProps('batter', null);
      if (player_type === 'pitcher') loadProps('pitcher', null);
    } catch (e) {
      console.warn(e);
    }
  }

  const onConfigChange = (key: any, value: any) => {
    let _configProps: any = { ...configData };
    _configProps[key] = value;
    setconfigData(_configProps);
  };

  async function updateConfig(id: any, player_type: string) {
    try {
      const res = await patch(`player-props/${id}`, { config: configData });
      setconfigData({
        type: '',
        min: '',
        max: '',
      });
      if (player_type === 'batter') loadProps('batter', null);
      if (player_type === 'pitcher') loadProps('pitcher', null);
    } catch (e) {
      console.warn(e);
    }
  }

  return (
    <div className='w-full h-full px-8 py-5 overflow-scroll'>
      <PageHeader
        title={`Hi, ${user.first_name} ${user.last_name} `}
        subTitle={"Let's finish your task today!"}
      />
      <Tabs
        title='Markets'
        tabs={tabs}
        selectedTab={selectedTab}
        onTabChange={(f: any) => setSelectedTab(f)}
        loading={isBatterPropsLoading || isPitcherPropsLoading}
      />
      <div className='mt-5 flex justify-between items-center mb-10'>
        <SearchBar
          searchKey={searchKey}
          setSearchKey={setSearchKey}
          placeholder='Find Market'
        />
      </div>
      <div className=''>
        {selectedTab.title === 'Major League Baseball' && (
          <>
            <div className='mb-10'>
              <MlbMarket
                title='Batter Markets'
                loading={isBatterPropsLoading}
                markets={batterMarket}
                setMarkets={setBatterMarket}
                configData={configData}
                setConfigData={setconfigData}
                changeStatus={changeMarketStatus}
                onConfigChange={onConfigChange}
                updateConfig={updateConfig}
              />
            </div>
            <div>
              <MlbMarket
                title='Pitcher Markets'
                loading={isPitcherPropsLoading}
                markets={pitcherMarket}
                setMarkets={setPitcherMarket}
                configData={configData}
                setConfigData={setconfigData}
                changeStatus={changeMarketStatus}
                onConfigChange={onConfigChange}
                updateConfig={updateConfig}
              />
            </div>
          </>
        )}
        {selectedTab.title !== 'Major League Baseball' && (
          <div>No Markets Available in the {selectedTab.title}</div>
        )}
      </div>
    </div>
  );
};

export default Market;
