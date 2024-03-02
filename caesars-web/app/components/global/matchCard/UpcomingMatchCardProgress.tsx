import React from 'react';
import ProgressBar from '../progressBar/ProgressBar';
import dateConverter from '@/app/lib/dateConverter';
import MatchCardExtentedTask from './MatchCardExtentedTask';

type MatchCardProgressProps = {
  matchId?: any;
  toggle?: boolean;
  percentage?: number;
  lastModifiedDate?: string;
  style?: {};
  barHeight?: number;
  circleWidth?: number;
  status?: any;
};

const UpcomingMatchProgress = (props: MatchCardProgressProps) => {
  const {
    matchId,
    percentage,
    lastModifiedDate,
    toggle,
    barHeight,
    status,
    circleWidth,
    ...prop
  } = props;
  const percentages = percentage && percentage > 0 ? percentage : 0;
  const lastModified = dateConverter(lastModifiedDate);

  return (
    <article className='pt-5 px-5' {...prop}>
      <div className={`${toggle ? 'mt-7' : ''}`}>
        <div className='flex justify-between mb-2'>
          <p className='text-[#141522] font-medium'>Progress</p>
          <p className='text-[#4285F4]'>{Math.round(percentages)}%</p>
        </div>
        <ProgressBar
          barHeight={barHeight}
          percentage={percentages}
          circleWidth={circleWidth}
          style={{
            ...prop,
          }}
        />
      </div>

      {toggle && (
        <div className='my-5'>
          <MatchCardExtentedTask
            matchId={matchId}
            style={{
              margin: '15px 0',
            }}
          />
        </div>
      )}
      {lastModifiedDate && (
        <div className='flex justify-between py-5 text-sm'>
          <p className='text-[#54577A] font-medium'>Match Date</p>
          <p className='text-[#141522] font-semibold'>
            {lastModified.date} {lastModified.monthInString} {lastModified.year}
          </p>
        </div>
      )}
    </article>
  );
};

export default UpcomingMatchProgress;
