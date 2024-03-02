'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

// icons
import allPlayer from '../../../../../sports/[sport]/assets/stats/all_player.svg';
import batter from '../../../../../sports/[sport]/assets/stats/batter.svg';
import pitcher from '../../../../../sports/[sport]/assets/stats/pitcher.svg';

// API
import { get } from '@/app/apiIntegrations/fetcher';

// components
import Title from '@/app/components/global/title/Title';
import Avatar from '@/app/components/global/Avatar';
import SearchBar from '@/app/components/global/SearchBar';

type Props = {
  params: {
    teamId: string | number;
  };
};

const typeOfPlayer = [
  {
    id: 1,
    label: 'all',
    icon: allPlayer,
  },
  {
    id: 2,
    label: 'batter',
    icon: batter,
  },
  {
    id: 1,
    label: 'pitcher',
    icon: pitcher,
  },
];

const RosterPage = (props: Props) => {
  const { params } = props;

  const [rostersList, setRostersList] = useState<any>([]);
  const [playerType, setPlayerType] = useState('all');
  const [searchPlayer, setSearchPlayer] = useState('');

  useEffect(() => {
    fetchRosterList(params.teamId);
  }, [playerType]);

  const fetchRosterList = async (teamId: string | number) => {
    let type = '';
    if (playerType && playerType !== 'all') type = `?batter_type=${playerType}`;
    const res = await get(`roster-teamPlayerlist/${teamId}${type}`);
    setRostersList(res.data);
  };

  const actionItems = (
    <div className='p-2.5 mr-10'>
      <div>More Info</div>
      <div>Manage Player</div>
      <div>Delete Player</div>
    </div>
  );

  return (
    <div className='bg-white border p-5 rounded-lg'>
      <div className='flex items-center justify-between'>
        <div>
          <Title
            title={` ${
              rostersList?.team_info?.[0].full_name
            } Roster ${new Date().getFullYear()}`}
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: '#1F2937',
            }}
          />
          <p className='text-sm font-normal text-[#718096] -mt-1 capitalize'>
            {playerType === 'all' ? `${playerType} players` : `${playerType}s`}
          </p>
        </div>
        <div className='flex items-center gap-5'>
          <div className='w-auto h-11 border border-[#E0E3E8] rounded-[5px] flex items-center gap-2.5 px-1.5'>
            {typeOfPlayer?.map((pt, i) => {
              return (
                <div
                  key={i}
                  className={`capitalize h-8 px-5 text-center flex items-center justify-center gap-1.5 rounded-full cursor-pointer ${
                    playerType === pt.label ? 'bg-[#F9FAFB] text-[#3B82F6]' : ''
                  }`}
                  onClick={() => {
                    setPlayerType(pt.label);
                  }}
                >
                  <Image src={pt.icon} alt={pt.label} />
                  <span>{pt.label}</span>
                </div>
              );
            })}
          </div>
          <SearchBar
            searchKey={searchPlayer}
            setSearchKey={setSearchPlayer}
            placeholder='Search Player'
            style={{
              color: '#54577A',
              height: '100%',
              border: '1px solid #E0E3E8',
            }}
          />
          {/* <button className='w-auto h-10 text-base font-semibold px-5 bg-[#4285F4] text-white rounded-[4px]'>
            Add Players
          </button> */}
        </div>
      </div>
      <table className='w-full h-full mt-5'>
        <thead className='w-full bg-[#F0F1F3] h-10 text-sm font-semibold'>
          <tr className='w-full text-center'>
            <td className='border-l w-[25%]'>PLAYER NAME</td>
            <td className='border-l w-[10%]'>NO</td>
            <td className='border-l w-[10%]'>POS</td>
            <td className='border-l w-[10%]'>AGE</td>
            <td className='border-l w-[10%]'>HT</td>
            <td className='border-l w-[10%]'>WT</td>
            <td className='border-l w-[15%]'>BIRTHPLACE</td>
            {/* <td className='border-x w-[10%]'>ACTION</td> */}
          </tr>
        </thead>

        <tbody className='w-full text-[#6C6D6F] text-xs'>
          {rostersList?.results?.length > 0 &&
            rostersList?.results?.map((r: any) => {
              const full_name = `${r?.first_name} ${r?.last_name}`;
              const filteredPlayer = full_name
                .toLowerCase()
                .includes(searchPlayer.toLowerCase());
              return (
                filteredPlayer && (
                  <tr className='w-full h-[32px] text-center border-b even:bg-[#F9F9F9]'>
                    <td className='border-l w-[25%]'>
                      <div className='flex items-center gap-5 px-5'>
                        <Avatar
                          name={full_name}
                          width={25}
                          height={25}
                          iconStyle={{ fontSize: 12 }}
                        />
                        <p className='text-[#0066CC]'>{full_name}</p>
                      </div>
                    </td>
                    <td className='border-l w-[10%]'>{r?.jersey_num}</td>
                    <td className='border-l w-[10%] capitalize text-left px-10'>
                      {r?.p_primary_position}
                    </td>
                    <td className='border-l w-[10%]'>{r?.age}</td>
                    <td className='border-l w-[10%]'>{r?.height} cm</td>
                    <td className='border-l w-[10%]'>{r?.weigth} kg</td>
                    <td className='border-l w-[15%]'>{r?.nationality}</td>
                    {/* <td className='h-8 flex justify-center items-center border-x'>
                    <Popover
                      arrow={false}
                      placement='bottomRight'
                      trigger={['click']}
                      content={actionItems}
                      className='w-10 flex items-center justify-center'
                    >
                      <Image
                        src={dots}
                        alt='dots'
                        className='cursor-pointer w-auto'
                        width={10}
                        height={10}
                      />
                    </Popover>
                  </td> */}
                  </tr>
                )
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default RosterPage;

const list = [
  {
    id: 1,
    PLAYERNAME: 'Keegan Akin',
    NO: '45',
    POS: 'RP',
    BAT: 'L',
    THW: 'L',
    AGE: '28',
    HT: '1.83 m',
    WT: '108 kg',
    BIRTHPLACE: 'Alma, MI',
  },
  {
    id: 2,
    PLAYERNAME: 'Keegan',
    NO: '45',
    POS: 'RP',
    BAT: 'L',
    THW: 'L',
    AGE: '28',
    HT: '1.83 m',
    WT: '108 kg',
    BIRTHPLACE: 'Alma, MI',
  },
  {
    id: 3,
    PLAYERNAME: 'Akin',
    NO: '45',
    POS: 'RP',
    BAT: 'L',
    THW: 'L',
    AGE: '28',
    HT: '1.83 m',
    WT: '108 kg',
    BIRTHPLACE: 'Alma, MI',
  },
  {
    id: 3,
    PLAYERNAME: 'Keegan Akin',
    NO: '45',
    POS: 'RP',
    BAT: 'L',
    THW: 'L',
    AGE: '28',
    HT: '1.83 m',
    WT: '108 kg',
    BIRTHPLACE: 'Alma, MI',
  },
];
