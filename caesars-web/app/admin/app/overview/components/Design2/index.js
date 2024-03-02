import { useLocal } from '@/app/hooks/useLocal';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import React from 'react';

function MemberOverviewDesign2(props) {
  const router = useRouter();
  const [membersTab, setMembersTab] = useLocal('members tab', {});

  return (
    <div className='w-full flex items-center gap-10 max-[1700px]:gap-3.5'>
      {props.matchDataArray.map((matchData, index) => (
        <div
          key={index}
          className='flex justify-center text-center flex-col gap-5 p-5 bg-white rounded-2xl w-full'
        >
          <div className='flex flex-1 justify-between'>
            <div>
              <Image src={matchData.profileicon} alt='' />
            </div>
            <div>
              <div className='flex justify-center'>
                <div
                  className={`w-[50px] h-[50px] rounded-full flex items-center justify-center`}
                  style={{
                    border: '4px solid ' + matchData.color,
                  }}
                >
                  {matchData.number + matchData.numbers}
                </div>
              </div>
              <div className='text-[#54577A] text-sm font-medium'>
                {matchData.title}
              </div>
            </div>
          </div>
          <div className='vertical-line border border-[#E0E0E0] my-4'></div>
          <div className='flex flex-1 flex-col gap-9'>
            <div
              className='flex flex-1 justify-between cursor-pointer'
              onClick={() => {
                setMembersTab({
                  title: matchData.team,
                  tab: matchData.tab1,
                });

                router.push('/admin/app/members');
              }}
            >
              <div className='text-[#54577A] text-sm font-medium text-start'>
                {matchData.admin}
              </div>
              <div className='text-black text-2xl font-medium text-end'>
                {matchData.number}
              </div>
            </div>
            <div
              className='flex flex-1 justify-between cursor-pointer'
              onClick={() => {
                setMembersTab({
                  title: matchData.team,
                  tab: matchData.tab2,
                });

                router.push('/admin/app/members');
              }}
            >
              <div className='text-[#54577A] text-sm font-medium text-start'>
                {matchData.manager}
              </div>
              <div className='text-black text-2xl font-medium text-end'>
                {matchData.numbers}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MemberOverviewDesign2;
