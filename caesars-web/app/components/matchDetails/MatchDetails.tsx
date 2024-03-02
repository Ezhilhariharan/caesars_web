'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// icons
import ground from '../../assets/ground.svg';

// libs
import dateConverter from '@/app/lib/dateConverter';

// custom hooks
import { useSporsTabs } from '@/app/hooks/useSporsTabs';

// API fetchers
import { get, post } from '@/app/apiIntegrations/fetcher';

// components
import { Button } from '../Button';
import CardContainer from '../global/cardContainer/CardContainer';
import sendIcon from '../../assets/send.svg';
import ProgressBar from '../global/progressBar/ProgressBar';
import MatchCardExtentedTask from '../global/matchCard/MatchCardExtentedTask';
import MatchStatusCard from '../global/MatchStatusCard';
import Avatar from '../global/Avatar';
import MatchDetailsTaskCard from './MatchDetailsTaskCard';
import CommmentCard from './CommmentCard';

// antd
import { Modal } from 'antd';
import LoadingComponent from '../global/LoadingComponent';

type MatchDetailsProp = {
  match: any;
  id: any;
  open: boolean;
  setModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  percentage?: any;
  title?: any;
};

// global variablew
let interval: any = null;
let key: string = '';

const initialTabs = [
  {
    id: 1,
    sport: 'mlb',
    tabs: [],
  },
  {
    id: 2,
    sport: 'nfl',
    tabs: [],
  },
  {
    id: 3,
    sport: 'cfb',
    tabs: [],
  },
  {
    id: 4,
    sport: 'nba',
    tabs: [],
  },
  {
    id: 5,
    sport: 'cbb',
    tabs: [],
  },
  {
    id: 6,
    sport: 'nhl',
    tabs: [],
  },
];

export default function MatchDetails({
  match,
  id,
  open,
  setModelOpen,
  percentage,
  title,
}: MatchDetailsProp) {
  const router = useRouter();
  const [user, setUser] = useState<any>({});
  const [matchDetails, setMatchDetails] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [diffday, setDiffday] = useState<any>(0);
  const [activities, setActivities] = useState<any[]>([]);
  const [comment, setComment] = useState('');
  const [tasks, setTasks] = useState();
  const [sportsTab, setSportsTab] = useSporsTabs('mlb', []);

  useEffect(() => {
    setUser(getUserFromLocalstorage());
  }, []);

  useEffect(() => {
    if (open) {
      if (id) loadMatch(id);
      if (id) loadActivities(id);
      if (id) loadTaskList(id);
      if (user) {
        interval = setInterval(() => {
          if (id) loadActivities(id);
        }, 3000);
      }
    } else {
      if (interval) clearInterval(interval);
    }
  }, [open]);

  function getUserFromLocalstorage() {
    const userString = localStorage.getItem('user');
    if (!userString) return {};
    return JSON.parse(userString);
  }

  const matchStartAt = dateConverter(
    matchDetails?.data?.data[0]?.fixture_start_at
  );
  const createdAt = dateConverter(activities[0]?.created_at);
  const dueDate = dateConverter(activities[0]?.due_date);
  // const matchdate= dateConverter()
  const lastModified = dateConverter(matchDetails?.data?.data[0].last_modified);

  async function loadActivities(id: any) {
    try {
      const res = await get(`notification/activities?matchId=${id}`);
      setActivities(res.response.data);
    } catch (e) {
      console.warn(e);
    }
  }

  async function loadMatch(mid: any) {
    setLoading(true);
    try {
      const res = await get(`match-details/${mid}`);
      setMatchDetails(res);
      setLoading(false);
    } catch (e) {
      console.warn(e);
      setLoading(false);
    }
  }

  useEffect(() => {
    const date1 = new Date(matchDetails?.data?.data[0]?.fixture_start_at);
    const date2 = new Date();
    const diffTime = Math.abs((date2 as any) - (date1 as any));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDiffday(diffDays);
  }, [matchDetails]);

  function addComment() {
    if (comment !== '') {
      try {
        const sendComment = post(`/notification/comment`, {
          matchId: id,
          msg: comment,
        });
        setComment('');
      } catch (e) {
        console.warn(e);
      }
    } else {
      console.warn('');
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

  return (
    <div>
      <Modal
        width={'90%'}
        title={'Match Details'}
        centered
        footer={[]}
        open={open}
        bodyStyle={{
          maxHeight: '90%',
          overflow: 'hidden',
          background: '#FBFBFB',
        }}
        onOk={() => setModelOpen(false)}
        onCancel={() => {
          setComment('');
          clearInterval(interval);
          setModelOpen(false);
        }}
      >
        {loading && (
          <div className='min-h-full'>
            <LoadingComponent text='Loading' />
          </div>
        )}
        {!loading && (
          <div className='overflow-hidden'>
            <div className='flex border-b bg-white border-[#ebebeb] pb-[5px]'>
              <div style={{ color: '#A6A6A6', fontSize: '14px' }}>
                Home / Tasks /
              </div>
              <div style={{ marginLeft: 6, color: '#212121' }}>
                {matchDetails?.data?.data[0]?.team1_name}{' '}
                {matchDetails?.data?.data[0]?.team2_name && 'vs '}
                {matchDetails?.data?.data[0]?.team2_name}
              </div>
            </div>
            <div className='max-h-[90%] max-[1600px]:h-[700px] px-5 overflow-y-scroll'>
              <div className='flex py-3 gap-10'>
                <div className='w-1/2 bg-white flex-1'>
                  <Image
                    src={ground}
                    alt={'ground'}
                    className='h-[200px] w-full object-cover rounded-[4px]'
                  />
                  <div className='flex items-center justify-center my-5 m-[10px]'>
                    <Avatar
                      image={matchDetails?.data?.data[0]?.team1_logo}
                      name={matchDetails?.data?.data[0]?.team1_name}
                      width={50}
                      height={50}
                    />
                    <p className='px-5 font-semibold'>vs</p>
                    <Avatar
                      image={matchDetails?.data?.data[0]?.team2_logo}
                      name={matchDetails?.data?.data[0]?.team2_name}
                      width={50}
                      height={50}
                    />
                  </div>
                  <div className=''>
                    <div className='ml-2.5 text-[#141522] text-2xl font-medium'>
                      {matchDetails?.data?.data[0]?.team1_name}{' '}
                      {matchDetails?.data?.data[0]?.team2_name && 'vs '}
                      {matchDetails?.data?.data[0]?.team2_name}
                    </div>
                    <div className='flex mt-2.5'>
                      <div className='ml-2.5 text-[#54577A] text-xs border-r border-[#ccc] pr-5'>
                        {
                          (matchDetails?.data?.data[0] &&
                            matchDetails?.data?.data[0]?.location_name,
                          matchDetails?.data?.data[0]?.city_name,
                          matchDetails?.data?.data[0]?.country_short_name)
                        }
                      </div>
                      <div
                        style={{
                          marginLeft: 10,
                          color: '#04A4F4',
                          fontSize: 12,
                        }}
                      >
                        {matchDetails?.data?.data[0] &&
                          `${matchStartAt.date}  ${matchStartAt.monthInString}
                      ${matchStartAt.year}`}
                      </div>
                    </div>
                    <div className='ml-2.5 mt-2 text-[#FF6C37] text-sm'>
                      {diffday} Day
                    </div>
                  </div>
                  <div className='flex gap-5 mt-2.5 ml-2.5'>
                    <div className='w-1/2 mb-5'>
                      <div className='flex justify-between mb-2'>
                        <p>Progress</p>
                        <p>
                          {matchDetails?.data?.data[0]
                            ?.match_assignments_overall_task_progress || 0}
                          %
                        </p>
                      </div>
                      <div className='mx-1'>
                        <ProgressBar
                          percentage={
                            matchDetails?.data?.data[0]
                              ?.match_assignments_overall_task_progress || 0
                          }
                        />
                      </div>
                    </div>
                    <div className='ml-2.5 flex-1'>
                      <Button
                        style={{ width: 250 }}
                        label='Go to Match'
                        primary
                        size={'small'}
                        onClick={(e) => {
                          clearInterval(interval);
                          // const tabs = localStorage.getItem('tab');
                          let tab: any = {
                            title: match.fixture_name,
                            matchId: id,
                            isPinned: false,
                          };

                          setSportsTab(tab);
                          router.push('/sports/mlb');
                        }}
                      />
                    </div>
                  </div>
                  <div className='w-full'>
                    <CardContainer
                      header='Task Checklist'
                      headerSize='large'
                      style={{
                        padding: '0 0 0 10px',
                      }}
                    >
                      <MatchCardExtentedTask matchId={id} />
                    </CardContainer>
                  </div>
                </div>
                <div className='w-1/2 flex-1'>
                  <div
                    style={{}}
                    className=' bg-white pt-5 overflow-hidden rounded-lg flex flex-col'
                  >
                    <div className='mb-0 px-5 pb-5 border-b'>
                      <MatchStatusCard
                        user={user}
                        create={`${createdAt.date} ${createdAt.monthInString}, ${createdAt.timeString}`}
                        dueDate={
                          user?.user_role_id <= 2
                            ? `${dueDate.date} ${dueDate.monthInString}`
                            : `${matchStartAt.date} ${matchStartAt.monthInString}`
                        }
                        status={activities[0]?.status}
                        style={{ width: '70%' }}
                      />
                    </div>
                    <CardContainer
                      header='History'
                      headerSize='medium'
                      style={{ width: '100%', padding: '20px' }}
                    >
                      <div className='w-full flex items-center justify-between my-3'>
                        <div className='text-sm font-medium text-[#54577A]'>
                          Last Modified Date
                        </div>
                        <div className='text-sm font-semibold'>
                          {lastModified.date} {lastModified.monthInString}{' '}
                          {lastModified.year}
                        </div>
                      </div>
                      {/* <div className='w-full flex items-center justify-between my-3'>
                      <div className='text-sm font-medium text-[#54577A]'>
                        Last Modified by
                      </div>
                      <div className='text-sm font-semibold'>
                        {activities[0]?.notifications.slice(0, -1)[0].first_name}
                        You
                      </div>
                    </div> */}
                    </CardContainer>
                    <div className='bg-[rgba(237,237,237,.4)] border w-full h-[400px] overflow-y-scroll shadow-[linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.03) 100%)]'>
                      {activities[0]?.notifications.map((d: any) => {
                        const { date, monthInString, timeString } =
                          dateConverter(d.triggered_at);

                        return d.event_type === 'COMMENT' ? (
                          <CommmentCard
                            type={d.event_type}
                            name={`${d.first_name} ${d.last_name}`}
                            message={d.message}
                            date={`${monthInString} ${date}`}
                            time={timeString}
                            rowDate={d.triggered_at}
                          />
                        ) : (
                          <MatchDetailsTaskCard
                            type={d.event_type}
                            name={`${d.first_name}`}
                            message={d.message}
                            date={`${monthInString} ${date}`}
                            time={timeString}
                          />
                        );
                      })}
                    </div>
                    <div className=' w-full h-[52px] bg-white my-auto p-5 flex items-center justify-between'>
                      <input
                        type='text'
                        placeholder='Add a Comment'
                        className='h-8 w-full outline-none'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') addComment();
                        }}
                      />
                      <div
                        className={`w-8 h-8 rounded-[5px] flex items-center justify-center cursor-pointer ${
                          comment !== ''
                            ? 'bg-[#4285F4]'
                            : 'bg-[#4285F4] opacity-50'
                        }`}
                        onClick={addComment}
                      >
                        <Image src={sendIcon} alt='' width={20} height={20} />
                      </div>
                    </div>
                  </div>
                  {/* ------------------------------------------------------------- */}
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
