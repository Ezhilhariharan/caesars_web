'use client';
import React, { useEffect, useState } from 'react';

// API fetchers

// libs
import { getSportsFilterKey } from '@/app/lib/getSportsFilterKey';
import { getUserFromLocalstorage } from '@/app/lib/localstorageHelpers';
import { getIcon } from '@/app/lib/getIcon';

// components
import PageHeader from '@/app/components/app/PageHeader';
import Title from '@/app/components/global/title/Title';
import CustomPagination from '@/app/components/pagination/CustomPagination';
import SearchBar from '@/app/components/global/SearchBar';
import ManagerMatchCard from '../../../components/global/matchCard/ManagerMatchCard';
import Tabs from '@/app/components/global/Tabs';
import SportsItem from '@/app/components/global/SportsItem';

// utils
import { tabs } from './utils/tabs';

// antd
import type { PaginationProps } from 'antd';
import { getMatchesWithCount } from '@/app/apiIntegrations/apiClients/matches';

type Props = {};

// global variables
let count = 0;

export default function Overview(props: Props) {
  const [user, setUser] = useState<any>({});
  const [matches, setMatches] = useState([]);
  const [isMatchesLoading, setIsMatchesLoading] = useState(false);
  const [selectedSportFilter, setSelectedSportFilter] = useState('All Sports');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKey, setSearchKey] = useState('');
  const [selectedTab, setSelectedTab] = useState<any>(null);
  const [filter, setFilter] = useState<any>(null);

  useEffect(() => {
    // checking the session
    setUser(getUserFromLocalstorage());
    let setTabFromLocalStorge = tabs.filter(
      (t) => t.title === getTabsFromLocalstorage()
    );
    setSelectedTab(setTabFromLocalStorge[0]);
    setFilter(setTabFromLocalStorge[0]?.filter);
  }, []);

  useEffect(() => {
    loadData();
  }, [searchKey, selectedTab, filter]);

  function getTabsFromLocalstorage() {
    const tabString = localStorage.getItem('matches tab');
    if (!tabString) return 'Upcoming';
    return tabString;
  }

  function loadData() {
    switch (selectedTab?.title) {
      case 'Newly Assigned':
        loadMatches(selectedSportFilter, 0);
        break;
      case 'In-progress':
        loadMatches(selectedSportFilter, 0);
        break;
      case 'Completed':
        loadMatches(selectedSportFilter, 0);
        break;
      default:
        return '';
    }
  }

  async function loadMatches(sport: any, skip?: any) {
    setIsMatchesLoading(true);
    try {
      const res = await getMatchesWithCount({
        limit: 8,
        skip: skip,
        query: {
          status: 0,
          sports: getSportsFilterKey(sport),
          ...filter,
          searchKey,
        },
      });
      count = res.count;
      setMatches(res.data);
      setIsMatchesLoading(false);
    } catch (e) {
      console.warn(e);
    }
  }

  const onTabChange = (f: any) => {
    setIsMatchesLoading(true);
    setSelectedTab(f);
    setFilter(f.filter);
    localStorage.setItem('matches tab', f.title);
  };

  const onSportsChange = (sport: string) => {
    setSelectedSportFilter(sport);
    loadData();
  };

  const onPageChange: PaginationProps['onChange'] = (page: number) => {
    const skip = (page - 1) * 8;
    loadData();
    setCurrentPage(page);
  };

  return (
    <div className='p-[20px] flex-1 overflow-scroll'>
      <div className='flex'>
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
          <div className='flex justify-between items-center my-5'>
            <SearchBar searchKey={searchKey} setSearchKey={setSearchKey} />
            {/* <SportsItem
              selectedSport={selectedSportFilter}
              onSportsChange={onSportsChange}
            /> */}
          </div>
          <div className=' mb-5 overflow-hidden' style={{ padding: 10 }}>
            <div className='flex justify-between items-center flex-wrap'>
              <Title title={selectedTab?.title} size='large' />
            </div>
            <div className='flex  mt-9 overflow-x-auto flex-wrap gap-10'>
              {isMatchesLoading && (
                <div>Loading the Matches Please Wait...</div>
              )}
              {!isMatchesLoading &&
                searchKey === '' &&
                matches?.length === 0 && <div>No Matches Available</div>}
              {!isMatchesLoading &&
                searchKey !== '' &&
                matches?.length === 0 && (
                  <div>No matches found "{searchKey}"</div>
                )}
              {!isMatchesLoading &&
                matches?.map((m: any) => {
                  return (
                    <div key={`match${m.id}`} className='mr-2.5'>
                      <ManagerMatchCard
                        id={m.id}
                        match={m}
                        primary={selectedTab?.title === 'Live' ? true : false}
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
                          image: getIcon(m.league_name),
                        }}
                        progress={{
                          percentage: parseFloat(
                            m.match_assignments_overall_task_progress
                          ),
                          lastModifiedDate: '--',
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
    </div>
  );
}
