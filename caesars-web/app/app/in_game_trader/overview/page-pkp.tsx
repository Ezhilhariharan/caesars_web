'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// icons
import booksIcon from './assets/book.svg';
import tickIcon from './assets/checkbox.svg';
import bookmarkIcon from './assets/bookmark.svg';

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

// global variables
const current = new Date();
const today = `${dateConverter(current).date}-${dateConverter(current).month}-${
  dateConverter(current).year
}`;
let selectedDate: any = '';

export default function OverviewPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>({});
  const [showPage, setShowPage] = useState(false);
  const [selectedSportFilter, setSelectedSportFilter] = useState('Baseball');
  const [isMatchesLoading, setIsMatchesLoading] = useState(false);
  const [isAssignedMatchLoading, setIsAssignedMatchLoading] = useState(false);
  const [assignedMatches, setAssignedMatches] = useState<any[]>([]);
  const [liveMatches, setLiveMatches] = useState<any[]>([]);
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
        if (user_p?.user_role_id !== '4') {
          //TO-DO update the alert messge
          setToastPopup(true);
          setToastDetails({
            type: 'alert',
            title: 'Alert',
            discription: 'Logged in user is not In-game trader',
          });
          router.push('/app/in_game_trader/overview');
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
    loadLiveMatches();
    loadKPI();

    const date = `${dateConverter(current).year}-${
      dateConverter(current).month
    }-${dateConverter(current).month}`;
    loadAssignedMatchs(date);
  }, []);

  useEffect(() => {
    const date = `${dateConverter(current).year}-${
      dateConverter(current).month
    }-${dateConverter(current).month}`;
    loadAssignedMatchs(date);
  }, [today, selectedSportFilter]);

  async function loadKPI() {
    try {
      const res = await get('dashboard/overview');
      setKPI(res);
    } catch (e) {
      console.warn(e);
    }
  }

  async function loadLiveMatches() {
    try {
      const res = await getMatchesWithCount({
        limit: 7,
        query: { status: 0, match_asignment_status: 5 },
      });
      setLiveMatches(res.data);
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
          start_date: date,
          end_date: date,
          sports: selectedSportFilter,
          match_asignment_status: 5,
        },
      });
      setAssignedMatches(data);
      setIsAssignedMatchLoading(false);
    } catch (e) {
      console.warn(e);
    }
  }

  async function getDates(date: any) {
    selectedDate = date;
    setIsAssignedMatchLoading(true);

    try {
      const data = await getMatches({
        query: {
          status: 0,
          start_date: date,
          end_date: date,
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

  return (
    <>
      {!showPage && (
        <div className='absolute w-full h-full overflow-hidden flex items-center justify-center'>
          <LoadingComponent text=' Please Wait Loading' />
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
          <div className='overflow-hidden flex flex-1 bg-[#f5f5f5]'>
            <div className='w-full flex flex-col p-5 pb-0 max-[1600px]:p-3'>
              <PageHeader
                title={`Hi, ${user.first_name} ${user.last_name} `}
                subTitle={"Let's finish your task today!"}
              />
              <div className='w-full gap-10 overflow-scroll flex justify-between'>
                <div>
                  <div className='flex items-center gap-10' style={{ flex: 1 }}>
                    <div className='max-w-[700px]'>
                      <div className='font-semibold text-2xl text-[#141522] mb-5 -leading-[0.03em]'>
                        Overview
                      </div>
                      <div className='flex justify-between gap-10'>
                        <div
                          className='flex-1 w-[200px] cursor-pointer'
                          onClick={() => {
                            localStorage.setItem('matches tab', 'Upcoming');
                            router.push('/app/in_game_trader/matches');
                          }}
                        >
                          <OverviewKpiCard
                            icon={booksIcon}
                            title={'Upcoming'}
                            value={KPI.upcoming_matches}
                            subtitle='Matches'
                          />
                        </div>
                        <div
                          className='flex-1 min-w-[200px] cursor-pointer'
                          onClick={() => {
                            localStorage.setItem('matches tab', 'Live Matches');
                            router.push('/app/in_game_trader/matches');
                          }}
                        >
                          <OverviewKpiCard
                            icon={tickIcon}
                            title={'Live'}
                            value={KPI.live_matches}
                            subtitle='Matches'
                          />
                        </div>
                        <div
                          className='flex-1 min-w-[200px] cursor-pointer'
                          onClick={() => {
                            localStorage.setItem('matches tab', 'Settelments');
                            router.push('/app/in_game_trader/matches');
                          }}
                        >
                          <OverviewKpiCard
                            icon={bookmarkIcon}
                            title={'Settlements'}
                            value={KPI.overall_unassigned_matches || 0}
                            subtitle='Matches'
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      className='min-w-[350px] h-[350px]'
                      style={{ flex: 1 }}
                    >
                      <UpcomingMatches />
                    </div>
                  </div>
                  <div>
                    <div className='flex mt-10 max-w-[1100px] overflow-x-auto gap-10'>
                      <SliderContainer
                        slideToShow={3}
                        slideToScroll={1}
                        title='Live Matches'
                        titleSize='large'
                      >
                        {isMatchesLoading && liveMatches.length === 0 && (
                          <div>Loading the Matches Please Wait...</div>
                        )}
                        {!isMatchesLoading && liveMatches.length === 0 && (
                          <div className='p-5 text-[#9A9A9A]'>
                            No Live Matches
                          </div>
                        )}
                        {liveMatches &&
                          liveMatches.map((m: any) => {
                            return (
                              <div
                                key={`match${m.id}`}
                                style={{ marginRight: 10 }}
                              >
                                <ManagerMatchCard
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
                                    liveTime: '',
                                    matchDate: (() => {
                                      const date1 = new Date(
                                        m.fixture_start_at
                                      );
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
                    </div>
                  </div>
                </div>
                <div className='w-1/4 min-w-[350px]'>
                  <Calender
                    style={{
                      width: '380px',
                      height: '200px',
                      padding: '28px 24px',
                    }}
                    getDates={getDates}
                  />

                  <div className='mt-9'>
                    <div className='text-sm font-semibold text-[#141522] mb-3'>
                      {selectedDate !== ''
                        ? `${dateConverter(selectedDate).date}-${
                            dateConverter(selectedDate).month
                          }-${dateConverter(selectedDate).year}` !== today
                          ? `${dateConverter(selectedDate).monthInString} ${
                              dateConverter(selectedDate).date
                            } ${dateConverter(selectedDate).year}`
                          : 'Today'
                        : 'Today'}
                    </div>
                    <SliderContainerWithCustomPagination
                      title='Live Matches'
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
                        width: '380px',
                        height: 'auto',
                        background: '#fff',
                      }}
                    >
                      {!isAssignedMatchLoading &&
                        assignedMatches?.length > 0 &&
                        assignedMatches?.map((d) => {
                          const date = dateConverter(d.fixture_start_at);

                          return (
                            <div className=''>
                              <MatchCard
                                match={d}
                                matchId={d.id}
                                header={{
                                  team1_image: d.team1_logo_image,
                                  team2_image: d.team2_logo_image,
                                }}
                                progress={{
                                  percentage:
                                    d.match_assignments_overall_task_progress,
                                  lastModifiedDate: '--',
                                }}
                                sports={{
                                  team1_name: d.team1_short_name,
                                  team2_name: d.team2_short_name,
                                  location: {
                                    name: d.location_address_line2,
                                    city: d.city_name,
                                    country: d.country_alpha2_code,
                                  },
                                  image: getIcon(d.league_name),
                                }}
                                date={`${date.date} ${date.monthInString}`}
                                venue={`${d.venue_name}, ${d.country_short_name}`}
                                rowDate={d.fixture_start_at}
                              />
                            </div>
                          );
                        })}
                      {!isAssignedMatchLoading &&
                        assignedMatches?.length === 0 && (
                          <div className='w-full h-[43vh] flex justify-center items-center text-center text-[#ccc] font-medium'>
                            No Data
                          </div>
                        )}
                      {isAssignedMatchLoading && (
                        <div className='w-full h-[43vh] flex justify-center text-center text-[#ccc] font-medium items-center'>
                          <LoadingComponent text='Loading the Matches Please Wait' />
                        </div>
                      )}
                    </SliderContainerWithCustomPagination>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
