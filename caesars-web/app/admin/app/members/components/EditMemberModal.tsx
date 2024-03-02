'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

// icons
import briefCase from '../../../assets/brief-case.svg';

// antd
import { Modal, Select } from 'antd';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { get } from '@/app/apiIntegrations/fetcher';

type Props = {
  mode: 'create' | 'edit';
  title: string;
  text: string;
  isAdmin?: boolean;
  isOpen: boolean;
  selectedUserRole?: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  value?: any;
  onSave?: (data: any) => void;
  onCancel: () => void;
};
const statusOptions = ['Inactive', 'Active'];

const EditMemberModal = (props: Props) => {
  const {
    title,
    text,
    mode,
    isAdmin,
    isOpen,
    setIsOpen,
    value,
    selectedUserRole,
    onSave,
    onCancel,
    // errors,
  } = props;

  const {
    register,
    handleSubmit,
    setError,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<typeof value>();

  const [userRoles, setUserRoles] = useState<any>(null);

  useEffect(() => {
    fetchUserRoles();
  }, []);

  useEffect(() => {
    if (mode === 'edit') {
      setValue('first_name', value?.first_name);
      setValue('last_name', value?.last_name);
      setValue('email', value?.email);
      setValue(
        'status',
        value?.status === 0 ? 'Inactive' : value?.status === 1 ? 'Active' : ''
      );
    }

    if (mode === 'create' && title === 'Create User') {
      reset();
      // const currentRole: any = [];
      // userRoles?.map(
      //   (r: any) => r.label === selectedUserRole && currentRole.push(r)
      // );
      // setValue('user_role_id', currentRole);
    }
  }, [value, isOpen]);

  const fetchUserRoles = async () => {
    const res = await get(`user-roles`);
    const newRes = res?.data?.map((r: any) => {
      const val = r.title.split('_').join(' ').toUpperCase();

      return {
        label: val,
        value: r.user_role_id,
      };
    });
    setUserRoles(newRes);
  };

  const onSubmit: SubmitHandler<typeof value> = async (data) => {
    const res = await checkIsEmailExist(data?.email);
    if (!res) {
      if (onSave) onSave(data);
      reset();
      onCancel();
      setIsOpen(false);
    } else {
      setError('email', {
        type: 'manual',
        message: 'Email already exist',
      });
    }
  };

  const checkIsEmailExist = async (data: string) => {
    if (title === 'Create User') {
      const res = await get(`/user/${data}`);
      return res.data === '1' ? true : res.data === '0' ? false : false;
    }

    if (title === 'Create Admin') {
      const res = await get(`/admin/${data}`);
      return res.data === '1' ? true : res.data === '0' ? false : false;
    }
  };

  return (
    <Modal
      width={'50%'}
      open={isOpen}
      onCancel={() => {
        setIsOpen(false);
        onCancel();
        reset();
      }}
      destroyOnClose
      footer={false}
      centered
    >
      <div className='w-full'>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
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
                    {...register('first_name', { required: true })}
                    className='w-full h-10 mt-2 bg-[#FCFCFC] text-[#141522] border border-[#EFF1F4] rounded-[4px] px-5 py-1 text-sm font-medium capitalize'
                  />
                  {errors?.first_name && (
                    <p className='p-2 text-red-500'>First Name required</p>
                  )}
                </div>
                <div className='w-1/2 flex flex-col'>
                  <label htmlFor='last_name'>Last Name</label>
                  <input
                    type='text'
                    {...register('last_name', { required: true })}
                    className='w-full h-10 mt-2 bg-[#FCFCFC] text-[#141522] border border-[#EFF1F4] rounded-[4px] px-5 py-1 text-sm font-medium capitalize'
                  />
                  {errors?.last_name && (
                    <p className='p-2 text-red-500'>Last Name requirede</p>
                  )}
                </div>
              </div>

              <div className='flex flex-col mt-5'>
                <label htmlFor='email'>Mail Id</label>
                <input
                  type='email'
                  className='w-full h-10 mt-2 bg-[#FCFCFC] text-[#141522] border border-[#EFF1F4] rounded-[4px] px-5 py-1 text-sm font-medium'
                  {...register('email', {
                    pattern: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
                    required: true,
                  })}
                />
                {!errors?.email?.message && errors?.email && (
                  <p className='p-2 text-red-500'>
                    Please enter valid email address
                  </p>
                )}

                {errors?.email?.message && (
                  <p className='p-2 text-red-500'>Email already exist</p>
                )}
              </div>

              {!isAdmin && (
                <div className='flex flex-col mt-5'>
                  <label htmlFor='status'>
                    {mode === 'create'
                      ? 'Role'
                      : mode === 'edit' && 'Change Status'}
                  </label>
                  <Controller
                    control={control}
                    name={mode === 'create' ? 'user_role_id' : 'status'}
                    rules={{
                      required: 'Please Select User Role',
                    }}
                    render={({
                      field: { onChange, onBlur, name, value, ref },
                    }) => (
                      <Select
                        className='status-select w-full mt-2'
                        ref={ref}
                        value={value}
                        rootClassName={name}
                        onChange={(e) => onChange(e)}
                        onBlur={onBlur}
                        options={
                          mode === 'create'
                            ? userRoles
                            : statusOptions.map((status) => ({
                                value: status,
                                label: status,
                              }))
                        }
                        style={{
                          textTransform: 'capitalize',
                        }}
                      />
                    )}
                  />
                  {errors?.user_roles_id && (
                    <p className='p-2 text-red-500'>user Roles required</p>
                  )}
                </div>
              )}
            </div>
            <div className='mt-16'>
              <div className='flex items-center justify-end gap-5'>
                <button
                  className='px-3 py-1 rounded-[4px] text-sm font-semibold bg-[#E0E3E8] text-[#282E38]'
                  onClick={() => {
                    setIsOpen(false);
                    reset();
                    onCancel();
                  }}
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='px-3 py-1 rounded-[4px] text-sm font-semibold bg-[#4285F4] text-white'
                >
                  {mode === 'create' ? 'Send Invite Link' : 'Save Changes'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default EditMemberModal;
