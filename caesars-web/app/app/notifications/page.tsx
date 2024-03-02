'use client';
import { useEffect, useState } from 'react';
import './notification.css';

// components
import PageHeader from '@/app/components/app/PageHeader';
import NotificationActivityContainer from '@/app/components/notification/NotificationActivityContainer';
import NotificationTaskContainer from '@/app/components/notification/NotificationTaskContainer';

export default function Notifications() {
  const [user, setUser] = useState<any>({});
  const [selectedTab, setSelectedTab] = useState<any>('');
  const [selectModal, setSelectModal] = useState('');

  useEffect(() => {
    setUser(getUserFromLocalstorage());
  }, []);

  useEffect(() => {
    if (user && user.user_role_id === '3') setSelectedTab('upcoming matches');
    else setSelectedTab('matches');
  }, [user]);

  function getUserFromLocalstorage() {
    const userString = localStorage.getItem('user');
    if (!userString) return {};
    return JSON.parse(userString);
  }

  return (
    <div className='w-full h-full overflow-y-scroll'>
      <div className='px-8 pt-5'>
        <PageHeader
          title={`Hi, ${(user as any).first_name} ${(user as any).last_name} `}
          subTitle={"Let's finish your task today!"}
        />
      </div>
      <div className='flex items-center border-b-2 border-[#ededed] px-8 pb-1'>
        <div className='pr-3 text-2xl font-semibold text-[#141522]'>
          Notifications
        </div>
        {user && user.user_role_id === '3' ? (
          <div
            className={`notification-tab ${
              selectedTab === 'upcoming matches'
                ? 'notification-tab-active'
                : ''
            }`}
            onClick={(e) => setSelectedTab('upcoming matches')}
          >
            Upcoming Matches
          </div>
        ) : (
          <div
            className={`notification-tab ${
              selectedTab === 'matches' ? 'notification-tab-active' : ''
            }`}
            onClick={(e) => setSelectedTab('matches')}
          >
            Matches
          </div>
        )}
        <div
          className={`notification-tab ${
            selectedTab === 'activity' ? 'notification-tab-active' : ''
          }`}
          onClick={(e) => setSelectedTab('activity')}
        >
          Activities
        </div>
      </div>
      <div className='px-8 h-full'>
        {user && selectedTab === 'matches' && (
          <NotificationTaskContainer
            user={user}
            selectedTab={selectedTab}
            selectModal={selectModal}
            setSelectModal={setSelectModal}
            // adminSave={adminSave}
          />
        )}
        {user && selectedTab === 'upcoming matches' && (
          <NotificationTaskContainer
            user={user}
            selectedTab={selectedTab}
            selectModal={selectModal}
            setSelectModal={setSelectModal}
            // adminSave={adminSave}
          />
        )}
        {user && selectedTab === 'activity' && (
          <NotificationActivityContainer
            selectedTab={selectedTab}
            user={user}
            selectModal={selectModal}
            setSelectModal={setSelectModal}
          />
        )}
      </div>
    </div>
  );
}
