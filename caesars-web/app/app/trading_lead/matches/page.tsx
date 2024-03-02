'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

// API fetchers
import { getTradingTeamMatchesWithCount } from '@/app/apiIntegrations/apiClients/tradingTeamMatches';

// libs

// components
import PageHeader from '@/app/components/app/PageHeader';
import Title from '@/app/components/global/title/Title';
import CustomPagination from '@/app/components/pagination/CustomPagination';
import Toast, { toastProps } from '@/app/components/global/toast/Toast';
import ManagerMatchCard from '../../../components/global/matchCard/ManagerMatchCard';
import { getIcon } from '@/app/lib/getIcon';
import { getSportsFilterKey } from '@/app/lib/getSportsFilterKey';
import SearchBar from '@/app/components/global/SearchBar';

// antd
import type { PaginationProps } from 'antd';
import LoadingComponent from '@/app/components/global/LoadingComponent';
import Tabs from '@/app/components/global/Tabs';
import SportsItem from '@/app/components/global/SportsItem';
import { getMatchesWithCount } from '@/app/apiIntegrations/apiClients/matches';

// global variables
let count = 0;
let tabs = [
  {
    title: 'Unassigned',
    filter: {
      status: 0,
      match_asignment_status: 3,
    },
  },
  {
    title: 'Assigned',
    filter: {
      status: 0,
      match_asignment_status: 4,
    },
  },
  {
    title: 'Live',
    filter: { status: 2 },
  },
];

const subTab = [
  {
    id: 1,
    title: 'Pre_game_trader',
    tab: 'pre_game_trader',
    filter: {
      match_asignment_status: 4,
      trader_type: 'pre_game_trader',
    },
  },
  {
    id: 1,
    title: 'In_game_trader',
    tab: 'in_game_trader',
    filter: {
      match_asignment_status: 4,
      trader_type: 'in_game_trader',
    },
  },
];

export default function Overview() {
  const [user, setUser] = useState<any>({});
  const [newMatches, setNewMatches] = useState([]);
  const [isMatchesLoading, setIsMatchesLoading] = useState<boolean>(false);
  const [selectedSportFilter, setSelectedSportFilter] = useState('All Sports');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKey, setSearchKey] = useState<string>('');
  const [selectedTab, setselectedTab] = useState<any>(null);
  const [selectedSubTab, setselectedSubTab] = useState<any>(null);
  const [filter, setFilter] = useState<any>(null);

  // handling the toast notification
  const [toastPopup, setToastPopup] = useState(false);
  const [toastDetails, setToastDetails] = useState<toastProps>({
    type: 'alert',
    title: '',
    discription: '',
    logo: '',
  });

  // checking for the session
  useEffect(() => {
    setUser(getUserFromLocalstorage());
    const selectedFilter = tabs.filter(
      (t) => t.title === getTabsFromLocalstorage()
    );

    if (selectedTab?.title === 'Assigned') {
      setselectedSubTab(tabs[0]);
      setFilter(tabs[0].filter);
    } else {
      setselectedTab(selectedFilter[0]);
      setFilter(selectedFilter[0].filter);
    }
  }, []);

  // load the matches data based on search value
  useEffect(() => {
    loadData(selectedSportFilter, 0);
  }, [searchKey]);

  // load the matches data based on admin filter
  useEffect(() => {
    loadData(selectedSportFilter, 0);
  }, [filter]);

  // useEffect(() => {
  //   if (selectedTab?.title === 'Assigned') setselectedSubTab(subTab[0]);
  // }, [selectedTab]);

  function loadData(sport: string, skip?: number) {
    switch (selectedTab?.title) {
      case 'Unassigned':
        loadMatches(sport, skip);
        break;
      case 'Assigned':
        loadMatches(sport, skip);
        break;
      case 'Live':
        loadLiveMatches(sport, skip);
        break;
    }
  }

  useEffect(() => {
    if (toastPopup === true) {
      const timeOut = setTimeout(() => {
        setToastPopup(false);
      }, 2000);
      return () => clearTimeout(timeOut);
    }
  }, [toastPopup]);

  // checking the localstorage data
  function getUserFromLocalstorage() {
    const userString = localStorage.getItem('user');
    if (!userString) return {};
    return JSON.parse(userString);
  }

  function getTabsFromLocalstorage() {
    const tabString = localStorage.getItem('matches tab');
    if (!tabString) return 'Unassigned';
    return tabString;
  }

  async function loadMatches(sport: any, skip?: any) {
    setIsMatchesLoading(true);
    try {
      const res = await getTradingTeamMatchesWithCount({
        limit: 8,
        skip: skip,
        query: {
          sports: getSportsFilterKey(sport),
          ...filter,
          // trader_type: selectedSubTab?.tab || null,
          searchKey: searchKey,
        },
      });
      count = res.count;
      setNewMatches(res.data);
      setIsMatchesLoading(false);
    } catch (e) {
      console.warn(e);
    }
  }

  async function loadLiveMatches(sport: any, skip?: any) {
    setIsMatchesLoading(true);
    try {
      const res = await getMatchesWithCount({
        limit: 8,
        skip: skip,
        query: {
          status: 0,
          sports: getSportsFilterKey(sport),
          ...filter,
          // trader_type: selectedSubTab?.tab || null,
          searchKey: searchKey,
        },
      });
      count = res.count;
      setNewMatches(res.data);
      setIsMatchesLoading(false);
    } catch (e) {
      console.warn(e);
    }
  }

  const onTabChange = (f: any) => {
    setIsMatchesLoading(true);
    setselectedTab(f);
    setFilter(f.filter);
    localStorage.setItem('matches tab', f.title);
  };

  const onSubTabChange = (f: any) => {
    // setIsMatchesLoading(true);
    setselectedSubTab(f);
    setFilter(f.filter);
    // localStorage.setItem('matches tab', f.title);
  };

  const onSportsChange = (sport: string) => {
    setSelectedSportFilter(sport);
    loadData(sport, 0);
  };

  const onPageChange: PaginationProps['onChange'] = (
    page: number,
    pageSize: number
  ) => {
    const skip = (page - 1) * 8;
    loadMatches(selectedSportFilter, 0);
    setCurrentPage(page);
  };

  return (
    <div className='px-8 py-5 flex-1 overflow-scroll' style={{}}>
      <Toast
        type={toastDetails.type}
        title={toastDetails.title}
        discription={toastDetails.discription}
        logo={toastDetails.logo}
        toggle={toastPopup}
      />
      <div className='flex-1'>
        <PageHeader
          title={`Hi, ${user.first_name} ${user.last_name} `}
          subTitle={"Let's finish your task today!"}
        />
        <Tabs
          title='Explore Matches'
          tabs={tabs}
          selectedTab={selectedTab}
          onTabChange={onTabChange}
          loading={isMatchesLoading}
        />
        <div className='my-5 flex justify-between'>
          <SearchBar searchKey={searchKey} setSearchKey={setSearchKey} />
          {/* <SportsItem
            selectedSport={selectedSportFilter}
            onSportsChange={onSportsChange}
          /> */}
        </div>
        {/* {selectedTab?.title === 'Assigned' && (
          <div>
            <Tabs
              tabs={subTab}
              selectedTab={selectedSubTab}
              onTabChange={onSubTabChange}
            />
          </div>
        )}{' '} */}
        <div className='mb-5 overflow-hidden'>
          <div className='flex justify-between items-center flex-wrap'>
            <Title title={`${selectedTab?.title} Matches`} size='large' />
          </div>

          <div className='flex  mt-9 overflow-x-auto flex-wrap gap-x-[62px] gap-y-10'>
            {isMatchesLoading && (
              <LoadingComponent text='Loading the Matches Please Wait' />
            )}
            {!isMatchesLoading && newMatches?.length === 0 && (
              <div>No Matches Available</div>
            )}
            {!isMatchesLoading &&
              newMatches?.map((m: any, i) => {
                return (
                  <div key={`match` + i} style={{ marginRight: 10 }}>
                    <ManagerMatchCard
                      id={m.id}
                      match={m}
                      primary={selectedTab === 'Live' ? true : false}
                      header={{
                        team1_image: m.team1_logo_image,
                        team2_image: m.team2_logo_image,
                      }}
                      sports={{
                        team1_name: m.team1_short_name,
                        team2_name: m.team2_short_name,
                        location: {
                          name: m.location_name,
                          city: m.city_name,
                          country: m.country_common_name,
                        },
                        image: getIcon(m?.league_name),
                      }}
                      progress={{
                        percentage: parseFloat(
                          m.match_assignments_overall_task_progress
                        ),
                      }}
                      contributors={{
                        liveTime: '',
                        matchDate: (() => {
                          const date1 = new Date(m.fixture_start_at);
                          const date2 = new Date();

                          const diffTime = Math.abs(
                            (date2 as any) - (date1 as any)
                          );
                          const diffDays = Math.ceil(
                            diffTime / (1000 * 60 * 60 * 24)
                          );
                          return diffDays + ' days';
                        })(),
                      }}
                      loadMatch={loadMatches}
                      toastPopup={toastPopup}
                      setToastPopup={setToastPopup}
                      toastDetails={toastDetails}
                      setToastDetails={setToastDetails}
                    />
                  </div>
                );
              })}
          </div>
          {!isMatchesLoading && count > 8 && (
            <div className='w-full h-[100px] mt-10 border border-[#E0E3E8] rounded-lg px-5 flex items-center'>
              <CustomPagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                total={count}
                pageSize={8}
                onChange={onPageChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
