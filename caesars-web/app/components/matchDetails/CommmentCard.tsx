import React from "react";
import Avatar from "../global/Avatar";
// import { dateConverter1 } from '@/app/lib/dateConverter';

type Props = {
  name?: string;
  type?: string;
  message?: string;
  date?: string;
  time?: string;
  rowDate?: any;
};

const CommmentCard = ({ name, type, message, date, time, rowDate }: Props) => {
  return (
    <div className="w-full flex items-center gap-10 px-5 my-5">
      <div className=" w-full">
        <div className="bg-white text-[#141522] text-base font-normal rounded-[10px] flex items-center justify-between p-5 h-14">
          <p>{message}</p>
          {/* <p className='text-[rgba(20,21,34,.4)] text-xs'>{date}</p> */}
        </div>
        <div className="w-full flex justify-end text-[rgba(20,21,34,.4)] text-xs mt-1">
          {date} at {time}
          {/* {JSON.stringify(rowDate)} {JSON.stringify(dateConverter1(rowDate))} */}
        </div>
      </div>
      <div className="text-[#141522]">
        <Avatar
          image={""}
          name={name}
          width={40}
          height={40}
          // background='#fff'
        />
      </div>
    </div>
  );
};

export default CommmentCard;
