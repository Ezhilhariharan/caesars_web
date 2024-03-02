'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import ProgressBar from '../global/progressBar/ProgressBar';
import Avatar from '../global/Avatar';
import reject from '../../assets/icons/reject.svg';
import approve from '../../assets/icons/approve.svg';
import ApprovalModal from '../Modals/ApprovalModal';
import RejectModal from '../Modals/RejectModal';
import { toastProps } from '../global/toast/Toast';
import StatusOftask from '../global/StatusOftask';
import dateDifferenceInDays from '@/app/lib/dateDifferenceInDays';
import dateConverter from '@/app/lib/dateConverter';
// import add from '../../app/roster_lead/assets/add.svg';
import { Modal } from 'antd';
import AssignMatch from '@/app/app/trading_lead/overview/components/AssignMatch';

type NotificationTaskCardprops = {
  user?: any;
  isApprove?: boolean;
  setIsApprove?: React.Dispatch<React.SetStateAction<boolean>>;
  selectModal?: string;
  setSelectModal?: React.Dispatch<React.SetStateAction<string>>;
  data?: any;
  primary?: boolean;
  onClick?: () => void;
  toastPopup?: boolean;
  setToastPopup?: React.Dispatch<React.SetStateAction<boolean>>;
  toastDetails?: toastProps;
  setToastDetails?: React.Dispatch<React.SetStateAction<toastProps>>;
  selectedTab?: {
    id: number;
    title: string;
  };
  loadActivites?: (status?: any) => void;
  adminSave?: (
    match_id: any,
    task_name: any,
    is_approved: boolean,
    comment: string,
    message?: string
  ) => void;
  style?: {};
};

const tradingTeam: any = ['trading_lead', 'pre_game_trader', 'in_game_trader'];

const NotificationTaskCard = (props: NotificationTaskCardprops) => {
  const {
    user,
    isApprove,
    setIsApprove,
    data,
    primary,
    selectModal,
    setSelectModal,
    onClick,
    toastPopup,
    setToastPopup,
    toastDetails,
    setToastDetails,
    selectedTab,
    loadActivites,
    adminSave,
    ...prop
  } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState({});
  const date2 = new Date();

  // const assignedBy = data?.reporter_type.split('_');

  const balanceDate =
    selectedTab?.title === 'member'
      ? dateDifferenceInDays(new Date(data?.fixture_start_at), new Date(date2))
      : dateDifferenceInDays(new Date(data?.due_date), new Date(date2));

  const submittedAt = data?.notifications?.filter(
    (data: any) => data?.event_type === 'PLAYER_PROPS_MARKET_COMPLETED'
  );
  const filterDate =
    user?.title === 'roster_lead'
      ? submittedAt?.[submittedAt?.length - 1]?.triggered_at
      : data?.created_at;

  const { timeString, date, monthInString, year } = dateConverter(filterDate);

  return (
    <div
      className={`w-full flex justify-between ${
        selectedTab?.title !== 'member' ? 'cursor-pointer' : 'cursor-default'
      }`}
      {...prop}
      onClick={onClick}
    >
      <div className=' flex flex-col justify-between'>
        <div className='flex items-center'>
          <Avatar
            name={data?.team1_short_name}
            image={
              selectedTab?.title === 'Activity' ||
              selectedTab?.title === 'Matches' ||
              selectedTab?.title === 'Upcoming Matches'
                ? data?.team1_logo
                : data?.team1_logo_image
            }
            width={50}
            height={50}
          />{' '}
          <p className='text-base font-semibold pl-1'>
            {selectedTab?.title === 'member'
              ? data?.team1_short_name
              : data?.team1_name}
          </p>
          <p className='text-base font-semibold px-1'>vs</p>
          <p className='text-base font-semibold pr-1'>
            {selectedTab?.title === 'member'
              ? data?.team2_short_name
              : data?.team2_name}
          </p>
          <Avatar
            name={data?.team2_short_name}
            image={
              selectedTab?.title === 'Activity' ||
              selectedTab?.title === 'Matches' ||
              selectedTab?.title === 'Upcoming Matches'
                ? data?.team2_logo
                : data?.team2_logo_image
            }
            width={50}
            height={50}
          />{' '}
        </div>
        {tradingTeam.includes[user?.title] && (
          <div className='w-full text-sm font-normal text-[#B6B6B6] pt-3 px-2'>
            {selectedTab?.title === 'Matches' ? (
              <div className='flex items-center gap-5'>
                <div className='flex items-center gap-1 text-[#64748b]'>
                  {user?.title === 'roster_lead' ? 'Submitted' : 'Assigned'} on:{' '}
                  <p className='text-[#343434]'>
                    {date} {monthInString} {year}, {timeString}
                  </p>
                </div>
                <div className='flex items-center gap-1 text-[#64748b]'>
                  {user?.title === 'roster_lead' ? 'Submitted' : 'Assigned'} by:{' '}
                  <div className='flex items-center gap-1'>
                    {/* <Avatar
                    name={`${assigned[0]} ${assigned[1]}`}
                    width={25}
                    height={25}
                  /> */}
                    <p className='text-[#343434] capitalize'>
                      {`${data?.first_name} ${data?.last_name}`}
                    </p>
                  </div>
                </div>
                {user?.title === 'roster_maker' && (
                  <div className='flex items-center gap-1'>
                    Status:
                    <div className='text-[#343434]'>
                      <StatusOftask status={data?.status} />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <StatusOftask
                status={
                  user?.title === 'trading_lead' &&
                  selectedTab?.title === 'Upcoming Matches' &&
                  data
                    ? data?.match_status
                    : data?.status
                }
              />
            )}
          </div>
        )}
      </div>
      <div className='flex items-center justify-end gap-5'>
        {/* <div>
          <Image src={matchLogo} alt='match logo' height={25} />
        </div> */}
        {primary &&
          user?.title === 'roster_maker' &&
          selectedTab?.title === 'Matches' && (
            <div
              className={`w-1/4 min-w-[150px] h-[27px] rounded-[14px] border flex justify-center items-center px-5 ${
                balanceDate > 0
                  ? 'bg-[#FF6C37] border-[#FF6C37] text-white'
                  : 'border-[#737373] bg-transparent'
              }`}
            >
              <p className='text-sm font-normal'>{balanceDate} Day Left</p>
            </div>
          )}
        {user?.title === 'roster_lead' && selectedTab?.title !== 'member' && (
          <div
            className={`w-1/4 min-w-[150px] h-[27px] rounded-[14px] border border-[#737373] flex justify-center items-center px-5`}
          >
            {selectedTab?.title === 'Activity' ? (
              // <p className='text-sm font-normal'>{balanceDate} Day Left</p>
              <div
                className={`w-1/4 min-w-[150px] h-[27px] rounded-[14px] border flex justify-center items-center px-5 ${
                  balanceDate > 0
                    ? 'bg-[#FF6C37] border-[#FF6C37] text-white'
                    : 'border-[#737373] bg-transparent'
                }`}
              >
                <p className='text-sm font-normal'>
                  {balanceDate} {balanceDate > 1 ? 'Days' : 'Day'} Left
                </p>
              </div>
            ) : (
              selectedTab?.title === 'Matches' && (
                <StatusOftask status={data?.status} />
              )
            )}
          </div>
        )}
        {selectedTab?.title === 'member' && (
          <div
            className={`w-1/4 min-w-[150px] h-[27px] rounded-[14px] border flex justify-center items-center px-5 ${
              balanceDate > 0
                ? 'bg-[#FF6C37] border-[#FF6C37] text-white'
                : 'border-[#737373] bg-transparent'
            }`}
          >
            <p className='text-sm font-normal'>
              {balanceDate} {balanceDate > 1 ? 'Days' : 'Day'} Left
            </p>
          </div>
        )}

        {((user?.title === 'roster_maker' &&
          selectedTab?.title === 'Matches') ||
          (user?.title === 'roster_lead' &&
            selectedTab?.title === 'activity') ||
          selectedTab?.title === 'member') && (
          <div className='w-1/3 min-w-[200px] flex items-center'>
            <ProgressBar
              percentage={
                selectedTab?.title === 'member'
                  ? data?.match_assignments_overall_task_progress
                  : data?.overall_task_progress
              }
              style={{ padding: '7px 0' }}
              primary={false}
            />
          </div>
        )}
        {user?.title === 'roster_lead' &&
          data &&
          data?.status === 2 &&
          selectedTab?.title === 'Matches' && (
            <div className='flex items-center gap-5'>
              <div
                className='cursor-pointer'
                onClick={() => {
                  if (setSelectModal) setSelectModal('reject');
                  setIsModalOpen(true);
                }}
              >
                <Image src={reject} alt='reject' width={30} height={30} />
              </div>
              <div
                className='cursor-pointer'
                onClick={() => {
                  if (setSelectModal) setSelectModal('approve');
                  setIsModalOpen(true);
                }}
              >
                <Image src={approve} alt='approve' width={30} height={30} />
              </div>
            </div>
          )}

        {user?.title === 'trading_lead' &&
          selectedTab?.title === 'Upcoming Matches' && (
            <>
              <div
                className={`w-1/4 min-w-[150px] h-[27px] rounded-[14px] border border-[#737373] flex justify-center items-center px-5`}
              >
                <StatusOftask status={data?.status} />
              </div>
              <div
                className={`text-xs font-medium px-2 py-2 rounded-[4px] gap-2 flex items-center ${
                  primary ? 'bg-[#FB532E] flex-row-reverse' : 'bg-[#4285F4]'
                }`}
                onClick={() => {
                  if (setSelectModal) setSelectModal('assign');
                  setIsModalOpen(true);
                  setSelectedMatch(data);
                }}
              >
                <p className='text-white'>{primary ? 'Live' : 'Assign'}</p>
                {/* <Image src={add} alt='' width={20} height={20} /> */}
              </div>
            </>
          )}
      </div>
      {selectModal === 'approve' && (
        <ApprovalModal
          id={data?.match_id}
          open={isModalOpen}
          setOpen={setIsModalOpen}
          team1_image={data?.team1_logo}
          team1_short_name={data?.team1_short_name}
          team2_image={data?.team2_logo}
          team2_short_name={data?.team2_short_name}
          adminSave={adminSave}
        />
      )}
      {selectModal === 'reject' && (
        <RejectModal
          id={data?.match_id}
          adminSave={adminSave}
          open={isModalOpen}
          setOpen={setIsModalOpen}
          user={user}
          team1_image={data?.team1_logo}
          team1_short_name={data?.team1_short_name}
          team2_image={data?.team2_logo}
          team2_short_name={data?.team2_short_name}
        />
      )}
      {selectModal === 'assign' && (
        <Modal
          footer={false}
          open={isModalOpen}
          onCancel={() => {
            setIsModalOpen(false);
          }}
        >
          <AssignMatch
            match={selectedMatch}
            // open={openModal}
            // setOpen={setOpenModal}
            toastPopup={toastPopup}
            setToastPopup={setToastPopup}
            toastDetails={toastDetails}
            setToastDetails={setToastDetails}
            loadActivites={loadActivites}
          />
        </Modal>
      )}
    </div>
  );
};

export default NotificationTaskCard;
