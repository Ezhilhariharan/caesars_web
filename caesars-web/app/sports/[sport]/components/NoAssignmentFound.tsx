'use client';
import React, { useState } from 'react';
import Image from 'next/image';

// svg-icons
import noData from '../assets/noData.svg';

// custom-icons
import Plus from '@/app/assets1/custom-icons/Plus';

// components
import AssignMatch from '@/app/app/roster_lead/overview/components/AssignMatch';
import { toastProps } from '@/app/components/global/toast/Toast';

// antd
import { Modal } from 'antd';

type Props = {
  id: number;
  match: any;
  user: any;
  toastPopup?: boolean;
  setToastPopup?: React.Dispatch<React.SetStateAction<boolean>>;
  toastDetails?: toastProps;
  setToastDetails?: React.Dispatch<React.SetStateAction<toastProps>>;
  loadMatches: () => void;
};

export default function NoAssignmentFound(props: Props) {
  const {
    id,
    match,
    user,
    toastPopup,
    setToastPopup,
    toastDetails,
    setToastDetails,
    loadMatches,
  } = props;
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <div className='w-full h-full flex flex-col items-center justify-center border-t relative'>
      <div className='realtive'>
        <Image src={noData} alt='noData' />
        <div className='w-full h-full flex flex-col items-center justify-center backdrop-blur-sm absolute top-0 left-0'>
          {user?.title === 'roster_lead' ? (
            <div className='w-full h-auto flex flex-col items-center justify-center'>
              <div className='text-2xl font-bold text-[#616874] max-w-[450px] w-full text-center'>
                You have not Assigned the match yet, Click on the Assign to get
                started.
              </div>
              <button
                className='w-auto max-h-10 px-5 py-2.5 bg-[#4285F4] text-white flex items-center flex-1 rounded-md text-center mt-6 gap-2.5'
                onClick={() => setOpenModal(true)}
              >
                <Plus color='white' size={16} />
                <p>Assign the Match</p>
              </button>
            </div>
          ) : (
            <div className='w-full h-auto flex flex-col items-center justify-center'>
              <div className='text-2xl font-bold text-[#616874] max-w-[450px] w-full text-center'>
                No Assignments Found
              </div>
            </div>
          )}
        </div>
      </div>

      <Modal
        footer={false}
        open={openModal}
        centered
        onCancel={() => {
          setOpenModal(false);
        }}
      >
        <AssignMatch
          match={match}
          open={openModal}
          setOpen={setOpenModal}
          toastPopup={toastPopup}
          setToastPopup={setToastPopup}
          toastDetails={toastDetails}
          setToastDetails={setToastDetails}
          loadMatch={loadMatches}
        />
      </Modal>
    </div>
  );
}
