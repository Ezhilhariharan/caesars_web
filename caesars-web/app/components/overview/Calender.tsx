'use client';
import React, { useEffect, useState } from 'react';
import CardContainer from '../global/cardContainer/CardContainer';
import DateInfo from './utils/DateInfo';
import CalenderLeftSideComponent from './utils/CalenderLeftSideComponent';
import CalenderRightSideComponent from './utils/CalenderRightSideComponent';
import dayjs from 'dayjs';
import { Popover } from 'antd';
import CalendarContainer from '../global/calender/Calenders';
import { allMonths } from '../global/staticCalenderDatas';

interface dateInfo {
  id: number;
  date: string;
  day: string;
}

type CalenderProps = {
  setTodayMatches?: React.Dispatch<React.SetStateAction<any[]>>;
  getDates: (date: any) => void;
  selectedDate?: any;
  setSelectedDate?: React.Dispatch<React.SetStateAction<any>>;
  isStartDateSelected?: boolean;
  setIsStartDateSelected?: React.Dispatch<React.SetStateAction<boolean>>;
  style?: {};
};

const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

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
  const currentDates = dayjs();
  const [today, setToday] = useState(currentDates);
  const [selectedDates, setSelectedDates] = useState<any>(currentDates);
  const [openCalender, setOpenCalender] = useState(false);

  const current = new Date();
  const currentMonth = allMonths[current.getMonth()];

  const [currentWeek, setCurrentWeek] = useState(currentDates);
  const currentDate = dayjs();

  const handleRightClick = () => {
    setSelectedDates(dayjs(selectedDates?.add(1, 'days')));
    getDates(dayjs(selectedDates?.add(1, 'days')));
    if (lastDateOfWeek?.format('DD') == selectedDates?.format('DD')) {
      const prevWeek = currentWeek?.add(1, 'week');
      updateWeek(prevWeek);
    }
  };
  const handleLeftClick = () => {
    setSelectedDates(dayjs(selectedDates?.subtract(1, 'days')));
    getDates(dayjs(selectedDates?.subtract(1, 'days')));
    if (firstDateOfWeek?.format('DD') == selectedDates?.format('DD')) {
      const nextWeek = dayjs(currentWeek)
        ?.subtract(1, 'week')
        ?.format('YYYY-MM-DD');
      updateWeek(nextWeek);
    }
  };

  const updateWeek = (date: any) => {
    const startOfWeek = dayjs(date)?.startOf('week');
    setCurrentWeek(startOfWeek);
  };

  const CalendarHeader = () => {
    return (
      <Popover open={openCalender} content={rangePickerContent}>
        <div className='w-full flex items-center text-sm font-semibold text-[#141522] gap-1.5'>
          {dayjs()?.format('YYYY-MM-DD') ==
          dayjs(selectedDates)?.format('YYYY-MM-DD') ? (
            <p className='cursor-pointer'>
              {allMonths[dayjs(selectedDates)?.month()]}{' '}
              {dayjs(selectedDates)?.format('YYYY')}
            </p>
          ) : (
            <p
              className='cursor-pointer'
              onClick={() => {
                setCurrentWeek(currentDates);
                setSelectedDates(dayjs(currentDates));
              }}
            >
              Go Today
            </p>
          )}
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
  const firstDateOfWeek = currentWeek?.clone()?.startOf('week');
  const lastDateOfWeek = currentWeek?.clone()?.endOf('week');

  return (
    <CardContainer
      headerSize='small'
      headerStyle={{
        padding: '0 8px',
        color: '#141522',
      }}
      headerComponent={<CalendarHeader />}
      leftSideComponent={
        <CalenderLeftSideComponent onChange={() => handleLeftClick()} />
      }
      rightSideComponent={
        <CalenderRightSideComponent onChange={() => handleRightClick()} />
      }
      {...prop}
    >
      <div className='flex justify-between pt-[50px]'>
        {days?.map((day, i) => {
          const date = currentWeek?.clone()?.startOf('week')?.add(i, 'days');
          return (
            <div
              key={i}
              onClick={() => {
                getDates(date);
                setSelectedDates(dayjs(date));
              }}
              className='cursor-pointer'
            >
              <DateInfo
                key={i}
                date={date?.format('YYYY-MM-DD')}
                day={days[date?.day()]}
                month={currentMonth}
                today={currentDate}
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
