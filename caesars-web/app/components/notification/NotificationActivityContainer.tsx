'use client';
import React, { useEffect, useState } from 'react';

// icons

// API fetchers
import { get } from '@/app/apiIntegrations/fetcher';

// libs
import dateConverter from '@/app/lib/dateConverter';
import dateDifferenceInDays from '@/app/lib/dateDifferenceInDays';

//components
import NotificationCard from './NotificationCard';
import NotificationTaskCard from './NotificationTaskCard';
import LoadingComponent from '../global/LoadingComponent';
import { useLocal } from '@/app/hooks/useLocal';
import { useSporsTabs } from '@/app/hooks/useSporsTabs';
import { useRouter } from 'next/navigation';

// global variables
const current = new Date();
const todaydate = new Date(current).toDateString();

type NotificationActivityProps = {
  primary?: boolean;
  user: any;
  selectModal: string;
  setSelectModal: React.Dispatch<React.SetStateAction<string>>;
  selectedTab?: { id: number; title: string };
};

export default function NotificationActivityContainer(
  props: NotificationActivityProps
) {
  const { primary, user, selectedTab, selectModal, setSelectModal } = props;

  const router = useRouter();

  const [activites, setActivites] = useState<any[]>([]);
  const [todayActivites, setTodayActivites] = useState<any[]>([]);
  const [earlierActivites, setEarlierActivites] = useState<any[]>([]);
  const [isActivitiesLoading, setIsActivitiesLoading] = useState(false);

  const [matchTabs, setMatchTabs] = useLocal('matchTabs', []);
  const [sportsTab, setSportsTab] = useSporsTabs('mlb', []);

  // load the activities
  useEffect(() => {
    loadActivites();
  }, []);

  // fetch the activities from API
  async function loadActivites() {
    setIsActivitiesLoading(true);
    try {
      const res = await get(`/notification/activities`);
      setActivites(res.response.data);
      setIsActivitiesLoading(false);
      filterData(res.response.data);
    } catch (e) {
      console.warn(e);
    }
  }

  function filterData(data?: any) {
    // const today = data?.forEach((activites: any) => {
    //   const datas = activites?.notifications?.forEach((notification: any) => {
    //     const triggerAt = new Date(notification?.triggered_at).toDateString();
    //     if (triggerAt === todaydate) setTodayActivites(activites);
    //   });
    // });

    // const earlier = data?.forEach((activites: any) => {
    //   const datas = activites?.notifications?.forEach((notification: any) => {
    //     const triggerAt = new Date(notification?.triggered_at).toDateString();
    //     if (triggerAt !== todaydate) setEarlierActivites(activites);
    //   });
    // });

    const today = data?.filter((data: any) => {
      const triggerAt = new Date(
        data?.notifications[data?.notifications?.length - 1]?.triggered_at
      ).toDateString();

      return triggerAt === todaydate;
    });

    // const reversedData = today?.map((data: any) => {
    //   const reversedActivity = data?.notifications?.reverse();
    //   return { ...data, notifications: reversedActivity };
    // });
    setTodayActivites(today);

    const earlier = data?.filter((data: any) => {
      const triggerAt = new Date(
        data?.notifications[data?.notifications?.length - 1]?.triggered_at
      ).toDateString();

      return triggerAt !== todaydate;
    });
    setEarlierActivites(earlier);
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

      {!isActivitiesLoading && (
        <div className='mb-5'>
          <div className='text-base font-medium text-[#54577A] flex items-center justify-between mt-5'>
            Today
          </div>
          <div className=''>
            {!isActivitiesLoading && todayActivites?.length === 0 && (
              <div>No Today Activities</div>
            )}
            {todayActivites.length > 0 &&
              todayActivites?.map((data: any, i: any) => {
                const balanceDate = dateDifferenceInDays(
                  new Date(data?.due_date),
                  current
                );

                return (
                  <div key={i}>
                    <div
                      className={`w-full bg-white mt-3 rounded-[10px]`}
                      key={i}
                    >
                      <div className='border-b p-5'>
                        <NotificationTaskCard
                          data={data}
                          primary={true}
                          user={user}
                          selectModal={selectModal}
                          setSelectModal={setSelectModal}
                          selectedTab={selectedTab}
                          onClick={() => seeMore(data)}
                        />
                      </div>
                      <div className={``}>
                        {data?.notifications
                          ?.slice(0, 2)
                          ?.reverse()
                          ?.map((d: any, i: any) => {
                            const time = dateConverter(d.triggered_at);
                            const triggerAt =
                              `${time.date}` + ' ' + `${time.month}`;
                            return (
                              <div key={i} className='border-b last:border-b-0'>
                                <NotificationCard
                                  id={d.match_id}
                                  image={''}
                                  eventType={d.event_type}
                                  firstName={data.first_name}
                                  lastName={data.last_name}
                                  text={d.message}
                                  triggeredAt={d.triggered_at}
                                />
                              </div>
                            );
                          })}
                        {data?.notifications.length > 3 && (
                          <div
                            className={`w-full h-14 bg-white flex items-center justify-center cursor-pointer text-[#54577A] text-sm font-medium`}
                            onClick={(e) => seeMore(data)}
                          >
                            See More
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
      {!isActivitiesLoading && (
        <div>
          <div className='text-base font-medium text-[#54577A] flex items-center justify-between mt-5'>
            Earlier
          </div>

          <div className=''>
            {!isActivitiesLoading && earlierActivites?.length === 0 && (
              <div>No Earlier Activities</div>
            )}
            {earlierActivites.length > 0 &&
              earlierActivites?.slice(2)?.map((data: any, i: any) => {
                const balanceDate = dateDifferenceInDays(
                  new Date(data?.due_date),
                  current
                );

                return (
                  <div key={'activity' + i}>
                    <div
                      className='w-full bg-white rounded-[10px] mt-3'
                      key={i}
                    >
                      <div className='border-b p-5'>
                        <NotificationTaskCard
                          data={data}
                          primary={true}
                          user={user}
                          selectModal={selectModal}
                          setSelectModal={setSelectModal}
                          selectedTab={selectedTab}
                          onClick={() => seeMore(data)}
                        />
                      </div>
                      <div className={``}>
                        {data?.notifications
                          .slice(0, 2)
                          ?.map((d: any, i: any) => {
                            const time = dateConverter(d.triggered_at);
                            const triggerAt =
                              `${time.date}` + ' ' + `${time.month}`;
                            return (
                              <div key={i} className='border-b last:border-b-0'>
                                <NotificationCard
                                  id={d.match_id}
                                  image={''}
                                  eventType={d.event_type}
                                  firstName={data.first_name}
                                  lastName={data.last_name}
                                  text={d.message}
                                  triggeredAt={d.triggered_at}
                                />
                              </div>
                            );
                          })}
                        {data?.notifications.length > 3 && (
                          <div
                            className={`w-full h-14 bg-white flex items-center justify-center cursor-pointer text-[#54577A] text-sm font-medium`}
                            onClick={(e) => seeMore(data)}
                          >
                            See More
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
}
