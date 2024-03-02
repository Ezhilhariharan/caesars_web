import React from 'react';

type Props = {
  name?: string;
  type?: string;
  message?: string;
  date?: string;
  time?: string;
};

const MatchDetailsTaskCard = ({ name, type, message, date, time }: Props) => {
  return (
    <div className='w-full flex justify-between p-5 text-[rgba(52,52,52,.4)]'>
      <p className='text font-normal'>{message}</p>
      <p className='flex flex-col text-xs font-normal '>
        <span className=''>{date} at</span>
        <span>{time}</span>
      </p>
    </div>
  );
};

export default MatchDetailsTaskCard;
