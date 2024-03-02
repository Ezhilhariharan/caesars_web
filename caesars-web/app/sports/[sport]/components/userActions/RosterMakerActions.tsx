import { Tooltip } from "antd";
import { useEffect, useState } from "react";

type Props = {
  matchId: any;
  matchStatus: any;
  selectedTab: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
  isSubmitted: boolean;
  showSave: boolean;
  showSubmit: boolean;
  setSelectModal: React.Dispatch<React.SetStateAction<string>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  allowToContinue: boolean;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  adminSave?: (
    match_id: any,
    task_name: any,
    is_approved: boolean,
    comment: string,
    message?: string
  ) => void;
  save?: (match_id: any, task_name: any, message?: string) => void;
  user: any;
  approving?: any;
};

const RosterMakerActions = (props: Props) => {
  const {
    matchId,
    matchStatus,
    selectedTab,
    setSelectedTab,
    isSubmitted,
    showSave,
    showSubmit,
    setSelectModal,
    setIsModalOpen,
    allowToContinue,
    loading,
    setLoading,
    adminSave,
    save,
    user,
    approving,
  } = props;

  return (
    <>
      {/* {["line-ups", "ppm"].includes(selectedTab) && !isSubmitted && (
        <button
          onClick={(e) => {
            if (selectedTab === "ppm") {
              setSelectedTab("line-ups");
            }
            if (selectedTab === "line-ups") {
              setSelectedTab("summary");
            }
          }}
          className="w-[70px] py-1.5 rounded-[4px] bg-[#ccc] text-sm font-normal text-black"
        >
          Back
        </button>
      )}

      {selectedTab === "roster" && (
        <button
          className={`w-[150px] py-1.5 rounded-[4px] bg-[#4285F4] text-sm font-normal text-white`}
          onClick={(e) => {
            setSelectModal("approve");
            setIsModalOpen(true);
            // setLoading(true);
          }}
        >
          Submit for Approval
        </button>
      )} */}

      {selectedTab === "roster" && matchStatus < 2 && (
        <>
          {approving ? (
            <button
              className={`w-[150px] py-1.5 rounded-[4px] bg-[#4285F4] text-sm font-normal text-white`}
              onClick={(e) => {
                setSelectModal("approve");
                setIsModalOpen(true);
              }}
            >
              Submit for Approval
            </button>
          ) : (
            <Tooltip
              placement="top"
              title={
                "Roster Incomplete. Each team must have exactly 26 players."
              }
            >
              <button
                className={`w-[150px] py-1.5 rounded-[4px] bg-[#4285F4] text-sm font-normal text-white cursor-not-allowed`}
              >
                Submit for Approval
              </button>
            </Tooltip>
          )}
        </>
      )}

      {matchStatus === 2 && user?.title === "roster_maker" && (
        <div className="bg-[#34A770] text-sm font-semibold text-white px-4 py-1.5 rounded-[4px]">
          Submitted
        </div>
      )}

      {/* 
      {showSave && !isSubmitted && selectedTab !== "ppm" && (
        <button
          onClick={(e) => {
            if (selectedTab === "summary") {
              if (save)
                save(matchId, "create_roster", "Rosters Created Successfully.");
              setLoading(true);
            }
            if (selectedTab === "line-ups") {
              if (save)
                save(
                  matchId,
                  "create_probable_lineups",
                  "Line-up Updated Successfully."
                );
              setLoading(true);
            }
          }}
          className="w-[70px] py-1.5 rounded-[4px] bg-[#ccc] text-sm font-normal text-black"
        >
          Save
        </button>
      )}

      {showSave && !isSubmitted && (
        <button
          onClick={(e) => {
            if (selectedTab === "summary") {
              if (save)
                save(matchId, "create_roster", "Rosters Created Successfully");
              setSelectedTab("line-ups");
              setLoading(true);
            }
            if (selectedTab === "line-ups") {
              if (save)
                save(
                  matchId,
                  "create_probable_lineups",
                  "Line-up Updated Successfully"
                );
              setSelectedTab("ppm");
              setLoading(true);
            }
          }}
          className={`w-[150px] py-1.5 rounded-[4px] bg-[#4285F4] text-sm font-normal text-white ${
            allowToContinue
              ? "cursor-pointer opacity-none"
              : "cursor-not-allowed opacity-50"
          }`}
        >
          Save and Continue
        </button>
      )} */}
      {/* {isSubmitted && matchStatus === 2 && (
        <div className="bg-[#34A770] text-sm font-semibold text-white px-4 py-1.5 rounded-[4px]">
          Submitted
        </div>
      )} */}
    </>
  );
};

export default RosterMakerActions;
