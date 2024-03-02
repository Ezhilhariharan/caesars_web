// import jstz from "jstz";

import { allMonths } from './../components/global/staticCalenderDatas';

export default function dateConverter(d: any) {
  const givenDate = new Date(d);

  const date = givenDate.getUTCDate();
  const day = givenDate.getUTCDay();
  const month = givenDate.getUTCMonth();
  const currentMonth = givenDate.getUTCMonth() + 1;
  const monthInString = allMonths[givenDate.getUTCMonth()];
  const year = givenDate.getUTCFullYear();
  // const hour = givenDate.getUTCHours().toString().padStart(2, '0');
  // const minutes = givenDate.getUTCMinutes().toString().padStart(2, '0');
  const seconds = givenDate.getUTCSeconds();

  // const dateString = `${year}-${month}-${date}`;
  // const timeString = givenDate.toLocaleTimeString('en-us').split(':');

  // const hour = timeString[0];
  // const minutes = timeString[1];
  // const meridiem = timeString[2]?.slice(-2);

  // const date = new Date(dateStr);
  const hours = givenDate.getHours();
  const minutes = givenDate.getMinutes();
  const milliSec = givenDate.getMilliseconds();

  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;

  const dateString = `${year}-${currentMonth}-${date}`;
  const timeString = `${formattedHours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')} ${ampm}`;

  const timeStringWithMilliSec = `${formattedHours
    .toString()
    .padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${milliSec} ${ampm}`;

  return {
    date,
    month: month + 1,
    monthInString,
    dateString,
    year,
    hours,
    minutes,
    seconds,
    milliSec,
    timeString,
    timeStringWithMilliSec,
  };
}
