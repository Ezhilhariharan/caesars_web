"use client";
import React from "react";
import Image from "next/image";

import moment from "moment";

//icon
import greenCheckCircle from "../../assets/icons/greenCheckCircle.svg";
import whether from "../../assets/wheather.svg";
import MatchStatus from "@/app/sports/[sport]/components/MatchStatus";
import MatchAssignmentStatus from "@/app/sports/[sport]/components/MatchAssignmentStatus";
import { allowedToUseMatchStatus } from "@/app/helper/sports";

type Props = {
  match: any;
  user?: any;
};

const MatchDetailsCard = ({ match, user }: Props) => {
  return (
    <div className=" w-full border  rounded-[10px] overflow-hidden  ">
      <div className="bg-[#001D45]  w-full flex justify-between items-center px-5 py-4">
        <div>
          {match?.team1_logo_image ? (
            <Image
              src={match?.team1_logo_image}
              alt="team"
              width={70}
              height={60}
            />
          ) : null}
        </div>

        <div className=" flex flex-col justify-center items-center ">
          <div className="text-[#FFF] font-bold text-4xl">Match</div>
          <div className="text-[#FFF] font-bold text-base">Details</div>
        </div>
        <div>
          {match?.team2_logo_image ? (
            <Image
              src={match?.team2_logo_image}
              alt="team"
              width={70}
              height={60}
            />
          ) : null}
        </div>
      </div>
      <div className="bg-[#F9F9F9] w-full h-full p-5">
        <div className="w-full flex justify-between">
          <div>
            <div className="text-[#141522] text-xs font-semibold">Venue</div>
            <div className="text-[#54577A] text-sm font-normal">
              {match?.location_address_line2}
            </div>
            <div className="text-[#54577A] text-sm font-normal">
              {match?.location_name}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[#141522] text-xs font-semibold">Date</div>
            <div className="text-[#54577A] text-sm font-normal">
              {moment(match?.match_started_at).format("ll")}
            </div>
            <div className="text-[#54577A] text-sm font-normal">
              {moment(match?.match_started_at).format("LT")} ET
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center items-center text-center mt-5">
          <div>
            <div className="text-[#141522] text-xs font-semibold">
              Match Status
            </div>
            <div className="text-[#54577A] text-sm">
              {allowedToUseMatchStatus.includes(user?.title) && match ? (
                <MatchStatus status={match?.m_status} />
              ) : (
                <MatchAssignmentStatus
                  status={match?.match_assignments_status}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchDetailsCard;
