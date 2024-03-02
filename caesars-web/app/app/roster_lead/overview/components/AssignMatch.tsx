import React, { useEffect, useState } from 'react';
import Image from 'next/image';

// css
import './AssignMatch.css';

// icons
import editIcon from '../../../../assets/icons/edit.svg';
import MLB from '../../../../assets/icons/sports-icon/mlb.svg';
import plusCircle from '../../assets/plus-circle.svg';
import UserPlus from '@/app/assets1/custom-icons/UserPlus';

// Api fetchers
import { get, post } from '@/app/apiIntegrations/fetcher';
import { getMatchesShort } from '@/app/apiIntegrations/apiClients/matches';

// libs
import dateConverter from '@/app/lib/dateConverter';

// interfaces
import { toastProps } from '@/app/components/global/toast/Toast';

// components
import Avatar from '@/app/components/global/Avatar';
import SearchBar from '@/app/components/global/SearchBar';

//antd
import { Dropdown } from 'antd';
import { DatePicker } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { RangePickerProps } from 'antd/es/date-picker';

import dayjs from 'dayjs';

type Props = {
  match?: any;
  user?: any;
  loadMatch?: (skip?: any) => void;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  toastPopup?: boolean;
  setToastPopup?: React.Dispatch<React.SetStateAction<boolean>>;
  toastDetails?: toastProps;
  setToastDetails?: React.Dispatch<React.SetStateAction<toastProps>>;
};

// global variable
const current = new Date();
let count: any = null;
let page = 0;

const AssignMatch = (props: Props) => {
  const {
    match,
    user,
    toastPopup,
    setToastPopup,
    toastDetails,
    setToastDetails,
    open,
    setOpen,
    loadMatch,
  } = props;
  const [sports, setSports] = useState([]);
  const [matches, setMatches] = useState([]);
  const [selectedSport, setSelectedSport] = useState<any>(null);
  const [selectedMatch, setSelectedMatch] = useState<any>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [dueDate, setDueDate] = useState<any>(null);
  const [dueDateBinder, setDueDateBinder] = useState<any>(null);
  const [members, setMembers] = useState([]);
  const [matchSkip, setmatchSkip] = useState(0);
  const [searchKey, setSearchKey] = useState('');

  const sportsName: any = { Baseball: 'Major League Baseball' };
  useEffect(() => {
    loadSports();
    loadMatches();
    loadMembers(5, 0);
  }, []);

  useEffect(() => {
    loadMembers(5, 0);
  }, [searchKey]);

  // load all sports from API
  async function loadSports() {
    try {
      const res = await get('/sports');
      setSports(res.data);
    } catch (e) {
      console.warn(e);
    }
  }

  // load all matches from API
  async function loadMatches(limit = 10, skip = 0) {
    try {
      const res = await getMatchesShort({
        limit,
        skip,
        query: {
          status: 0,
          start_date: dateConverter(new Date()).dateString,
          unasigned: true,
        },
      });
      setMatches(res.data);
      count = res.count / 10;
    } catch (e) {
      console.warn(e);
    }
  }

  // const disabledDate: RangePickerProps['disabledDate'] = (current) => {
  //   // Can not select days before today and today
  //   return current && current <= dayjs().add(-1, 'day').endOf('day');
  // };

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Can not select days after today and before start Date
    const end = dayjs((matches[selectedMatch] as any)?.fixture_start_at);
    return current <= end || current >= dayjs();
  };

  // load members from API based on search
  async function loadMembers(limit: number, skip: number) {
    try {
      let qpm = [];
      if (limit) qpm.push(`limit=${limit}`);
      if (skip !== null && skip !== undefined) qpm.push(`skip=${skip}`);
      if (searchKey) qpm.push(`search=${searchKey}`);

      let qpmString = '';
      if (qpm.length > 0) {
        qpmString = '?' + qpm.join('&');
      }

      const res = await get(`/members${qpmString}`);

      setMembers(res.data);
    } catch (e) {
      console.warn(e);
    }
  }

  const handleAssignMatch = async () => {
    if (!match && selectedSport === null) {
      if (setToastPopup) setToastPopup(true);
      if (setToastDetails)
        setToastDetails({
          type: 'alert',
          title: 'Alert',
          discription: 'Select the league',
        });
      return;
    }

    if (!match && selectedSport !== null && selectedMatch === null) {
      if (setToastPopup) setToastPopup(true);
      if (setToastDetails)
        setToastDetails({
          type: 'alert',
          title: 'Alert',
          discription: 'Select the Match',
        });
      return null;
    }

    if (!user && selectedUser === null) {
      if (setToastPopup) setToastPopup(true);
      if (setToastDetails)
        setToastDetails({
          type: 'alert',
          title: 'Alert',
          discription: 'Select the User',
        });
      return;
    }

    if (dueDate === null) {
      if (setToastPopup) setToastPopup(true);
      if (setToastDetails)
        setToastDetails({
          type: 'alert',
          title: 'Alert',
          discription: 'Select the Due Date',
        });
      return;
    }

    let selectedMatchId = null;
    let selectedFixtureName = null;
    let selectedUserId = null;
    let selectedDuedate = null;

    let matchDate = match
      ? dateConverter(match.fixture_start_at).dateString
      : dateConverter((matches[selectedMatch] as any).fixture_start_at)
          .dateString;
    let _dueDate = dateConverter(dueDate).dateString;
    let _matchDate = dateConverter(matchDate).dateString;
    let _today = dateConverter(current).dateString;

    try {
      if (
        !user &&
        !match &&
        selectedMatch !== null &&
        selectedSport !== null &&
        selectedUser !== null &&
        dueDate !== null
      ) {
        selectedMatchId = (matches[selectedMatch] as any).id;
        selectedFixtureName = (matches[selectedMatch] as any).fixture_name;
        selectedUserId = (selectedUser as any).id;

        if (
          _dueDate <= _matchDate &&
          _dueDate >= dateConverter(current).dateString
        ) {
          selectedDuedate = dueDate;
        } else {
          if (setToastPopup) setToastPopup(true);
          if (setToastDetails)
            setToastDetails({
              type: 'alert',
              title: 'Alert',
              discription: 'Invalid Date Range',
            });
        }
      }

      if (!user && match && selectedUser !== null && dueDate !== null) {
        selectedMatchId = match.id;
        selectedFixtureName = match.fixture_name;
        selectedUserId = (selectedUser as any).id;

        if (_dueDate < _matchDate && _dueDate >= _today)
          selectedDuedate = dueDate;
        else {
          if (setToastPopup) setToastPopup(true);
          if (setToastDetails)
            setToastDetails({
              type: 'alert',
              title: 'Alert',
              discription: 'Invalid Date Range',
            });
        }
      }

      if (user) {
        selectedMatchId = (matches[selectedMatch] as any).id;
        selectedFixtureName = (matches[selectedMatch] as any).fixture_name;
        selectedUserId = user?.id;
        if (_dueDate < _matchDate && _dueDate >= _today)
          selectedDuedate = dueDate;
        else {
          if (setToastPopup) setToastPopup(true);
          if (setToastDetails)
            setToastDetails({
              type: 'alert',
              title: 'Alert',
              discription: 'Invalid Date Range',
            });
        }
      }

      if (
        selectedMatchId !== null &&
        selectedFixtureName !== null &&
        selectedUserId !== null &&
        selectedDuedate !== null
      ) {
        const assign = await post('/match-assignment/', {
          match_id: selectedMatchId,
          fixtureName: selectedFixtureName,
          user_id: selectedUserId,
          due_date: dueDate,
        });

        setToastPopup?.(true);
        setToastDetails?.({
          type: 'success',
          title: 'Success',
          discription: 'Match Assigned Successfully',
        });
        loadMatches(10, 0);
        if (loadMatch) loadMatch();
        setSelectedMatch(null);
        setSelectedSport(null);
        setSelectedUser(null);
        setDueDate(null);
        setDueDateBinder(null);
        if (setOpen) setOpen(false);
      }
    } catch (e) {
      console.warn(e);
    }
  };
  return (
    <div className='py-8 px-5 bg-white rounded-[10px] '>
      <div className='pl-2 flex mb-5'>
        <div>
          <Image src={editIcon} alt='logo' />
        </div>
        <div className='text-base text-[#14171C] p-2.5'>Assign a Match</div>
      </div>

      {!match && (
        <Dropdown
          menu={{
            items: sports?.map((s: any, i: number) => {
              return {
                label: (
                  <div
                    className='flex'
                    onClick={(e) => {
                      setSelectedSport(i);
                    }}
                  >
                    <div>
                      <Image src={MLB} alt='mlb' />
                    </div>
                    <div className='flex items-center ml-2.5'>
                      {sportsName[s.name] || s.name}
                    </div>
                  </div>
                ),
                key: i,
              };
            }),
          }}
          trigger={['click']}
        >
          <div className='text-sm font-normal border-b border-[#ccc] px-2 h-[45px] w-full flex text-[#B6B6B6] cursor-pointer'>
            {!match && selectedSport === null && (
              <div className='flex-1 text-[#B6B6B6] pt-2.5'>
                Select the league
              </div>
            )}

            {!match && selectedSport !== null && (
              <div className='flex flex-1 text-[#666] items-center'>
                <div>
                  <Image src={MLB} alt='mlb' />
                </div>
                <div className='flex items-center ml-2.5'>
                  {sportsName[(sports[selectedSport] as any).name]}
                </div>
              </div>
            )}
            <DownOutlined />
          </div>
        </Dropdown>
      )}
      {match && (
        <div className='text-sm font-normal border-b border-[#ccc] px-2 h-[45px] w-full flex items-center justify-between text-[#B6B6B6] cursor-not-allowed'>
          <div className='flex  text-[#666]'>
            <div>
              <Image src={MLB} alt='mlb' />
            </div>
            <div className='flex items-center ml-2.5'>
              {sportsName[match.sports_name]}
            </div>
          </div>
          <DownOutlined />
        </div>
      )}
      {!match && (
        <Dropdown
          menu={{
            items: matches?.map((m: any, i: number) => ({
              label: (
                <div
                  className='flex items-center justify-between'
                  onClick={(e) => {
                    setSelectedMatch(i);
                  }}
                >
                  <p>{m?.fixture_name}</p>

                  <p className='text-sm font-normal text-[#B6B6B6]'>
                    {dateConverter(m.fixture_start_at).date}{' '}
                    {dateConverter(m.fixture_start_at).monthInString}
                  </p>
                </div>
              ),
              key: i,
            })),
          }}
          dropdownRender={(menu) => (
            <div
              className='bg-white p-1'
              style={{
                boxShadow:
                  '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
              }}
            >
              {matches?.length > 0 ? (
                menu
              ) : (
                <div className='py-5 text-center'>No Matches Found</div>
              )}

              <div className='pagintion-action'>
                <div
                  className='pagnation-btn'
                  onClick={(e) => {
                    if (matchSkip >= 10) {
                      loadMatches(10, matchSkip - 10);
                      setmatchSkip(matchSkip - 10);
                      page--;
                    }
                  }}
                >
                  {'<<'}
                </div>
                <div
                  className='pagnation-btn'
                  onClick={(e) => {
                    page++;
                    if (page <= count) {
                      loadMatches(10, matchSkip + 10);
                      setmatchSkip(matchSkip + 10);
                    } else {
                      page--;
                    }
                  }}
                >
                  {'>>'}
                </div>
              </div>
            </div>
          )}
          trigger={['click']}
        >
          <div className='text-sm font-normal border-b border-[#ccc] p-2 mb-2  w-full flex text-[#B6B6B6] cursor-pointer pb-[15px] mt-[15px]'>
            {!match && selectedMatch === null && (
              <div className='flex-1'>Select the Match </div>
            )}

            {!match && selectedMatch !== null && (
              <div className='flex-1 text-[#666]'>
                {(matches[selectedMatch] as any)?.fixture_name}
              </div>
            )}
            <DownOutlined />
          </div>
        </Dropdown>
      )}
      {match && (
        <div className='text-sm font-normal border-b border-[#ccc] p-2 mb-2 w-full flex text-[#B6B6B6] cursor-not-allowed pb-[15px] mt-[15px]'>
          <div className='flex-1 text-[#666]'>{match.fixture_name}</div>
          <DownOutlined />
        </div>
      )}
      {!user && (
        <Dropdown
          trigger={['click']}
          dropdownRender={(menu) => (
            <div style={{ background: '#fff' }}>
              <SearchBar
                searchKey={searchKey}
                setSearchKey={setSearchKey}
                placeholder='Search Name'
                style={{
                  margin: '10px 0',
                }}
              />

              {menu}
            </div>
          )}
          menu={{
            items: members?.map((member: any, i: number) => ({
              key: member.id,
              label: (
                <div
                  key={'member-' + i}
                  onClick={(e) => {
                    setSelectedUser(member);
                  }}
                >
                  <div className='flex items-center mb-[1px]'>
                    <Avatar
                      image={''}
                      name={
                        user
                          ? `${member.first_name}  ${member.last_name}`
                          : `${member.first_name}  ${member.last_name}`
                      }
                      width={40}
                      height={40}
                    />
                    <div>
                      <div className='items-center p-2.5 pl-[5px]'>
                        <div className='capitalize text-sm'>
                          {member.first_name} {member.last_name}
                        </div>
                        <div className='text-xs text-[#666]'>
                          {member.in_progress_count} task on progress
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ),
            })),
          }}
        >
          <div className='text-sm font-normal border-b border-[#ccc] p-2 mb-2  w-full flex text-[#B6B6B6] cursor-pointer pb-[15px] mt-[15px]'>
            {!user && selectedUser === null && (
              <div className='flex items-center justify-between flex-1'>
                <div className='flex gap-2 items-center'>
                  <UserPlus color='#C4CAD3' size={20} />
                  <p>Assign Match to</p>
                </div>
                <Image src={plusCircle} alt='plus' />
              </div>
            )}
            {!user && selectedUser !== null && (
              <div className='flex flex-1 text-[#666]'>
                <Avatar
                  image={''}
                  name={`${(selectedUser as any)?.first_name}  ${
                    (selectedUser as any)?.last_name
                  }`}
                  width={30}
                  height={30}
                />
                <div className='capitalize flex items-center ml-2.5'>
                  {(selectedUser as any)?.first_name}{' '}
                  {(selectedUser as any)?.last_name}
                </div>
              </div>
            )}
          </div>
        </Dropdown>
      )}

      {user && (
        <div className='text-sm font-normal border-b border-[#ccc] p-2 mb-2  w-full flex text-[#B6B6B6] cursor-not-allowed pb-[15px] mt-[15px]'>
          <div className='flex flex-1 text-[#666]'>
            <Avatar
              image={''}
              name={`${user?.first_name}  ${user?.last_name}`}
              width={30}
              height={30}
            />
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginLeft: 10,
              }}
              className='capitalize'
            >
              {user?.first_name} {user?.last_name}
            </div>
          </div>
        </div>
      )}

      <div
        className='flex items-center border-b border-[#ccc]'
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingBottom: 15,
          marginTop: 15,
        }}
      >
        <DatePicker
          placeholder='Set Due Date'
          onChange={(date, dateString) => {
            setDueDate(dateString);
            setDueDateBinder(date);
          }}
          value={dueDateBinder}
          style={{ border: 'none' }}
          className='w-full border-none'
          disabledDate={disabledDate}
        />
      </div>
      <div className='mt-3' style={{ display: 'flex', padding: 0 }}>
        <button
          className='p-2.5 bg-[#4285F4] text-white flex-1 rounded-md text-center mt-6'
          onClick={() => handleAssignMatch()}
        >
          Assign
        </button>
      </div>
    </div>
  );
};

export default AssignMatch;
