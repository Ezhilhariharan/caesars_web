'use client';
import { useEffect, useState } from 'react';

// lib
import { getUserFromLocalstorage } from '@/app/lib/localstorageHelpers';

// components
import PageHeader from '@/app/components/app/PageHeader';
import NotificationActivityContainer from '@/app/components/notification/NotificationActivityContainer';
import NotificationTaskContainer from '@/app/components/notification/NotificationTaskContainer';

// utils
import { tabs } from './utils/tabs';
import Tabs from '@/app/components/global/Tabs';

export default function Notifications() {
  const [user, setUser] = useState<any>({});
  const [selectedTab, setSelectedTab] = useState<any>(tabs[0]);
  const [selectModal, setSelectModal] = useState('');

  useEffect(() => {
    setUser(getUserFromLocalstorage());
  }, []);

  const onTabChange = (f: any) => setSelectedTab(f);

  return (
    <div className='w-full h-full overflow-y-scroll'>
      <div className='px-8 pt-5'>
        <PageHeader
          title={`Hi, ${(user as any).first_name} ${(user as any).last_name} `}
          subTitle={"Let's finish your task today!"}
        />
        <Tabs
          title='Notifications'
          tabs={tabs}
          selectedTab={selectedTab}
          onTabChange={onTabChange}
        />
      </div>
      <div className='px-8 h-full'>
        {user && selectedTab.title === 'Matches' && (
          <NotificationTaskContainer
            user={user}
            selectedTab={selectedTab}
            selectModal={selectModal}
            setSelectModal={setSelectModal}
            statusFilter={2}
            // adminSave={adminSave}
          />
        )}
        {user && selectedTab.title === 'Activity' && (
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
