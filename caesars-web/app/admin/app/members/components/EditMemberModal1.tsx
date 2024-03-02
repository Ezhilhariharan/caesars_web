'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

// icons
import briefCase from '../../../assets/brief-case.svg';

// antd
import { Modal, Select } from 'antd';

type Props = {
  mode: 'create' | 'edit';
  title: string;
  text: string;
  isAdmin?: boolean;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  value?: any;
  errors?: any;
  onInputChange: (key: any, value: any) => void;
  onSave?: (data: any) => void;
  onCancel: () => void;
};
const statusOptions = ['Inactive', 'Active'];
const roleOptions = [
  'Roster Admin',
  'Roster Manager',
  'In-game Manager',
  'In-game Trader',
];

const EditMemberModal = (props: Props) => {
  const {
    title,
    text,
    mode,
    isAdmin,
    isOpen,
    setIsOpen,
    value,
    onInputChange,
    onSave,
    onCancel,
    errors,
  } = props;
  const [option, setOption] = useState<any>('');

  useEffect(() => {
    if (mode === 'edit') setOption(statusOptions[value?.status]);
  }, [isOpen]);

  useEffect(() => {
    if (mode === 'create') {
      if (value.user_role_id === '1') setOption('Roster Admin');
      else if (value.user_role_id === '2') setOption('Roster Manager');
      else if (value.user_role_id === '3') setOption('In-game Manager');
      else if (value.user_role_id === '4') setOption('In-game Trader');
      else setOption('');
    }
  }, [isOpen]);

  return (
    <Modal
      width={'50%'}
      open={isOpen}
      onCancel={() => {
        setIsOpen(false);
        onCancel();
      }}
      footer={false}
      destroyOnClose={true}
      centered
    >
      <div className='w-full'>
        <div>
          <div>
            <div className='flex items-center gap-5'>
              <div>
                <Image src={briefCase} alt=' ' width={50} height={50} />
              </div>
              <div>
                <p className='text-lg font-semibold text-[#0E2354]'>{title}</p>
                <p className='text-sm font-normal text-[#676E7E]'>{text}</p>
              </div>
            </div>
            <div className='border border-[#ccc] rounded-lg p-5 mt-5'>
              <div className='text-lg font-semibold text-[#1D1F2C] mb-5'>
                General Information
              </div>
              <div className='flex items-center gap-10 '>
                <div className='w-1/2 flex flex-col'>
                  <label htmlFor='first_name'>First Name</label>
                  <input
                    type='text'
                    value={value?.first_name}
                    className='w-full h-10 mt-2 bg-[#FCFCFC] text-[#141522] border border-[#EFF1F4] rounded-[4px] px-5 py-1 text-sm font-medium capitalize'
                    onChange={(e) => {
                      onInputChange('first_name', e.target.value);
                    }}
                  />
                  <p className='p-2 text-red-500'>
                    {errors?.first_name !== '' && errors?.first_name}
                  </p>
                </div>
                <div className='w-1/2 flex flex-col'>
                  <label htmlFor='last_name'>Last Name</label>
                  <input
                    type='text'
                    value={value?.last_name}
                    className='w-full h-10 mt-2 bg-[#FCFCFC] text-[#141522] border border-[#EFF1F4] rounded-[4px] px-5 py-1 text-sm font-medium capitalize'
                    onChange={(e) => {
                      onInputChange('last_name', e.target.value);
                    }}
                  />
                  <p className='p-2 text-red-500'>
                    {errors?.last_name !== '' && errors?.last_name}
                  </p>
                </div>
              </div>

              <div className='flex flex-col mt-5'>
                <label htmlFor='email'>Mail Id</label>
                <input
                  type='email'
                  value={value?.email}
                  className='w-full h-10 mt-2 bg-[#FCFCFC] text-[#141522] border border-[#EFF1F4] rounded-[4px] px-5 py-1 text-sm font-medium'
                  onChange={(e) => {
                    onInputChange('email', e.target.value);
                  }}
                />
                <p className='p-2 text-red-500'>
                  {errors?.email !== '' && errors?.email}
                </p>
              </div>

              {!isAdmin && (
                <div className='flex flex-col mt-5'>
                  <label htmlFor='status'>
                    {mode === 'create'
                      ? 'Role'
                      : mode === 'edit' && 'Change Status'}
                  </label>
                  <Select
                    className='status-select w-full mt-2'
                    value={option}
                    onChange={(value) => {
                      if (mode === 'create') {
                        if (value === 'Roster Admin')
                          onInputChange('user_role_id', '1');
                        if (value === 'Roster Manager')
                          onInputChange('user_role_id', '2');
                        if (value === 'In-game Manager')
                          onInputChange('user_role_id', '3');
                        if (value === 'In-game Trader')
                          onInputChange('user_role_id', '4');

                        setOption(value);
                      }

                      if (mode === 'edit') {
                        if (value === 'Inactive') onInputChange('status', 0);
                        if (value === 'Active') onInputChange('status', 1);

                        setOption(value);
                      }
                    }}
                    options={
                      mode === 'create'
                        ? roleOptions.map((role) => ({
                            value: role,
                            label: role,
                          }))
                        : statusOptions.map((status) => ({
                            value: status,
                            label: status,
                          }))
                    }
                  />
                  <p className='p-2 text-red-500'>
                    {errors?.user_roles_id !== '' && errors?.user_roles_id}
                  </p>
                </div>
              )}
            </div>
            <div className='mt-16'>
              <div className='flex items-center justify-end gap-5'>
                <button
                  className='px-3 py-1 rounded-[4px] text-sm font-semibold bg-[#E0E3E8] text-[#282E38]'
                  onClick={() => {
                    setIsOpen(false);
                    onCancel();
                    if (!isAdmin) setOption([]);
                  }}
                >
                  Cancel
                </button>
                <button
                  className='px-3 py-1 rounded-[4px] text-sm font-semibold bg-[#4285F4] text-white'
                  onClick={() => {
                    // setIsOpen(false);
                    if (onSave) onSave('user');
                    if (!isAdmin) setOption([]);
                  }}
                >
                  {mode === 'create' ? 'Send Invite Link' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditMemberModal;
