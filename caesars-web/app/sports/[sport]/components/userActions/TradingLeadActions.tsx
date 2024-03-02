import React from 'react';

type PreGameTraderActionsProps = {
  matchId: any;
  matchStatus: any;
  matchAssignmentStatus: any;
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
};

export default function TradingleadActions(props: PreGameTraderActionsProps) {
  const { updateMatchStatus, matchStatus, matchAssignmentStatus } = props;
  return (
    <>
      {' '}
      {matchStatus < 3 && (
        <div
          className='m-2.5 bg-[#E0E3E8] text-[#282E38] px-2.5 py-2 rounded-[4px] cursor-pointer'
          onClick={() => updateMatchStatus(10)}
        >
          Suspend the Match
        </div>
      )}
      {matchStatus === 2 && (
        <div
          className='m-2.5 bg-[#F44285] text-[#fff] px-2.5 py-2 rounded-[4px] cursor-pointer'
          onClick={() => updateMatchStatus(8)}
        >
          Stop the Match
        </div>
      )}
      {matchStatus === 3 && (
        <div className='m-2.5 text-green-600 px-2.5 py-2 rounded-[4px] cursor-pointer text-lg'>
          Final
        </div>
      )}
    </>
  );
}
