'use client';
import React, { useEffect, useState } from 'react';

// API fetchers
import { del, get } from '@/app/apiIntegrations/fetcher';

// components
import LoadingComponent from '@/app/components/global/LoadingComponent';
import Tabs from '@/app/components/global/Tabs';
import MemberRoleCard from './MemberRoleCard';

// utils
import CustomPagination from '@/app/components/pagination/CustomPagination';
import { PaginationProps } from 'antd';
import { useLocal } from '@/app/hooks/useLocal';

type Props = {
  searchKey: string;
  admin: any;
  setProfile: React.Dispatch<React.SetStateAction<any>>;
  tabs: any;
  selectedTab: any;
  selectedSubTab: any;
  setSelectedSubTab: React.Dispatch<React.SetStateAction<any>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  // onDelete: (id: any, roleType: any) => void;
};

let count: any = null;

const userRoleTypes = [
  'roster_lead',
  'roster_maker',
  'trading_lead',
  'pre_game_trader',
  'in_game_trader',
];

const MemberRoles = (props: Props) => {
  const {
    searchKey,
    admin,
    setProfile,
    tabs,
    selectedTab,
    selectedSubTab,
    setSelectedSubTab,
    isLoading,
    setIsLoading,
  } = props;

  const [users, setUsers] = useState<any[]>([]);
  const [isUsers, setIsUsers] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [membersTab, setMembersTab] = useLocal('members tab', {});

  useEffect(() => {
    let tabsFromStorage = tabs?.filter(
      (t: any) => t.title === getTabsFromLocalstorage()
    );

    if (tabsFromStorage?.length > 0) setSelectedSubTab(tabsFromStorage[0]);
    else if (tabs?.length > 0) setSelectedSubTab(tabs[0]);
    else {
      setSelectedSubTab([]);
    }
  }, [tabs]);

  useEffect(() => {
    if (selectedSubTab) loadRoles(null, 0);
  }, [selectedSubTab]);

  useEffect(() => {
    if (selectedSubTab) loadRoles(searchKey, 0);
  }, [searchKey]);

  function getTabsFromLocalstorage() {
    const tabString = localStorage.getItem('members tab');
    if (!tabString) return admin.is_superadmin ? 'Admin' : 'Roster Admin';
    return JSON.parse(tabString).tab;
  }

  const onTabChange = (f: any) => {
    setSelectedSubTab(f);
    setMembersTab({
      title: selectedTab?.title,
      tab: f.title,
    });
  };

  async function loadRoles(search: string | null, skip: number) {
    setIsUsers(true);
    setIsLoading(true);
    try {
      let qry = '';
      if (search) {
        qry = '&search=' + search;
      }
      if (tabs?.length > 0 && selectedSubTab?.tab) {
        const res = await get(
          `admin/memberRoles?limit=10&skip=${skip}&roleType=${selectedSubTab?.tab}${qry}`
        );
        setUsers(res.response.data);
        count = res.response.count;
        setIsUsers(false);
        setIsLoading(false);
      }
      if (selectedTab?.title === 'Admin') {
        const res = await get(
          `admin/memberRoles?limit=10&skip=${skip}&roleType=${selectedTab?.tab}${qry}`
        );
        setUsers(res.response.data);
        count = res.response.count;
        setIsUsers(false);
        setIsLoading(false);
      } else {
        setIsUsers(false);
        setIsLoading(false);
      }
    } catch (e) {
      setIsUsers(false);
      setIsLoading(false);
      console.warn(e);
    }
  }

  async function onDelete(id: any, roleType: any) {
    try {
      const res = await del(`admin/${id}?roleType=${roleType}`);
      loadRoles(searchKey, 0);
    } catch (e) {
      console.warn(e);
    }
  }

  const onPageChange: PaginationProps['onChange'] = (
    page: number,
    pageSize: number
  ) => {
    let skip = (page - 1) * 10;
    loadRoles(null, skip);
    setCurrentPage(page);
  };

  return (
    <div>
      {tabs?.length > 0 && (
        <Tabs
          tabs={tabs || []}
          selectedTab={selectedSubTab}
          onTabChange={onTabChange}
          loading={isUsers}
        />
      )}
      <div className='mt-10'>
        {tabs?.length > 0 && (
          <h2 className='text-lg font-semibold text-[#091E42]'>
            {selectedSubTab?.title}
          </h2>
        )}
        <div className='mt-5 flex items-center flex-wrap gap-10'>
          {isUsers && <LoadingComponent text='Loading' />}
          {!isUsers && users.length === 0 && (
            <div className='w-full flex justify-center items-center'>
              No data
            </div>
          )}
          {!isUsers &&
            users?.map((u: any) => {
              return (
                <MemberRoleCard
                  member={u}
                  searchKey={searchKey}
                  onDelete={onDelete}
                  loadData={loadRoles}
                  setProfile={setProfile}
                />
              );
            })}
          {count > 8 && (
            <div className='w-full h-[100px] mt-10 border border-[#E0E3E8] rounded-lg px-5 flex items-center'>
              <CustomPagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                total={count}
                pageSize={10}
                onChange={onPageChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberRoles;
