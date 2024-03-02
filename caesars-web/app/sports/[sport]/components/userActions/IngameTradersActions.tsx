type Props = {
  assignedToMe: boolean;
  matchStatus: any;
  matchAssignmentStatus: any;
  selectedTab: string;
  updateMatchStatus: (status: number) => void;
};

const IngameTradersActions = (props: Props) => {
  const {
    assignedToMe,
    matchStatus,
    selectedTab,
    updateMatchStatus,
    matchAssignmentStatus,
  } = props;

  return (
    <>
      {assignedToMe && (
        <div className='flex text-sm font-semibold'>
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
          {/* {matchAssignmentStatus < 8 && (
            <div
              className='m-2.5 bg-[#E0E3E8] text-[#282E38] px-2.5 py-2 rounded-[4px] cursor-pointer'
              onClick={() => updateMatchStatus(10)}
            >
              Suspend the Match
            </div>
          )} */}
          {/* {matchStatus < 7 && (
            <div
              className='m-2.5 bg-[#4285F4] text-[#fff] px-2.5 py-2 rounded-[4px] cursor-pointer'
              onClick={() => updateMatchStatus(7)}
            >
              Start the Match
            </div>
          )} */}
          {/* {matchStatus === 2 && (
            <div
              className='m-2.5 bg-[#F44285] text-[#fff] px-2.5 py-2 rounded-[4px] cursor-pointer'
              onClick={() => updateMatchStatus(8)}
            >
              Stop the Match
            </div>
          )}
          {matchAssignmentStatus === 8 && (
            <div
              className='m-2.5 bg-[#4285F4] text-[#fff] px-2.5 py-2 rounded-[4px] cursor-pointer'
              onClick={() => updateMatchStatus(9)}
            >
              Confirm Data
            </div>
          )}
          {matchAssignmentStatus === 9 && (
            <div className='m-2.5 text-[#34A770] text-base font-semibold px-2.5 py-2 rounded-[4px] cursor-not-allowed'>
              Match Submitted
            </div>
          )} */}
        </div>
      )}{' '}
    </>
  );
};

export default IngameTradersActions;
