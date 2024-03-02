"use client";
import React from "react";
import Image from "next/image";

type Props = { logo: any; teamPreference: string; teamName: any };

const TeamBoard = ({ logo, teamName, teamPreference }: Props) => {
  return (
    <div className="w-full flex gap-5 justify-center items-center bg-[#F9F9F9] border-b py-5">
      <div>
        <div className="text-[#141522] font-bold text-4xl">
          {teamPreference}
        </div>
        <div className="text-[#7E8392] text-base font-normal">Team</div>
      </div>
      <div className="flex gap-3">
        {logo ? <Image src={logo} alt="team" width={70} height={60} /> : null}
        <div
          className={` h-[80px] w-[3px] pt-4 pb-4 ml-2 ${
            teamPreference == "Home" ? "bg-[#001D45]" : "bg-[#BA0C2F]"
          }`}
        />
      </div>
      <div>
        <div className="text-[#141522] font-bold text-base">
          {teamName?.substring(0, teamName.lastIndexOf(" "))}
        </div>
        <div className="text-[#141522] font-bold text-4xl">
          {teamName?.split(" ").pop()}
        </div>
      </div>
    </div>
  );
};

export default TeamBoard;
