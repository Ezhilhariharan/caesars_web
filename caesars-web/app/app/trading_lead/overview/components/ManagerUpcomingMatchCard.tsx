"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { toastProps } from "../../../../components/global/toast/Toast";
import StatusOftask from "../../../../components/global/StatusOftask";
import { Modal } from "antd";
import Avatar from "../../../../components/global/Avatar";
import add from "../../../roster_admin/overview/assets/add.svg";
import AssignMatch from "./AssignMatch";

type props = {
  user?: any;
  isApprove?: boolean;
  setIsApprove?: React.Dispatch<React.SetStateAction<boolean>>;
  selectModal?: string;
  setSelectModal?: React.Dispatch<React.SetStateAction<string>>;
  data?: any;
  primary?: boolean;
  onClick?: () => void;
  toastPopup?: boolean;
  setToastPopup?: React.Dispatch<React.SetStateAction<boolean>>;
  toastDetails?: toastProps;
  setToastDetails?: React.Dispatch<React.SetStateAction<toastProps>>;
  selectedTab?: string;
  adminSave?: (
    match_id: any,
    task_name: any,
    is_approved: boolean,
    comment: string,
    message?: string
  ) => void;
  style?: {};
};

const ManagerUpcomingMatchCard = (props: props) => {
  const {
    user,
    isApprove,
    setIsApprove,
    data,
    primary,
    selectModal,
    setSelectModal,
    onClick,
    toastPopup,
    setToastPopup,
    toastDetails,
    setToastDetails,
    selectedTab,
    adminSave,
    ...prop
  } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState({});

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setToastPopup?.(false);
    }, 3000);
    return () => clearTimeout(timeOut);
  }, [toastPopup]);

  return (
    <div className="flex justify-between" {...prop} onClick={onClick}>
      <div className=" flex flex-col justify-between">
        <div className="flex items-center">
          <Avatar
            name={data && data.team1_short_name}
            image={data && data.team1_logo_image}
            width={40}
            height={40}
          />{" "}
          <p className="text-base font-semibold pl-1">
            {data ? data.team1_short_name : data && data.team1_name}
          </p>
          <p className="text-base font-semibold px-1">vs</p>
          <p className="text-base font-semibold pr-1">
            {data ? data.team2_short_name : data && data.team2_name}
          </p>
          <Avatar
            name={data && data.team2_short_name}
            image={data && data.team2_logo_image}
            width={40}
            height={40}
          />{" "}
        </div>
        <div className="w-full text-sm font-normal text-[#B6B6B6] pt-3 px-2">
          <StatusOftask
            status={
              user?.title === "trading_lead" && data
                ? data.match_status
                : data && data.status
            }
          />
        </div>
      </div>
      <div className="flex items-center justify-end gap-5">
        {/* <div>
          <Image src={matchLogo} alt='match logo' height={25} />
        </div> */}

        <div
          className={`text-xs font-medium px-2 py-2 rounded-[4px] gap-2 flex items-center bg-[#4285F4]`}
        >
          <p className="text-white">Assign</p>
          <Image src={add} alt="" />
        </div>
      </div>
      <Modal
        footer={false}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
        }}
      >
        <AssignMatch
          match={selectedMatch}
          // open={openModal}
          // setOpen={setOpenModal}
          toastPopup={toastPopup}
          setToastPopup={setToastPopup}
          toastDetails={toastDetails}
          setToastDetails={setToastDetails}
          // loadMatch={loadUnassignedMatches}
        />
      </Modal>
    </div>
  );
};

export default ManagerUpcomingMatchCard;
