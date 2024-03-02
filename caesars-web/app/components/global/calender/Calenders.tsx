'use client';
import React from 'react';
import Image from 'next/image';
import { generateDate, months } from './utils/CalenderCom';
import { cn } from './utils/cn';
import left from '@/app/assets/icons/leftChavron.svg';
import right from '@/app/assets/icons/rightChavron.svg';
import xMark from '../../../assets/icons/close.svg';
import { getSportsMatches } from '@/app/apiIntegrations/apiClients/matches';
import { toastProps } from '../toast/Toast';
import dayjs from 'dayjs';

type dateProps = {
  primary?: boolean;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setMatches?: React.Dispatch<React.SetStateAction<any[]>>;
  currentDate?: any;
  today?: any;
  setToday?: React.Dispatch<React.SetStateAction<any>>;
  selectStartDate?: any;
  setSelectStartDate?: React.Dispatch<React.SetStateAction<any>>;
  selectEndDate?: any;
  setSelectEndDate?: React.Dispatch<React.SetStateAction<any>>;
  isStartDateSelected?: boolean;
  setIsStartDateSelected?: React.Dispatch<React.SetStateAction<boolean>>;
  isEndDateSelected?: boolean;
  setIsEndDateSelected?: React.Dispatch<React.SetStateAction<boolean>>;
  getDates?: (date: any) => void;
  toastPopup?: boolean;
  setToastPopup?: React.Dispatch<React.SetStateAction<boolean>>;
  toastDetails?: toastProps;
  setToastDetails?: React.Dispatch<React.SetStateAction<toastProps>>;
};

const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

let selectedDate = '';

const CalendarContainer = (props: dateProps) => {
  const {
    primary,
    open,
    setOpen,
    setMatches,
    currentDate,
    today,
    setToday,
    selectStartDate,
    setSelectStartDate,
    selectEndDate,
    setSelectEndDate,
    isStartDateSelected,
    setIsStartDateSelected,
    isEndDateSelected,
    setIsEndDateSelected,
    getDates,
    toastPopup,
    setToastPopup,
    toastDetails,
    setToastDetails,
  } = props;

  return (
    <>
      <div className=''>
        <div className='max-w-[320px] h-full'>
          <div className='w-full mb-5'>
            {primary && (
              <div className='w-full px-2 py-4 gap-5 flex items-center justify-between'>
                <div className='w-[130px] cursor-pointer'>
                  <p className='text-[10px] mb-1'>Start Date</p>
                  <div className={`h-6 border border-transparent`}>
                    {selectStartDate !== ''
                      ? `${selectStartDate.date()}-${
                          selectStartDate.month() + 1
                        }-${selectStartDate.year()}`
                      : '--'}
                  </div>
                </div>
                <div className='w-[130px] cursor-pointer'>
                  <p className='text-[10px] mb-1'>End Date</p>
                  <div className={`h-6 border border-transparent`}>
                    {selectStartDate !== '' && selectEndDate !== ''
                      ? `${selectEndDate.date()}-${selectEndDate.month() + 1}-
                ${selectEndDate.year()}`
                      : '--'}
                  </div>
                </div>
                <div
                  className='w-[50px] flex items-center gap-2 cursor-pointer'
                  onClick={() => {
                    if (setIsStartDateSelected) setIsStartDateSelected(false);
                    if (setIsEndDateSelected) setIsEndDateSelected(false);
                    if (setSelectStartDate) setSelectStartDate('');
                    if (setSelectEndDate) setSelectEndDate('');
                  }}
                >
                  <p>clear</p>
                  <Image src={xMark} alt='x-mark' width={10} height={10} />
                </div>
              </div>
            )}

            <div className='flex gap-5 px-3 items-center justify-between text-lg font-medium'>
              {/* <div
                className='w-5 h-5 cursor-pointer hover:scale-105 transition-all flex items-center'
                onClick={() => {
                  if (setToday) setToday(today.year(today.year() - 1));
                }}
              >
                <Image src={left} alt='left-arrow' />
                <Image src={left} alt='left-arrow' className='-ml-3' />
              </div> */}

              <div
                className='w-5 h-5 cursor-pointer hover:scale-105 transition-all'
                onClick={() => {
                  if (setToday) setToday(today.month(today.month() - 1));
                }}
              >
                <Image src={left} alt='left-arrow' />
              </div>

              <h1 className=' cursor-pointer hover:scale-105transition-all'>
                {months[today.month()].slice(0, 3)}, {today.year()}
              </h1>
              <div
                className='w-5 h-5 cursor-pointer text-[#0A1811] hover:scale-105 transition-all'
                onClick={() => {
                  if (setToday) setToday(today.month(today.month() + 1));
                }}
              >
                <Image src={right} alt='right-arrow' />
              </div>
              {/* <div
                className='w-5 h-5 cursor-pointer hover:scale-105 transition-all flex items-center'
                onClick={() => {
                  if (setToday) setToday(today.year(today.year() + 1));
                }}
              >
                <Image src={right} alt='right-arrow' />
                <Image src={right} alt='right-arrow' className='-ml-2.5' />
              </div> */}
            </div>
          </div>

          <div className='grid grid-cols-7'>
            {days.map((day, index) => {
              return (
                <h1
                  key={index}
                  className='text-sm text-center grid place-content-center text-gray-500 select-none'
                >
                  {day}
                </h1>
              );
            })}
          </div>

          <div className='grid grid-cols-7 '>
            {generateDate(today.month(), today.year()).map(
              ({ date, currentMonth, today }, index) => {
                return (
                  <div
                    key={index}
                    className={cn(
                      selectStartDate !== '' &&
                        selectEndDate !== '' &&
                        dayjs(selectStartDate).date() === date.date() &&
                        'rounded-l-md',
                      selectStartDate !== '' &&
                        selectEndDate !== '' &&
                        dayjs(selectEndDate).date() === date.date() &&
                        'rounded-r-md',
                      'w-12 h-10 text-center grid items-center justify-center text-sm border-t'
                    )}
                  >
                    <h1
                      className={cn(
                        currentMonth ? '' : 'text-gray-400',
                        selectEndDate === '' && today
                          ? 'w-8 h-8 bg-[#4285F40D] border border-[#4285F4] text-[#0A1811] rounded-full'
                          : '',
                        ((primary &&
                          selectStartDate !== '' &&
                          dayjs(selectStartDate) === dayjs(date)) ||
                          (primary &&
                            selectEndDate &&
                            selectEndDate !== '' &&
                            dayjs(selectEndDate) === dayjs(date))) &&
                          !today
                          ? 'bg-[#E0E3E8] text-[#0A1811] border-[#4285F4]'
                          : '',
                        selectStartDate !== '' &&
                          dayjs(selectStartDate) > dayjs(date) &&
                          !today
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'cursor-pointer',
                        selectStartDate !== '' &&
                          selectEndDate === '' &&
                          currentMonth &&
                          dayjs(selectStartDate).date() === date.date() &&
                          'w-8 h-8 bg-blue-500 text-white cursor-pointer rounded-full',
                        selectStartDate !== '' &&
                          selectEndDate !== '' &&
                          dayjs(selectStartDate) <= dayjs(date) &&
                          dayjs(selectEndDate) >= dayjs(date)
                          ? 'bg-blue-500 text-white cursor-pointer'
                          : 'cursor-not-allowed',
                        selectStartDate !== '' &&
                          selectEndDate !== '' &&
                          dayjs(selectStartDate).date() === date.date() &&
                          dayjs(selectStartDate).month() === date.month() &&
                          'rounded-l-full',
                        selectStartDate !== '' &&
                          selectEndDate !== '' &&
                          dayjs(selectEndDate).date() === date.date() &&
                          dayjs(selectEndDate).month() === date.month() &&
                          'rounded-r-full',
                        'w-12 h-10 grid place-content-center transition-all select-none'
                      )}
                      onClick={() => {
                        if (primary === true) {
                          if (
                            isStartDateSelected === false &&
                            isEndDateSelected === false
                          ) {
                            if (setSelectStartDate) setSelectStartDate(date);
                            if (setIsStartDateSelected)
                              setIsStartDateSelected(false);
                            if (setIsEndDateSelected)
                              setIsEndDateSelected(true);
                            if (selectEndDate !== '' && setSelectEndDate)
                              setSelectEndDate('');
                          }
                          if (
                            isEndDateSelected &&
                            dayjs(selectStartDate) < dayjs(date)
                          ) {
                            if (setSelectEndDate) setSelectEndDate(date);
                            // if (setIsEndDateSelected)
                            //   setIsEndDateSelected(false);
                          }
                        } else {
                          getDates?.(date);
                          if (setOpen) setOpen(false);
                        }
                      }}
                    >
                      {date.date()}
                    </h1>
                  </div>
                );
              }
            )}
          </div>
          {primary && (
            <div className='pt-5 flex items-center gap-5'>
              <button
                className='px-5 py-1 border rounded-md bg-[#E0E3E8] text-[#282E38]'
                onClick={() => {
                  if (setOpen) setOpen(false);
                }}
              >
                Discard
              </button>
              <button
                className='px-5 py-1 border rounded-md bg-[#4285F4] text-white'
                onClick={async () => {
                  if (selectStartDate !== '' || selectEndDate !== '') {
                    const startMonth = selectStartDate.month() + 1;
                    const endMonth =
                      primary &&
                      selectEndDate !== '' &&
                      selectEndDate.month() + 1;

                    const startDate =
                      selectStartDate.year() +
                      '-' +
                      startMonth +
                      '-' +
                      selectStartDate.date();

                    let end_date;
                    let start_date =
                      selectStartDate.year() +
                      '-' +
                      startMonth +
                      '-' +
                      selectStartDate.date();

                    if (selectEndDate !== '') {
                      end_date =
                        primary && selectEndDate !== ''
                          ? selectEndDate.year() +
                            '-' +
                            endMonth +
                            '-' +
                            selectEndDate.date()
                          : startDate;
                    } else {
                      end_date = startDate;
                    }

                    if (new Date(start_date) <= new Date(end_date)) {
                      try {
                        const data = await getSportsMatches({
                          query: {
                            start_date: start_date,
                            end_date: end_date,
                            sports: 'Baseball',
                          },
                        });
                        if (setMatches) setMatches(data);
                        if (setOpen) setOpen(false);
                      } catch (e) {
                        console.warn(e);
                      }
                    } else {
                      if (setToastPopup) setToastPopup(true);
                      if (setToastDetails)
                        setToastDetails({
                          type: 'alert',
                          title: 'Alert',
                          discription: 'Invalid date range!',
                        });
                    }
                  } else {
                    try {
                      const data = await getSportsMatches({
                        limit: 1000,
                        query: { today: true, sports: 'Baseball' },
                      });
                      if (setMatches) setMatches(data);
                      if (setOpen) setOpen(false);
                    } catch (e) {
                      console.warn(e);
                    }
                  }
                }}
              >
                OK
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CalendarContainer;
