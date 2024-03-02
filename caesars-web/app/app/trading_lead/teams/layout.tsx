'use client';
import React, { useEffect, useState } from 'react';

// lib
import { getUserFromLocalstorage } from '@/app/lib/localstorageHelpers';

// components
import PageHeader from '@/app/components/app/PageHeader';
import LoadingComponent from '@/app/components/global/LoadingComponent';

type Props = {
  children: React.ReactNode;
};

const TeamLayout = (props: Props) => {
  const { children } = props;
  const [showPage, setShowPage] = useState(true);
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    setUser(getUserFromLocalstorage());
  }, []);

  if (!showPage) return <LoadingComponent text='Loading' />;

  return (
    <div
      className='w-full h-full px-8 py-5 flex-1 overflow-hidden overflow-y-scroll'
      style={{}}
    >
      <PageHeader
        title={`Hi, ${user?.first_name} ${user?.last_name} `}
        subTitle={"Let's finish your task today!"}
      />
      <>{children}</>
    </div>
  );
};

export default TeamLayout;
