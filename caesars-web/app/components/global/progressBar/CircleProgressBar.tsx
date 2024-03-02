'use client';
import React from 'react';

type CircleBarProps = {
  progress: number;
};

const CircleProgressBar = (props: CircleBarProps) => {
  const { progress } = props;

  const progressValue = progress > 0 ? progress : 0;
  const strokeArray = 205;
  const strokeProgress = progressValue / 100;
  const strokeOffset = strokeArray * strokeProgress;
  const strokeDashoffset = strokeArray - strokeOffset;

  return (
    <article className='w-[70px] h-[70px] relative'>
      <div className='w-[70px] h-[70px] rounded-full flex justify-center items-center bg-[#54577a] opacity-10'></div>
      <div className='w-[62px] h-[62px] rounded-full flex justify-center items-center bg-white z-20 absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>
        {progressValue}%
      </div>

      <svg
        xmlns='http://www.w3.org/2000/svg'
        version='1.1'
        width='70px'
        height='70px'
        className='absolute top-0 left-0'
      >
        <circle
          cx='35'
          cy='35'
          r='33'
          strokeLinecap='round'
          className='fill-none stroke-[#4285f4] stroke-[4px]'
        />
      </svg>
      <style jsx>{`
        svg {
          stroke-dasharray: 206;
          stroke-dashoffset: 206;
          animation: circleAnimation 2s linear forwards;
          transform: rotate(-90deg);
        }

        @keyframes circleAnimation {
          100% {
            stroke-dashoffset: ${strokeDashoffset};
          }
        }
      `}</style>
    </article>
  );
};

export default CircleProgressBar;
