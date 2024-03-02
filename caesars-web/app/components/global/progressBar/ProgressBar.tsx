import React from 'react';

type ProgressBarProps = {
  primary?: boolean;
  percentage: number;
  style?: {};
  barHeight?: number;
  circleWidth?: number;
};

const ProgressBar = ({
  primary = true,
  percentage,
  barHeight,
  circleWidth,
  ...prop
}: ProgressBarProps) => {
  const progressStatus =
    percentage !== null
      ? percentage > 0 && percentage <= 100
        ? percentage
        : 0
      : 0;

  return (
    <>
      <div className='w-full h-full relative py-3' {...prop}>
        <div
          className={`w-full h-2 absolute flex left-0 top-1  opacity-50 rounded-lg ${
            primary ? 'bg-[#4285F4]' : 'bg-[#EDEDED]'
          }`}
          style={{
            height: `${barHeight}px`,
          }}
        />
        <div
          className='h-2 absolute top-1 left-0 bg-[#4285f4] rounded-lg'
          style={{
            width: `${progressStatus}%`,
            height: `${barHeight}px`,
          }}
        />
        {primary && (
          <div
            className={`w-4 h-4 absolute top-0 bg-[#4285F4] rounded-full border-2 border-white contents-[""]`}
            style={{
              left: `${
                progressStatus > 90 ? progressStatus - 4 : progressStatus - 2
              }%`,
              width: `${circleWidth ? circleWidth : 0}px`,
              height: `${circleWidth ? circleWidth : 0}px`,
            }}
          />
        )}
      </div>
      {!primary && <div className='pl-5'>{Math.round(progressStatus)}%</div>}
    </>
  );
};

export default ProgressBar;
