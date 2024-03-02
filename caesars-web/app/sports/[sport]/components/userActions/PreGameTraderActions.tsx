import React from "react";
import { Tooltip } from "antd";

type PreGameTraderActionsProps = {
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
  updateMatchStatus: (status: number) => void;
  submitMatch: () => void;
  approving?: any;
};

export default function PreGameTraderActions(props: PreGameTraderActionsProps) {
  const { updateMatchStatus, matchStatus, submitMatch, approving } = props;

  return (
    <>
      {matchStatus > 3 && matchStatus < 6 && (
        <>
          {approving ? (
            <button
              className={`w-[150px] py-1.5 rounded-[4px] bg-[#4285F4] text-sm font-normal text-white`}
              onClick={(e) => {
                submitMatch();
              }}
            >
              Submit the match
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
                Submit the match
              </button>
            </Tooltip>
          )}
        </>
      )}
      {matchStatus >= 6 && (
        <button
          className={`w-[120px] py-1.5 rounded-[4px] text-[#34A770] text-base font-semibold`}
        >
          Submitted
        </button>
      )}
    </>
  );
}
