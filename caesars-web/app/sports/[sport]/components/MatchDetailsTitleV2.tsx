import { get } from '@/app/apiIntegrations/fetcher';
import { useEffect, useState } from 'react';
import { message } from 'antd';
export default function MatchDetailsTitle({
  sports,
  title,
  match,
  selectedTab,
  setSelectedTab,
  save,
  adminSave,
  tasks,
  updateMatchStatus,
}: any) {
  const [user, setUser] = useState<any>(null);
  const [matchAssignments, setMatchAssignments] = useState<any>(null);
  const [matchAssignedUsers, setMatchAssignedUsers] = useState<any>(null);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    try {
      //load user from local
      const userString = localStorage.getItem('user');
      if (!userString) {
      } else {
        setUser(JSON.parse(userString));
      }
      // load user matche assignment status
    } catch (e) {
      console.warn(e);
    }
  }, [match]);
  useEffect(() => {
    try {
      loadMatchAssignments();
    } catch (e) {
      console.warn(e);
    }
  }, [match, user]);
  async function loadMatchAssignments() {
    const mres = await get(
      `match-assignments?filters={"match_id":${match?.data?.id}}`
    );
    if (user !== null && mres.data[0]?.id) {
      const mures = await get(
        `match-assigned-users?filters={"user_id":${user.id},"match_assignment_id":${mres.data[0]?.id}}`
      );
      setMatchAssignedUsers(mures.data);
    }
    setMatchAssignments(mres);
  }
  return (
    <div className='flex items-center pr-2 justify-between border-b border-[#EDEDED]'>
      {contextHolder}
      <div className='p-[15px] text-sm'>
        <span style={{ color: '#A6A6A6' }}>{sports} / </span>
        <span style={{ color: '#212121', fontWeight: 500 }}>{title}</span>
      </div>
      <div>{(matchAssignments as any)?.count}</div>
      <div>Match Status:{(matchAssignments as any)?.data[0]?.status}</div>

      <div>
        {(user as any)?.user_role_id === '1' && <RosterAdminsActions />}
        {(user as any)?.user_role_id === '2' && <RosterManagersActions />}
        {(user as any)?.user_role_id === '3' && <IngameManagersActions />}
        {(user as any)?.user_role_id === '4' && (
          <IngameTradersActions
            assignedToMe={!!matchAssignedUsers}
            messageApi={messageApi}
            matchStatus={(matchAssignments as any)?.data[0]?.status}
            updateMatchStatus={updateMatchStatus}
          />
        )}
      </div>
    </div>
  );
}

const RosterAdminsActions = () => {
  return <div>Roster Admin actions </div>;
};
const RosterManagersActions = () => {
  return <div>Roster Managers actions </div>;
};
const IngameManagersActions = () => {
  return <div>ingame Managers actions </div>;
};
const IngameTradersActions = ({
  assignedToMe,
  matchStatus,
  messageApi,
  updateMatchStatus,
}: any) => {
  return (
    <div>
      {assignedToMe && (
        <div style={{ display: 'flex', fontSize: 13, fontWeight: 600 }}>
          <div
            style={{
              margin: 10,
              background: '#E0E3E8',
              color: '#282E38',
              padding: '8px 10px',
              borderRadius: 4,
              cursor: 'pointer',
            }}
          >
            Suspend the match
          </div>
          {[4, 6].includes(matchStatus) && (
            <div
              style={{
                margin: 10,
                background: '#4285F4',
                color: '#fff',
                padding: '8px 10px',
                borderRadius: 4,
                cursor: 'pointer',
              }}
              onClick={async (e) => {
                await updateMatchStatus(5);
                messageApi.success('Match Started');
              }}
            >
              Start the match
            </div>
          )}
          {matchStatus === 5 && (
            <div
              style={{
                margin: 10,
                background: '#4285F4',
                color: '#fff',
                padding: '8px 10px',
                borderRadius: 4,
                cursor: 'pointer',
              }}
              onClick={async (e) => {
                await updateMatchStatus(6);
                messageApi.success('Match Stopped');
              }}
            >
              Stop the match
            </div>
          )}
        </div>
      )}{' '}
    </div>
  );
};
