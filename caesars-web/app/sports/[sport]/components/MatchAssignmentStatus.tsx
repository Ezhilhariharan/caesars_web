import React from 'react';
import Image from 'next/image';
import greenCheckCircle from '../../../assets/icons/greenCheckCircle.svg';

type MatchStatusProps = {
  status: any;
};

export default function MatchAssignmentStatus(props: MatchStatusProps) {
  const { status } = props;
  return (
    <>
      {status === 8 && (
        <div className='text-[#54577A] text-sm font-normal'>Match Ended</div>
      )}
      {status === 9 && (
        <div className='text-[#54577A] text-sm font-normal'>
          Data Confirmation
        </div>
      )}
      {status === 10 && (
        <div className='text-[#54577A] text-sm font-normal'>Suspended</div>
      )}
      {status < 7 && (
        <div className='text-[#54577A] text-sm font-normal'>Not Started</div>
      )}
      {status === 7 && (
        <div className='bg-[#00CD4A] text-[11px] font-semibold text-[#FFF] flex justify-center items-center p-[2.5px] rounded-[4px] w-[55px] mt-1'>
          <Image
            src={greenCheckCircle}
            alt='greenCheckCircle'
            width={13}
            height={13}
            className='mr-1'
          />
          Live
        </div>
      )}
    </>
  );
}
