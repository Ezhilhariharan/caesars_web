"use client";

import React from "react";
import Image from "next/image";
import { Modal, Checkbox } from "antd";

// components
import Title from "@/app/components/global/title/Title";

//icon
import samplePlayer from "../../assets/samplePlayer.svg";
import SubstitutionArrowDown from "../../assets/substutionArrowDown.svg";
import SubstitutionArrowUp from "../../assets/substutionArrowUp.svg";

type Props = {
  playerListDetails: any;
  reasonListData: any;
  setSubstitutionReason: React.Dispatch<React.SetStateAction<any>>;
  handleReason: (value: boolean, item: any) => void;
  substitutionReason: any;
  substitutionPositionList: any;
  selectedPlayerList: any;
  handleOnchangeReason: (value: any) => void;
  handleSubstitutionPlayer: (value: any) => void;
  handleCancelSubstitution: () => void;
};

const SubstitutionModal = ({
  playerListDetails,
  reasonListData,
  setSubstitutionReason,
  handleReason,
  substitutionReason,
  substitutionPositionList,
  selectedPlayerList,
  handleOnchangeReason,
  handleCancelSubstitution,
  handleSubstitutionPlayer,
}: Props) => {
  return (
    <div className="bg-white rounded-lg h-[auto] w-[100%]">
      <Title
        title={`Substitution`}
        style={{
          fontSize: 28,
          fontWeight: 700,
          color: "#1F2937",
        }}
      />
      <p className="text-sm font-normal text-[#718096] -mt-1 ">
        Select substitute player and Reason for Substitution.
      </p>
      <div className="w-[100%] flex mt-4 gap-3 h-[30vh] overflow-scroll">
        <div className="w-[50%]">
          <div
            className={`font-semibold uppercase py-1.5 bg-[#F5F6F7] flex justify-center items-center w-[100%] border-[#E0E3E8]`}
          >
            {"PLAYING"}
          </div>
          <div className="flex justify-evenly items-center h-[50px]">
            <Image
              src={samplePlayer}
              alt="samplePlayer"
              width={30}
              height={30}
              className=""
            />
            <div className="text-sm font-light text-[#06C]">
              {`${
                playerListDetails?.first_name
                  ? playerListDetails?.first_name
                  : ""
              } ${
                playerListDetails?.middle_name
                  ? playerListDetails?.middle_name
                  : ""
              } ${
                playerListDetails?.last_name ? playerListDetails?.last_name : ""
              }`}
            </div>
            <Image
              src={SubstitutionArrowDown}
              alt="team"
              width={22}
              height={22}
              className="rounded-[50%]  "
            />
          </div>
          <div
            className={`font-semibold uppercase py-1.5 bg-[#F5F6F7] flex justify-center items-center w-[100%] border-[#E0E3E8]`}
          >
            {"REASON"}
          </div>
          <div className="px-4 py-6">
            <div className="grid grid-cols-2 gap-x-1 gap-y-4">
              {reasonListData?.map((item: any) => (
                <div
                  className="flex justify-start items-center w-[50%]"
                  key={item?.id}
                >
                  <Checkbox
                    checked={item?.checked}
                    className="checkBoxCircle mr-2"
                    onChange={(e) => {
                      setSubstitutionReason(""),
                        handleReason(e.target.checked, item);
                    }}
                  />
                  <div className="text-sm font-light text-[#06C]">
                    {item?.title}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center mt-5 border-[red]">
              <div className="text-sm font-light text-[#06C]">IF OTHER</div>
              <input
                type="text"
                className="w-[70%] p-2 border-b-[1px] border-[#141522] ml-2"
                value={
                  substitutionReason === "INJURY" ||
                  substitutionReason === "REGULAR" ||
                  substitutionReason === "SUSPENSION" ||
                  substitutionReason === "OTHER"
                    ? ""
                    : substitutionReason
                }
                onChange={(e) => handleOnchangeReason(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="w-[50%] overflow-scroll">
          <div
            className={`font-semibold uppercase py-1.5 bg-[#F5F6F7] flex justify-center items-center w-[100%] border-[#E0E3E8]`}
          >
            {"SUBSTITUION"}
          </div>

          {substitutionPositionList?.map((list: any) => (
            <div
              className="flex justify-between items-center h-[50px] w-[100%] px-2 cursor-pointer"
              key={list?.r_order}
              onClick={() => handleSubstitutionPlayer(list)}
            >
              {/* setSelectedPlayerList(list?.team_player_id) */}
              <div className="w-[15%] flex justify-center items-center">
                <Checkbox
                  checked={list?.checked}
                  className="checkBoxCircle mr-2"
                />
              </div>

              <div className="flex  items-center w-[70%]">
                <Image
                  src={samplePlayer}
                  alt="samplePlayer"
                  width={30}
                  height={30}
                  className="mx-2"
                />
                <div className="text-sm font-light text-[#06C] pl-2">
                  {`${list?.first_name ? list?.first_name : ""} ${
                    list?.middle_name ? list?.middle_name : ""
                  } ${list?.last_name ? list?.last_name : ""}`}
                </div>
              </div>
              <div className="w-[15%] flex justify-center items-center">
                {selectedPlayerList === list?.team_player_id && (
                  <Image
                    src={SubstitutionArrowUp}
                    alt="team"
                    width={22}
                    height={22}
                    className="rounded-[50%]  "
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-[100%] items-center justify-end mt-4 mb-3">
        <button
          onClick={() => handleCancelSubstitution()}
          className="w-[140px] py-1.5 text-base font-semibold flex justify-center items-center border-2 border-[#4285F4] text-[#4285F4] rounded-[4px] mr-5"
        >
          Cancel
        </button>
        <button
          onClick={() =>
            substitutionReason &&
            selectedPlayerList &&
            handleCancelSubstitution()
          }
          className={`w-[160px] py-2 text-base font-semibold flex justify-center items-center  bg-[#4285F4] text-white rounded-[4px] ${
            substitutionReason && selectedPlayerList
              ? "cursor-pointer"
              : "cursor-not-allowed"
          }`}
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default SubstitutionModal;
