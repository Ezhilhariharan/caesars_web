import React from 'react';
import { MatchStatusCardProps } from '../matchDetails/matchDetails.interfaces';
import StatusOftask from './StatusOftask';

const MatchStatusCard = (props: MatchStatusCardProps) => {
  const { create, dueDate, status, user, ...prop } = props;

  return (
    <div className='flex items-center' {...prop}>
      <div className='w-1/4 border-r mr-2'>
        <p className='text-[9px] font-medium text-[#777777] opacity-50'>
          Created
        </p>
        <p className='text-[10px] font-normal text-#777777] mt-1'>{create}</p>
      </div>
      {user?.user_role_id < 3 && (
        <div className='w-1/5 border-r mr-2'>
          <p className='text-[9px] font-medium text-[#777777] opacity-50'>
            Due Date
          </p>
          <p className='text-[10px] font-normal text-#777777] mt-1'>
            {dueDate}
          </p>
        </div>
      )}
      {user?.user_role_id > 2 && (
        <div className='w-1/5 border-r mr-2'>
          <p className='text-[9px] font-medium text-[#777777] opacity-50'>
            Match Date
          </p>
          <p className='text-[10px] font-normal text-#777777] mt-1'>
            {dueDate}
          </p>
        </div>
      )}
      <div className='w-2/5'>
        <p className='text-[9px] font-medium text-[#777777] opacity-50'>
          Status
        </p>
        <p className='text-[10px] font-normal text-#777777] mt-1'>
          <StatusOftask status={status} />
        </p>
      </div>
    </div>
  );
};

export default MatchStatusCard;
