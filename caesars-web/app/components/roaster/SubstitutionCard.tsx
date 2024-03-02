"use client";
import React from "react";
import Image from "next/image";

//icon
import propNavigate from "../../assets/propNavigate.svg";
import rightArrow from "../../assets/rightArrow.svg";

type Props = {
  setSelectedTab: React.Dispatch<React.SetStateAction<any>>;
  playerListDetails: any;
  setSubstitutionAction: React.Dispatch<React.SetStateAction<any>>;
  substitutionAction: any;
  substitutionUpdate: () => void;
  handleSubstitution: () => void;
};

const SubstitutionCard = ({
  setSelectedTab,
  playerListDetails,
  setSubstitutionAction,
  substitutionAction,
  substitutionUpdate,
  handleSubstitution,
}: Props) => {
  return (
    <div className="border bg-[#F9F9F9] rounded-[10px] w-full mt-5 px-5 py-2.5 ">
      <div className="flex justify-between items-center my-3">
        <div className="match-details-tab-active px-3 py-1 rounded-[3px] text-sm font-normal">
          Substitution change
        </div>
        <div
          className="text-[#64748B] text-sm font-semibold flex cursor-pointer"
          onClick={() => setSelectedTab("ppm")}
        >
          Player Prop Market
          <Image
            src={propNavigate}
            alt="Save"
            width={17}
            height={17}
            className="ml-1"
          />
        </div>
      </div>
      <div
        onClick={() =>
          playerListDetails.hasOwnProperty("team_id") && handleSubstitution()
        }
        className="h-[50px] bg-[#FFF] w-full px-4 rounded-[10px] flex justify-between items-center cursor-pointer"
      >
        <div className="text-[#718096] text-sm font-bold">Substitution</div>
        <div className="">
          <Image src={rightArrow} alt="Save" width={30} height={20} />
        </div>
      </div>
      <div className="flex items-center justify-between px-4 py-2">
        <div className="text-[#718096] text-sm font-bold">Sub. Position:</div>
        <div
          onClick={() => setSubstitutionAction("pinch hitter")}
          className={`  p-3 rounded-[8px] text-sm font-normal cursor-pointer ${
            substitutionAction === "pinch hitter"
              ? "bg-[#4285F4] text-[#fff]"
              : "text-[#718096] "
          }`}
        >
          Pinch hitter
        </div>
        <div
          onClick={() => setSubstitutionAction("pinch runner")}
          className={` p-3 rounded-[8px] text-sm font-normal cursor-pointer ${
            substitutionAction === "pinch runner"
              ? "bg-[#4285F4] text-[#fff]"
              : "text-[#718096] "
          }`}
        >
          Pinch runner
        </div>
      </div>
      <div
        onClick={() => substitutionUpdate()}
        className="w-full bg-[#EFEFEF] h-[50px] flex justify-center items-center text-sm font-normal text-[#BFC2C8] rounded-[5px] cursor-pointer"
      >
        {/* Swipe Right to Confirm */}
        Click to Confirm
      </div>
    </div>
  );
};

export default SubstitutionCard;
