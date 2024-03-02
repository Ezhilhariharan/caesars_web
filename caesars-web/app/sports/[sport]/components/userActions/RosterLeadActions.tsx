import Image from 'next/image';
import cancelIcon from '../cancel.svg';

const RosterLeadActions = ({
  matchStatus,
  clickToApprove,
  clickToReject,
}: {
  matchStatus: any;
  clickToApprove: () => void;
  clickToReject: () => void;
}) => {
  return (
    <div className='pr-6'>
      {matchStatus < 2 && (
        <button
          onClick={clickToApprove}
          className='w-[100px] py-1.5 rounded-[4px] bg-[#4285F4] text-sm font-normal text-white'
        >
          Handover
        </button>
      )}

      {matchStatus === 2 && (
        <div className='flex'>
          <button className='mr-2.5' onClick={clickToReject}>
            <Image src={cancelIcon} alt={'cancel'} />
          </button>
          <button
            onClick={clickToApprove}
            className='w-[200px] py-1.5 rounded-[4px] bg-[#4285F4] text-sm font-normal text-white'
          >
            Approve and Handover
          </button>
        </div>
      )}
      {matchStatus === 3 && (
        <div style={{ color: 'green' }}>Approved and Handed Over</div>
      )}
    </div>
  );
};
export default RosterLeadActions;
