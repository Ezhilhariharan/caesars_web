"use client";

import React, { useRef, useState, useEffect } from "react";
import { Checkbox, Popover, Spin } from "antd";
import Image from "next/image";
import DraggableList from "react-draggable-list";

// import {
//   // DragDropContext,
//   Droppable,
//   Draggable,
//   DropResult,
//   // DragDropContextProps,
// } from "react-beautiful-dnd";

// icons
import samplePlayer from "../../assets/samplePlayer.svg";
import rowPlayerExit from "../../assets/rowPlayerExit.svg";
import DragAndDrop from "../../assets/dragAndDrop.svg";
import SubstitutionFlag from "../../assets/substutionFlag.svg";
import SubstitutionArrowDown from "../../assets/substutionArrowDown.svg";
import SubstitutionArrowUp from "../../assets/substutionArrowUp.svg";

//component
import Avatar from "@/app/components/global/Avatar";

type Props = {
  tableList?: any;
  selectedPlayerProfile: (playerID: any, type: any) => void;
  deletePLayer: (playerId: any, teamId: any, teamType: any) => void;
  team: any;
  handleUpdateOrder: (data: any, teamId: any, team: any) => void;
  selectedPlayerDetails: any;
  handleCheckbox: (value: any, data: any, teamType: any, teamId: any) => void;
  allow: boolean;
};

function RosterPlayerTable({
  tableList,
  selectedPlayerProfile,
  deletePLayer,
  team,
  handleUpdateOrder,
  selectedPlayerDetails,
  handleCheckbox,
  allow,
}: Props) {
  const [list, setList] = useState(tableList?.slice(0, 9));

  useEffect(() => {
    setList(tableList?.slice(0, 9));
    // if (team == 1 && tableList?.length > 0) {
    //   selectedPlayerProfile(tableList[0], team);
    // }
  }, [tableList]);

  const tenthList = tableList?.slice(9, 10)[0];

  const containerRef = useRef(null);

  const _onListChange = (newList: any) => {
    if (newList?.length > 0 && allow) {
      const data: any = newList[0];
      const perfectArray = [...newList, ...tableList?.slice(9)];
      handleUpdateOrder(perfectArray, data?.team_id, team);
      setList(newList);
    }
  };

  const Item = ({ item, itemSelected, dragHandleProps }: any) => {
    const { onMouseDown, onTouchStart } = dragHandleProps;
    return (
      <div
        // onClick={() => selectedPlayerProfile(data,team)}
        className={` disable-select w-full flex items-center text-center text-[14px] font-medium text-[#14171C] border-b border-[#E5E7EB] pb-2 cursor-pointer ${
          selectedPlayerDetails?.player_id === item?.player_id
            ? "bg-[#ECF3FE] "
            : "bg-[#FFF] "
        } `}
        style={{
          userSelect: "none",
        }}
      >
        <td className="relative text-center  w-[12%] border-r">
          {item?.is_substitute && (
            <div className="absolute top-1/2 transform -translate-y-1/2">
              <Popover
                trigger="hover"
                placement="leftTop"
                content={
                  <div className="bg-[#1f2937] w-[180px] rounded-[4px]">
                    <div className="flex items-center justify-between py-2 px-1">
                      {/* <Image
                        src={samplePlayer}
                        alt="team"
                        width={25}
                        height={25}
                        className="rounded-[50%]  "
                      /> */}
                      <Avatar
                        name={`${item?.old_f_name} ${item?.old_l_name}`}
                        width={32}
                        height={32}
                        background="rgba(245, 246, 247, 1)"
                        style={{
                          color: "black",
                          fontSize: 8,
                          fontWeight: 400,
                        }}
                      />
                      <div className="font-normal text-[#fff] text-[12px]">
                        {`${item?.old_f_name ? item?.old_f_name : ""} ${
                          item?.old_m_name ? item?.old_m_name : ""
                        } ${item?.old_l_name ? item?.old_l_name : ""}`}
                      </div>
                      <Image
                        src={SubstitutionArrowDown}
                        alt="team"
                        width={18}
                        height={18}
                        className="rounded-[50%]  "
                      />
                    </div>
                    <div className="flex items-center justify-between py-2 px-1">
                      {/* <Image
                        src={samplePlayer}
                        alt="team"
                        width={25}
                        height={25}
                        className="rounded-[50%]  "
                      /> */}
                      <Avatar
                        name={`${item?.new_f_name} ${item?.new_l_name}`}
                        width={32}
                        height={32}
                        background="rgba(245, 246, 247, 1)"
                        style={{
                          color: "black",
                          fontSize: 8,
                          fontWeight: 400,
                        }}
                      />
                      <div className="font-normal text-[#fff] text-[12px]">
                        {`${item?.new_f_name ? item?.new_f_name : ""} ${
                          item?.new_m_name ? item?.new_m_name : ""
                        } ${item?.new_l_name ? item?.new_l_name : ""}`}
                      </div>
                      <Image
                        src={SubstitutionArrowUp}
                        alt="team"
                        width={18}
                        height={18}
                        className="rounded-[50%]  "
                      />
                    </div>
                  </div>
                }
              >
                <Image
                  src={SubstitutionFlag}
                  alt="SubstitutionFlag"
                  width={12}
                  height={12}
                  className=""
                />
              </Popover>
            </div>
          )}
          {item?.r_order}
        </td>
        <td
          className={`text-center  w-[12%] border-r ${
            item?.primary_position == "SP" || item?.primary_position == "DH"
              ? "cursor-pointer"
              : "cursor-not-allowed"
          }`}
        >
          <Checkbox
            checked={item?.is_starting}
            onChange={(e) =>
              handleCheckbox(e.target.checked, item, team, item?.team_id)
            }
            className="cursor-not-allowed"
          />
        </td>
        <td className=" flex items-center justify-between   w-[56%] border-r">
          <div className="flex items-center justify-center w-[25%]">
            <div
              className="disable-select dragHandle"
              onTouchStart={(e) => {
                if (allow) {
                  e.preventDefault();
                  (e.target as any).style.backgroundColor = "blue";
                  document.body.style.overflow = "hidden";
                  onTouchStart(e);
                }
              }}
              onMouseDown={(e) => {
                document.body.style.overflow = "hidden";
                onMouseDown(e);
              }}
              onTouchEnd={(e) => {
                (e.target as any).style.backgroundColor = "black";
                document.body.style.overflow = "visible";
              }}
              onMouseUp={() => {
                document.body.style.overflow = "visible";
              }}
            >
              <Image src={DragAndDrop} alt="DragAnd" width={20} height={20} />
            </div>
          </div>
          <div
            className="flex items-center  w-[75%] "
            onClick={() => selectedPlayerProfile(item, team)}
          >
            <div className="w-[30%]">
              {/* <Image
                src={samplePlayer}
                alt="team"
                width={30}
                height={30}
                className="rounded-[50%] bg-[#E0E3E8] "
              /> */}
              <Avatar
                name={`${item?.first_name} ${item?.last_name}`}
                width={32}
                height={32}
                background="rgba(245, 246, 247, 1)"
                style={{
                  color: "black",
                  fontSize: 8,
                  fontWeight: 400,
                }}
              />
            </div>
            <div
              className={`w-[70%] font-light text-left ellipsisOne${
                selectedPlayerDetails?.player_id === item?.team_player_id
                  ? " text-[#4285F4]"
                  : " text-[#14171C]"
              }`}
            >
              {`${item?.first_name ? item?.first_name : ""} ${
                item?.middle_name ? item?.middle_name : ""
              } ${item?.last_name ? item?.last_name : ""}`}
            </div>
          </div>
        </td>
        <td className=" text-center w-[20%] text-[#3B82F6] ">
          {item?.primary_position}
        </td>
      </div>
    );
  };

  return (
    <div className="px-5 ">
      <table border={1} className="w-full  overflow-hidden rounded-[4px] ">
        <tr className="w-[100%] h-[50px] flex items-center text-center text-[14px] font-medium text-[#6B7280] border-b  border-[#E5E7EB] bg-gray-100 ">
          <td className="text-[#14171C] w-[12%] border-r">Order</td>
          <td className="text-[#14171C] w-[12%] border-r">is Bat</td>
          <td className="text-[#14171C] w-[56%] border-r">Player</td>
          <td className="text-[#14171C] w-[20%]">Position</td>
        </tr>
        <div className="bg-[#ECF3FE] text-[14px] font-normal pl-10 py-2.5">
          <div className="pl-4">Starting Lineup</div>
        </div>
        <div ref={containerRef} style={{ touchAction: "pan-y" }}>
          <DraggableList
            itemKey="r_order"
            template={Item as any}
            list={list}
            onMoveEnd={(newList: any) => {
              if (allow) {
                _onListChange(newList);
              }
            }}
            container={() => containerRef.current}
          />
        </div>
        {tenthList?.hasOwnProperty("team_player_id") && (
          <div
            className={`w-full flex items-center text-center text-[14px] font-medium text-[#14171C] border-b border-[#E5E7EB] py-2 cursor-pointer ${
              selectedPlayerDetails?.player_id === tenthList?.player_id
                ? "bg-[#ECF3FE] "
                : "bg-[#FFF] "
            } `}
          >
            <td className="relative text-center  w-[12%] border-r">
              {tenthList?.is_substitute && (
                <div className="absolute top-1/2 transform -translate-y-1/2">
                  <Popover
                    trigger="hover"
                    placement="leftTop"
                    content={
                      <div className="bg-[#1f2937] w-[180px] rounded-[4px]">
                        <div className="flex items-center justify-between py-2 px-1">
                          {/* <Image
                          src={samplePlayer}
                          alt="team"
                          width={25}
                          height={25}
                          className="rounded-[50%]  "
                        /> */}
                          <Avatar
                            name={`${tenthList?.old_f_name} ${tenthList?.old_l_name}`}
                            width={32}
                            height={32}
                            background="rgba(245, 246, 247, 1)"
                            style={{
                              color: "black",
                              fontSize: 8,
                              fontWeight: 400,
                            }}
                          />
                          <div className="font-normal text-[#fff] text-[12px]">
                            {`${
                              tenthList?.old_f_name ? tenthList?.old_f_name : ""
                            } ${
                              tenthList?.old_m_name ? tenthList?.old_m_name : ""
                            } ${
                              tenthList?.old_l_name ? tenthList?.old_l_name : ""
                            }`}
                          </div>
                          <Image
                            src={SubstitutionArrowDown}
                            alt="team"
                            width={18}
                            height={18}
                            className="rounded-[50%]  "
                          />
                        </div>
                        <div className="flex items-center justify-between py-2 px-1">
                          {/* <Image
                          src={samplePlayer}
                          alt="team"
                          width={25}
                          height={25}
                          className="rounded-[50%]  "
                        /> */}
                          <Avatar
                            name={`${tenthList?.new_f_name} ${tenthList?.new_l_name}`}
                            width={32}
                            height={32}
                            background="rgba(245, 246, 247, 1)"
                            style={{
                              color: "black",
                              fontSize: 8,
                              fontWeight: 400,
                            }}
                          />
                          <div className="font-normal text-[#fff] text-[12px]">
                            {`${
                              tenthList?.new_f_name ? tenthList?.new_f_name : ""
                            } ${
                              tenthList?.new_m_name ? tenthList?.new_m_name : ""
                            } ${
                              tenthList?.new_l_name ? tenthList?.new_l_name : ""
                            }`}
                          </div>
                          <Image
                            src={SubstitutionArrowUp}
                            alt="team"
                            width={18}
                            height={18}
                            className="rounded-[50%]  "
                          />
                        </div>
                      </div>
                    }
                  >
                    <Image
                      src={SubstitutionFlag}
                      alt="SubstitutionFlag"
                      width={12}
                      height={12}
                      className=""
                    />
                  </Popover>
                </div>
              )}
              {tenthList?.r_order}
            </td>
            <td
              className={`text-center  w-[12%] border-r ${
                tenthList?.primary_position == "SP" ||
                tenthList?.primary_position == "DH"
                  ? "cursor-pointer"
                  : "cursor-not-allowed"
              }`}
            >
              <Checkbox
                checked={tenthList?.is_starting}
                onChange={(e) => {
                  if (allow) {
                    handleCheckbox(
                      e.target.checked,
                      tenthList,
                      team,
                      tenthList?.team_id
                    );
                  }
                }}
                className="cursor-not-allowed"
              />
            </td>
            <td className=" flex items-center justify-between   w-[56%] border-r">
              <div
                className="flex items-center  w-[100%] pl-5"
                onClick={() => selectedPlayerProfile(tenthList, team)}
              >
                <div className="w-[30%]">
                  {/* <Image
                  src={samplePlayer}
                  alt="team"
                  width={30}
                  height={30}
                  className="rounded-[50%] bg-[#E0E3E8] "
                /> */}
                  <Avatar
                    name={`${tenthList?.first_name} ${tenthList?.last_name}`}
                    width={32}
                    height={32}
                    background="rgba(245, 246, 247, 1)"
                    style={{
                      color: "black",
                      fontSize: 8,
                      fontWeight: 400,
                    }}
                  />
                </div>
                <div
                  className={`w-[70%] font-light text-left ellipsisOne${
                    selectedPlayerDetails?.player_id ===
                    tenthList?.team_player_id
                      ? " text-[#4285F4]"
                      : " text-[#14171C]"
                  }`}
                >
                  {`${tenthList?.first_name ? tenthList?.first_name : ""} ${
                    tenthList?.middle_name ? tenthList?.middle_name : ""
                  } ${tenthList?.last_name ? tenthList?.last_name : ""}`}
                </div>
              </div>
            </td>
            <td className=" text-center w-[20%] text-[#3B82F6] ">
              {tenthList?.primary_position}
            </td>
          </div>
        )}

        <div className="bg-[#ECF3FE] text-[14px] font-normal pl-10 py-2.5">
          <div className="pl-4">Bench</div>
        </div>
        {tableList?.slice(10)?.map((list: any) => {
          return (
            <div
              className={`  w-full flex items-center text-center text-[14px] font-medium text-[#14171C] border-b border-[#E5E7EB] py-2 cursor-pointer ${
                selectedPlayerDetails?.player_id === list?.player_id
                  ? "bg-[#ECF3FE] "
                  : "bg-[#FFF] "
              } `}
            >
              <td className=" text-center  w-[12%] border-r">
                {list?.r_order}
              </td>
              <td className="flex items-center justify-center w-[12%] border-r">
                <Image
                  src={rowPlayerExit}
                  alt="exit"
                  width={20}
                  height={20}
                  onClick={() =>
                    deletePLayer(list?.roster_id, list?.team_id, team)
                  }
                  className={allow ? `cursor-pointer` : "cursor-not-allowed"}
                />
              </td>
              <td className=" flex items-center justify-center text-center  w-[56%] border-r">
                <div
                  className="flex items-center  w-[100%] "
                  onClick={() => selectedPlayerProfile(list, team)}
                >
                  <div className="w-[30%] flex items-center justify-center">
                    {/* <Image
                      src={samplePlayer}
                      alt="team"
                      width={30}
                      height={30}
                      className="rounded-[50%] bg-[#E0E3E8] "
                    /> */}
                    <Avatar
                      name={`${list?.first_name} ${list?.last_name}`}
                      width={32}
                      height={32}
                      background="rgba(245, 246, 247, 1)"
                      style={{
                        color: "black",
                        fontSize: 8,
                        fontWeight: 400,
                      }}
                    />
                  </div>
                  <div className="w-[70%] text-left ellipsisOne font-light">
                    {`${list?.first_name ? list?.first_name : ""} ${
                      list?.middle_name ? list?.middle_name : ""
                    } ${list?.last_name ? list?.last_name : ""}`}
                  </div>
                </div>
                {/* <div className="flex items-center justify-center w-[15%]">
                  <Image
                    src={rowPlayerExit}
                    alt="exit"
                    width={20}
                    height={20}
                    onClick={() =>
                      deletePLayer(list?.roster_id, list?.team_id, team)
                    }
                    className="cursor-pointer"
                  />
                </div> */}
              </td>
              <td className=" text-center w-[20%] text-[#3B82F6]">
                {list?.primary_position}
              </td>
            </div>
          );
        })}
      </table>
    </div>
  );
}

export default RosterPlayerTable;
