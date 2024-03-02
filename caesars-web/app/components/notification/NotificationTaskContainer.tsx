'use client';
import React, { useEffect, useState } from 'react';

// icons

// API fetchers
import { get, post } from '@/app/apiIntegrations/fetcher';
import { getMatches } from '@/app/apiIntegrations/apiClients/matches';

// componentes
import Toast, { toastProps } from '../global/toast/Toast';
import NotificationTaskCard from './NotificationTaskCard';
import LoadingComponent from '../global/LoadingComponent';
import { useLocal } from '@/app/hooks/useLocal';
import { useSporsTabs } from '@/app/hooks/useSporsTabs';
import { useRouter } from 'next/navigation';

type Props = {
  user: any;
  selectModal: string;
  setSelectModal: React.Dispatch<React.SetStateAction<string>>;
  statusFilter?: number;
  selectedTab?: {
    id: number;
    title: string;
  };
};

const NotificationTaskContainer = ({
  user,
  selectModal,
  setSelectModal,
  selectedTab,
  statusFilter,
}: Props) => {
  const router = useRouter();
  const [activities, setActivities] = useState<any[]>([]);
  const [isActivitiesLoading, setIsActivitiesLoading] = useState(false);

  const [matchTabs, setMatchTabs] = useLocal('matchTabs', []);
  const [sportsTab, setSportsTab] = useSporsTabs('mlb', []);

  // Handle the toast notification
  const [toastPopup, setToastPopup] = useState(false);
  const [toastDetails, setToastDetails] = useState<toastProps>({
    type: 'error',
    title: '',
    discription: '',
  });

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setToastPopup(false);
    }, 3000);
    return () => clearTimeout(timeOut);
  }, [toastPopup]);

  useEffect(() => {
    if (user && statusFilter) loadActivites(statusFilter);
  }, [statusFilter]);

  async function loadActivites(status: any) {
    setIsActivitiesLoading(true);
    try {
      const res = await get(`/notification/activities?statusId=${status}`);
      setActivities(res.response.data);
      setIsActivitiesLoading(false);
    } catch (e) {
      console.warn(e);
    }
  }

  async function loadMatches(status: any) {
    setIsActivitiesLoading(true);
    try {
      const res = await getMatches({
        query: {
          match_asignment_status: status,
        },
      });
      setActivities(res);
      setIsActivitiesLoading(false);
    } catch (e) {
      console.warn(e);
    }
  }

  async function adminSave(
    match_id: any,
    task_name: any,
    is_approved: boolean,
    comment: string,
    message?: string
  ) {
    try {
      const res = await post(`match-assignment-task`, {
        match_id,
        task_name,
        is_approved,
        comment,
      });
      loadActivites(statusFilter);
      setToastPopup(true);
      setToastDetails({
        type: 'success',
        title: 'Success',
        discription: message,
      });
    } catch (e) {
      console.warn(e);
    }
  }

  const seeMore = (d: any) => {
    setMatchTabs({
      title: d?.team1_name + ' vs ' + d?.team2_name,
      matchId: d?.match_id,
    });

    let tab: any = {
      title: d?.team1_short_name + ' vs ' + d?.team2_short_name,
      matchId: d?.match_id,
      isPinned: false,
    };

    setSportsTab(tab);
    router.push('/sports/mlb');
  };

  return (
    <>
      {isActivitiesLoading && (
        <div>
          <LoadingComponent text='Loading' />
        </div>
      )}
      {!isActivitiesLoading && activities?.length === 0 && (
        <div className='py-10 px-10 text-[#64748b]'>
          No New Notifications Available
        </div>
      )}
      {!isActivitiesLoading && activities?.length > 0 && (
        <div className='py-5'>
          <Toast
            type={toastDetails?.type}
            title={toastDetails?.title}
            discription={toastDetails?.discription}
            toggle={toastPopup}
          />
          {activities?.map((d, i) => {
            return (
              <div className='my-3 p-5 rounded-2xl bg-white' key={'match' + i}>
                <NotificationTaskCard
                  data={d}
                  primary={user?.user_role_id === '3' ? false : true}
                  user={user}
                  selectModal={selectModal}
                  setSelectModal={setSelectModal}
                  selectedTab={selectedTab}
                  adminSave={adminSave}
                  loadActivites={loadActivites}
                  toastPopup={toastPopup}
                  setToastPopup={setToastPopup}
                  toastDetails={toastDetails}
                  setToastDetails={setToastDetails}
                  onClick={() => seeMore(d)}
                />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default NotificationTaskContainer;
