"use client";
import React, { useEffect, useState } from "react";

// API
import { get, post } from "@/app/apiIntegrations/fetcher";

// libs
import dateConverter from "@/app/lib/dateConverter";

// modals
import ApprovalModal from "@/app/components/Modals/ApprovalModal";
import RejectModal from "@/app/components/Modals/RejectModal";

// components
import RosterLeadActions from "./userActions/RosterLeadActions";
import RosterMakerActions from "./userActions/RosterMakerActions";
import PreGameTraderActions from "./userActions/PreGameTraderActions";
import IngameTradersActions from "./userActions/IngameTradersActions";

// antd
import { message } from "antd";
import TradingLeadActions from "./userActions/TradingLeadActions";

type Props = {
  sports: any;
  title: any;
  match: any;
  selectedTab: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
  tasks: any;
  updateMatchStatus: (status: number) => void;
  allowToContinue: boolean;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  user: any;
  admin: any;
  adminSave?: (
    match_id: any,
    task_name: any,
    is_approved: boolean,
    comment: string,
    message?: string
  ) => void;
  save?: (match_id: any, task_name: any, message?: string) => void;
  loadMatches: () => void;
  checkingMatchStatus?: any;
};

export default function MatchDetailsTitle(props: Props) {
  const {
    sports,
    title,
    match,
    selectedTab,
    setSelectedTab,
    save,
    adminSave,
    loading,
    setLoading,
    updateMatchStatus,
    tasks,
    allowToContinue,
    admin,
    user,
    loadMatches,
    checkingMatchStatus,
  } = props;
  const [activities, setActivities] = useState<any>({});
  const [showSave, setShowSave] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const [subimetted, setSubimetted] = useState(false);
  const [selectModal, setSelectModal] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [matchAssignedUsers, setMatchAssignedUsers] = useState<any>(null);
  const [messageApi, contextHolder] = message.useMessage();

  const createdAt = dateConverter(activities?.created_at);
  const updatedAt = dateConverter(
    activities?.notifications?.[activities?.notifications?.length - 1]
      ?.triggered_at
  );
  const lastModified_first =
    activities?.notifications?.[activities?.notifications?.length - 1]
      .first_name;
  const lastModified_last =
    activities?.notifications?.[activities?.notifications?.length - 1]
      .last_name;
  const dueDate = dateConverter(activities?.due_date);

  useEffect(() => {
    if (match?.id) {
      loadMatchAssignments(match.id);
      loadActivites(match.id);
    }
  }, [match]);

  async function loadMatchAssignments(id: any) {
    try {
      const mres = await get(`match-assignments?filters={"match_id":${id}}`);
      if (user !== null && mres.data[0]?.id) {
        const mures = await get(
          `match-assigned-users?filters={"user_id":${user.id},"match_assignment_id":${mres.data[0]?.id}}`
        );
        setMatchAssignedUsers(mures.data);
      }
    } catch (e) {
      console.warn(e);
    }
  }

  useEffect(() => {
    if (tasks) {
      setShowSave(false);
      setShowSubmit(false);
      setSubimetted(false);
      if (selectedTab == "summary") setShowSave(true);
      if (selectedTab === "line-ups") {
        // check for create roster
        const dr = tasks.filter((d: any) => d.name === "create_roster");
        if (dr.length > 0 && dr[0].status === 1) setShowSave(true);
      }
      if (selectedTab === "ppm") {
        // check for check line-up
        const dr = tasks.filter(
          (d: any) => d.name === "create_probable_lineups"
        );
        if (dr.length > 0 && dr[0].status === 1) setShowSubmit(true);
      }

      if (tasks) {
        const dr1 = tasks.filter(
          (d: any) => d.name === "create_player_props_markets"
        );

        if (
          dr1.length > 0 &&
          dr1[0].status === 1 &&
          match?.match_assignments_status !== 1
        ) {
          setShowSubmit(false);
          setSubimetted(true);
        }
      }
    }
  }, [selectedTab, tasks]);

  async function loadActivites(id: any) {
    if (id)
      try {
        const res = await get(`/notification/activities?matchId=${id}`);
        setActivities(res.response.data[0]);
      } catch (e) {
        console.warn(e);
      }
  }

  // const submitApproval = async () => {
  //   const body = {
  //     match_id: match?.id,
  //     task_name: "create_roster",
  // is_approved: true,
  //   };
  //   try {
  //     const res = await post(`match-assignment-task/`, body);
  //     loadMatches();
  //   } catch (e) {
  //     console.warn(e);
  //   }
  // };

  return (
    <>
      <div className='flex items-center pr-2 justify-between border-b border-[#EDEDED]'>
        {contextHolder}
        <div className='w-1/3 p-[15px] text-sm'>
          <span style={{ color: '#A6A6A6' }}>{sports} / </span>
          <span style={{ color: '#212121', fontWeight: 500 }}>{title}</span>
        </div>
        <div className='flex items-center gap-5 text-sm font-semibold'>
          {(admin || user?.title === 'roster_lead') && (
            <RosterLeadActions
              matchStatus={match?.match_assignments_status}
              clickToApprove={() => {
                setSelectModal?.('approve');
                setIsModalOpen(true);
              }}
              clickToReject={() => {
                setSelectModal?.('reject');
                setIsModalOpen(true);
              }}
            />
          )}

          {(admin || user?.title === 'roster_maker') && (
            <RosterMakerActions
              matchId={match?.id}
              matchStatus={match?.match_assignments_status}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
              setSelectModal={setSelectModal}
              setIsModalOpen={setIsModalOpen}
              showSave={showSave}
              isSubmitted={subimetted}
              showSubmit={showSubmit}
              adminSave={adminSave}
              save={save}
              allowToContinue={allowToContinue}
              loading={loading}
              setLoading={setLoading}
              user={user}
              approving={checkingMatchStatus}
            />
          )}

          {/* {(admin || user?.title === 'trading_lead') && (
            <TradingLeadActions
              matchId={match?.id}
              matchStatus={match?.m_status}
              matchAssignmentStatus={match?.match_assignments_status}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
              setSelectModal={setSelectModal}
              setIsModalOpen={setIsModalOpen}
              showSave={showSave}
              isSubmitted={subimetted}
              showSubmit={showSubmit}
              adminSave={adminSave}
              save={save}
              allowToContinue={allowToContinue}
              loading={loading}
              setLoading={setLoading}
              updateMatchStatus={updateMatchStatus}
            />
          )} */}

          {(admin || user?.title === 'pre_game_trader') && (
            <PreGameTraderActions
              matchId={match?.id}
              matchStatus={match?.match_assignments_status}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
              setSelectModal={setSelectModal}
              setIsModalOpen={setIsModalOpen}
              showSave={showSave}
              isSubmitted={subimetted}
              showSubmit={showSubmit}
              adminSave={adminSave}
              save={save}
              allowToContinue={allowToContinue}
              loading={loading}
              setLoading={setLoading}
              updateMatchStatus={updateMatchStatus}
              submitMatch={() => {
                setSelectModal?.('approve');
                setIsModalOpen(true);
              }}
              approving={checkingMatchStatus}
            />
          )}

          {/* {(admin || user?.title === 'in_game_trader') && (
            <IngameTradersActions
              assignedToMe={!!matchAssignedUsers}
              // messageApi={messageApi}
              matchStatus={match?.m_status}
              matchAssignmentStatus={match?.match_assignments_status}
              selectedTab={selectedTab}
              updateMatchStatus={updateMatchStatus}
            />
          )} */}
        </div>
      </div>
      {selectModal === 'approve' && (
        <ApprovalModal
          id={match?.id}
          open={isModalOpen}
          setOpen={setIsModalOpen}
          team1_image={match?.team1_logo_image}
          team1_short_name={match?.team1_short_name}
          team2_image={match?.team2_logo_image}
          team2_short_name={match?.team2_short_name}
          adminSave={adminSave}
          status={match?.match_assignments_status}
          save={save}
          updateMatchStatus={updateMatchStatus}
        />
      )}
      {selectModal === 'reject' && (
        <RejectModal
          id={match?.id}
          adminSave={adminSave}
          open={isModalOpen}
          setOpen={setIsModalOpen}
          user={user}
          team1_image={match?.team1_logo_image}
          team1_short_name={match?.team1_short_name}
          team2_image={match?.team2_logo_image}
          team2_short_name={match?.team2_short_name}
        />
      )}
    </>
  );
}
