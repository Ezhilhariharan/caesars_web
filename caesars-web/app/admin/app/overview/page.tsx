'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// icon
import mlbIcon from '../../../assets/icons/sports-icon/mlb.svg';
import icon1 from './components/Design1/images/Group1.png';
import icon2 from './components/Design1/images/Group2.png';
import icon3 from './components/Design1/images/Group3.png';
import profile1 from './components/Design2/images/Group1.png';
import progress1 from './components/Design2/images/progress1.png';
import profile from './components/Design2/images/Group.png';
import progress from './components/Design2/images/progress.png';

// API fetchers
import { get } from '../../../apiIntegrations/fetcher';
import { getMatchesForAdmin } from '@/app/apiIntegrations/apiClients/adminMatches';

// lib
import { getAdminFromLocalstorage } from '@/app/lib/localstorageHelpers';

// hooks
import { useLocal } from '@/app/hooks/useLocal';
import { useToggle } from '@/app/hooks/useToggle';

// components
import PageHeader from '@/app/components/app/PageHeader';
import Toast, { toastProps } from '@/app/components/global/toast/Toast';
import MatchOverview from './components/MatchOverview';
import ManagerMatchCard from '@/app/components/global/matchCard/ManagerMatchCard';
import SliderContainer from '@/app/components/global/slider/SliderContainer';
import RecentSettlements from './components/RecentSettlements';
import LoadingComponent from '@/app/components/global/LoadingComponent';
import Members from './components/Members';
import Title from '@/app/components/global/title/Title';
import MemberOverviewDesign1 from './components/Design1';
import MemberOverviewDesign2 from './components/Design2';

export default function AdminOverviewPage() {
  const router = useRouter();

  // custom hooks
  const [isMatches, setIsMatches] = useToggle(true);
  const [matchesTab, setMatchesTab] = useLocal('matches tab', {});

  const [admin, setAdmin] = useState<any>({});
  const [liveMatches, setLiveMatches] = useState([]);
  const [overview, setOverview] = useState<any>({});
  const [memberOverview, setMemberOverview] = useState<any>({});

  // Toast
  const [toastPopup, setToastPopup] = useState(false);
  const [toastDetails, setToastDetails] = useState<toastProps>({
    type: 'alert',
    title: '',
    discription: '',
    logo: '',
  });

  // Toast auto close
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
    const _user = localStorage.getItem('admin');

    if (!_user) {
      setToastPopup(true);
      setToastDetails({
        type: 'alert',
        title: 'Alert',
        discription: 'Not loggedin',
      });
      return router.push('/admin/login');
    }

    setAdmin(getAdminFromLocalstorage());
    loadOverviewKPI();
    loadMemberKPI();
    loadMatches();
  }, []);

  async function loadOverviewKPI() {
    try {
      const res = await get('/dashboard/overview');
      setOverview(res);
    } catch (e) {
      console.warn(e);
    }
  }

  async function loadMemberKPI() {
    try {
      const res = await get('/dashboard/member-overview');
      setMemberOverview(res);
    } catch (e) {
      console.warn(e);
    }
  }

  async function loadMatches() {
    try {
      const res = await getMatchesForAdmin({
        limit: 6,
        query: {
          type: 'in-game',
          status: 'live',
        },
      });
      setLiveMatches(res.data);
      setIsMatches(false);
    } catch (e) {
      setIsMatches(false);
      console.warn(e);
    }
  }

  let matchData = [
    {
      profileicon: icon1,
      number: memberOverview?.admins || 0,
      title: 'Admins',
      tab: 'Admin',
    },
    {
      profileicon: icon2,
      number: memberOverview?.data_scientists || 0,
      title: 'Data Scientist',
      tab: 'Data Scientist',
    },
    {
      profileicon: icon3,
      number: memberOverview?.trade_analysts || 0,
      title: 'Trade Analyst',
      tab: 'Trade Analyst',
    },
  ];

  let matchDataArray = [
    {
      profileicon: profile,
      progressicon: progress1,
      title: 'Pre-Game Team',
      admin: 'Roster Lead',
      number: memberOverview?.roster_admins | 0,
      manager: 'Roster Maker',
      numbers: memberOverview?.roster_managers | 0,
      color: '#FF6C37',
      tab1: 'Roster Lead',
      tab2: 'Roster Maker',
      team: 'Roster Team',
    },
    {
      profileicon: profile1,
      progressicon: progress,
      title: 'In-Game Team',
      admin: 'Pre-game Trader',
      number: memberOverview?.in_game_managers | 0,
      manager: 'In-game Trader',
      numbers: memberOverview?.in_game_traders | 0,
      color: '#34A770',
      tab1: 'Pre-game Trader',
      tab2: 'In-game Trader',
      team: 'Trading Team',
    },
  ];

  return (
    <div className=''>
      <Toast
        type={toastDetails.type}
        title={toastDetails.title}
        discription={toastDetails.discription}
        logo={toastDetails.logo}
        toggle={toastPopup}
      />
      <div className='w-full'>
        {/* <PageHeader
          title={`Hi, ${admin?.first_name} ${admin?.last_name}`}
          subTitle={"Let's finish your task today!"}
        /> */}
        <div className='w-full flex gap-10 max-[1700px]:gap-3.5'>
          <div className='w-3/12 h-full flex flex-col justify-between'>
            <div className='w-full'>
              <Title title='Members Overview' size='large' />
              <div className='w-full flex-1 mt-12 mb-2.5'>
                <MemberOverviewDesign1 matchData={matchData} admin={admin} />
              </div>
            </div>
            <div className='w-full mt-10'>
              <div className='font-semibold text-2xl text-[#141522] mb-7 -leading-[0.03em]'>
                Matches Overview
              </div>
              <div className='w-full'>
                <MatchOverview data={overview} />
              </div>
            </div>
          </div>
          <div className='w-6/12 h-full items-center'>
            <div className='flex mt-20 mb-14'>
              <MemberOverviewDesign2 matchDataArray={matchDataArray} />
            </div>
            <SliderContainer
              title='Live Matches'
              titleSize='large'
              slideToShow={2}
              slideToScroll={1}
              dots={false}
              autoplay={false}
              infinite={false}
              titleStyle={{
                color: '#141522',
                marginBottom: 18,
              }}
              responsive={[
                {
                  breakpoint: 1920,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                  },
                },
                {
                  breakpoint: 1700,
                  settings: {
                    slidesToShow: 1.7,
                    slidesToScroll: 1,
                  },
                },
                {
                  breakpoint: 1600,
                  settings: {
                    slidesToShow: 1.4,
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
              {isMatches && <LoadingComponent text='Loading' />}
              {!isMatches &&
                liveMatches?.length > 0 &&
                liveMatches?.map((m: any) => {
                  return (
                    <div key={`match${m?.id}`} style={{ marginRight: 20 }}>
                      <ManagerMatchCard
                        id={m?.id}
                        match={m}
                        primary={true}
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
                          image: mlbIcon,
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
                            return diffDays + ' days';
                          })(),
                        }}
                      />
                    </div>
                  );
                })}
              {!isMatches && liveMatches?.length > 0 && (
                <div
                  className='w-[318px] h-[400px] bg-white rounded-[10px] cursor-pointer'
                  onClick={() => {
                    setMatchesTab({
                      team: 'in-game',
                      tab: 'Live Matches',
                    });

                    router.push('/admin/app/matches');
                  }}
                >
                  <div className='w-full h-full flex justify-center items-center'>
                    View All Live Matches
                  </div>{' '}
                </div>
              )}
              {!isMatches && liveMatches?.length === 0 && <div>No matches</div>}
            </SliderContainer>
          </div>
          <div className='w-3/12 min-w-[320px] flex flex-col items-end'>
            <div className='w-full'>
              <div className='w-full mb-14 mt-8'>
                <RecentSettlements />
              </div>
              <div className='w-full'>
                <Members
                  toastPopup={toastPopup}
                  setToastPopup={setToastPopup}
                  toastDetails={toastDetails}
                  setToastDetails={setToastDetails}
                />{' '}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
