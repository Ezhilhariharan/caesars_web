"use client";
import dayjs from "dayjs";
import left from "@/app/assets/icons/leftChavron.svg";
import right from "@/app/assets/icons/rightChavron.svg";
import calander from "@/app/assets/icons/calander.svg";
// import './sports.css';

import Image from "next/image";
import { DatePicker, Modal, Popover } from "antd";
import React, { useEffect, useState } from "react";
import CalendarContainer from "../global/calender/Calenders";
import { months } from "../global/calender/utils/CalenderCom";
import LoadingComponent from "../global/LoadingComponent";
import { getSportsMatches } from "@/app/apiIntegrations/apiClients/matches";
import Toast, { toastProps } from "../global/toast/Toast";
import Avatar from "../global/Avatar";
import { allMonths } from "../global/staticCalenderDatas";

type Props = {
  selectedTabIndex: any;
  matches: any;
  isLoading?: boolean;
  setMatches: React.Dispatch<React.SetStateAction<any[]>>;
  onMatchClick: (d: any) => void;
  user: any;
  admin: any;
};

let count = 0;
export default function SubSidebarSports(props: Props) {
  const {
    selectedTabIndex,
    matches,
    setMatches,
    onMatchClick,
    isLoading,
    user,
    admin,
  } = props;
  const [openRangepicker, setopenRangepicker] = useState(false);
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectStartDate, setSelectStartDate] = useState<any>("");
  const [selectEndDate, setSelectEndDate] = useState<any>("");
  const [isStartDateSelected, setIsStartDateSelected] = useState(false);
  const [isEndDateSelected, setIsEndDateSelected] = useState(false);

  const [toastPopup, setToastPopup] = useState(false);
  const [toastDetails, setToastDetails] = useState<toastProps>({
    type: "alert",
    title: "",
    discription: "",
    logo: "",
  });

  useEffect(() => {
    if (toastPopup === true) {
      const timeOut = setTimeout(() => {
        setToastPopup(false);
      }, 2000);
      return () => clearTimeout(timeOut);
    }
  }, [toastPopup]);

  const rangePickerContent = (
    <div className="w-full h-full p-3">
      <CalendarContainer
        setMatches={setMatches}
        open={openRangepicker}
        setOpen={setopenRangepicker}
        currentDate={currentDate}
        today={today}
        setToday={setToday}
        primary={true}
        selectStartDate={selectStartDate}
        setSelectStartDate={setSelectStartDate}
        selectEndDate={selectEndDate}
        setSelectEndDate={setSelectEndDate}
        isStartDateSelected={isStartDateSelected}
        setIsStartDateSelected={setIsStartDateSelected}
        isEndDateSelected={isEndDateSelected}
        setIsEndDateSelected={setIsEndDateSelected}
        toastPopup={toastPopup}
        setToastPopup={setToastPopup}
        toastDetails={toastDetails}
        setToastDetails={setToastDetails}
      />
    </div>
  );

  const removeOneDayToDate = async (date: any, type?: any) => {
    if (type === "prev") date.setDate(date.getDate() - 1);
    if (type === "next") date.setDate(date.getDate() + 1);

    const previous = dayjs(date);
    const startMonth = previous.month() + 1;
    let start_date = previous.year() + "-" + startMonth + "-" + previous.date();
    const data = await getSportsMatches({
      query: {
        start_date: start_date,
        end_date: start_date,
        sports: "Baseball",
      },
    });
    setMatches(data);
    setSelectStartDate(previous);
  };

  return (
    <>
      <Toast
        type={toastDetails.type}
        title={toastDetails.title}
        discription={toastDetails.discription}
        logo={toastDetails.logo}
        toggle={toastPopup}
      />
      <div className="w-[280px] border-r border-[#ededed] h-full overflow-hidden flex flex-col">
        <div className="font-semibold text-xl pl-[5px] mt-[15px] text-[#0d0d54]">
          Caesars Entertainment
        </div>
        <div className="font-normal text-sm pl-[5px] text-[#4F5B67]">
          Player Props System
        </div>
        <div className="text-base mt-[57px]">
          <div className="flex p-2.5 border-y border-[#ebebeb]">
            {selectEndDate === "" && (
              <div
                className="w-10 cursor-pointer"
                style={{ display: "flex", justifyContent: "center" }}
                onClick={async () => {
                  const date =
                    selectStartDate !== ""
                      ? new Date(selectStartDate)
                      : new Date();
                  removeOneDayToDate(date, "prev");
                }}
              >
                <Image src={left} alt="left" />
              </div>
            )}
            <Popover
              trigger="click"
              open={openRangepicker}
              placement="bottom"
              arrow={false}
              content={rangePickerContent}
              onOpenChange={(open: boolean) => {
                setopenRangepicker(open);
              }}
            >
              <div className="relative flex flex-1 items-center">
                <div
                  className="cursor-pointer h-10 flex-1 flex items-center justify-center text-xs"
                  onClick={() => {
                    setIsStartDateSelected(false);
                    setIsEndDateSelected(false);
                  }}
                >
                  <span className="mr-[10px] text-sm">
                    {selectStartDate === "" && selectEndDate === "" && "Today"}
                    {selectStartDate !== "" &&
                      `${selectStartDate.date()}
                  ${months[selectStartDate.month()].slice(0, 3)}`}{" "}
                    {selectEndDate !== ""
                      ? `  - ${selectEndDate.date()}
                  ${months[selectEndDate.month()].slice(0, 3)}`
                      : ""}
                  </span>
                  <Image src={calander} alt={"calander"} />
                </div>
              </div>
            </Popover>
            {selectEndDate === "" && (
              <div
                className="w-10 cursor-pointer"
                style={{ display: "flex", justifyContent: "center" }}
                onClick={async () => {
                  const date =
                    selectStartDate !== ""
                      ? new Date(selectStartDate)
                      : new Date();
                  removeOneDayToDate(date, "next");
                }}
              >
                <Image src={right} alt="right" />
              </div>
            )}
          </div>
        </div>
        <div style={{ overflow: "scroll" }}>
          {isLoading && (
            <LoadingComponent
              text="Please Wait Loading the Match"
              style={{
                fontSize: 12,
              }}
            />
          )}
          {!isLoading && matches && matches?.length === 0 && (
            <div className="text-sm font-medium text-[#121212] text-center pt-10">
              No Matches Available
            </div>
          )}
          {!isLoading &&
            matches?.map((d: any, i: any) => {
              let date = new Date(d?.fixture_start_at?.split("T")[0]);

              return (
                // (admin ||
                // (user?.user_role_id === '1' && d.match_status < 3) ||
                // (user?.user_role_id === '2' && d.match_status < 2) ||
                // (user?.user_role_id === '3' && d.match_status > 2) ||
                // (user?.user_role_id === '4' && d.match_status < 6)) && (
                <div
                  key={i}
                  className="flex p-[5px] border-b border-[#ebebeb] cursor-pointer"
                  style={{
                    background: selectedTabIndex === d.id ? "#ECF3FE" : "#fff",
                    borderRight:
                      selectedTabIndex === d.id
                        ? "4px solid #4285F4"
                        : "1px solid #fff",
                  }}
                  onClick={() => {
                    onMatchClick(d);
                  }}
                >
                  <div className="border-r border-[#ccc] p-[15px]">
                    <div className="text-xs font-medium">{date.getDate()}</div>
                    <div style={{ fontSize: 12, fontWeight: 500 }}>
                      {allMonths[date.getMonth()]}
                    </div>
                  </div>
                  <div className="p-[5px] text-sm flex flex-col ml-2.5 text-left">
                    <div className="flex flex-1 items-center">
                      <div className="text-[10px] font-semibold flex items-center justify-center mr-2.5 text-[#fff] bg-[rgb(172, 0, 2)]">
                        <Avatar
                          image={d.team1_logo_image}
                          name={d.team1_name}
                          width={25}
                          height={25}
                        />
                      </div>
                      <span>{d.team1_name}</span>
                    </div>
                    <div className="flex items-center flex-1 mt-1.5">
                      <div className="text-[10px] font-semibold flex items-center justify-center mr-2.5 text-[#fff] bg-[rgb(172, 0, 2)]">
                        <Avatar
                          image={d.team2_logo_image}
                          name={d.team2_name}
                          width={25}
                          height={25}
                        />
                      </div>
                      <span>{d.team2_name}</span>
                    </div>
                  </div>
                </div>
                // )
              );
            })}
        </div>
      </div>
    </>
  );
}
