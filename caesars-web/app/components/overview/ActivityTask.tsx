'use client';
import React, { useEffect, useState } from 'react';

// API fetchers
import { get } from '@/app/apiIntegrations/fetcher';

// components
import CircleProgressBar from '../global/progressBar/CircleProgressBar';
import CardContainer from '../global/cardContainer/CardContainer';

type ActivityCardProps = {};

const ActivityTask = (props: ActivityCardProps) => {
  const [tasks, setTasks] = useState<any>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      const res = await get(`/dashboard/overview`);
      setTasks(res);
    } catch (e) {
      console.warn(e);
    }
  }

  const balance =
    tasks &&
    (tasks.submittedMatch /
      (tasks?.assignedMatch + tasks?.submittedMatch + tasks?.inProgressMatch)) *
      100;

  return (
    <CardContainer
      style={{
        width: '194px',
        height: '214px',
        padding: '20px',
      }}
      header={'Active Matches'}
    >
      <div className='flex gap-5'>
        <div className=''>
          <h2 className='text-[32px] my-3 font-semibold'>
            {tasks?.inProgressMatch | 0}
          </h2>
          <CircleProgressBar progress={Math.round(balance)} />
        </div>
        <div className='flex flex-col justify-between'>
          <div className='pt-3'>
            <p className='text-xl font-semibold'>{tasks?.submittedMatch | 0}</p>
            <span className='text-[#54577A] text-sm font-normal'>
              Submitted
            </span>
          </div>
          <div className=''>
            <p className='text-xl font-semibold'>
              {(tasks?.assignedMatch +
                tasks?.submittedMatch +
                tasks?.inProgressMatch) |
                0}
            </p>
            <span className='text-[#54577A] text-sm font-medium'>Total</span>
          </div>
        </div>
      </div>
    </CardContainer>
  );
};

export default ActivityTask;
