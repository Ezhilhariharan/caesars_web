'use client';
import React, { useEffect, useState } from 'react';

// libs
import { getAdminFromLocalstorage } from '@/app/lib/localstorageHelpers';

// components
import PageHeader from '@/app/components/app/PageHeader';
import SearchBar from '@/app/components/global/SearchBar';
import ServicesCard from './components/ServicesCard';

// static data
import { service } from './utils/data';

type Props = {};

const Integrations = (props: Props) => {
  const {} = props;
  const [user, setUser] = useState<any>({});
  const [searchKey, setSearchKey] = useState<string>('');
  const [services, setServices] = useState<any>(service);

  useEffect(() => {
    setUser(getAdminFromLocalstorage());
  }, []);

  const onStatusChange = (id?: number) => {
    const changed = services.map((s: any) => {
      if (id === s.id) {
        if (s.status === 1) return { ...s, status: 0 };
        else return { ...s, status: 1 };
      } else return { ...s };
    });

    setServices(changed);
  };

  return (
    <div className='w-full h-full px-8 py-5'>
      <PageHeader
        title={`Hi, ${user.first_name} ${user.last_name}`}
        subTitle={"Let's finish your task today!"}
      />
      <div className='page-section-header flex mt-5 pb-[15px] border-b border-[#00000010] gap-4 mb-5'>
        Integrations
      </div>
      <SearchBar
        searchKey={searchKey}
        setSearchKey={setSearchKey}
        placeholder='Find Integration'
      />
      <div className='mt-5 flex items-center gap-10'>
        {services.map((s: any) => {
          return <ServicesCard onStatusChange={onStatusChange} {...s} />;
        })}
      </div>
    </div>
  );
};

export default Integrations;
