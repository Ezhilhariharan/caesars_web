import React from 'react';
import './date.css';
import dayjs from 'dayjs';

type DateProps = {
  id?: number;
  date: string;
  day?: string;
  month?: string;
  today?: any;
  selectedDate: any;
  setTodayMatches?: React.Dispatch<React.SetStateAction<any[]>>;
  // active?: boolean;
};

const DateInfo = (props: DateProps) => {
  const { id, date, selectedDate, day, month, today, setTodayMatches } = props;
  const activeDate = selectedDate && dayjs(selectedDate).format('YYYY-MM-DD');
  const currentDate = today.format('YYYY-MM-DD');

  const dates = date?.split('-');
  const active = activeDate === date ? true : false;

  return (
    <div
      key={id}
      className={`date ${
        activeDate !== currentDate && currentDate === date
          ? 'today--active'
          : ''
      } ${active ? 'date--active' : ''}`}
    >
      <p>{day}</p>
      <p className='today'>{dates[2]}</p>
    </div>
  );
};

export default DateInfo;
