'use client';
import React, { useEffect, useState } from 'react';
import CardContainer from '../../global/cardContainer/CardContainer';
import DateInfo from './DateInfo';
import CalenderLeftSideComponent from './CalenderLeftSideComponent';
import CalenderRightSideComponent from './CalenderRightSideComponent';
import dayjs from 'dayjs';
import calenderIcon from '../../assets/icons/calander.svg';
import { Popover } from 'antd';
import CalendarContainer from '../../global/calender/Calenders';
import { allMonths } from '../../global/staticCalenderDatas';
import { days } from '@/app/utils/CalenderStaticDatas';

interface dateInfo {
  id: number;
  date: string;
  day: string;
}

type CalenderProps = {
  setTodayMatches?: React.Dispatch<React.SetStateAction<any[]>>;
  getDates: (date: any) => {};
  selectedDate?: any;
  setSelectedDate?: React.Dispatch<React.SetStateAction<any>>;
  isStartDateSelected?: boolean;
  setIsStartDateSelected?: React.Dispatch<React.SetStateAction<boolean>>;
  style?: {};
};


const Calender = (props: CalenderProps) => {
  const {
    setTodayMatches,
    getDates,
    selectedDate,
    setSelectedDate,
    isStartDateSelected,
    setIsStartDateSelected,
    ...prop
  } = props;
  const currentDate = dayjs();
  const [weeks, setWeeks] = useState<dateInfo[]>([]);
  const [today, setToday] = useState(currentDate);
  const [selectedDates, setSelectedDates] = useState<any>(currentDate);
  const [openCalender, setOpenCalender] = useState(false);

  let dates: any;
  const current = new Date();
  const currentMonth = allMonths[current.getMonth()];
  const currentYear = current.getFullYear();

  let week: dateInfo[] = [];
  useEffect(() => {
    setWeeks(week);
  }, []);

  for (let i = 0; i < 7; i++) {
    const weekStartdate = current.getDate() - current.getDay() + i;
    const dates = new Date(current.setDate(weekStartdate))
      .toISOString()
      .slice(0, 10);
    const currentWeek = { id: i, day: days[i], date: dates };
    week.push(currentWeek);
  }

  const CalendarHeader = () => {
    return (
      <Popover open={openCalender} content={rangePickerContent}>
        <div className='w-full flex items-center text-sm font-semibold text-[#141522] gap-1.5'>
          <p>
            {currentMonth} {currentYear}
          </p>
          {/* <Image
            src={calenderIcon}
            alt=''
            onClick={() => setOpenCalender(!openCalender)}
          /> */}
        </div>
      </Popover>
    );
  };

  const rangePickerContent = (
    <div className='w-full h-full p-3'>
      <CalendarContainer
        open={openCalender}
        setOpen={setOpenCalender}
        today={today}
        setToday={setToday}
        primary={false}
        selectStartDate={selectedDate}
        setSelectStartDate={setSelectedDate}
        isStartDateSelected={isStartDateSelected}
        setIsStartDateSelected={setIsStartDateSelected}
        isEndDateSelected={false}
        getDates={getDates}
      />
    </div>
  );
  const startDate = week[0].date;
  const endDate = week[6].date;

  return (
    <CardContainer
      // header={`${currentMonth} ${currentYear}`}
      headerSize='small'
      headerStyle={{
        padding: '0 8px',
        color: '#141522',
      }}
      headerComponent={<CalendarHeader />}
      leftSideComponent={
        <CalenderLeftSideComponent
          onChange={() => {
            const date = selectedDates.date() - 1;
            dates = new Date(current.setDate(date)).toISOString().slice(0, 10);
            if (dates >= startDate) {
              setSelectedDates(dayjs(dates));
              getDates(dates);
            }
          }}
        />
      }
      rightSideComponent={
        <CalenderRightSideComponent
          onChange={() => {
            const date = selectedDates.date() + 1;
            dates = new Date(current.setDate(date)).toISOString().slice(0, 10);
            if (dates <= endDate) {
              setSelectedDates(dayjs(dates));
              getDates(dates);
            }
          }}
        />
      }
      {...prop}
    >
      <div className='flex justify-between pt-[50px]'>
        {weeks?.map((data, i) => {
          return (
            <div
              key={i}
              onClick={() => {
                getDates(data.date);
                setSelectedDates(dayjs(data.date));
              }}
              className='cursor-pointer'
            >
              <DateInfo
                key={data?.id}
                date={data?.date}
                day={data?.day}
                month={currentMonth}
                today={today}
                selectedDate={selectedDates}
              />
            </div>
          );
        })}
      </div>
    </CardContainer>
  );
};

export default Calender;
