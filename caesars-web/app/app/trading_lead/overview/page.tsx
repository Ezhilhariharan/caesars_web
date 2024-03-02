'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// icons
import booksIcon from '../../roster_lead/assets/book.svg';
import bookmarkIcon from '../../roster_lead/assets/bookmark.svg';
import assignedMatchesIcon from '../../../assets/assignedMatches.svg';
import completedMatches from '../../../assets/completedMatches.svg';
import liveMatchesIcon from '../../../assets/liveMatches.svg';

// API
import {
  getMatches,
  getMatchesWithCount,
} from '@/app/apiIntegrations/apiClients/matches';
import { get } from '@/app/apiIntegrations/fetcher';

//libs
import { getUserFromLocalstorage } from '@/app/lib/localstorageHelpers';
import dateConverter from '@/app/lib/dateConverter';
import { getIcon } from '@/app/lib/getIcon';
import { allMonths } from '@/app/components/global/staticCalenderDatas';

// components
import Toast, { toastProps } from '@/app/components/global/toast/Toast';
import PageHeader from '@/app/components/app/PageHeader';
import Calender from '@/app/components/overview/Calender';
import Title from '@/app/components/global/title/Title';
import OverviewKpiCard from '../../../components/global/OverviewKpiCard';
import MatchCard from '../../roster_lead/components/MatchCard';
import ManagerMatchCard from '../../../components/global/matchCard/ManagerMatchCard';
import AssignMatch from './components/AssignMatch';
import SliderContainer from '@/app/components/global/slider/SliderContainer';
import SliderContainerWithCustomPagination from '@/app/components/global/slider/SliderContainerWithCustomPagination';
import LoadingComponent from '@/app/components/global/LoadingComponent';
import { getTradingTeamMatchesWithCount } from '@/app/apiIntegrations/apiClients/tradingTeamMatches';
import dayjs from 'dayjs';

// globale variable
const current = new Date();
const today = `${dateConverter(current).year}-${dateConverter(current).month}-${
  dateConverter(current).date
}`;
let selectedDate: any = `${dateConverter(current).year}-${
  dateConverter(current).month
}-${dateConverter(current).date}`;

export default function OverviewPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>({});
  const [showPage, setShowPage] = useState(false);
  const [selectedSportFilter, setSelectedSportFilter] = useState('Baseball');
  const [KPI, setKPI] = useState<any>({});

  // Handle the matches releated data
  const [isMatchesLoading, setIsMatchesLoading] = useState(false);
  const [matches, setMatches] = useState<any[]>([]);
  const [assignedMatches, setassignedMatches] = useState<any[]>([]);
  const [liveMatches, setLiveMatches] = useState<any[]>([]);

  // Handle the Toast Notification
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

  // checking for the session
  useEffect(() => {
    const _user = localStorage.getItem('user');

    if (!_user) {
      setToastPopup(true);
      setToastDetails({
        type: 'alert',
        title: 'Alert',
        discription: 'Not loggedin',
      });
      router.push('/login');
    } else {
      try {
        const user_p = JSON.parse(_user);
        setUser(getUserFromLocalstorage());
        if (user_p?.title !== 'trading_lead') {
          //TO-DO update the alert messge
          setToastPopup(true);
          setToastDetails({
            type: 'alert',
            title: 'Alert',
            discription: 'Logged in user is not In-game manager',
          });
          router.push('/login');
        } else setShowPage(true);
      } catch (e) {
        setToastPopup(true);
        setToastDetails({
          type: 'alert',
          title: 'Alert',
          discription: 'Invalid user data',
        });
        router.push('/login');
      }
    }
  }, []);

  useEffect(() => {
    // Load the matches
    loadMatches();
    loadKPI();
    loadAssignedMatches(today);
    loadLiveMatches();
  }, []);

  useEffect(() => {
    loadAssignedMatches(today);
  }, [today, selectedSportFilter]);

  // load the KPI for in_game manager
  async function loadKPI() {
    try {
      const res = await get('dashboard/overview');
      setKPI(res);
    } catch (e) {
      console.warn(e);
    }
  }

  // load the matches data
  async function loadMatches(limit = 7, skip = 0) {
    try {
      setIsMatchesLoading(true);
      const res = await getTradingTeamMatchesWithCount({
        limit,
        skip,
        query: { status: 0, match_asignment_status: 3 },
      });
      setMatches(res.data);
      setIsMatchesLoading(false);
    } catch (e) {
      console.warn(e);
    }
  }

  async function loadAssignedMatches(date: any) {
    try {
      setIsMatchesLoading(true);
      const data = await getMatches({
        limit: 5,
        // skip: 0,
        query: {
          status: 0,
          start_date: dayjs(date).format('YYYY-MM-DD'),
          end_date: dayjs(date).format('YYYY-MM-DD'),
          sports: selectedSportFilter,
          match_asignment_status: 4,
        },
      });
      setassignedMatches(data);
      setIsMatchesLoading(false);
    } catch (e) {
      console.warn(e);
    }
  }

  async function loadLiveMatches() {
    setIsMatchesLoading(true);
    try {
      const res = await getMatchesWithCount({
        // limit,
        // skip,
        query: { status: 0, match_asignment_status: 7 },
      });

      setLiveMatches(res.data);
      setIsMatchesLoading(false);
    } catch (e) {
      console.warn(e);
    }
  }

  async function getDates(date: any) {
    selectedDate = date;
    setIsMatchesLoading(true);
    try {
      const data = await getMatches({
        limit: 5,
        query: {
          status: 0,
          start_date: date,
          end_date: date,
          sports: selectedSportFilter,
          match_asignment_status: 5,
        },
      });
      setassignedMatches(data);
      setIsMatchesLoading(false);
    } catch (e) {
      console.warn(e);
    }
  }

  return (
    <>
      {!showPage && (
        <div className='absolute w-full h-full overflow-hidden flex items-center justify-center'>
          Please Wait Loading...
        </div>
      )}
      {showPage && (
        <>
          <Toast
            type={toastDetails.type}
            title={toastDetails.title}
            discription={toastDetails.discription}
            logo={toastDetails.logo}
            toggle={toastPopup}
          />
          <div className='w-screen overflow-hidden overflow-y-scroll flex flex-1 bg-[#f5f5f5]'>
            <div className='w-full flex flex-col pt-5 px-5 max-[1600px]:p-3'>
              <PageHeader
                title={`Hi, ${user.first_name} ${user.last_name} `}
                subTitle={"Let's finish your task today!"}
              />
              <div className='w-full'>
                <div className='w-full gap-7 flex justify-between max-[1600px]:gap-7'>
                  <div className='w-[70%]'>
                    <div className='w-full flex flex-1 gap-5 mb-16 max-[1600px]:gap-5'>
                      <div className='w-[60%] flex flex-col justify-center'>
                        <div className='font-semibold text-2xl text-[#141522] mb-5 -leading-[0.03em]'>
                          Overview
                        </div>
                        <div className='flex justify-between gap-5'>
                          <div className='w-full'>
                            <div
                              className='flex-1 cursor-pointer'
                              onClick={() => {
                                localStorage.setItem(
                                  'matches tab',
                                  'Unassigned'
                                );
                                router.push('/app/trading_lead/matches');
                              }}
                            >
                              <div className='flex-1 h-[185px] px-5 py-4 rounded-[15px] bg-[#fff] '>
                                <Image
                                  src={bookmarkIcon}
                                  alt={'logo'}
                                  style={{ marginBottom: 20 }}
                                />
                                <div className='text-xs font-medium text-[#54577A] -tracking-[0.02em] mb-2.5'>
                                  {'Overall Unassigned'}
                                </div>
                                <div className='text-2xl font-medium text-[#000000] leading-[29px] mb-2.5'>
                                  {KPI?.overallUnassigned | 0}
                                </div>
                                <div className='text-xs font-normal text-[#54577A] -tracking-[0.02em] leading-[17px] mb-[30px]'>
                                  {'Matches'}
                                </div>
                              </div>
                            </div>
                            <div
                              className='flex-1 cursor-pointer mt-5'
                              onClick={() => {
                                localStorage.setItem('matches tab', 'Assigned');
                                router.push('/app/trading_lead/matches');
                              }}
                            >
                              <div className='h-[185px] px-5 py-4 rounded-[15px] bg-[#fff] '>
                                <Image
                                  src={bookmarkIcon}
                                  alt={'logo'}
                                  style={{ marginBottom: 20 }}
                                />
                                <div
                                  className='text-xs font-medium text-[#54577A] -tracking-[0.02em] mb-2.5'
                                  style={{
                                    fontWeight: 500,
                                    fontSize: 12,
                                    letterSpacing: '-0.02em',
                                    color: '#54577A',
                                    marginBottom: 10,
                                  }}
                                >
                                  {'Assigned'}
                                </div>
                                <div className='text-2xl font-medium text-[#000000] leading-[29px] mb-2.5'>
                                  {KPI?.overallassigned | 0}
                                </div>
                                <div className='text-xs font-normal text-[#54577A] -tracking-[0.02em] leading-[17px] mb-[30px]'>
                                  {'Matches'}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='h-[100%] w-full px-5 py-4 rounded-[15px] bg-[#fff] '>
                            <div
                              className='cursor-pointer'
                              onClick={() => {
                                localStorage.setItem('matches tab', 'Assigned');
                                router.push('/app/trading_lead/matches');
                              }}
                            >
                              <div className='text-xs font-normal text-[#54577A] -tracking-[0.02em] leading-[17px] mt-2 mb-[15px]'>
                                {'Pre-game Trader'}
                              </div>
                              <Image
                                src={booksIcon}
                                alt={'logo'}
                                className='my-[10px]'
                              />
                              <div className='text-2xl font-medium text-[#000000] leading-[29px] my-[15px]'>
                                {KPI?.preGameAssigned | 0}
                              </div>
                            </div>
                            <div className='text-xs font-normal text-[#54577A] -tracking-[0.02em] leading-[17px] my-[15px]'>
                              {'Matches'}
                            </div>
                            <div className=' border-b-[1px] border-[#ECECEC] w-[100%] my-[30px]' />
                            <Image
                              src={completedMatches}
                              alt={'logo'}
                              className='my-[10px]'
                            />
                            <div className='text-2xl font-medium text-[#000000] leading-[29px] my-[15px]'>
                              {KPI?.preGameCompleted | 0}
                            </div>
                            <div className='text-xs font-normal text-[#54577A] -tracking-[0.02em] leading-[17px] my-[15px]'>
                              {'Completed Matches'}
                            </div>
                          </div>
                          <div className='h-[100%] w-full px-5 py-4 rounded-[15px] bg-[#fff] '>
                            <div
                              className='cursor-pointer'
                              onClick={() => {
                                localStorage.setItem('matches tab', 'Assigned');
                                router.push('/app/trading_lead/matches');
                              }}
                            >
                              <div className='text-xs font-normal text-[#54577A] -tracking-[0.02em] leading-[17px] mt-2 mb-[15px]'>
                                {'In-game Trader'}
                              </div>
                              <Image
                                src={assignedMatchesIcon}
                                alt={'logo'}
                                className='my-[10px]'
                              />
                              <div className='text-2xl font-medium text-[#000000] leading-[29px] my-[15px]'>
                                {KPI?.inGameAssigned | 0}
                              </div>
                            </div>
                            <div
                              className='cursor-pointer'
                              onClick={() => {
                                localStorage.setItem('matches tab', 'Live');
                                router.push('/app/trading_lead/matches');
                              }}
                            >
                              <div className='text-xs font-normal text-[#54577A] -tracking-[0.02em] leading-[17px] my-[15px]'>
                                {'Matches'}
                              </div>
                              <div className=' border-b-[1px] border-[#ECECEC] w-[100%] my-[30px]' />
                              <Image
                                src={liveMatchesIcon}
                                alt={'logo'}
                                className='my-[10px]'
                              />
                              <div className='text-2xl font-medium text-[#000000] leading-[29px] my-[15px]'>
                                {KPI?.inGameLive | 0}
                              </div>
                              <div className='text-xs font-normal text-[#54577A] -tracking-[0.02em] leading-[17px] my-[15px] cursor-pointer'>
                                {'Live Matches'}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='w-[40%]' style={{ flex: 1 }}>
                        <AssignMatch
                          toastPopup={toastPopup}
                          setToastPopup={setToastPopup}
                          toastDetails={toastDetails}
                          setToastDetails={setToastDetails}
                        />
                      </div>
                    </div>

                    <div className=''>
                      <SliderContainer
                        slideToShow={3}
                        slideToScroll={1}
                        title='Upcoming Matches'
                        titleSize='large'
                        style={{
                          width: 'clamp(200px,100%,100%)',
                        }}
                        responsive={[
                          {
                            breakpoint: 1920,
                            settings: {
                              slidesToShow: 3,
                              slidesToScroll: 1,
                            },
                          },
                          {
                            breakpoint: 1700,
                            settings: {
                              slidesToShow: 2.7,
                              slidesToScroll: 1,
                            },
                          },
                          {
                            breakpoint: 1600,
                            settings: {
                              slidesToShow: 2.4,
                              slidesToScroll: 1,
                            },
                          },
                          {
                            breakpoint: 1440,
                            settings: {
                              slidesToShow: 1,
                              slidesToScroll: 1,
                            },
                          },
                        ]}
                      >
                        {matches?.map((m: any) => {
                          return (
                            <div
                              key={`match${m?.id}`}
                              style={{ marginRight: 10 }}
                            >
                              <ManagerMatchCard
                                id={m?.id}
                                match={m}
                                primary={false}
                                modal='assign'
                                header={{
                                  team1_image: m?.team1_logo_image,
                                  team2_image: m?.team2_logo_image,
                                }}
                                sports={{
                                  team1_name: m?.team1_short_name,
                                  team2_name: m?.team2_short_name,
                                  location: {
                                    name: m?.location_name,
                                    city: m?.city_name,
                                    country: m?.country_common_name,
                                  },
                                  image: getIcon(m?.league_name),
                                }}
                                progress={{
                                  percentage: parseFloat(
                                    m?.match_assignments_overall_task_progress
                                  ),
                                  lastModifiedDate: '--',
                                }}
                                contributors={{
                                  liveTime: '',
                                  matchDate: (() => {
                                    const date1 = new Date(m?.fixture_start_at);
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
                                toastPopup={toastPopup}
                                setToastPopup={setToastPopup}
                                toastDetails={toastDetails}
                                setToastDetails={setToastDetails}
                                loadMatch={loadMatches}
                              />
                            </div>
                          );
                        })}
                        {matches?.length > 0 && (
                          <div
                            className='w-[300px] h-[400px] bg-white cursor-pointer rounded-[10px]'
                            onClick={() => {
                              localStorage.setItem('matches tab', 'Unassigned');
                              router.push('/app/trading_lead/matches');
                            }}
                          >
                            <div className='w-full h-full flex items-center justify-center'>
                              View All
                            </div>{' '}
                          </div>
                        )}
                      </SliderContainer>
                      {isMatchesLoading && matches?.length === 0 && (
                        <div className='w-full h-[400px] rounded-[10px]'>
                          <LoadingComponent text='Please Wait Loading the Matches' />
                        </div>
                      )}
                      {!isMatchesLoading && matches?.length === 0 && (
                        <div className='w-full h-[400px] rounded-[10px] flex justify-center items-center text-[#ccc] font-medium bg-white'>
                          No Matches Available
                        </div>
                      )}
                    </div>
                  </div>
                  <div className='w-[clamp(420px,100%,420px)]'>
                    <Calender
                      style={{
                        // width: '100%',
                        height: '200px',
                        padding: '28px 20px',
                      }}
                      getDates={getDates}
                    />
                    <div className='w-full mt-20'>
                      {dayjs()?.format('YYYY-MM-DD') ==
                      dayjs(selectedDate)?.format('YYYY-MM-DD') ? (
                        <div className='text-sm font-semibold text-[#141522]'>
                          Today
                        </div>
                      ) : (
                        <div className='text-sm font-semibold text-[#141522]'>
                          {allMonths[dayjs(selectedDate)?.month()]}{' '}
                          {dayjs(selectedDate)?.format('D YYYY')}
                        </div>
                      )}
                      <div className='mt-5'>
                        <SliderContainerWithCustomPagination
                          title='View Matches'
                          primary={true}
                          selectedSport={selectedSportFilter}
                          setSelectedSport={setSelectedSportFilter}
                          headerStyle={{
                            height: '50px',
                            padding: '0 30px 10px',
                            display: 'flex',
                            alignItems: 'end',
                            color: '#121212',
                          }}
                          style={{
                            width: '100%',
                            height: 'auto',
                            background: '#fff',
                            overflow: 'hidden',
                          }}
                        >
                          {isMatchesLoading && (
                            <div className='h-[600px]'>
                              <LoadingComponent text='Please Wait Loading the Matches' />
                            </div>
                          )}

                          {!isMatchesLoading &&
                            assignedMatches &&
                            assignedMatches?.length === 0 && (
                              <div className='w-full h-[600px] bg-white text-center  text-[#ccc] font-medium'>
                                <div className='w-full h-full flex justify-center items-center'>
                                  No Data
                                </div>
                              </div>
                            )}

                          {!isMatchesLoading &&
                            assignedMatches &&
                            assignedMatches?.map((d, i) => {
                              const date = dateConverter(d?.fixture_start_at);
                              return (
                                <div key={`match` + i} className=''>
                                  <MatchCard
                                    matchId={d?.id}
                                    match={d}
                                    header={{
                                      team1_image: d?.team1_logo_image,
                                      team2_image: d?.team2_logo_image,
                                    }}
                                    progress={{
                                      percentage:
                                        d?.match_assignments_overall_task_progress,
                                      lastModifiedDate: '--',
                                    }}
                                    sports={{
                                      team1_name: d?.team1_short_name,
                                      team2_name: d?.team2_short_name,
                                      location: {
                                        name: d?.location_address_line2,
                                        city: d?.city_name,
                                        country: d?.country_alpha2_code,
                                      },
                                      image: getIcon(d.league_name),
                                    }}
                                    date={`${date.date} ${date.monthInString}`}
                                    status={d?.match_status}
                                    venue={`${d?.venue_name}, ${d?.country_short_name}`}
                                    rowDate={d?.fixture_start_at}
                                  />
                                </div>
                              );
                            })}
                        </SliderContainerWithCustomPagination>
                      </div>
                    </div>
                  </div>
                </div>
                {!isMatchesLoading && liveMatches.length > 0 && (
                  <div className='w-full h-[450px] mt-10'>
                    <Title
                      title='Live Matches'
                      size='large'
                      style={{ color: '#141522' }}
                    />
                    <div className='w-full overflow-x-scroll flex items-center mt-3 gap-10'>
                      {!isMatchesLoading &&
                        liveMatches &&
                        liveMatches.length === 0 && (
                          <div className='w-full h-[400px] rounded-[10px] flex items-center justify-center text-[#ccc] bg-white font-medium'>
                            No Data
                          </div>
                        )}

                      {isMatchesLoading && (
                        <div className='w-full h-[400px] rounded-[10px] flex items-center justify-center bg-white'>
                          <LoadingComponent text='Please Wait Loading the Matches' />
                        </div>
                      )}

                      {!isMatchesLoading &&
                        liveMatches &&
                        liveMatches.map((m: any, i: any) => {
                          return (
                            <div key={`match` + i} style={{ marginRight: 10 }}>
                              <ManagerMatchCard
                                id={m.id}
                                match={m}
                                primary={false}
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
                                    return diffDays + ' days ';
                                  })(),
                                }}
                              />
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
