import React, { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// icons
import Megnafying from '@/app/assets1/custom-icons/Megnafying';

// API fetchers
import { get } from '@/app/apiIntegrations/fetcher';

// custom hooks
import { useQuery } from '@/app/hooks/useQuery';
import { useSearch } from '@/app/hooks/useSearch';

// components
import LoadingComponent from '@/app/components/global/LoadingComponent';
import RosterManagerCard from './RosterManagerCard';

const RosterManagers: React.FC = () => {
  const router = useRouter();

  const [members, setMembers] = useQuery();
  const [search, setSearch] = useSearch('');

  const { isLoading, data: rosterManagers } = members;

  useEffect(() => {
    setMembers(fetchUsers);
  }, [search]);

  const fetchUsers = async () => {
    let query = '';
    if (search) query = `?search=${search}`;
    const res = await get(`/members${query}`);
    return res;
  };

  return (
    <div className='h-[50%] rounded-[10px] p-5 py-6 bg-[#fff]'>
      <div className='w-full mx-auto h-full'>
        <div className='text-base font-semibold text-[#121212]'>
          Roster Maker
        </div>
        <div className='flex bg-[#F4F7FC] rounded-full pl-2.5 my-[30px]'>
          <div style={{ padding: 10 }}>
            <Megnafying color='#121212' size={20} />
          </div>
          <div className='flex justify-center'>
            <input
              placeholder='Search'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='w-full px-1 text-xs font-normal text-[#121212] bg-transparent outline-none border-none'
            />
          </div>
        </div>
        {isLoading && (
          <div className='h-[225px]'>
            <LoadingComponent text='Loading' />
          </div>
        )}
        {!isLoading && (
          <div className='h-[270px] overflow-scroll'>
            {rosterManagers?.data?.map((d: any, i: number) => {
              return (
                d?.status === 1 && (
                  <div className='py-2.5'>
                    <RosterManagerCard
                      name={`${d.first_name}  ${d.last_name}`}
                      width={40}
                      height={40}
                      taskInProgress={d.in_progress_count}
                    />
                  </div>
                )
              );
            })}
          </div>
        )}
        {!isLoading && (
          <div
            style={{
              padding: 20,
              textAlign: 'center',
              color: '#9A9A9A',
              cursor: 'pointer',
            }}
            onClick={(e) => {
              router.push('/app/roster_lead/members');
            }}
          >
            View All
          </div>
        )}
      </div>
    </div>
  );
};

export default RosterManagers;
