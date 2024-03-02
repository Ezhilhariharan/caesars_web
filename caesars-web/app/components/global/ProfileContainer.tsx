'use client';
import PageHeader from '@/app/components/app/PageHeader';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Dropdown, MenuProps } from 'antd';
import angleDown from '../../assets/icons/arrow-down.svg';
import Image from 'next/image';
import FilterCard from '@/app/app/profile/my_profile/components/FilterCard';
import ProfileCard from '@/app/app/profile/my_profile/components/ProfileCard';
import { get } from '@/app/apiIntegrations/fetcher';
import { getMatches } from '@/app/apiIntegrations/apiClients/matches';
import NotificationTaskCard from '../notification/NotificationTaskCard';

type Props = {
  id: any;
  // data: any;
};

const allowedRoles = [
  'roster_admin',
  'roster_manager',
  'in_game_manager',
  'in_game_trader',
];

const ProfilePageContainer = ({ id }: Props) => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>({});
  const [selectedFilter, setSelectedFilter] = useState<string>('This Week');
  const [matches, setMatches] = useState<any>([]);

  const filterCardsData = [
    {
      id: 1,
      // label: 'Assigned Matches',
      count: profile?.match_counts?.upcoming_matches,
      filter: 4,
      color: '#4285F4',
      title: 'Assigned Matches',
      value:
        profile?.role?.title === 'roster_admin' || profile?.user_role_id === '1'
          ? profile?.match_counts?.total_matches
          : profile.role?.title === 'roster_manager' ||
            profile?.user_role_id === '2'
          ? profile?.match_counts?.total_matches
          : profile?.role?.title === ' in_game_manager' ||
            profile?.user_role_id === '3'
          ? profile?.match_counts?.assigned_matches
          : profile?.role?.title === 'in_game_trader' ||
            profile?.user_role_id === '4'
          ? profile?.match_counts?.upcoming_matches
          : 0,
    },
    {
      id: 2,
      // label: 'Live Matches',
      count: profile?.match_counts?.live_matches,
      filter: 5,
      color: '#34A770',
      title:
        profile?.role?.title === 'roster_admin' || profile?.user_role_id === '1'
          ? 'Inprogress Matches'
          : profile?.role?.title === 'roster_manager' ||
            profile?.user_role_id === '2'
          ? 'Inprogress Matches'
          : profile?.role?.title === ' in_game_manager' ||
            profile?.user_role_id === '3'
          ? 'Unassigned Matches'
          : profile?.role?.title === 'in_game_trader' ||
            profile?.user_role_id === '4'
          ? 'Live matches'
          : 'Inprogress Matches',
      value:
        profile.role?.title === 'roster_admin' || profile?.user_role_id === '1'
          ? profile?.match_counts?.in_progress_matched
          : profile.role?.title === 'roster_manager' ||
            profile?.user_role_id === '2'
          ? profile?.match_counts?.in_progress_matches
          : profile.role?.title === ' in_game_manager' ||
            profile?.user_role_id === '3'
          ? profile?.match_counts?.live_matches
          : profile?.role?.title === 'in_game_trader' ||
            profile?.user_role_id === '4'
          ? profile?.match_counts?.live_matches
          : 0,
    },
    {
      id: 3,
      // label: 'Settled Matches',
      count: profile?.match_counts?.total_matches,
      filter: 0,
      color: '#FF6C37',
      title:
        profile?.role?.title === 'roster_admin' || profile?.user_role_id === '1'
          ? 'Approved Matches'
          : profile?.role?.title === 'roster_manager' ||
            profile?.user_role_id === '2'
          ? 'Submited Matches'
          : profile?.role?.title === ' in_game_manager' ||
            profile?.user_role_id === '3'
          ? 'Live matches'
          : profile?.role?.title === 'in_game_trader' ||
            profile?.user_role_id === '4'
          ? 'End matches'
          : 'Submitted Matches',
      value:
        profile.role?.title === 'roster_admin' || profile?.user_role_id === '1'
          ? profile?.match_counts?.aproved_matches
          : profile?.role?.title === 'roster_manager' ||
            profile?.user_role_id === '2'
          ? profile?.match_counts?.completed_matches
          : profile?.role?.title === 'in_game_manager' ||
            profile?.user_role_id === '3'
          ? 0
          : profile?.role?.title === 'in_game_trader' ||
            profile?.user_role_id === '4'
          ? 0
          : 0,
    },
  ];
  const [filter, setFilter] = useState<any>(filterCardsData[0]);

  const roles =
    profile?.role?.title === 'roster_admin' || profile?.user_role_id === '1'
      ? 'Roster Admin'
      : profile?.role?.title === 'roster_manager'
      ? 'Roster Manager'
      : profile?.role?.title === ' in_game_manager' ||
        profile?.user_role_id === '3'
      ? 'In-game Manager'
      : profile?.role?.title === 'in_game_trader' ||
        profile?.user_role_id === '4'
      ? 'In-game Trader'
      : 'Admin';

  useEffect(() => {
    setUser(getUserFromLocalstorage());
  }, []);

  useEffect(() => {
    if (id) loadMemberData(id);
  }, [id]);

  async function loadMatches(status: any, id: any) {
    try {
      const res = await getMatches({
        query: {
          match_asignment_status: status,
          user_id: id,
        },
      });
      setMatches(res);
    } catch (e) {
      console.warn(e);
    }
  }

  function getUserFromLocalstorage() {
    const userString = localStorage.getItem('admin');
    if (!userString) return null;
    return JSON.parse(userString);
  }

  async function loadMemberData(id: string) {
    try {
      const res = await get(`user/overview/${id}`);
      // setUser(res.data);

      setProfile(res.response.data);
    } catch (e) {
      console.warn(e);
    }
  }

  const filterItems: MenuProps['items'] = [
    {
      key: '0',
      label: <div className='p-2'>This Month</div>,
      onClick: async (e) => {
        setSelectedFilter('This Month');
      },
    },
    {
      key: '1',
      label: <div className='p-2'>This Week</div>,
      onClick: async (e) => {
        setSelectedFilter('This Week');
      },
    },
  ];

  return (
    <div className='overflow-hidden w-auto h-[100vh]'>
      <PageHeader
        title={`Hi, ${profile?.first_name} ${profile?.last_name} `}
        subTitle={"Let's finish your task today!"}
      />
      <div className='h-auto flex gap-10 p-0 max-[1600px]:gap-5'>
        <div className='h-[88vh]'>
          <ProfileCard
            primary={false}
            first_name={profile?.first_name}
            last_name={profile?.last_name}
            email={profile?.email}
            team={profile?.role?.title}
          />
        </div>
        <div className='flex-1 h-auto'>
          <div className='flex justify-between items-center'>
            <div>
              <h1 className='text-[#0D0D54] text-xl font-bold'>
                Matches History
              </h1>
              <p className='text-[#4F5B67] text-sm font-semibold'>
                Let's track your status here!
              </p>
            </div>
            <div className='bg-white text-sm px-2 rounded-md text-[#141522]'>
              <Dropdown
                menu={{ items: filterItems }}
                trigger={['click']}
                placement='bottomRight'
              >
                <div className='flex items-center gap-2 p-2 cursor-pointer'>
                  <p className='text-xs font-medium'>{selectedFilter}</p>
                  <Image src={angleDown} alt='' />
                </div>
              </Dropdown>
            </div>
          </div>
          <div className='flex gap-5 mt-5'>
            {filterCardsData.map((d) => {
              return (
                <div
                  className={`w-[265px] h-[200px] cursor-pointer`}
                  onClick={() => {
                    setFilter(d);
                  }}
                >
                  <FilterCard
                    background={d.color}
                    label={d.title}
                    filter={filter}
                    setFilter={setFilter}
                    count={d.value}
                  />
                </div>
              );
            })}
          </div>

          {/* <div className='flex gap-5 mt-5'>
            <div className='cursor-pointer'>
              <FilterCard
                background='#4285F4'
                label='Newly Assigned Matches'
                filter={filter}
                setFilter={setFilter}
                count={0}
              />
            </div>
            <div className='cursor-pointer'>
              <FilterCard
                background='#34A770'
                label='In-progress Matches'
                filter={filter}
                setFilter={setFilter}
                count={0}
              />
            </div>
            <div className='cursor-pointer'>
              <FilterCard
                background='#FF6C37'
                label='Submitted Matches'
                filter={filter}
                setFilter={setFilter}
                count={0}
              />
            </div>
          </div> */}
          <div className='mt-10 max-[1600px]:h-[45vh] h-[85vh] overflow-y-scroll'>
            <div>
              <p className='text-[#141522] text-xl font-bold mt-10 mb-5'>
                Matches
              </p>
            </div>{' '}
            <div className='h-[55vh] overflow-y-scroll '>
              <p className='text-sm text-[#91929E] font-normal'>Today</p>
              {matches?.length === 0 && (
                <div className='text-[#666] py-5 px-10'>
                  No Matches Available
                </div>
              )}
              {matches?.map((data: any, i: any) => {
                return (
                  <div
                    key={'members-match' + i}
                    className='bg-white my-3 p-5 rounded-[15px]'
                  >
                    <NotificationTaskCard
                      user={user}
                      data={data}
                      primary={true}
                      selectedTab={{ id: 1, title: 'member' }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePageContainer;
