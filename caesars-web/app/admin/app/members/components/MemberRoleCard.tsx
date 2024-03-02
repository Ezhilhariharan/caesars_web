'use client';
import Avatar from '@/app/components/global/Avatar';
import React, { useState } from 'react';
import EditMemberModal from './EditMemberModal';
import MembersKpiCard from './MembersKpiCard';
import { put } from '@/app/apiIntegrations/fetcher';
import { useRouter } from 'next/navigation';
import ConfirmModal from './ConfirmModal';
import { useLocal } from '@/app/hooks/useLocal';

type Props = {
  member: any;
  onDelete: (id: any, roleType: any) => void;
  loadData: (search: string | null, skip: number) => void;
  searchKey: string;
  setProfile: React.Dispatch<React.SetStateAction<any>>;
};

const userRoleTypes = [
  'roster_lead',
  'roster_maker',
  'trading_lead',
  'pre_game_trader',
  'in_game_trader',
];

const MemberRoleCard = (props: Props) => {
  const { member, searchKey, onDelete, loadData, setProfile } = props;
  const router = useRouter();
  const [membersTab, setMembersTab] = useLocal('profile', {});

  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>({
    first_name: '',
    last_name: '',
    status: '',
    email: '',
  });

  const roleType = userRoleTypes.includes(member.user_roles?.title);

  const strokeOffset = 150 * (90 / 100);

  async function onEdit(data: typeof selectedMember) {
    try {
      const res = await put(
        `admin/edit_user/${member.id}?roleType=${roleType ? 'user' : 'admin'}`,
        { ...data, status: data.status === 'Active' ? 1 : 0 }
      );
      loadData(searchKey, 0);
      setIsEditMode(false);
    } catch (e) {
      console.warn(e);
    }
  }

  const roles =
    member?.user_roles?.title === 'roster_lead'
      ? 'Roster Lead'
      : member?.user_roles?.title === 'roster_maker'
      ? 'Roster Maker'
      : member?.user_roles?.title === 'trading_lead'
      ? 'Trading Lead'
      : member?.user_roles?.title === 'pre_game_trader'
      ? 'Pre-game Trader'
      : member?.user_roles?.title === 'in_game_trader'
      ? 'In-game Trader'
      : 'Admin';

  const counts = [
    {
      title: 'Assigned',
      value:
        member?.user_roles?.title === 'roster_lead'
          ? member?.match_overview?.total_matches
          : member?.user_roles?.title === 'roster_maker'
          ? member?.match_overview?.total_matches
          : member?.user_roles?.title === 'trading_lead'
          ? member?.match_overview?.assigned_matches
          : member?.user_roles?.title === 'pre_game_trader'
          ? member?.match_overview?.upcoming_matches
          : member?.user_roles?.title === 'in_game_trader' &&
            member?.match_overview?.upcoming_matches,
    },
    {
      title:
        member?.user_roles?.title === 'roster_lead'
          ? 'Inprogress'
          : member?.user_roles?.title === 'roster_maker'
          ? 'Inprogress'
          : member?.user_roles?.title === 'trading_lead'
          ? 'Live'
          : member?.user_roles?.title === 'pre_game_trader'
          ? 'Live'
          : member?.user_roles?.title === 'in_game_trader' && 'Live',
      value:
        member?.user_roles?.title === 'roster_lead'
          ? member?.match_overview?.in_progress_matched
          : member?.user_roles?.title === 'roster_maker'
          ? member?.match_overview?.in_progress_matches
          : member?.user_roles?.title === 'trading_lead'
          ? member?.match_overview?.live_matches
          : member?.user_roles?.title === 'pre_game_trader'
          ? member?.match_overview?.live_matches
          : member?.user_roles?.title === 'in_game_trader' &&
            member?.match_overview?.live_matches,
    },
    {
      title:
        member?.user_roles?.title === 'roster_lead'
          ? 'Approved'
          : member?.user_roles?.title === 'roster_maker'
          ? 'Submited'
          : '',
      value:
        member?.user_roles?.title === 'roster_lead'
          ? member?.match_overview?.aproved_matches
          : member?.user_roles?.title === 'roster_maker'
          ? member?.match_overview?.completed_matches
          : '',
    },
  ];

  const onCancel = () => {};

  return (
    <div className='bg-white w-[265px] h-[320px] p-2 rounded-2xl'>
      <div
        className='bg-[#F4F9FD] w-[250px] h-[185px] flex flex-col justify-center items-center rounded-2xl cursor-pointer'
        onClick={() => {
          setMembersTab({ ...member });
          setProfile(member);
        }}
      >
        <div className='w-[60px] h-[60px] relative'>
          <div className='w-[60px] h-[60px] rounded-full flex justify-center items-center bg-[#7D8592] opacity-20'></div>
          <div className='w-[52px] h-[52px] rounded-full flex justify-center items-center bg-white z-20 absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>
            <Avatar
              name={`${member?.first_name} ${member?.last_name}`}
              background='transparent'
            />
          </div>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            version='1.1'
            width='60px'
            height='60px'
            className='absolute top-0 left-0'
          >
            <circle
              cx='30'
              cy='30'
              r='28'
              strokeLinecap='round'
              className='fill-none stroke-[3px]'
            />
          </svg>
        </div>
        <div className='mt-2 text-center text-[#0A1629]'>
          <p className='text-base font-bold capitalize'>
            {member?.first_name} {member?.last_name}
          </p>
          <p className='text-sm font-normal mt-2 capitalize'>{roles}</p>
        </div>
        <div
          className={`h-6 px-4 py-4 rounded-full mt-2 flex items-center gap-3 capitalize ${
            member?.status === 1
              ? 'text-[#027A48] bg-[#ECFDF3]'
              : 'text-[#FBA63C] bg-[#FFE6C8]'
          }`}
        >
          <p
            className={`w-2.5 h-2.5 rounded-full contents-[""] ${
              member?.status === 1 ? 'bg-[#12B76A]' : 'bg-[#FBA63C]'
            }`}
          ></p>
          <p className='text-xs font-medium'>
            {member?.status === 1 ? 'active' : 'inactive'}
          </p>
        </div>
      </div>
      <div
        className='mt-4 px-3 flex items-center justify-center gap-6 cursor-pointer'
        onClick={() => setProfile(member)}
      >
        {/* {member?.match_overview && (
          <MembersKpiCard key={member?.id} count={counts} />
        )} */}
      </div>
      <div className='w-full flex items-center justify-between text-center mt-5 border border-[#F2F4F7] rounded-lg text-[#344054]'>
        <div className='w-1/2 h-full py-2 text-sm font-medium cursor-pointer bg-[#F9FAFB] text-[#344054]'>
          View Info
        </div>
        <div
          className='w-1/2 py-2 text-sm font-medium cursor-pointer'
          onClick={() => {
            setIsEditMode(true);
            setSelectedMember({
              first_name: member.first_name,
              last_name: member.last_name,
              status: member.status,
              email: member.email,
            });
          }}
        >
          Edit
        </div>
      </div>

      <EditMemberModal
        mode='edit'
        title='Edit'
        text='Edit details and informations for the employee.'
        isOpen={isEditMode}
        setIsOpen={setIsEditMode}
        value={selectedMember}
        onSave={onEdit}
        onCancel={onCancel}
      />

      <ConfirmModal
        open={isDeleteOpen}
        setOpen={setIsDeleteOpen}
        id={member?.id}
        roleType={roleType ? 'user' : 'admin'}
        onDelete={onDelete}
      />
      <style jsx>{`
        svg {
          stroke-dasharray: 205;
          stroke-dashoffset: ${205 - strokeOffset};
          stroke: #3f8cff;
          transform: rotate(0deg);
        }
      `}</style>
    </div>
  );
};

export default MemberRoleCard;
