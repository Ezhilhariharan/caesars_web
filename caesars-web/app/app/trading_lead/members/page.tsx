'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

// icons
import addIcon from '../../roster_lead/assets/add.svg';
import placeholderImage from './assets/placeHolder.svg';
import angleDownArrow from '../../../assets/icons/arrow-down.svg';

// API fetchers
import { get } from '@/app/apiIntegrations/fetcher';
import { getMatches } from '@/app/apiIntegrations/apiClients/matches';

// libs
import { getUserFromLocalstorage } from '../../../lib/localstorageHelpers';

// componets
import Toast, { toastProps } from '@/app/components/global/toast/Toast';
import PageHeader from '@/app/components/app/PageHeader';
import ProfileCard from '../../profile/my_profile/components/ProfileCard';
import FilterCard from '../../profile/my_profile/components/FilterCard';
import RosterManagerCard from '../../roster_lead/components/RosterManagerCard';
import NotificationTaskCard from '@/app/components/notification/NotificationTaskCard';
import AssignMatch from '../overview/components/AssignMatch';

// antd
import { Dropdown, MenuProps, Modal } from 'antd';
import LoadingComponent from '@/app/components/global/LoadingComponent';
import SearchBar from '@/app/components/global/SearchBar';

const membersItems = [
  {
    key: 1,
    title: 'All',
    type: null,
  },
  {
    key: 2,
    title: 'Pre-game',
    type: 'pre_game_trader',
  },
  {
    key: 3,
    title: 'In-game',
    type: 'in_game_trader',
  },
];

export default function MembersPage() {
  const [user, setUser] = useState({});
  const [matches, setMatches] = useState<any>([]);
  const [members, setMembers] = useState([]);
  const [searchKey, setSearchKey] = useState<string>('');
  const [memberKPI, setMemberKPI] = useState<any>({});
  const [memberType, setmemberType] = useState(membersItems[0]);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [selectedFilter, setSelectedFilter] = useState<any>(null);
  const [isMembersLoading, setIsMembersLoading] = useState(false);
  const [isMatchesLoading, setIsMatchesLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [filter, setFilter] = useState<any>(selectedFilter?.[0]);

  const preGameTraderFilterCardsData = [
    {
      id: 1,
      label: 'Newly Assigned Matches',
      count: memberKPI.match_counts?.upcoming_matches,
      filter: 4,
      color: '#4285F4',
    },
    {
      id: 2,
      label: 'Completed Matches',
      count: memberKPI.match_counts?.live_matches,
      filter: 6,
      color: '#34A770',
    },
  ];

  const inGameTraderFilterCardsData = [
    {
      id: 1,
      label: 'Newly Assigned Matches',
      count: memberKPI?.match_counts?.upcoming_matches,
      filter: 4,
      color: '#4285F4',
    },
    {
      id: 2,
      label: 'Live Matches',
      count: memberKPI?.match_counts?.live_matches,
      filter: 7,
      color: '#34A770',
    },
    {
      id: 3,
      label: 'Completed Matches',
      count: memberKPI?.match_counts?.total_matches,
      filter: 8,
      color: '#FF6C37',
    },
  ];

  // handling the toast notification
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
    // load the list of members data
    loadMembers(null);
  }, []);

  useEffect(() => {
    loadMembers(searchKey);
  }, [searchKey, memberType]);

  // fetch the members list
  async function loadMembers(search: string | null) {
    setIsMembersLoading(true);
    try {
      let qry = '';
      if (search) {
        qry = '&search=' + search;
      }
      const res = await get(`/members?limit=100${qry}`);

      if (res) {
        if (memberType?.type !== null) {
          const filteredData = res?.data?.filter(
            (m: any) => m.role === memberType?.type
          );
          setMembers(filteredData);
          setIsMembersLoading(false);
        } else {
          setMembers(res.data);
          setIsMembersLoading(false);
        }
      }
    } catch (e) {
      console.warn(e);
    }
  }

  // fetch the selected members data
  async function loadMemberData(id: string) {
    setIsMatchesLoading(true);
    try {
      const res = await get(`user/overview/${id}`);
      setMemberKPI(res.response.data);
      setIsMatchesLoading(false);
    } catch (e) {
      console.warn(e);
    }
  }

  // fetch the matches list based on selected member
  async function loadMatches(status: any, id: any) {
    setIsMatchesLoading(true);
    try {
      const res = await getMatches({
        query: {
          match_asignment_status: status,
          user_id: id,
        },
      });
      setMatches(res);
      setIsMatchesLoading(false);
    } catch (e) {
      console.warn(e);
    }
  }

  const onFilterChange = (filter: any, id: number) => {
    loadMatches(filter?.filter, id);
    setFilter(filter);
  };

  const onMemberClick = (member: any) => {
    setSelectedMember(member);
    loadMemberData(member.id);
    // loadMatches(selectedFilter, member.id);
    if (member?.role === 'pre_game_trader') {
      setSelectedFilter(preGameTraderFilterCardsData);
      setFilter(preGameTraderFilterCardsData[0]);
      onFilterChange(preGameTraderFilterCardsData[0], member?.id);
    }
    if (member?.role === 'in_game_trader') {
      setSelectedFilter(inGameTraderFilterCardsData);
      setFilter(inGameTraderFilterCardsData[0]);
      onFilterChange(inGameTraderFilterCardsData[0], member?.id);
    }
  };

  return (
    <>
      <Toast
        type={toastDetails.type}
        title={toastDetails.title}
        discription={toastDetails.discription}
        logo={toastDetails.logo}
        toggle={toastPopup}
      />
      <div className='flex flex-1'>
        <div className='w-[350px] h-full border-r'>
          <div className='py-5 px-3'>
            <PageHeader
              title={`Hi, ${(user as any).first_name} ${
                (user as any).last_name
              } `}
              subTitle={"Let's finish your task today!"}
            />
          </div>
          <div className='flex flex-col'>
            <div className='flex items-center justify-between px-5'>
              <div className='text-2xl font-semibold text-[#141522] p-[5px] my-5'>
                Members
              </div>
              <Dropdown
                trigger={['click']}
                placement='bottomRight'
                dropdownRender={() => (
                  <div className='bg-white px-5 py-2.5 rounded-md shadow-md'>
                    {membersItems?.map((m) => {
                      return (
                        <div
                          className='py-1 cursor-pointer'
                          onClick={() => {
                            setmemberType(m);
                          }}
                        >
                          {m.title}
                        </div>
                      );
                    })}
                  </div>
                )}
              >
                <div
                  className={`w-[120px] flex items-center justify-center px-3 py-2.5 cursor-pointer border rounded-md`}
                >
                  <span className='pr-2 text-sm font-medium transition-all duration-300 ease-linear'>
                    {memberType?.title}
                  </span>
                  <Image
                    src={angleDownArrow}
                    alt=''
                    className='w-auto transition-all duration-300 ease-linear group-hover:rotate-180'
                  />
                </div>
              </Dropdown>
            </div>
            <SearchBar
              searchKey={searchKey}
              setSearchKey={setSearchKey}
              style={{
                marginInline: 10,
              }}
            />
            <div className='h-[75vh] overflow-hidden overflow-y-scroll mt-5'>
              {isMembersLoading && (
                <div className=''>
                  <LoadingComponent text='Please Wait Loading the Members' />
                </div>
              )}
              {!isMembersLoading && members?.length === 0 && (
                <div className=''>No Members</div>
              )}
              {!isMembersLoading &&
                members?.map((member: any, i: number) => {
                  return (
                    <div
                      className={`p-3 my-4 border-b-4 cursor-pointer ${
                        selectedMember?.id === member?.id
                          ? 'bg-[#ECF3FE] border-[#4285F4]'
                          : 'border-transparent'
                      }`}
                      key={'member-' + i}
                      onClick={(e) => onMemberClick(member)}
                    >
                      <RosterManagerCard
                        image={''}
                        name={`${member.first_name}  ${member.last_name}`}
                        taskInProgress={member.in_progress_count}
                        primary={true}
                        width={40}
                        height={40}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div className='flex flex-1 px-3 pt-6'>
          {selectedMember && (
            <div className='flex gap-10'>
              <div className='h-[95vh] border rounded-lg border-[#E0E3E8]'>
                <ProfileCard
                  first_name={selectedMember.first_name}
                  last_name={selectedMember.last_name}
                  email={selectedMember.email}
                  team={selectedMember.role}
                />
              </div>
              <div className='w-full flex flex-1 flex-col'>
                <div className='w-[clamp(850px,100%,100%)] flex gap-10 justify-between'>
                  {selectedFilter?.map((card: any) => {
                    return (
                      <div
                        className={`${
                          selectedFilter.length > 0
                            ? `w-1/${selectedFilter.length}`
                            : 'w-[265px]'
                        } h-[200px] cursor-pointer`}
                        // className='min-w-[265px]'
                        onClick={() => onFilterChange(card, selectedMember?.id)}
                      >
                        <FilterCard
                          background={card.color}
                          label={card.label}
                          count={card.count | 0}
                          filter={filter}
                          setFilter={setFilter}
                        />
                      </div>
                    );
                  })}
                </div>
                <div className='w-[clamp(850px,100%,100%)] overflow-hidden'>
                  <p className='text-[#141522] text-xl font-bold mt-10'>
                    Matches
                  </p>
                  <div className='h-[60vh] overflow-y-scroll'>
                    {isMatchesLoading && (
                      <div>
                        <LoadingComponent text='Please Wait Loading the Matches' />
                      </div>
                    )}
                    {!isMatchesLoading && matches?.length === 0 && (
                      <div className='h-[60vh] text-[#ccc]'>
                        <div className='h-full flex justify-center items-center'>
                          No Matches Available
                        </div>
                      </div>
                    )}
                    {!isMatchesLoading &&
                      matches?.map((data: any) => {
                        return (
                          <div className='bg-white my-3 p-5 rounded-[15px]'>
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
          )}
          {!selectedMember && (
            <div className='w-[700px] flex items-center justify-center flex-col'>
              <Image src={placeholderImage} alt='placeholderImage' />
              <div className='w-[300px]'>
                <div className='text-sm text-[#6B6B6B]'>
                  No Members Selected
                </div>
                <div className='text-xs text-[#6B6B6B]'>
                  Select a Member to have a quick look on profile and their
                  progress.
                </div>
              </div>
            </div>
          )}
        </div>
        <Modal
          open={openModal}
          onCancel={() => setOpenModal(false)}
          footer={false}
        >
          <AssignMatch
            // user={selectedMember}
            toastPopup={toastPopup}
            setToastPopup={setToastPopup}
            toastDetails={toastDetails}
            setToastDetails={setToastDetails}
          />
        </Modal>
      </div>
    </>
  );
}
