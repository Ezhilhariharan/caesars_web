"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import moment from "moment";

//icon
import Save from "../../assets/propPlayersSave.svg";

type Props = {
  lastUpdatedTime: any;
  handleFunc: () => void;
  allow: boolean;
  stateStatus: any;
  teamLastUpdate?: any;
};

const ListHeader = ({
  lastUpdatedTime,
  handleFunc,
  allow,
  stateStatus,
  teamLastUpdate,
}: Props) => {
  const [checkingStatus, setCheckingStatus] = useState(false);
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setCheckingStatus(true);
    }, 1000);
    return () => {
      clearTimeout(timeOut);
      setCheckingStatus(false);
    };
  }, [stateStatus]);

  return (
    <div className="flex w-full justify-between items-center py-4">
      <div className="text-[#9A9A9A] text-xs font-medium py-1">
        Last Updated : {moment(teamLastUpdate).format("ll")}
      </div>

      {!checkingStatus && (
        <button
          onClick={() => {
            if (allow) handleFunc();
          }}
          className={` text-[#FFF] rounded-[6px] text-sm font-medium flex py-1 px-2 ${
            allow
              ? "cursor-pointer bg-[#4285F4]"
              : "cursor-not-allowed bg-[#4285F450]"
          }`}
        >
          {/* <Image
            src={Save}
            alt="Save"
            width={20}
            height={20}
            className="mr-1"
          /> */}
          Loading...
        </button>
      )}
    </div>
  );
};

export default ListHeader;
