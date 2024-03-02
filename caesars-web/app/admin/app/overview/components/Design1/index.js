import { useLocal } from '@/app/hooks/useLocal';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import React from 'react';

function MemberOverviewDesign1({ matchData, admin }) {
  const router = useRouter();
  const [membersTab, setMembersTab] = useLocal('members tab', {});

  const data = admin?.is_superadmin ? matchData : matchData.slice(1, 3);

  return (
    <div
      className={`w-full flex flex-col justify-between cursor-pointer ${
        admin?.is_superadmin ? 'gap-3.5' : 'gap-12'
      }`}
    >
      {data?.map((matchData, index) => (
        <div
          key={index}
          className={`w-full h-auto bg-white p-5 flex flex-1 items-center justify-center text-center rounded-2xl ${
            matchData.tab === 'Admin' ? 'cursor-pointer' : 'cursor-not-allowed'
          }`}
          onClick={() => {
            if (matchData.tab === 'Admin') {
              setMembersTab({
                title: matchData.tab,
              });

              router.push('/admin/app/members');
            }
          }}
        >
          <div className='flex-1'>
            <Image src={matchData.profileicon} alt='' />
          </div>
          <div className='match-review-text-section flex-1'>
            <div className='match-review-number text-black text-base font-medium'>
              {matchData.number}
            </div>
            <div className='match-review-title text-[#54577A] text-sm font-medium'>
              {matchData.title}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MemberOverviewDesign1;
