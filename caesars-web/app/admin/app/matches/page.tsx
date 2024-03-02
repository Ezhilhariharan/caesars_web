'use client';
import React, { useEffect, useState } from 'react';

// API fetchers
import { getMatchesForAdmin } from '@/app/apiIntegrations/apiClients/adminMatches';

// libs
import { getIcon } from '@/app/lib/getIcon';
import { getSportsFilterKey } from '@/app/lib/getSportsFilterKey';
import { getAdminFromLocalstorage } from '@/app/lib/localstorageHelpers';

// components
import Toast, { toastProps } from '@/app/components/global/toast/Toast';
import PageHeader from '@/app/components/app/PageHeader';
import SearchBar from '@/app/components/global/SearchBar';
import UpcomingMatchCard from '@/app/components/global/matchCard/UpcomingMatchCard';
import ManagerMatchCard from '@/app/components/global/matchCard/ManagerMatchCard';
import LoadingComponent from '@/app/components/global/LoadingComponent';
import Tabs from '@/app/components/global/Tabs';
import CustomPagination from '@/app/components/pagination/CustomPagination';
import SportsItem from '@/app/components/global/SportsItem';

// antd
import { PaginationProps } from 'antd';

// static data
import { tabs } from './utils/tabs';

// global variables
let count = 0;

export default function Matches() {
  const [admin, setAdmin] = useState<any>({});
  const [selectedTab, setSelectedTab] = useState<any>(null);
  const [isMatches, setIsMatches] = useState(false);
  const [selectedSubTab, setSelectedSubTab] = useState<any>(null);
  const [searchKey, setSearchKey] = useState<string>('');
  const [selectedSportFilter, setSelectedSportFilter] = useState('All Sports');
  const [adminFilter, setAdminFilter] = useState({});
  const [matches, setMatches] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [toastPopup, setToastPopup] = useState(false);
  const [toastDetails, setToastDetails] = useState<toastProps>({
    type: 'alert',
    title: '',
    discription: '',
    logo: '',
  });

  useEffect(() => {
    if (toastPopup === true) {
      const timeOut = setTimeout(() => {
        setToastPopup(false);
      }, 2000);
      return () => clearTimeout(timeOut);
    }
  }, [toastPopup]);

  useEffect(() => {
    setAdmin(getAdminFromLocalstorage());

    const selectedTabs = tabs.filter(
      (t) => getTabsFromLocalstorage().team === t.title
    );
    const selectedSubTabs = selectedTabs[0]?.subtabs.filter(
      (t: any) => getTabsFromLocalstorage().tab === t.title
    );

    setSelectedTab(selectedTabs[0]);
    setSelectedSubTab(selectedSubTabs[0]);
    setAdminFilter(selectedSubTabs[0].filter);
  }, []);

  useEffect(() => {
    loadData(selectedSportFilter, 0, selectedTab?.title);
  }, [searchKey]);

  useEffect(() => {
    loadData(selectedSportFilter, 0, selectedTab?.title);
  }, [adminFilter]);

  function getTabsFromLocalstorage() {
    const tabString = localStorage.getItem('matches tab');
    if (!tabString) return { team: 'pre-game', tab: 'Inprogress Matches' };
    return JSON.parse(tabString);
  }

  async function loadMatches(sport: any, skip: any) {
    setIsMatches(true);
    try {
      const res = await getMatchesForAdmin({
        limit: 8,
        skip: skip,
        query: {
          type: selectedTab?.title,
          sports: getSportsFilterKey(sport),
          ...adminFilter,
          searchKey,
        },
      });
      count = res?.count;
      setMatches(res?.data);
      setIsMatches(false);
    } catch (e) {
      setIsMatches(false);
      console.warn(e);
    }
  }

  function loadData(sport: any, skip: any, team?: any) {
    if (team === 'pre-game') {
      switch (selectedSubTab.title) {
        case 'Newly Assigned Matches':
          loadMatches(sport, skip);
          break;
        case 'Inprogress Matches':
          loadMatches(sport, skip);
          break;
        case 'Pending Approval':
          loadMatches(sport, skip);
          break;
        case 'Approved Matches':
          loadMatches(sport, skip);
          break;
        default:
          return '';
      }
    }

    if (team === 'in-game') {
      switch (selectedSubTab.title) {
        case 'Unassigned Matches':
          loadMatches(sport, skip);
          break;
        case 'Assigned Matches':
          loadMatches(sport, skip);
          break;
        case 'Live Matches':
          loadMatches(sport, skip);
          break;
        case 'End Matches':
          loadMatches(sport, skip);
          break;
        default:
          return '';
      }
    }
  }

  // tabs change
  const onMainTabChange = (f: any) => {
    setSelectedTab(f);
    if (f.title === 'pre-game') {
      setSelectedSubTab(f.subtabs[1]);
      setAdminFilter(f.subtabs[1].filter);
    }
    if (f.title === 'in-game') {
      setSelectedSubTab(f.subtabs[2]);
      setAdminFilter(f.subtabs[2].filter);
    }
  };

  const onSubTabChange = (f: any) => {
    setSelectedSubTab(f);
    setAdminFilter(f.filter);
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
    <div className='' style={{}}>
      <Toast
        type={toastDetails.type}
        title={toastDetails.title}
        discription={toastDetails.discription}
        logo={toastDetails.logo}
        toggle={toastPopup}
      />
      <div>
        <Tabs
          title='Explore Matches'
          tabs={tabs}
          selectedTab={selectedTab}
          onTabChange={onMainTabChange}
          loading={isMatches}
        />

        <div className='py-2.5 my-5 flex items-center justify-between'>
          <SearchBar searchKey={searchKey} setSearchKey={setSearchKey} />
          {/* For Feature */}
          {/* <SportsItem
            selectedSport={selectedSportFilter}
            onSportsChange={onSportsChange}
            loading={isMatches}
          /> */}
        </div>

        {selectedTab && (
          <Tabs
            tabs={selectedTab.subtabs}
            selectedTab={selectedSubTab}
            onTabChange={onSubTabChange}
            loading={isMatches}
          />
        )}

        {selectedTab?.title === 'pre-game' && (
          <div className='flex flex-wrap gap-x-16 gap-y-10 mt-10'>
            {!isMatches && matches?.length === 0 && (
              <div>No matches available</div>
            )}
            {isMatches && <LoadingComponent text='Loading' />}
            {!isMatches &&
              matches?.map((m: any) => {
                return (
                  <UpcomingMatchCard
                    role='admin'
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
                    loadDatas={loadMatches}
                    contributors={{
                      users: [],
                      matchDate: (() => {
                        const date1 = new Date(m.fixture_start_at);
                        const date2 = new Date();
                        const diffTime = Math.abs(
                          (date2 as any) - (date1 as any)
                        );
                        const diffDays = Math.ceil(
                          diffTime / (1000 * 60 * 60 * 24)
                        );
                        return diffDays + ' days ';
                      })(),
                    }}
                  />
                );
              })}
            {count > 8 && (
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
        )}

        {selectedTab?.title === 'in-game' && (
          <div className='flex flex-wrap gap-x-16 gap-y-10 mt-10'>
            {!isMatches && matches?.length === 0 && (
              <div>No matches available</div>
            )}
            {isMatches && <LoadingComponent text='Loading' />}
            {!isMatches &&
              matches?.map((m: any) => {
                return (
                  <ManagerMatchCard
                    id={m.id}
                    match={m}
                    header={{
                      team1_image: m.team1_logo_image,
                      team2_image: m.team1_logo_image,
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
                        return diffDays + ' days ';
                      })(),
                    }}
                  />
                );
              })}
            {count > 8 && (
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
        )}
      </div>
    </div>
  );
}
