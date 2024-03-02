import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// icons

// API fetchers
import { get } from '@/app/apiIntegrations/fetcher';

// libs

// custom hooks
import { useLocal } from '@/app/hooks/useLocal';

// components
import { toastProps } from '@/app/components/global/toast/Toast';
import LoadingComponent from '@/app/components/global/LoadingComponent';
import Avatar from '@/app/components/global/Avatar';

const allowedRoles = [
  'roster_admin',
  'roster_manager',
  'in_game_manager',
  'in_game_trader',
];

type Props = {
  toastPopup?: boolean;
  setToastPopup?: React.Dispatch<React.SetStateAction<boolean>>;
  toastDetails?: toastProps;
  setToastDetails?: React.Dispatch<React.SetStateAction<toastProps>>;
};

export default function Members(props: Props) {
  const { toastPopup, setToastPopup, toastDetails, setToastDetails } = props;
  const router = useRouter();

  // custom hooks
  const [membersTab, setMembersTab] = useLocal('profile', {});
  const [isMembers, setIsMembers] = useState(true);

  const [members, setMembers] = useState([]);

  useEffect(() => {
    loadMembers(null);
  }, []);

  async function loadMembers(search: string | null) {
    try {
      let qry = '';
      if (search) {
        qry = '&search=' + search;
      }
      const res = await get(`/members?pageSize=6${qry}`);
      setMembers(res.data);
      setIsMembers(false);
    } catch (e) {
      setIsMembers(false);
      console.warn(e);
    }
  }
  return (
    <div className='bg-white w-full rounded-[10px] px-5 py-5'>
      <div className='mt-1'>Members</div>
      <div className='pt-5 pb-3'>
        <input
          className='rounded-[30px] bg-[#F4F7FC] w-full py-2 px-2.5 text-sm'
          placeholder='Search'
          onChange={(e) => loadMembers(e.target.value)}
        />
      </div>
      {isMembers && (
        <div className='h-[350px]'>
          <LoadingComponent text='Loading' />
        </div>
      )}
      {!isMembers && members?.length === 0 && (
        <div className='h-[350px] flex items-center justify-center'>
          No Data
        </div>
      )}
      {!isMembers && members?.length > 0 && (
        <div className='h-[330px]'>
          <div className='h-[310px]'>
            {members?.map((d: any, i) => {
              const role = d.role.split('_');
              return (
                <div
                  className={`flex items-center justify-between my-5 ${
                    d.role === 'admin' ? 'cursor-not-allowed' : 'cursor-pointer'
                  }`}
                  key={'m-' + i}
                  onClick={() => {
                    // localStorage.setItem('profile', { ...d });
                    if (allowedRoles.includes(d.role)) {
                      setMembersTab({ ...d });
                      router.push(`/admin/app/members`);
                    } else {
                      if (setToastPopup) setToastPopup(true);
                      if (setToastDetails)
                        setToastDetails({
                          type: 'alert',
                          title: 'Alert',
                          discription: 'Selected member is not user',
                        });
                    }
                  }}
                >
                  <div className='flex items-center'>
                    <Avatar
                      name={`${d.first_name[0]} ${d.first_name[1]}`}
                      width={32}
                      height={32}
                      style={{
                        fontSize: 10,
                        fontWeight: 500,
                      }}
                    />
                    {/* <div className='w-9 h-8 bg-[#eee] rounded-[40px] text-sm font-semibold flex items-center justify-center mr-5 uppercase'>
                       {d.first_name[0]}
                       {d.last_name[0]} //{' '}
                    </div> */}
                    <div className='capitalize text-sm ml-5 font-normal text-[#121212] max-[1600px]:ml-0.5'>
                      {d.first_name} {d.last_name}
                    </div>
                  </div>
                  <div className='capitalize text-xs font-normal text-[#ccc] text-end flex-1'>
                    {role[0]} {role[1]}
                  </div>
                </div>
              );
            })}
          </div>
          <div
            className='text-center cursor-pointer text-[#bbb]'
            onClick={() => {
              router.push('/admin/app/members');
            }}
          >
            View All
          </div>
        </div>
      )}
    </div>
  );
}
