"use client";
import React from "react";
import Image from "next/image";

//icon
import Team1 from "../../assets/Team1.svg";
import samplePlayer from "../../assets/samplePlayer.svg";
import sampleAvatar from "../../assets/sampleAvatar.svg";

type Props = { selectedPlayerDetails: any; logo: any };

const PlayerDetailsCard = ({ selectedPlayerDetails, logo }: Props) => {
  return (
    <div className="w-full flex border rounded-[10px] overflow-hidden mt-5">
      <div className="w-[35%] flex flex-col justify-between bg-[#001D45] h-[100%]">
        <div className="flex justify-center py-5 ">
          <Image src={logo} alt="Team1" width={90} height={90} />
        </div>
        <Image
          src={sampleAvatar}
          alt="samplePlayer"
          width={150}
          height={400}
          className=""
        />
      </div>
      <div className=" w-[65%] p-4 bg-[#F9F9F9]">
        <div className=" text-[#14171C] text-sm font-normal">{`${
          selectedPlayerDetails?.players?.first_name
            ? selectedPlayerDetails?.players?.first_name
            : ""
        } ${
          selectedPlayerDetails?.players?.middle_name
            ? selectedPlayerDetails?.players?.middle_name
            : ""
        } 
           `}</div>
        <div className="flex justify-between items-center">
          <div className="text-[#14171C] text-4xl font-bold ellipsisOne w-[90%]">{`${
            selectedPlayerDetails?.players?.last_name
              ? selectedPlayerDetails?.players?.last_name
              : ""
          }`}</div>
          {/* <div className="">
            <div className="text-[#14171C] text-sm font-bold text-center">
              BAT/THR:
            </div>
            <div className="text-[#54577A] text-sm font-normal">
              Right, Right
            </div>
          </div> */}
        </div>
        <div className="text-xl font-semibold text-[#4285F4] py-1 uppercase">
          {selectedPlayerDetails?.players?.primary_position}
        </div>
        <div className="w-[85%]">
          <span className="text-[#14171C] text-sm font-bold text-center">
            Born:
          </span>
          <span className="text-[#54577A] text-sm font-normal pl-1">
            {selectedPlayerDetails?.date_of_birth?.split("T")[0]}
            {" / "}
            {selectedPlayerDetails?.nationality}
          </span>
        </div>
        <div className="flex py-2">
          <div className="text-[#14171C] text-sm font-bold text-center">
            HT/WT:{" "}
          </div>
          <div className="text-[#54577A] text-sm font-normal pl-1">
            {selectedPlayerDetails?.height +
              "/" +
              selectedPlayerDetails?.weigth}
          </div>
        </div>
        <div className="flex justify-between">
          {/* <div>
            <div className="text-[#14171C] text-sm font-bold text-center">
              Injury Status:
            </div>
            <div className="text-[#54577A] text-sm font-normal pl-1 flex items-center">
              <span className="w-[8px] h-[8px] rounded bg-[#00CD4A] mr-1" />{" "}
              Active
            </div>
          </div> */}
          <div className="text-[#D3D3D3] text-6xl font-bold h-[50px] ">
            {"#" + selectedPlayerDetails?.jersey_num}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerDetailsCard;
