import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// icons
import Xmark from '@/app/assets1/custom-icons/Xmark';
import TickMark from '@/app/assets1/custom-icons/TickMark';

// API
import { post } from '@/app/apiIntegrations/fetcher';

// hooks
import { useLocal } from '@/app/hooks/useLocal';
import { useSporsTabs } from '@/app/hooks/useSporsTabs';

//libs
import { getUserFromLocalstorage } from '@/app/lib/localstorageHelpers';

// components
import UpcomingMatchCardHeader from './UpcomingMatchCardHeader';
import CardContainer from '../cardContainer/CardContainer';
import UpcomingMatchMeta from './UpcomingMatchCardMeta';
import UpcomingMatchProgress from './UpcomingMatchCardProgress';
import UpcomingMatchContributors from './UpcomingMatchCardContributors';
import { toastProps } from '../toast/Toast';

// modals
import ApprovalModal from '../../Modals/ApprovalModal';
import RejectModal from '../../Modals/RejectModal';

type MatchCardProps = {
  role: 'admin' | 'user';
  id: number;
  header: {
    team1_image?: string | null;
    team2_image?: string | null;
  };
  match?: any;
  sports: {
    team1_name?: string;
    team2_name?: string;
    location?: {
      name?: string;
      city?: string;
      country?: string;
    };
    image: string;
  };
  progress?: {
    percentage?: number;
    lastModifiedDate?: string;
  };
  contributors?: {
    users?: {
      id: number;
      first_name: string;
      last_name: string;
      middle_name: string;
    }[];
    matchDate?: string;
  };
  loadDatas?: (sport?: any, skip?: any) => void;
  toastPopup?: boolean;
  setToastPopup?: React.Dispatch<React.SetStateAction<boolean>>;
  toastDetails?: toastProps;
  setToastDetails?: React.Dispatch<React.SetStateAction<toastProps>>;
};

const UpcomingMatchCard = (props: MatchCardProps) => {
  const {
    id,
    role,
    header,
    sports,
    progress,
    contributors,
    match,
    loadDatas,
    toastPopup,
    setToastPopup,
    toastDetails,
    setToastDetails,
  } = props;
  const router = useRouter();
  const [matchTabs, setMatchTabs] = useLocal('matchTabs', []);
  const [user, setUser] = useState<any>(null);
  const [toggle, setToggle] = useState<boolean>(false);
  const [approveFlow, setApproveFlow] = useState('');
  const [openApproveFlow, setopenApproveFlow] = useState(false);
  const [sportsTab, setSportsTab] = useSporsTabs('mlb', []);

  let interval = null;

  useEffect(() => {
    setUser(getUserFromLocalstorage());
  }, []);

  async function adminSave(
    match_id: any,
    task_name: any,
    is_approved: boolean,
    message?: string
  ) {
    try {
      const res = await post(`match-assignment-task`, {
        match_id,
        task_name,
        is_approved,
      });
      if (loadDatas) loadDatas();
      //  setToastPopup(true);
      //  setToastDetails({
      //    type: 'success',
      //    title: 'Success',
      //    discription: message,
      //  });
    } catch (e) {
      console.warn(e);
    }
  }

  return (
    <CardContainer
      style={{
        width: '318px',
        height: '420px',
      }}
    >
      <UpcomingMatchCardHeader
        team1_image={header?.team1_image || null}
        team2_image={header?.team2_image || null}
        team1_name={sports?.team1_name || null}
        team2_name={sports?.team2_name || null}
        toggle={toggle}
        setToggle={setToggle}
      />
      {!toggle && (
        <UpcomingMatchMeta
          team1_name={sports?.team1_name}
          team2_name={sports?.team2_name}
          location={sports?.location}
          image={sports?.image}
        />
      )}
      <UpcomingMatchProgress
        percentage={progress?.percentage}
        lastModifiedDate={match?.fixture_start_at}
        matchId={match.id}
        toggle={toggle}
        status={match?.match_status}
        barHeight={10}
        circleWidth={18}
        style={{}}
      />

      <div
        onClick={(e) => {
          if (id)
            setMatchTabs({
              title: match?.fixture_name,
              matchId: id,
            });

          let tab: any = {
            title: match.fixture_name,
            matchId: id,
            isPinned: false,
          };
          setSportsTab(tab);
          router.push('/sports/mlb');
        }}
        className='h-[55px] px-5 cursor-pointer border-y-[3px] border-[#F9F9F9] text-[#54577A] text-sm font-medium flex justify-center items-center'
      >
        View Full Details
      </div>

      {match?.match_status === 3 && (
        <div className='h-[60px] flex items-center justify-center'>
          <div className='w-auto h-[32px] flex items-center justify-center border border-[#34A770] rounded-[4px] mx-10 px-2'>
            <div className='border-2 border-[#34A770] rounded-full p-1'>
              <TickMark color='#34A770' size={10} />
            </div>
            <p className='text-[#34A770] text-sm font-semibold ml-1'>
              Approved and Handed Over
            </p>
          </div>
        </div>
      )}
      {(role === 'admin' && match?.match_status === 2) ||
      (user?.title === 'roster_lead' && match?.match_status === 2) ? (
        <div className='w-full h-[60px] flex justify-between items-center px-14'>
          <div
            className='w-[92px] h-[32px] flex items-center justify-center cursor-pointer'
            onClick={() => {
              setApproveFlow('reject');
              setopenApproveFlow(true);
            }}
          >
            <p className='text-[#F85640] text-sm font-semibold mr-1'>Reject</p>
            <div className='border-2 border-[#F85640] rounded-full'>
              <Xmark color='#F85640' size={18} />
            </div>
          </div>
          <div
            className='w-[100px] h-[32px] flex items-center justify-center border border-[#34A770] rounded-[4px] cursor-pointer py-2.5'
            onClick={() => {
              setApproveFlow('approve');
              setopenApproveFlow(true);
            }}
          >
            <div className='border-2 border-[#34A770] rounded-full p-1'>
              <TickMark color='#34A770' size={10} />
            </div>
            <p className='text-[#34A770] text-sm font-semibold ml-1'>Approve</p>
          </div>
        </div>
      ) : user?.title === 'roster_maker' && match?.match_status === 2 ? (
        <div className='w-full h-[60px] flex items-center justify-between px-5'>
          <div className='text-sm text-[#34A770]'>Submitted</div>
        </div>
      ) : (
        match.match_status !== 3 && (
          <UpcomingMatchContributors
            users={contributors?.users}
            matchDate={contributors?.matchDate}
          />
        )
      )}

      {/* Modals */}
      {/* Approval */}
      <ApprovalModal
        open={approveFlow === 'approve' ? openApproveFlow : false}
        setOpen={setopenApproveFlow}
        team1_image={header.team1_image || ''}
        team2_image={header.team2_image || ''}
        team1_short_name={''}
        team2_short_name={''}
        adminSave={adminSave}
        id={id}
      />

      {/* Rejection */}
      <RejectModal
        open={approveFlow === 'reject' ? openApproveFlow : false}
        setOpen={setopenApproveFlow}
        team1_image={header.team1_image || ''}
        team2_image={header.team2_image || ''}
        team1_short_name={''}
        team2_short_name={''}
        adminSave={adminSave}
        id={id}
        toastPopup={toastPopup}
        setToastPopup={setToastPopup}
        toastDetails={toastDetails}
        setToastDetails={setToastDetails}
      />
    </CardContainer>
  );
};

export default UpcomingMatchCard;
