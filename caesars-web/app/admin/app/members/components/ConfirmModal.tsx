import { Modal } from 'antd';
import React from 'react';

type Props = {
  user?: any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id?: any;
  roleType: any;
  onDelete: (id: any, roleType: any) => void;
};

const ConfirmModal = (props: Props) => {
  const { user, open, setOpen, id, onDelete, roleType } = props;
  return (
    <Modal open={open} footer={false} closeIcon={false} centered>
      <div className='p-5'>
        <div className='h-[200px] mt-5 bg-[#ECF3FE] rounded-[20px] flex flex-col items-center justify-center'>
          <p className='text-xl font-bold text-[#4285F4]'>
            Are you sure you want to delete?
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
              onClick={() => {
                onDelete(id, roleType);
                setOpen(false);
              }}
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
