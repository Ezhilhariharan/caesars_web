'use client';
import React, { useEffect, useState } from 'react';
import './members.css';

// API
import { del, get, post } from '@/app/apiIntegrations/fetcher';

// libs
import { getAdminFromLocalstorage } from '../../../lib/localstorageHelpers';

// hooks
import { useLocal } from '@/app/hooks/useLocal';

// components
import Toast, { toastProps } from '@/app/components/global/toast/Toast';
import SearchBar from '@/app/components/global/SearchBar';
import Tabs from '@/app/components/global/Tabs';
import EmployeeTable from './components/EmployeeTable';
import MemberRoles from './components/MemberRoles';

// utils
import { userValues, adminValues } from './utils/initialFormValue';
import { AdminMainTabs, mainTabs, userMainTabs } from './utils/tabs';

// Modals
import EditMemberModal from './components/EditMemberModal';

// antd
import { PaginationProps } from 'antd';

let count = 0;

// allowed roles to access based on admin roles
const allowedAdminCreation = ['All Employees', 'Admin'];
const allowedUserCreation = ['All Employees', 'Roster Team', 'Trading Team'];

export default function MembersPage() {
  // custom hooks
  const [isMembers, setIsMembers] = useState(false);
  const [admin, setAdmin] = useState<any>(null);
  const [members, setMembers] = useState([]);
  const [tabs, setTabs] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [openAdminModal, setOpenAdminModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState<any>(null);
  const [selectedSubTab, setSelectedSubTab] = useState<any>(null);
  const [searchKey, setSearchKey] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [profile, setProfile] = useState<any>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [membersTab, setMembersTab] = useLocal('members tab', {});

  const [userData, setUserData] = useState<typeof userValues>(userValues);
  const [adminData, setAdminData] = useState<typeof adminValues>(adminValues);

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
    setProfile(getProfileFromLocalstorage());
  }, []);

  useEffect(() => {
    // get session
    const admin = getAdminFromLocalstorage();
    setAdmin(admin);
    if (admin && admin.is_superadmin)
      setTabs([...mainTabs, ...AdminMainTabs, ...userMainTabs]);
    else setTabs([...mainTabs, ...userMainTabs]);
  }, [profile]);

  useEffect(() => {
    let selectedtabFromStorage = tabs.filter(
      (t) => t.title === getTabsFromLocalstorage()
    );
    setSelectedTab(selectedtabFromStorage[0]);
  }, [tabs]);

  useEffect(() => {
    if (selectedTab?.title === 'All Employees') loadMembers(null, 0);
  }, [selectedTab]);

  useEffect(() => {
    if (selectedTab?.title === 'All Employees') loadMembers(searchKey, 0);
  }, [searchKey]);

  // get values from local storage
  function getTabsFromLocalstorage() {
    const tabString = localStorage.getItem('members tab');
    if (!tabString) return 'All Employees';
    return JSON.parse(tabString).title;
  }

  function getProfileFromLocalstorage() {
    const tabString = localStorage.getItem('profile');
    if (!tabString) return null;
    return JSON.parse(tabString);
  }

  const onTabChange = (f: any) => {
    setSelectedTab(f);
    setMembersTab({
      title: f.title,
      tab: f.subTabs?.[0]?.title,
    });
  };

  // load the members data
  async function loadMembers(search: string | null, skip: any) {
    setIsMembers(true);
    try {
      let qry = '';
      if (search) {
        qry = '&search=' + search;
      }
      const res = await get(`/members?pageSize=10&page=${skip}${qry}`);
      setMembers(res.data);
      count = res.totalCount;
      setIsMembers(false);
    } catch (e) {
      setIsMembers(false);
      console.warn(e);
    }
  }

  // admin creation
  async function createAdmin(data: typeof adminValues) {
    if (data?.first_name && data?.last_name && data?.email) {
      try {
        const res = await post('admin/create', data);
        loadMembers(null, 0);
        adminCancel();
        setOpenModal(false);
        return true;
      } catch (e) {
        console.warn(e);
      }
    }
  }

  const adminCancel = () => setAdminData(adminValues);

  // users creation
  async function createUser(data: typeof userValues) {
    if (
      data?.first_name &&
      data?.last_name &&
      data?.email &&
      data?.user_role_id
    ) {
      try {
        const res = await post('user/create_user', data);
        loadMembers(null, 0);
        userCancel();
        setOpenModal(false);
      } catch (e) {
        console.warn(e);
      }
    }
  }

  const userCancel = () => setUserData(userValues);

  // delete the admin or user
  async function onDelete(id: any, roleType: any) {
    try {
      const res = await del(`admin/${id}?roleType=${roleType}`);
      loadMembers(searchKey, 0);
    } catch (e) {
      console.warn(e);
    }
  }

  const onPageChange: PaginationProps['onChange'] = (
    page: number,
    pageSize: number
  ) => {
    setCurrentPage(page);
    loadMembers(null, page);
  };

  return (
    <div className='flex-1 overflow-scroll'>
      <Toast
        type={toastDetails.type}
        title={toastDetails.title}
        discription={toastDetails.discription}
        logo={toastDetails.logo}
        toggle={toastPopup}
      />
      <div className='flex items-center justify-between'>
        <Tabs
          title='Members'
          tabs={tabs}
          selectedTab={selectedTab}
          onTabChange={onTabChange}
          loading={isMembers}
        />
        <div className='flex items-center gap-5'>
          {admin?.is_superadmin &&
            allowedAdminCreation.includes(selectedTab?.title) && (
              <button
                className={`px-3 py-1 bg-[#ccc] text-[#121212] text-sm font-medium rounded-[4px] flex items-center gap-1 ${
                  isMembers
                    ? 'opacity-50 cursor-wait'
                    : 'opacity-none cursor-pointer'
                }`}
                onClick={(e) => setOpenAdminModal(true)}
              >
                <span className='text-lg'>+</span> Create Admin
              </button>
            )}
          {allowedUserCreation.includes(selectedTab?.title) && (
            <button
              className={`px-3 py-2 bg-[#4285F4] text-white text-sm font-medium rounded-[4px] ${
                isMembers
                  ? 'opacity-50 cursor-wait'
                  : 'opacity-none cursor-pointer'
              }`}
              onClick={(e) => setOpenModal(true)}
            >
              Add User
            </button>
          )}
        </div>
      </div>
      <div className='mt-5'>
        <SearchBar
          searchKey={searchKey}
          setSearchKey={setSearchKey}
          style={{
            marginBottom: 20,
            background: 'transparent',
          }}
        />

        <div>
          {selectedTab?.title === 'All Employees' && (
            <EmployeeTable
              members={members}
              totalMembers={count}
              searchKey={searchKey}
              loadMembers={loadMembers}
              setSearchKey={setSearchKey}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              onPageChange={onPageChange}
              onDelete={onDelete}
              isLoading={isMembers}
              openDeleteModal={openDeleteModal}
              setOpenDeleteModal={setOpenDeleteModal}
            />
          )}
          {selectedTab?.title !== 'All Employees' && (
            <MemberRoles
              searchKey={searchKey}
              admin={admin}
              selectedTab={selectedTab}
              selectedSubTab={selectedSubTab}
              tabs={selectedTab?.subTabs}
              setSelectedSubTab={setSelectedSubTab}
              setProfile={setProfile}
              isLoading={isMembers}
              setIsLoading={setIsMembers}
            />
          )}
        </div>
      </div>

      <EditMemberModal
        mode='create'
        title='Create User'
        text='Enter new user details and informations to send invite link.'
        isOpen={openModal}
        setIsOpen={setOpenModal}
        selectedUserRole={selectedSubTab ? selectedSubTab?.option : ''}
        value={userData}
        onSave={createUser}
        onCancel={userCancel}
      />

      <EditMemberModal
        mode='create'
        title='Create Admin'
        text='Enter new admin details and informations to send invite link.'
        isAdmin={true}
        isOpen={openAdminModal}
        setIsOpen={setOpenAdminModal}
        value={adminData}
        onSave={createAdmin}
        onCancel={adminCancel}
      />
    </div>
  );
}
