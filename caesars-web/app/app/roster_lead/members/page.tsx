'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

// icons
import NoMember from '../../../assets1/svg/NoMemberSelected.svg';

// API fetchers
import { get } from '@/app/apiIntegrations/fetcher';
import {
  getMatches,
  getMatchesWithCount,
} from '@/app/apiIntegrations/apiClients/matches';

// libs
import { getUserFromLocalstorage } from '../../../lib/localstorageHelpers';

// hooks
import { useFetchKPI } from '@/app/hooks/useFetchKPI';
import { useSearch } from '@/app/hooks/useSearch';
import { useSelected } from '@/app/hooks/useSelected';
import { useToggle } from '@/app/hooks/useToggle';

// components
import PageHeader from '@/app/components/app/PageHeader';
import RosterManagerCard from '../components/RosterManagerCard';
import ProfileCard from '../../profile/my_profile/components/ProfileCard';
import FilterCard from '../../profile/my_profile/components/FilterCard';
import AssignMatch from '../overview/components/AssignMatch';
import NotificationTaskCard from '@/app/components/notification/NotificationTaskCard';
import Toast, { toastProps } from '@/app/components/global/toast/Toast';
import LoadingComponent from '@/app/components/global/LoadingComponent';
import SearchBar from '@/app/components/global/SearchBar';

// antd
import { Modal } from 'antd';
import Plus from '@/app/assets1/custom-icons/Plus';
import ArrowLeft from '@/app/assets1/custom-icons/arrows/ArrowLeft';
import ArrowRight from '@/app/assets1/custom-icons/arrows/ArrowRight';

let skip = 0;

export default function MembersPage() {
  const [memberKPI, setMemberKPI] = useFetchKPI(null);
  const [search, setSearch] = useSearch('');
  const [members, setMembers] = useState<any>(null);
  const [isMembers, setIsMembers] = useState(false);
  const [matches, setMatches] = useState<any>([]);
  const [isMatches, setIsMatches] = useState(false);
  const [openModal, setOpenModal] = useToggle(false);
  const [member, setMember] = useSelected(null);
  const [status, setStatus] = useSelected(0);
  const [isProfile, setIsProfile] = useToggle(false);

  const filterCards = [
    {
      id: 1,
      background: '#4285F4',
      label: 'Newly Assigned Matches',
      count: memberKPI?.response?.data?.match_counts?.assignedMatch || 0,
      status: 0,
    },
    {
      id: 2,
      background: '#34A770',
      label: 'In-progress Matches',
      count: memberKPI?.response?.data?.match_counts?.inProgressMatch || 0,
      status: 1,
    },
    {
      id: 1,
      background: '#FF6C37',
      label: 'Submitted Matches',
      count: memberKPI?.response?.data?.match_counts?.submittedMatch || 0,
      status: 2,
    },
  ];

  const [filter, setFilter] = useSelected(null);

  const [user, setUser] = useState({});

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
    setUser(getUserFromLocalstorage());
    fetchMembers();
  }, []);

  useEffect(() => {
    fetchMatches(0);
  }, [member, status]);

  const fetchMembers = async () => {
    setIsMembers(true);
    try {
      let qry = '';
      if (search) qry = `?search=${search}`;
      const res = await get(`/members${qry}`);
      setMembers(res);
      setIsMembers(false);
    } catch (e) {
      console.warn(e);
      setIsMembers(false);
    }
  };

  const fetchMatches = async (skip: any) => {
    setIsMatches(true);
    try {
      const res = await getMatchesWithCount({
        limit: 6,
        skip: skip,
        query: {
          match_asignment_status: status,
          user_id: member?.id,
        },
      });
      setMatches(res);
      setIsMatches(false);
    } catch (e) {
      console.warn(e);
      setIsMatches(false);
    }
  };

  const reload = () => {
    fetchMatches(0);
    setMemberKPI(`user/overview/${member?.id}`);
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
      <div className='flex flex-1 overflow-scroll'>
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
            <div className='text-2xl font-semibold px-2.5 text-[#141522] p-[5px] my-5'>
              Roster Makers
            </div>
            <SearchBar
              searchKey={search}
              setSearchKey={setSearch}
              style={{
                margin: '0 5px',
              }}
            />
            <div className='flex-1 overflow-scroll'>
              {isMembers && (
                <div className='h-[70vh]'>
                  <LoadingComponent text='Loading' />
                </div>
              )}
              {!isMembers && members?.data?.length === 0 && (
                <div className='text-[#121212] font-medium'>
                  No members available
                </div>
              )}
              {!isMembers &&
                members?.data?.map((m: any, i: number) => {
                  const name = `${m.first_name} ${m.last_name}`;
                  return (
                    name.toLowerCase().includes(search.toLowerCase()) && (
                      <div
                        className={`p-3 my-4 border-b-4 cursor-pointer ${
                          member?.id === m.id
                            ? 'bg-[#ECF3FE] border-[#4285F4]'
                            : 'border-transparent'
                        }`}
                        key={'member-' + i}
                        onClick={(e) => {
                          setMember(m);
                          setMemberKPI(`user/overview/${m.id}`);
                          setFilter(filterCards[0]);
                        }}
                      >
                        <RosterManagerCard
                          image={''}
                          name={name}
                          taskInProgress={m.in_progress_count}
                          primary={true}
                          width={40}
                          height={40}
                        />
                      </div>
                    )
                  );
                })}
            </div>
          </div>
        </div>
        <div className='flex flex-1 px-5 py-10 overflow-scroll'>
          {isProfile && (
            <div className='w-full h-full'>
              <LoadingComponent text='Loading' />
            </div>
          )}

          {!isProfile && member && (
            <div className='flex gap-10'>
              <div className='h-[92vh] border rounded-lg border-[#E0E3E8]'>
                <ProfileCard
                  first_name={member.first_name}
                  last_name={member.last_name}
                  email={member.email}
                  team={member.role}
                  primary={false}
                />
              </div>
              <div className=''>
                <div className='w-full flex justify-end mb-5'>
                  <div
                    className='bg-[#4285F4] w-[150px] h-[52px] flex justify-center items-center rounded-lg gap-2 text-sm font-semibold text-white cursor-pointer'
                    onClick={() => setOpenModal(true)}
                  >
                    <Plus color='#fff' size={16} />
                    <p>Assign Match</p>
                  </div>
                </div>
                <div className='flex gap-5 overflow-x-scroll'>
                  {filterCards?.map((c) => {
                    return (
                      <div
                        className='min-w-[265px]'
                        onClick={() => {
                          setStatus(c.status);
                          setFilter(c);
                          skip = 0;
                        }}
                      >
                        <FilterCard
                          background={c.background}
                          label={c.label}
                          count={c.count}
                          filter={filter}
                          setFilter={setFilter}
                        />
                      </div>
                    );
                  })}
                </div>
                <div>
                  <div>
                    <p className='text-[#141522] text-xl font-bold mt-10 mb-5'>
                      Matches
                    </p>
                  </div>{' '}
                  <div className='h-[57vh] overflow-y-scroll '>
                    {isMatches && (
                      <div className='text-[#666] py-5 px-10'>
                        <LoadingComponent text='Loading' />{' '}
                      </div>
                    )}
                    {!isMatches && matches?.data?.length === 0 && (
                      <div className='text-[#666] py-5 px-10'>
                        No Matches Available
                      </div>
                    )}
                    {!isMatches &&
                      matches?.data?.map((data: any, i: any) => {
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
                              style={{
                                height: 40,
                              }}
                            />
                          </div>
                        );
                      })}
                  </div>
                  {matches?.count > 6 && (
                    <div className='flex items-center justify-between mt-3'>
                      <button
                        className={`flex items-center py-1 rounded-md ${
                          skip > 0
                            ? 'cursor-pointer bg-[#4285F4]'
                            : 'cursor-not-allowed bg-[#4285F450]'
                        }`}
                        onClick={() => {
                          if (skip > 0) {
                            skip -= 6;
                            fetchMatches(skip);
                          }
                        }}
                      >
                        <ArrowLeft color='white' size={24} strokeWidth='1.2' />
                        <div className='-ml-4'>
                          <ArrowLeft
                            color='white'
                            size={24}
                            strokeWidth='1.2'
                          />
                        </div>
                      </button>
                      <div></div>
                      <button
                        className={`flex items-center py-1 rounded-md ${
                          matches?.count - 6 >= skip
                            ? 'cursor-pointer bg-[#4285F4]'
                            : 'cursor-not-allowed bg-[#4285F450]'
                        }`}
                        onClick={() => {
                          if (matches?.count - 6 >= skip) {
                            skip += 6;
                            fetchMatches(skip);
                          }
                        }}
                      >
                        <ArrowRight color='white' size={24} strokeWidth='1.2' />
                        <div className='-ml-4'>
                          <ArrowRight
                            color='white'
                            size={24}
                            strokeWidth='1.2'
                          />
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {!member && (
            <div className='w-[700px] flex items-center justify-center flex-col'>
              <Image src={NoMember} alt='placeholderImage' />
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
          {' '}
          <AssignMatch
            open={openModal}
            setOpen={setOpenModal}
            toastPopup={toastPopup}
            setToastPopup={setToastPopup}
            toastDetails={toastDetails}
            setToastDetails={setToastDetails}
            user={member}
            loadMatch={reload}
          />
        </Modal>
      </div>
    </>
  );
}
