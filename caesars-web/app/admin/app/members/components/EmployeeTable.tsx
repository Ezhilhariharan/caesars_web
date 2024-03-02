'use client';
import React, { useState } from 'react';
import Image from 'next/image';

// icons
import help from '../../../assets/help.svg';
import DotsVertical from '@/app/assets1/custom-icons/dots/Dotsvertical';

// API
import { put } from '@/app/apiIntegrations/fetcher';

//components
import Avatar from '@/app/components/global/Avatar';
import CardContainer from '@/app/components/global/cardContainer/CardContainer';
import CustomPagination from '@/app/components/pagination/CustomPagination';
import UserTeamConverter from '@/app/lib/UserTeamConverter';
import LoadingComponent from '@/app/components/global/LoadingComponent';

// Modals
import ConfirmModal from './ConfirmModal';
import EditMemberModal from './EditMemberModal';

// antd
import { Popover } from 'antd';

type Props = {
  members: any[];
  totalMembers: any;
  searchKey: string;
  setSearchKey: React.Dispatch<React.SetStateAction<string>>;
  openDeleteModal: boolean;
  setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  onPageChange: (page: number, pageSize: number) => void;
  loadMembers: (search: string | null, skip: any) => void;
  onDelete: (id: any, roleType: any) => void;
  isLoading: boolean;
};

const userRoleTypes = [
  'roster_lead',
  'roster_maker',
  'trading_lead',
  'pre_game_trader',
  'in_game_trader',
];

const EmployeeTable = (props: Props) => {
  const {
    members,
    totalMembers,
    searchKey,
    setSearchKey,
    openDeleteModal,
    setOpenDeleteModal,
    currentPage,
    setCurrentPage,
    onPageChange,
    loadMembers,
    onDelete,
    isLoading,
  } = props;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>({});

  const roleType = userRoleTypes.includes(selectedMember.role);

  async function updateUser(data: typeof selectedMember) {
    if (data.first_name && data.last_name && data.status) {
      try {
        const res = await put(
          `admin/edit_user/${selectedMember.id}?roleType=${
            roleType ? 'user' : 'admin'
          }`,
          {
            first_name: data.first_name,
            last_name: data.last_name,
            status: data.status,
          }
        );
        loadMembers(searchKey, 0);
        setIsEditMode(false);
      } catch (e) {
        console.warn(e);
      }
    }
  }

  const onCancel = () => setSelectedMember({});

  const menu = (
    <div className='w-[150px] text-sm font-medium text-[#344054] py-3 px-5'>
      <div
        className='cursor-pointer'
        onClick={() => {
          setIsEditMode(true);
          setIsMenuOpen(false);
        }}
      >
        Edit
      </div>
      <div
        className='cursor-pointer mt-3'
        onClick={() => {
          setOpenDeleteModal(true);
        }}
      >
        Delete User
      </div>
    </div>
  );

  const teamStyle: any = {
    admin: 'bg-[#D2E3F4] text-[#54577A]',
    roster_lead: 'bg-[#F7E8EF] text-[#6A1039]',
    roster_maker: 'bg-[#F7E8EF] text-[#6A1039]',
    trading_lead: 'bg-[#F5F6F7] text-[#54577A]',
    pre_game_trader: 'bg-[#F5F6F7] text-[#54577A]',
    in_game_trader: 'bg-[#F5F6F7] text-[#54577A]',
  };

  const statusStyle: any = {
    0: 'text-[#FBA63C] bg-[#FFE6C8]',
    1: 'text-[#027A48] bg-[#ECFDF3]',
  };

  return (
    <>
      <CardContainer
        cardClassName='w-full'
        style={{
          padding: '20px 20px',
          border: '1px solid #E0E3E8',
        }}
      >
        <div className='bg-[#FAFBFB] h-[50px] flex items-center text-center text-sm font-medium text-[#54577A]'>
          <div className='w-1/4'>Name</div>
          <div className='w-1/4 flex items-center gap-3 justify-center'>
            <p>Role</p>
            <Image src={help} alt='help-icon' width={16} height={16} />
          </div>
          <div className='w-1/4'>Status</div>
          <div className='w-1/4'>Teams</div>
          <div className='w-20'></div>
        </div>

        <div className='w-full'>
          {isLoading && <LoadingComponent text='Loading' />}
          {!isLoading && members?.length === 0 && (
            <div className='w-full h-20'>
              <span className='w-full h-full flex items-center justify-center'>
                No Data
              </span>
            </div>
          )}
          {!isLoading &&
            members?.map((m: any, i) => {
              const searchResult = `${m.first_name} ${m.last_name}`
                .toLowerCase()
                .includes(searchKey.toLowerCase());
              return (
                <div
                  key={`members---${i}`}
                  className='flex items-center justify-between border-b text-center py-3'
                >
                  <div className='w-1/4 flex items-center pl-10 gap-10'>
                    <Avatar
                      name={`${m.first_name} ${m.last_name}`}
                      width={40}
                      height={40}
                      background='#FFF2EA'
                      style={{
                        color: '#93312B',
                        fontSize: 14,
                        fontWeight: 500,
                      }}
                    />
                    <div className='text-sm text-left'>
                      <p className='text-[#141522] font-medium capitalize'>
                        {m.first_name} {m.last_name}
                      </p>
                      <p className='w-[300px] overflow-hidden text-[#54577A] font-normal text-ellipsis'>
                        {m.email}
                      </p>
                    </div>
                  </div>
                  <div className='text-center w-[clamp(100px,25%,25%)] flex items-center justify-center text-sm font-normal text-[#54577A] capitalize gap-1'>
                    {m.role.split('_').map((r: any) => (
                      <p>{r}</p>
                    ))}
                  </div>
                  <div className='text-center p-2.5 w-[clamp(100px,25%,25%)] flex items-center justify-center'>
                    <div
                      className={`h-6 px-4 py-4 rounded-full flex items-center gap-3 capitalize ${
                        statusStyle[m.status] || ''
                      }`}
                    >
                      <p
                        className={`w-2.5 h-2.5 rounded-full contents-[""] ${
                          m.status === 1 ? 'bg-[#12B76A]' : 'bg-[#FBA63C]'
                        }`}
                      ></p>
                      <p className='text-xs font-medium'>
                        {m.status === 1 ? 'active' : 'inactive'}
                      </p>
                    </div>
                  </div>
                  <div className='text-center p-2.5 w-1/4 flex items-center justify-center capitalize'>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        teamStyle[m.role] || ''
                      }`}
                    >
                      <UserTeamConverter role={m.role} />
                    </div>
                  </div>
                  <div className='w-20 h-full cursor-pointer'>
                    <Popover
                      className='w-20 h-20'
                      trigger='click'
                      placement='leftTop'
                      content={menu}
                      arrow={false}
                      onOpenChange={(open: boolean) => {
                        setIsMenuOpen(open);
                        setSelectedMember(m);
                      }}
                    >
                      <div className='w-full h-full text-2xl'>
                        <DotsVertical color='#98A2B3' size={18} />
                      </div>
                    </Popover>
                  </div>
                </div>
              );
            })}
        </div>
        {members?.length > 0 && (
          <div className='w-full h-[100px] mt-10 border border-[#E0E3E8] rounded-lg px-5 flex items-center justify-center'>
            <CustomPagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              total={totalMembers}
              pageSize={10}
              onChange={onPageChange}
            />
          </div>
        )}
      </CardContainer>
      <ConfirmModal
        id={selectedMember.id}
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        roleType={roleType ? 'user' : 'admin'}
        onDelete={onDelete}
      />
      <EditMemberModal
        mode='edit'
        title='Edit'
        text='Edit details and informations for the employee.'
        isOpen={isEditMode}
        setIsOpen={setIsEditMode}
        value={{
          first_name: selectedMember.first_name,
          last_name: selectedMember.last_name,
          email: selectedMember.email,
          status: selectedMember.status,
        }}
        onSave={updateUser}
        onCancel={onCancel}
      />
    </>
  );
};

export default EmployeeTable;
