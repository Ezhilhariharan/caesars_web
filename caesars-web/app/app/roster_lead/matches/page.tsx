'use client';
import { useEffect, useState } from 'react';

// icons
import UserPlus from '@/app/assets1/custom-icons/UserPlus';

// API fetchers
import {
  getMatchesShort,
  getMatchesWithCount,
} from '@/app/apiIntegrations/apiClients/matches';

// libs
import dateConverter from '@/app/lib/dateConverter';
import { getSportsFilterKey } from '@/app/lib/getSportsFilterKey';

// custom hooks
import { useSelected } from '@/app/hooks/useSelected';
import { useSearch } from '@/app/hooks/useSearch';
import { useToggle } from '@/app/hooks/useToggle';

// antd
import { Modal } from 'antd';
import type { PaginationProps } from 'antd';

// components
import Title from '@/app/components/global/title/Title';
import PageHeader from '@/app/components/app/PageHeader';
import UpcomingMatchCard from '@/app/components/global/matchCard/UpcomingMatchCard';
import CardContainer from '@/app/components/global/cardContainer/CardContainer';
import CustomPagination from '@/app/components/pagination/CustomPagination';
import Toast, { toastProps } from '@/app/components/global/toast/Toast';
import AdminupcomingMatchesCard from '../components/AdminUpcomingMatchesCard';
import AssignMatch from '../overview/components/AssignMatch';
import SearchBar from '@/app/components/global/SearchBar';
import LoadingComponent from '@/app/components/global/LoadingComponent';
import Tabs from '@/app/components/global/Tabs';
import SportsItem from '@/app/components/global/SportsItem';

// utils
import { tabs } from './utils/tabs';
import { getIcon } from '@/app/lib/getIcon';

export default function Matches() {
  const [isUnassigned, setIsUnassigned] = useState(false);
  const [unassignedMatch, setUnassignedMatch] = useState<any>(null);
  const [isMatches, setIsMatches] = useState(false);
  const [matches, setMatches] = useState<any>(null);
  const [sportFilters, setSportFilters] = useSelected('All Sports');
  const [searchKey, setSearchKey] = useSearch(null);
  const [openModal, setOpenModal] = useToggle(false);
  const [selectedTab, setSelectedTab] = useSelected(null);
  const [adminFliter, setAdminFilter] = useSelected({});
  const [unassignedCurrentpage, setunassignedCurrentpage] = useSelected(1);
  const [currentPage, setCurrentPage] = useSelected(1);

  const [user, setUser] = useState<any>({});
  const [selectedUnassignedMatch, setSlectedUnassignedMatch] = useState<any>(
    {}
  );

  // toast
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
    // checking the session
    setUser(getUserFromLocalstorage());

    // checking the matches tab
    let setTabFromLocalStorge = tabs.filter(
      (t) => t.title === getTabsFromLocalstorage()
    );
    if (setTabFromLocalStorge.length > 0) {
      setSelectedTab(setTabFromLocalStorge[0]);
      setAdminFilter(setTabFromLocalStorge[0]?.filter);
    } else {
      setSelectedTab(tabs[0]);
      setAdminFilter(tabs[0]?.filter);
    }
  }, []);

  useEffect(() => {
    loadData(0);
  }, [searchKey]);

  useEffect(() => {
    loadData(0);
  }, [adminFliter]);

  function getUserFromLocalstorage() {
    const userString = localStorage.getItem('user');
    if (!userString) return {};
    return JSON.parse(userString);
  }

  function getTabsFromLocalstorage() {
    const tabString = localStorage.getItem('matches tab');
    if (!tabString) return 'Unassigned Matches';
    return tabString;
  }

  function loadData(skip: any) {
    switch (selectedTab?.title) {
      case 'Unassigned Matches':
        fetchUnassignedMatches(skip);
        setunassignedCurrentpage(1);
        break;
      case 'Assigned Matches':
        fetchMatches(skip);
        setCurrentPage(1);
        break;
      case 'Pending Approval':
        fetchMatches(skip);
        setCurrentPage(1);
        break;
      case 'Approved Matches':
        fetchMatches(skip);
        setCurrentPage(1);
        break;
      default:
        return '';
    }
  }

  // fetch matches from API
  const fetchMatches = async (skip: any) => {
    setIsMatches(true);
    try {
      const res = await getMatchesWithCount({
        limit: 8,
        skip: skip,
        query: {
          status: 0,
          sports: getSportsFilterKey(sportFilters),
          ...adminFliter,
          searchKey,
        },
      });
      setIsMatches(false);
      setMatches(res);
    } catch (e) {
      console.warn(e);
      setIsMatches(false);
    }
  };

  const fetchUnassignedMatches = async (skip: any) => {
    setIsUnassigned(false);
    try {
      const res = await getMatchesShort({
        limit: 10,
        skip: skip,
        query: {
          status: 0,
          sports: getSportsFilterKey(sportFilters),
          ...adminFliter,
          searchKey,
        },
      });
      setUnassignedMatch(res);
      setIsUnassigned(false);
    } catch (e) {
      console.warn(e);
      setIsUnassigned(false);
    }
  };

  const onTabChange = (f: any) => {
    setSelectedTab(f);
    setAdminFilter(f.filter);
    localStorage.setItem('matches tab', f.title);
  };

  const onSportsChange = (sport: string) => setSportFilters(sport);

  // pagination
  const onUnassignedPageChange: PaginationProps['onChange'] = (
    page: number
  ) => {
    // if (selectedTab?.title === 'Unassigned Matches') skip = (page - 1) * 8;
    fetchUnassignedMatches((page - 1) * 10);
    setunassignedCurrentpage(page);
  };

  const onPageChange: PaginationProps['onChange'] = (page: number) => {
    // if (selectedTab?.title !== 'Unassigned Matches') skip = (page - 1) * 8;
    fetchMatches((page - 1) * 8);
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
      <div className='flex'>
        <div className='flex-1'>
          <PageHeader
            title={`Hi, ${(user as any).first_name} ${
              (user as any).last_name
            } `}
            subTitle={"Let's finish your task today!"}
          />
          <Tabs
            title='Explore Matches'
            tabs={tabs}
            selectedTab={selectedTab}
            onTabChange={onTabChange}
            loading={
              selectedTab?.title === 'Unassigned Matches'
                ? isUnassigned
                : isMatches
            }
          />
          <div className='flex justify-between items-center my-5'>
            <SearchBar searchKey={searchKey} setSearchKey={setSearchKey} />
            {/* <SportsItem
              selectedSport={sportFilters}
              onSportsChange={onSportsChange}
            /> */}
          </div>
          <div className='p-2.5 mb-5 overflow-hidden'>
            <div className='flex justify-between items-center flex-wrap'>
              <Title title={selectedTab?.title} size='large' />
            </div>
            {[
              'Assigned Matches',
              'Pending Approval',
              'Approved Matches',
            ].includes(selectedTab?.title) && (
              <>
                <div className='flex  mt-9 overflow-x-auto flex-wrap gap-14'>
                  {isMatches && (
                    <div className='w-full h-full flex items-center justify-center'>
                      <LoadingComponent text='Loading the Matches Please Wait' />
                    </div>
                  )}
                  {!isMatches && matches?.data?.length === 0 && (
                    <div>No Matches Available</div>
                  )}
                  {!isMatches &&
                    matches?.data?.map((m: any, i: number) => {
                      return (
                        <div key={`match${m.id}`} style={{ marginRight: 10 }}>
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
                            loadDatas={loadData}
                            toastPopup={toastPopup}
                            setToastPopup={setToastPopup}
                            toastDetails={toastDetails}
                            setToastDetails={setToastDetails}
                          />
                        </div>
                      );
                    })}
                </div>
                {!isMatches && matches?.count > 8 && (
                  <div className='w-full h-[100px] mt-10 border border-[#E0E3E8] rounded-lg px-5 flex items-center'>
                    <CustomPagination
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      total={matches?.count}
                      pageSize={8}
                      onChange={onPageChange}
                    />
                  </div>
                )}
              </>
            )}
            {['Unassigned Matches'].includes(selectedTab?.title) && (
              <div className='flex  mt-9 overflow-x-auto justify-between'>
                {isUnassigned && (
                  <div className='w-full h-full flex items-center justify-center'>
                    <LoadingComponent text='Loading the Matches Please Wait' />
                  </div>
                )}
                {!isUnassigned && unassignedMatch?.data?.length === 0 && (
                  <div>No Matches Available</div>
                )}
                {!isUnassigned && unassignedMatch?.data?.length > 0 && (
                  <CardContainer
                    cardClassName='w-full'
                    style={{
                      padding: '20px 20px',
                      border: '1px solid #E0E3E8',
                    }}
                  >
                    <div className='bg-[#F9F9F9] h-[50px] flex items-center text-center'>
                      <div className='w-2/4'>Matches</div>
                      <div className='w-1/4'>Match Date</div>
                      <div className='w-1/4'>Assign</div>
                    </div>

                    <div className='w-full mt-5'>
                      {!isUnassigned &&
                        unassignedMatch?.data?.map((m: any, i: any) => {
                          const { date, monthInString, year } = dateConverter(
                            m.match_started_at
                          );
                          return (
                            <div
                              key={'unassigned-match' + i}
                              className='flex items-center justify-between border-b'
                            >
                              <div className='text-center w-2/4'>
                                <AdminupcomingMatchesCard
                                  team1_name={m.team1_name}
                                  team1_image={m.team1_logo_image}
                                  team2_name={m.team2_name}
                                  team2_image={m.team2_logo_image}
                                  style={{
                                    width: '100%',
                                    padding: '20px 40px',
                                  }}
                                />
                              </div>
                              <div className='text-center w-1/4 flex items-center justify-center text-sm font-normal text-[#B6B6B6]'>
                                {date} {monthInString}
                              </div>
                              <div className='text-center p-2.5 w-1/4 flex items-center justify-center'>
                                <button
                                  onClick={() => {
                                    setOpenModal(true);
                                    setSlectedUnassignedMatch(m);
                                  }}
                                >
                                  <UserPlus color='#C4CAD3' size={30} />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                    {!isUnassigned && unassignedMatch?.count > 8 && (
                      <div className='w-full h-[100px] mt-10 border border-[#E0E3E8] rounded-lg px-5 flex items-center'>
                        <CustomPagination
                          currentPage={unassignedCurrentpage}
                          setCurrentPage={setunassignedCurrentpage}
                          total={unassignedMatch?.count}
                          pageSize={10}
                          onChange={onUnassignedPageChange}
                        />
                      </div>
                    )}
                  </CardContainer>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal
        footer={false}
        open={openModal}
        onCancel={() => {
          setOpenModal(false);
        }}
      >
        <AssignMatch
          match={selectedUnassignedMatch}
          open={openModal}
          setOpen={setOpenModal}
          toastPopup={toastPopup}
          setToastPopup={setToastPopup}
          toastDetails={toastDetails}
          setToastDetails={setToastDetails}
          loadMatch={fetchUnassignedMatches}
        />
      </Modal>
    </div>
  );
}
