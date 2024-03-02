import React, { useEffect, useState } from 'react';

// API
import { getMatch } from '@/app/apiIntegrations/apiClients/matches';
import { get, post } from '@/app/apiIntegrations/fetcher';

// components
import MatchDetailsTitle from './MatchDetailsTitle';
import Roster from '@/app/components/roaster/RosterPage';
import MatchTabs from './MatchTabs';
import ProbabilityContainer from '@/app/components/probability/ProbabilityContainer';
import Toast, { toastProps } from '@/app/components/global/toast/Toast';
import StatsContainer from './stats/StatsContainer';
import ConfirmationContainer from './confirmation/ConfirmationContainer';
import SummaryPageContainer from './summary/SummaryPageContainer';

import { Modal, Spin } from 'antd';
import NoAssignmentFound from './NoAssignmentFound';

type Props = {
  matchId: any;
  user: any;
  admin: any;
  SelectedMatches: any;
  selectedTabIndex: React.Dispatch<React.SetStateAction<any>>;
  selectedTab: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
  loadMatches: () => void;
};

export default function RosterManagerMatchView(props: Props) {
  const {
    matchId,
    user,
    admin,
    SelectedMatches,
    selectedTabIndex,
    selectedTab,
    setSelectedTab,
    loadMatches,
  } = props;
  const [loading, setLoading] = useState(false);
  const [match, setMatch] = useState<any>(null);
  const [tasks, setTasks] = useState(null);
  const [allowToContinue, setAllowToContinue] = useState(false);
  const [taskInfo, setTaskInfo] = useState(null);

  const [allow, setAllow] = useState(false);
  const [showTab, setShowTab] = useState({
    ppm: false,
    stats: false,
    confirmation: false,
  });

  const [checkingMatchStatus, setMatchStatus] = useState(false);

  const [toastPopup, setToastPopup] = useState(false);
  const [toastDetails, setToastDetails] = useState<toastProps>({
    type: 'alert',
    title: '',
    discription: '',
    logo: '',
  });

  useEffect(() => {
    if (matchId) {
      loadMatch(matchId);
      loadTaskList(matchId);
    }
  }, [matchId, selectedTab]);

  useEffect(() => {
    setAllow(false);
  }, []);

  useEffect(() => {
    checkToShowTab();
  }, [match]);

  useEffect(() => {
    if (admin) {
      setAllow(true);
    } else if (
      user?.title === 'roster_lead' &&
      match?.match_assignments_status < 3
    ) {
      setAllow(true);
    } else if (
      user?.title === 'roster_lead' &&
      match?.match_assignments_status >= 3
    ) {
      setAllow(false);
    } else if (
      user?.title === 'roster_maker' &&
      match?.match_assignments_status < 2
    ) {
      setAllow(true);
    } else if (
      user?.title === 'roster_maker' &&
      match?.match_assignments_status >= 2
    ) {
      setAllow(false);
    } else if (
      user?.title === 'trading_lead' &&
      match?.m_status >= 0 &&
      match?.m_status < 3
    ) {
      setAllow(true);
    } else if (
      user?.title === 'pre_game_trader' &&
      match?.match_assignments_status > 3 &&
      match?.match_assignments_status < 6
    ) {
      setAllow(true);
    } else if (
      user?.title === 'pre_game_trader' &&
      match?.match_assignments_status <= 3 &&
      match?.match_assignments_status >= 6
    ) {
      setAllow(false);
    } else if (
      user?.title === 'pre_game_trader' &&
      match?.match_assignments_status >= 6
    ) {
      setAllow(false);
    } else if (user?.title === 'in_game_trader' && match?.m_status === 2) {
      setAllow(true);
    } else if (user?.title === 'in_game_trader' && match?.m_status !== 2) {
      setAllow(false);
    }
  }, [match]);

  function checkToShowTab() {
    if (admin) {
      if (match?.match_assignments_status === 4) {
        setShowTab({ ppm: true, stats: false, confirmation: false });
      } else if (match?.match_assignments_status >= 7) {
        setShowTab({ ppm: true, stats: true, confirmation: false });
      } else if (match?.match_assignments_status >= 8)
        setShowTab({ ppm: true, stats: true, confirmation: true });
    } else {
      if (user?.title === 'roster_lead') {
        setShowTab({ ppm: false, stats: false, confirmation: false });
      } else if (user?.title === 'roster_maker') {
        setShowTab({ ppm: false, stats: false, confirmation: false });
      } else if (user?.title === 'trading_lead') {
        if (match?.m_status <= 1)
          setShowTab({ ppm: true, stats: false, confirmation: false });
        else if (match?.m_status > 1 && match?.m_status !== 3)
          setShowTab({ ppm: true, stats: true, confirmation: false });
        else if (match?.m_status >= 3)
          setShowTab({ ppm: true, stats: true, confirmation: true });
      } else if (user?.title === 'pre_game_trader') {
        setShowTab({ ppm: true, stats: false, confirmation: false });
      } else if (user?.title === 'in_game_trader') {
        if (match?.m_status <= 1)
          setShowTab({ ppm: true, stats: false, confirmation: false });
        else if (match?.m_status > 1 && match?.m_status !== 3)
          setShowTab({ ppm: true, stats: true, confirmation: false });
        else if (match?.m_status >= 3)
          setShowTab({ ppm: true, stats: true, confirmation: true });
      }
    }
  }

  useEffect(() => {
    if (toastPopup === true) {
      const timeOut = setTimeout(() => {
        setToastPopup(false);
      }, 2000);
      return () => clearTimeout(timeOut);
    }
  }, [toastPopup]);

  async function loadMatch(id: any) {
    setLoading(true);
    try {
      const res = await getMatch(id);
      if (res) {
        setMatch(res?.data);
        setTaskInfo(res.userInfo);
      } else {
        setMatch(null);
        setTaskInfo(null);
      }
      setLoading(false);
    } catch (e) {
      console.warn(e);
      setLoading(false);
    }
  }

  async function loadTaskList(matchId: any) {
    try {
      const res = await get(`matches/${matchId}/task-list`);
      setTasks(res.data);
    } catch (e) {
      console.warn(e);
    }
  }

  async function save(match_id: any, task_name: any, message?: string) {
    try {
      const res = await post(`match-assignment-task`, { match_id, task_name });

      // alert(message);
      setToastPopup(true);
      setToastDetails({
        type: 'success',
        title: 'Success',
        discription: message,
      });
      loadTaskList(match_id);
      loadMatch(matchId);
    } catch (e) {
      console.warn(e);
    }
  }

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
      setToastPopup(true);
      setToastDetails({
        type: 'success',
        title: 'Success',
        discription: message,
      });
      loadMatch(matchId);
      loadTaskList(match_id);
    } catch (e) {
      console.warn(e);
    }
  }

  async function updateMatchStatus(status: number) {
    try {
      const res = await post(`match-assignment-task`, {
        status,
        match_id: matchId,
        task_name: 'create_roster',
      });
      loadMatch(matchId);
    } catch (e) {
      console.warn(e);
    }
  }

  if (loading) {
    return (
      <div className='w-full h-screen flex items-center justify-center border-b rounded-b-[5px] border-[#E5E7EB] gap-2.5'>
        <Spin size='small' />
        <div className='pr-2 font-medium text-[#6B7280]'>Loading...</div>
      </div>
    );
  }

  return (
    <>
      {match ? (
        <div className='flex flex-1 flex-col overflow-hidden'>
          <Toast
            type={toastDetails.type}
            title={toastDetails.title}
            discription={toastDetails.discription}
            logo={toastDetails.logo}
            toggle={toastPopup}
          />
          <div className='bg-white'>
            <MatchDetailsTitle
              tasks={tasks}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
              sports={'MLB'}
              save={save}
              updateMatchStatus={updateMatchStatus}
              adminSave={adminSave}
              allowToContinue={allowToContinue}
              title={`${match?.team1_name} vs ${match?.team2_name}`}
              match={match}
              loading={loading}
              setLoading={setLoading}
              admin={admin}
              user={user}
              loadMatches={loadMatches}
              checkingMatchStatus={checkingMatchStatus}
            />
          </div>
          <div className='bg-[#F9F9F9]'>
            <MatchTabs
              selectedTab={selectedTab}
              showTab={showTab}
              onTabChange={(e: any) => setSelectedTab(e)}
              match={match}
            />
          </div>
          <div className='px-4 overflow-scroll flex-1'>
            <div className='pt-2.5'>
              {!loading && selectedTab === 'summary' && (
                <SummaryPageContainer
                  match={match}
                  user={user}
                  taskInfo={taskInfo}
                />
              )}

              {!loading && selectedTab === 'roster' && (
                <Roster
                  match={match}
                  user={user}
                  admin={admin}
                  setSelectedTab={setSelectedTab}
                  allow={allow}
                  updateMatchStatus={updateMatchStatus}
                  setMatchStatus={setMatchStatus}
                />
              )}

              {!loading && selectedTab === 'ppm' && (
                <ProbabilityContainer
                  match={match}
                  team1={{
                    id: match?.team1_id,
                    logo: match?.team1_logo_image,
                    name: match?.team1_name,
                    short_name: match?.team1_short_name,
                  }}
                  team2={{
                    id: match?.team2_id,
                    logo: match?.team2_logo_image,
                    name: match?.team2_name,
                    short_name: match?.team2_short_name,
                  }}
                />
              )}

              {!loading && selectedTab === 'stats' && (
                <StatsContainer
                  matchId={match?.id}
                  user={user}
                  homeTeam={{
                    id: match?.team1_id,
                    logo: match?.team1_logo_image,
                    name: match?.team1_name,
                    shortName: match?.team1_short_name,
                  }}
                  awayTeam={{
                    id: match?.team2_id,
                    logo: match?.team2_logo_image,
                    name: match?.team2_name,
                    shortName: match?.team2_short_name,
                  }}
                />
              )}

              {!loading && selectedTab === 'confirmation' && (
                <ConfirmationContainer
                  match={match}
                  matchId={matchId}
                  homeTeam={{
                    id: match?.team1_id,
                    logo: match?.team1_logo_image,
                    name: match?.team1_name,
                    shortName: match?.team1_short_name,
                  }}
                  awayTeam={{
                    id: match?.team2_id,
                    logo: match?.team2_logo_image,
                    name: match?.team2_name,
                    shortName: match?.team2_short_name,
                  }}
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <NoAssignmentFound
          id={matchId}
          user={user}
          match={SelectedMatches}
          toastPopup={toastPopup}
          setToastPopup={setToastPopup}
          toastDetails={toastDetails}
          setToastDetails={setToastDetails}
          loadMatches={() => loadMatch(matchId)}
        />
      )}
    </>
  );
}
