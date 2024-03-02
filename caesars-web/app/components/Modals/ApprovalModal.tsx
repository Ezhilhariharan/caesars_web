import { Modal } from 'antd';
import { StaticImageData } from 'next/image';
import React, { useEffect, useState } from 'react';
import Avatar from '../global/Avatar';

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id?: any;
  primary?: boolean;
  team1_image: string | StaticImageData;
  team1_short_name: string;
  team2_image: string | StaticImageData;
  team2_short_name: string;
  status?: any;
  adminSave?: (
    match_id: any,
    task_name: any,
    is_approved: boolean,
    comment: string,
    message?: string
  ) => void;
  save?: (match_id: any, task_name: any, message?: string) => void;
  updateMatchStatus?: (status: number) => void;
};

const ApprovalModal = (props: Props) => {
  const {
    open,
    setOpen,
    id,
    team1_image,
    team1_short_name,
    team2_image,
    team2_short_name,
    status,
    adminSave,
    save,
    updateMatchStatus,
  } = props;

  const [user, setUser] = useState<any>(null);
  const [admin, setAdmin] = useState<any>(null);

  useEffect(() => {
    setUser(getUserFromLocalstorage());
  }, []);

  useEffect(() => {
    setAdmin(getAdminFromLocalstorage());
  }, []);

  // checking the localstorage data
  function getUserFromLocalstorage() {
    const userString = localStorage.getItem('user');
    if (!userString) return null;
    return JSON.parse(userString);
  }

  function getAdminFromLocalstorage() {
    const userString = localStorage.getItem('admin');
    if (!userString) return null;
    return JSON.parse(userString);
  }

  const handleSubmit = () => {
    //  "roster_approved";
    if (admin || user?.title === 'roster_lead') {
      if (adminSave)
        adminSave(
          id,
          'create_roster',
          true,
          'Match Approved and Handed Over Successfully'
        );
    }

    if (user && user?.title === 'roster_maker' && save) {
      if (save) save(id, 'create_roster', 'Match Submitted Successfully');
    }

    if (user && user?.title === 'pre_game_trader' && updateMatchStatus) {
      updateMatchStatus(6);
    }
    setOpen(false);
  };

  return (
    <Modal open={open} footer={false} closeIcon={false} centered>
      <div className='p-5'>
        <div className='flex justify-center items-center'>
          <Avatar
            name={team1_short_name}
            image={team1_image}
            width={50}
            height={50}
          />
          <p className='px-3 text-sm font-semibold'>vs</p>
          <Avatar
            name={team2_short_name}
            image={team2_image}
            width={50}
            height={50}
          />
        </div>
        <div className='h-[200px] mt-5 bg-[#ECF3FE] rounded-[20px] flex flex-col items-center justify-center'>
          <p className='text-xl font-bold text-[#4285F4]'>
            Are you sure want to{' '}
            {user && user?.title === 'roster_lead' ? 'Approve' : 'Submit'}?
          </p>
          <div className='flex justify-center text-xs items-center gap-5 mt-5'>
            <button
              className='px-4 py-2 rounded-full text-[#14171C] font-normal border border-[#4285F4]'
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </button>
            <button
              className='px-4 py-2 rounded-full text-white font-bold bg-[#4285F4] border border-[#4285F4]'
              onClick={() => handleSubmit()}
            >
              {user && user?.title === 'roster_lead'
                ? 'Yes, Approve'
                : 'Yes, Submit'}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ApprovalModal;
