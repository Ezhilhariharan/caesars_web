import React, { useEffect, useState } from 'react';
import Image, { StaticImageData } from 'next/image';

// API
import { getMatchInfo } from '@/app/apiIntegrations/apiClients/stats';

// lib
import dateConverter from '@/app/lib/dateConverter';
import StatusOftask from '@/app/components/global/StatusOftask';
import MatchStatus from '../MatchStatus';

type Props = {
  matchId: string | number;
  homeTeam: {
    id: string | number;
    logo: string | StaticImageData;
    name: string;
    shortName: string;
  };
  awayTeam: {
    id: string | number;
    logo: string | StaticImageData;
    name: string;
    shortName: string;
  };
};

const MatchInfo = (props: Props) => {
  const { homeTeam, awayTeam, matchId } = props;
  const [matchInfo, setMatchInfo] = useState<any>(null);

  useEffect(() => {
    if (matchId) getInfo(matchId);
    const interval = setInterval(() => {
      getInfo(matchId);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  async function getInfo(id: string | number) {
    try {
      const res = await getMatchInfo(id);
      setMatchInfo(res);
    } catch (e) {
      console.warn(e);
    }
  }

  let elappsedTime = '';

  return (
    <div className='overflow-hidden rounded-tr-[32px] border border-[#E0E3E8] rounded-[8px]'>
      <div className='flex justify-center items-center gap-10 bg-[#4285F4] py-1.5'>
        <div className='flex items-center gap-5'>
          <p className='text-xs text-white font-extrabold'>Home</p>
          <Image src={homeTeam.logo} alt='' width={30} height={30} />
        </div>
        <div className='text-white text-base'>Match Details</div>
        <div className='flex items-center gap-5'>
          <Image src={awayTeam.logo} alt='' width={30} height={30} />
          <p className='text-xs text-white font-extrabold'>Away</p>
        </div>
      </div>
      {/* <div className='bg-white rounded-b-lg flex  p-5 text-center flex-col'>
        <div className='flex'>
          <p className='w-1/6 text-[#141522] text-xs font-semibold'>
            Match Start Time
          </p>

          <p className='w-1/6 text-[#141522] text-xs font-semibold'>
            Elapsed Time
          </p>

          <p className='w-1/6 text-[#141522] text-xs font-semibold'>
            Match Status
          </p>

          <p className='w-1/6 text-[#141522] text-xs font-semibold'>
            Home : Away
          </p>

          <p className='w-1/6 text-[#141522] text-xs font-semibold'>
            Current At Bat
          </p>

          <p className='w-1/6 text-[#141522] text-xs font-semibold'>
            Current Pitcher
          </p>

          <p className='w-1/6 text-[#141522] text-xs font-semibold'>
            Current Innings
          </p>
        </div>
        <div className='flex justify-between'>
          {matchInfo?.result[0]?.started_at ? (
            <div className='w-1/6'>
              <p className='text-sm text-[#54577A] mt-1.5'>
                {dateConverter(matchInfo?.result[0]?.started_at).monthInString}{' '}
                {dateConverter(matchInfo?.result[0]?.started_at).date}
                {dateConverter(matchInfo?.result[0]?.started_at).year &&
                  `, ${dateConverter(matchInfo?.result[0]?.started_at).year}`}
              </p>
              <p className='text-sm text-[#54577A]'>
                {dateConverter(matchInfo?.result[0]?.started_at).timeString}
              </p>
            </div>
          ) : (
            '--'
          )}

          <p className='w-1/6 text-[32px] font-extrabold text-[#54577A]'>
            {elappsedTime || '--:--'}
          </p>

          <p
            className={`w-1/6 text-[32px] font-extrabol capitalize ${
              matchInfo?.result[0]?.status === 5
                ? 'text-[#34A770]'
                : 'text-[#54577A]'
            }`}
          >
            <StatusOftask status={matchInfo?.result[0]?.status} />
          </p>

          <p className='w-1/6 text-[32px] font-extrabold text-[#54577A]'>
            {matchInfo?.result[0]?.team1_score || '--'} :{' '}
            {matchInfo?.result[0]?.team2_score || '--'}
          </p>

          <p className='w-1/6 font-normal text-[#54577A] mt-2.5'>
            {matchInfo?.current_batter || '--'}
          </p>

          <p className='w-1/6 font-normal text-[#54577A] mt-2.5'>
            {matchInfo?.current_pitcher || '--'}
          </p>

          <p className='w-1/6 font-normal text-[#54577A] mt-2.5'>
            {matchInfo?.current_innings || '--'}
          </p>
        </div>
      </div> */}
      <div className='bg-white rounded-b-lg flex justify-between p-5 text-center'>
        <div>
          <p className='text-[#141522] text-xs font-semibold'>
            Match Start Time
          </p>
          {matchInfo?.result[0]?.started_at ? (
            <>
              <p className='text-sm text-[#54577A] mt-1.5'>
                {dateConverter(matchInfo?.result[0]?.started_at).monthInString}{' '}
                {dateConverter(matchInfo?.result[0]?.started_at).date}
                {dateConverter(matchInfo?.result[0]?.started_at).year &&
                  `, ${dateConverter(matchInfo?.result[0]?.started_at).year}`}
              </p>
              <p className='text-sm text-[#54577A]'>
                {dateConverter(matchInfo?.result[0]?.started_at).timeString}
              </p>
            </>
          ) : (
            <p className='mt-4'>--</p>
          )}
        </div>
        <div className='flex flex-col jb'>
          <p className='text-[#141522] text-xs font-semibold'>Elapsed Time</p>
          <p className='text-[32px] font-extrabold text-[#54577A]'>
            {elappsedTime || '--:--'}
          </p>
        </div>
        <div>
          <p className='text-[#141522] text-xs font-semibold'>Match Status</p>
          <p
            className={`text-[32px] font-extrabold capitalize ${
              matchInfo?.result[0]?.status === 2
                ? 'text-[#34A770]'
                : 'text-[#54577A]'
            }`}
          >
            {/* <StatusOftask status={matchInfo?.result[0]?.status} /> */}
            <MatchStatus status={matchInfo?.result[0]?.status} />
          </p>
        </div>
        <div>
          <p className='text-[#141522] text-xs font-semibold'>Home : Away</p>
          <p className='text-[32px] font-extrabold text-[#54577A]'>
            {matchInfo?.result[0]?.team1_score || (
              <span className='mt-4'>--</span>
            )}{' '}
            :{' '}
            {matchInfo?.result[0]?.team2_score || (
              <span className='mt-4'>--</span>
            )}
          </p>
        </div>
        <div>
          <p className='text-[#141522] text-xs font-semibold'>Current At Bat</p>
          <p className='font-normal text-[#54577A] mt-2.5'>
            {matchInfo?.current_batter || <span className='mt-4'>--</span>}
          </p>
        </div>
        <div>
          <p className='text-[#141522] text-xs font-semibold'>
            Current Pitcher
          </p>
          <p className='font-normal text-[#54577A] mt-2.5'>
            {matchInfo?.current_pitcher || <span className='mt-4'>--</span>}
          </p>
        </div>
        <div>
          <p className='text-[#141522] text-xs font-semibold'>
            Current Innings
          </p>
          <p className='font-normal text-[#54577A] mt-2.5'>
            {matchInfo?.current_innings || <span className='mt-4'>--</span>}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MatchInfo;
