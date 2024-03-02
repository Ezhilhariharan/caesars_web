'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// icons
import booksIcon from './assets/book.svg';
import tickIcon from './assets/in-progress.svg';
import bookmarkIcon from './assets/completed.svg';

// API fetchers
import { get } from '@/app/apiIntegrations/fetcher';
import {
  getMatches,
  getMatchesWithCount,
} from '@/app/apiIntegrations/apiClients/matches';

// libs
import { getIcon } from '@/app/lib/getIcon';
import { getUserFromLocalstorage } from '@/app/lib/localstorageHelpers';
import dateConverter from '@/app/lib/dateConverter';
import dayjs from 'dayjs';

// utils
import { allMonths } from '@/app/components/global/staticCalenderDatas';

// components
import PageHeader from '@/app/components/app/PageHeader';
import Calender from '@/app/components/overview/Calender';
import Toast, { toastProps } from '@/app/components/global/toast/Toast';
import SliderContainer from '@/app/components/global/slider/SliderContainer';
import OverviewKpiCard from '../../../components/global/OverviewKpiCard';
import MatchCard from '../../roster_lead/components/MatchCard';
import UpcomingMatches from './components/UpcomingMatches';
import ManagerMatchCard from '../../../components/global/matchCard/ManagerMatchCard';
import SliderContainerWithCustomPagination from '@/app/components/global/slider/SliderContainerWithCustomPagination';
import LoadingComponent from '@/app/components/global/LoadingComponent';
import { today } from '@/app/utils/CalenderStaticDatas';

// global variables
let selectedDate: any = today;

export default function OverviewPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>({});
  const [showPage, setShowPage] = useState(false);
  const [selectedSportFilter, setSelectedSportFilter] = useState('Baseball');
  const [isMatchesLoading, setIsMatchesLoading] = useState(false);
  const [isAssignedMatchLoading, setIsAssignedMatchLoading] = useState(false);
  const [assignedMatches, setAssignedMatches] = useState<any[]>([]);
  const [upcomingMatches, setUpcomingMatches] = useState<any[]>([]);
  const [KPI, setKPI] = useState<any>({});

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

  //checking for the session
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
        if (user_p?.title !== 'in_game_trader') {
          //TO-DO update the alert messge
          setToastPopup(true);
          setToastDetails({
            type: 'alert',
            title: 'Alert',
            discription: 'Logged in user is not in-game trader',
          });
          router.push('/app/pre_game_trader/overview');
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
    loadUpcomingMatches();
    loadKPI();
    loadAssignedMatchs(today);
  }, []);

  async function loadKPI() {
    try {
      const res = await get('dashboard/overview');
      setKPI(res);
    } catch (e) {
      console.warn(e);
    }
  }

  async function loadUpcomingMatches() {
    try {
      const res = await getMatchesWithCount({
        limit: 7,
        query: { status: 0, match_asignment_status: 4 },
      });
      setUpcomingMatches(res.data);
    } catch (e) {
      console.warn(e);
    }
  }

  async function loadAssignedMatchs(date: any) {
    setIsAssignedMatchLoading(true);
    try {
      const data = await getMatches({
        limit: 5,
        query: {
          status: 0,
          start_date: dayjs(date).format('YYYY-MM-DD'),
          end_date: dayjs(date).format('YYYY-MM-DD'),
          sports: selectedSportFilter,
          match_asignment_status: 4,
        },
      });
      setAssignedMatches(data);
      setIsAssignedMatchLoading(false);
    } catch (e) {
      console.warn(e);
    }
  }

  const getDates = (date: any) => {
    loadAssignedMatchs(date);
  };

  const overviewKpiCardData = [
    {
      id: 1,
      icon: booksIcon,
      title: 'Assigned',
      value: KPI?.assigned | 0,
      subtitle: 'Matches',
      onClick: () => {
        localStorage.setItem('matches tab', 'Newly Assigned');
      },
    },
    {
      id: 2,
      icon: tickIcon,
      title: 'In-progress',
      value: KPI?.inprogress | 0,
      subtitle: 'Matches',
      onClick: () => {
        localStorage.setItem('matches tab', 'In-progress');
      },
    },
    {
      id: 3,
      icon: bookmarkIcon,
      title: 'Completed',
      value: KPI?.completed | 0,
      subtitle: 'completed',
      onClick: () => {
        localStorage.setItem('matches tab', 'Completed');
      },
    },
  ];

  return (
    <>
      {!showPage && (
        <div className='absolute w-full h-full overflow-hidden flex items-center justify-center'>
          <LoadingComponent text=' Please Wait Loading' />
        </div>
      )}
      <>
        <Toast
          type={toastDetails.type}
          title={toastDetails.title}
          discription={toastDetails.discription}
          logo={toastDetails.logo}
          toggle={toastPopup}
        />
        <div className='overflow-hidden overflow-y-scroll flex flex-1 bg-[#f5f5f5]'>
          <div className='w-full flex flex-col p-5 pb-0 max-[1600px]:p-3'>
            <PageHeader
              title={`Hi, ${user.first_name} ${user.last_name}`}
              subTitle={"Let's finish your task today!"}
            />
            <div className='w-full gap-7 flex justify-between max-[1600px]:gap-7'>
              <div className='w-[70%]'>
                <div className='w-full flex flex-1 gap-5 mb-20 max-[1600px]:gap-5'>
                  <div className='w-[60%] flex flex-col justify-center'>
                    <div className='font-semibold text-2xl text-[#141522] mb-5 -leading-[0.03em]'>
                      Overview
                    </div>
                    <div className='w-full flex mt-6 gap-5 max-[1600px]:gap-5'>
                      {overviewKpiCardData?.map((d: any) => {
                        return (
                          <div
                            className='flex-1 cursor-pointer'
                            onClick={() => {
                              d.onClick();
                              router.push('/app/in_game_trader/matches');
                            }}
                          >
                            <OverviewKpiCard
                              icon={d.icon}
                              title={d.title}
                              value={d.value}
                              subtitle={d.subtitle}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className='w-[40%]' style={{ flex: 1 }}>
                    <UpcomingMatches />
                  </div>
                </div>

                <div>
                  <SliderContainer
                    slideToShow={3}
                    slideToScroll={1}
                    title='Upcoming Matches'
                    titleSize='large'
                    style={{
                      width: '100%',
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
                          slidesToShow: 2.4,
                          slidesToScroll: 1,
                        },
                      },
                      {
                        breakpoint: 1600,
                        settings: {
                          slidesToShow: 2,
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
                    {!isMatchesLoading &&
                      upcomingMatches?.map((m: any) => {
                        return (
                          <div
                            key={`match${m?.id}`}
                            style={{ marginRight: 10 }}
                          >
                            <ManagerMatchCard
                              id={m?.id}
                              match={m}
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
                            />
                          </div>
                        );
                      })}
                  </SliderContainer>
                  {isMatchesLoading && upcomingMatches?.length === 0 && (
                    <div className='w-full h-[400px] rounded-[10px]'>
                      <LoadingComponent text='Please Wait Loading the Matches' />
                    </div>
                  )}
                  {!isMatchesLoading && upcomingMatches?.length === 0 && (
                    <div className='w-full h-[400px] rounded-[10px] flex justify-center items-center text-[#ccc] font-medium bg-white'>
                      No Matches Available
                    </div>
                  )}
                </div>
              </div>
              <div className='w-[clamp(400px,100%,400px)]'>
                <Calender
                  style={{
                    width: '100%',
                    height: '200px',
                    padding: '28px 20px',
                  }}
                  getDates={getDates}
                />
                <div className='w-full mt-7'>
                  {/* <div className='text-sm font-semibold text-[#141522]'>
                    {selectedDate !== ''
                      ? `${dateConverter(selectedDate).year}-${
                          dateConverter(selectedDate).month
                        }-${dateConverter(selectedDate).date}` !== today
                        ? `${dateConverter(selectedDate).monthInString} ${
                            dateConverter(selectedDate).date
                          } ${dateConverter(selectedDate).year}`
                        : 'Today'
                      : 'Today'}
                  </div> */}
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
                  <div className='mt-3'>
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
                      {isAssignedMatchLoading && (
                        <div className='h-[440px]'>
                          <LoadingComponent text='Please Wait Loading the Matches' />
                        </div>
                      )}

                      {!isAssignedMatchLoading &&
                        assignedMatches &&
                        assignedMatches?.length === 0 && (
                          <div className='w-full h-[440px] bg-white flex justify-center items-center text-center  text-[#ccc] font-medium'>
                            No Data
                          </div>
                        )}
                      {!isAssignedMatchLoading &&
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
          </div>
        </div>
      </>
    </>
  );
}
