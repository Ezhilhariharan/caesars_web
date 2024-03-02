'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

// icons
import filterIcon from '../../assets/filter.svg';
import sendIcon from '../../assets/send.svg';

// components
import Avatar from '@/app/components/global/Avatar';
import CardContainer from '@/app/components/global/cardContainer/CardContainer';

type profileProps = {
  primary?: boolean;
  first_name?: string;
  last_name?: string;
  email?: string;
  team?: string;
};

const ProfileCard = (props: profileProps) => {
  const { primary = false, first_name, last_name, email, team } = props;
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    setUser(getUserFromLocalstorage());
  }, []);

  function getUserFromLocalstorage() {
    const userString = localStorage.getItem('user');
    if (!userString) return {};
    return JSON.parse(userString);
  }
  const role = team?.split('_');

  return (
    <CardContainer cardClassName='w-[270px] h-full min-h-[60vh]'>
      <div className='w-full px-5 pt-5 flex items-start justify-between'>
        <div className='border-[2px] border-[#4285F4] rounded-full p-[3px]'>
          <Avatar
            image={''}
            name={`${primary ? user?.first_name : first_name} ${
              primary ? user?.last_name : last_name
            }`}
            width={60}
            height={60}
          />
        </div>
        {primary && (
          <div className='w-[44px] h-[44px] rounded-[15px] bg-[#ECF3FE] flex items-center justify-center'>
            <Image src={filterIcon} alt='edit icon' width={24} height={24} />
          </div>
        )}
      </div>
      <div className='py-5 border-b px-5'>
        <p className='text-[#14171C] text-xl font-bold capitalize'>
          {first_name} {last_name}
        </p>
        <p className='text-base font-normal text-[#54577A] capitalize gap-1 flex items-center'>
          {role?.map((role, i) => (
            <p key={'role' + i}>{role}</p>
          ))}
        </p>
      </div>
      <div className='p-5'>
        <h1 className='text-[22px] font-bold text-[#14171C]'>Basic Details</h1>
        <div>
          {primary ? (
            <div className='mt-5'>
              <label className='text-sm font-normal text-[#7D8592]'>
                First Name
              </label>
              <div className='h-10 mt-1 rounded-lg border border-[#E0E3E8] flex items-center justify-between px-3 py-2'>
                <input
                  type='text'
                  className='border-none w-full text-sm font-normal text-[#7D8592] capitalize'
                  value={user?.first_name}
                />
                <Image
                  src={filterIcon}
                  alt=''
                  width={10}
                  height={10}
                  className=''
                />
              </div>{' '}
            </div>
          ) : (
            <div className='mt-5 capitalize'>
              <p className='text-sm font-normal text-[#7D8592]'>First Name</p>
              <div className='h-10 mt-1 rounded-lg border border-[#E0E3E8] flex items-center justify-between px-3 py-2'>
                <div className='w-full text-sm font-normal text-[#7D8592]'>
                  {first_name}
                </div>
              </div>{' '}
            </div>
          )}
          {primary ? (
            <div className='mt-5 capitalize'>
              <label className='text-sm font-normal text-[#7D8592]'>
                Last Name
              </label>
              <div className='h-10 mt-1 rounded-lg border border-[#E0E3E8] flex items-center justify-between px-3 py-2'>
                <input
                  type='text'
                  className='border-none w-full text-sm font-normal text-[#7D8592]'
                  value={user?.last_name}
                />
                <Image
                  src={filterIcon}
                  alt=''
                  width={10}
                  height={10}
                  className=''
                />
              </div>{' '}
            </div>
          ) : (
            <div className='mt-5'>
              <p className='text-sm font-normal text-[#7D8592]'>Last Name</p>
              <div className='h-10 mt-1 rounded-lg border border-[#E0E3E8] flex items-center justify-between px-3 py-2'>
                <div className='w-full text-sm font-normal text-[#7D8592]'>
                  {last_name}
                </div>
              </div>{' '}
            </div>
          )}
        </div>
      </div>
      <div className='p-5'>
        <h1 className='text-[22px] font-bold text-[#14171C]'>
          General Details
        </h1>
        <div>
          {primary ? (
            <div className='mt-5'>
              <label className='text-sm font-normal text-[#7D8592]'>
                Email
              </label>
              <div className='h-10 mt-1 rounded-lg border border-[#E0E3E8] flex items-center justify-between px-3 py-2'>
                <input
                  type='text'
                  className='border-none w-full text-sm font-normal text-[#7D8592]'
                  value={user?.email}
                />
                <Image
                  src={filterIcon}
                  alt=''
                  width={10}
                  height={10}
                  className=''
                />
              </div>{' '}
            </div>
          ) : (
            <div className='mt-5'>
              <p className='text-sm font-normal text-[#7D8592]'>Email</p>
              <div className='h-10 mt-1 rounded-lg border border-[#E0E3E8] flex items-center justify-between px-3 py-2'>
                <div className='w-full text-sm font-normal text-[#7D8592] overflow-hidden text-ellipsis'>
                  {email}
                </div>
              </div>{' '}
            </div>
          )}
        </div>
      </div>
      {primary && (
        <div className='flex items-center justify-between px-5 mt-5 text-sm font-normal text-[#4285F4]'>
          <p>Password Settings</p>
          <Image src={sendIcon} alt='' width={24} height={24} />
        </div>
      )}
    </CardContainer>
  );
};

export default ProfileCard;
