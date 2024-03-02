'use client';
import React, { useEffect, useState } from 'react';

// libs
import { getIcon } from '@/app/lib/getIcon';

// API fetchers
import { getMatchesWithCount } from '@/app/apiIntegrations/apiClients/matches';

// components
import PageHeader from '@/app/components/app/PageHeader';
import Title from '@/app/components/global/title/Title';
import UpcomingMatchCard from '@/app/components/global/matchCard/UpcomingMatchCard';
import CustomPagination from '@/app/components/pagination/CustomPagination';
import { getSportsFilterKey } from '@/app/lib/getSportsFilterKey';
import SearchBar from '@/app/components/global/SearchBar';
import Tabs from '@/app/components/global/Tabs';
import SportsItem from '@/app/components/global/SportsItem';

// antd
import type { PaginationProps } from 'antd';
import { tabs } from './utils/tabs';

// global variable
let count = 0;

export default function RosterManageMatchesPage() {
  const [user, setUser] = useState<any>({});
  const [matches, setMatches] = useState([]);
  const [isMatchesLoading, setIsMatchesLoading] = useState(false);
  const [selectedSportFilter, setSelectedSportFilter] = useState('All Sports');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKey, setSearchKey] = useState('');
  const [selectedTab, setSelectedTab] = useState<any>(null);
  const [adminFliter, setAdminFilter] = useState({ match_asignment_status: 1 });

  useEffect(() => {
    setUser(getUserFromLocalstorage());

    let selectedTab = tabs.filter((t) => t.title === getTabsFromLocalstorage());
    setSelectedTab(selectedTab[0]);
    setAdminFilter(selectedTab[0]?.filter);
  }, []);

  useEffect(() => {
    loadData(selectedSportFilter, 0);
  }, [searchKey]);

  useEffect(() => {
    loadData(selectedSportFilter, 0);
  }, [adminFliter]);

  function loadData(sport: any, skip?: any) {
    switch (selectedTab?.title) {
      case 'Matches in progress':
        loadMatches(sport, skip);
        setCurrentPage(1);
        break;
      case 'Newly Assigned Matches':
        loadMatches(sport, skip);
        setCurrentPage(1);
        break;
      case 'Submitted Matches':
        loadMatches(sport, skip);
        setCurrentPage(1);
        break;

      default:
        return '';
    }
  }

  function getUserFromLocalstorage() {
    const userString = localStorage.getItem('user');
    if (!userString) return {};
    return JSON.parse(userString);
  }

  function getTabsFromLocalstorage() {
    const tabString = localStorage.getItem('matches tab');
    if (!tabString) return 'Matches in progress';
    return tabString;
  }

  async function loadMatches(sport?: any, skip?: any) {
    setMatches([]);
    setIsMatchesLoading(true);
    try {
      const res = await getMatchesWithCount({
        limit: 8,
        skip: skip,
        query: {
          status: 0,
          sports: getSportsFilterKey(sport),
          ...adminFliter,
          searchKey,
        },
      });
      setMatches(res.data);
      count = res.count;
      setIsMatchesLoading(false);
    } catch (e) {
      setIsMatchesLoading(false);
      console.warn(e);
    }
  }

  const onTabChange = (f: any) => {
    if (!isMatchesLoading) {
      setIsMatchesLoading(true);
      setSelectedTab(f);
      setAdminFilter(f.filter);
      localStorage.setItem('matches tab', f.title);
    }
  };

  const onSportsChange = (sport: string) => {
    setSelectedSportFilter(sport);
    loadMatches(sport, 0);
  };

  const onPageChange: PaginationProps['onChange'] = (
    page: number,
    pageSize: number
  ) => {
    const skip = (page - 1) * 8;
    loadMatches(selectedSportFilter, skip);
    setCurrentPage(page);
  };

  return (
    <div className='py-5 px-8 flex-1 overflow-scroll'>
      <div className='flex-1'>
        <PageHeader
          title={`Hi, ${user?.first_name} ${user?.last_name} `}
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
        <div className='mb-5 overflow-hidden'>
          <Title title={selectedTab?.title} size='large' />
          <div className='flex flex-wrap gap-10 mt-9 overflow-x-auto'>
            {!isMatchesLoading && searchKey === '' && matches?.length === 0 && (
              <div className='ml-5 text-[#999]'>
                {selectedTab?.title === 'Matches in progress'
                  ? 'No matches are in progress!'
                  : 'No new matches are assigned!'}
              </div>
            )}
            {isMatchesLoading && (
              <div className='ml-5 text-[#999]'>
                Loading the Matches Please Wait...
              </div>
            )}
            {!isMatchesLoading && searchKey !== '' && matches?.length === 0 && (
              <div className='gap-4 flex ml-5 text-[#999]'>
                <p>No matches found</p> <p>" {searchKey} "</p>
              </div>
            )}
            {!isMatchesLoading &&
              matches?.map((m: any, i) => {
                return (
                  <div style={{ marginRight: 20 }} key={i}>
                    <UpcomingMatchCard
                      role='user'
                      id={m.id}
                      match={m}
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
                        users: [
                          {
                            id: m.user_id,
                            first_name: m.first_name,
                            last_name: m.last_name,
                            middle_name: m.middle_name,
                          },
                        ],
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
