import React from 'react';
import Image from 'next/image';

type Props = {
  league: string;
  teams: any[];
  searchKey: string;
  show: boolean;
  showDepthChart: (teamId: number | string) => void;
  showRoster: (teamId: number | string) => void;
};

const LeagueCard = (props: Props) => {
  const { league, teams, searchKey, show, showRoster, showDepthChart } = props;
  return (
    <div className='bg-white p-2.5'>
      <div className='w-full h-14 bg-[#F5F6F7] gap-5 px-5 flex justify-center items-center'>
        {/* <Image src={} alt='' /> */}
        <p className='text-xl font-semibold text-[#141522]'>{league}</p>
      </div>
      <div className='flex flex-col'>
        {teams?.map((t) => {
          const filteredList = t?.full_name
            ?.toLowerCase()
            ?.includes(searchKey?.toLowerCase());
          return (
            filteredList && (
              <div className='h-14 border-b flex items-center justify-center text-sm font-medium text-[#202121]'>
                <div
                  className={`flex items-center gap-5 last:border-b-0 ${
                    show
                      ? 'w-7/12 justify-center cursor-auto'
                      : 'w-[200px] justify-start cursor-pointer'
                  }`}
                  onClick={() => {
                    if (!show && showDepthChart) showDepthChart(t?.team_id);
                  }}
                >
                  {t.team_logo && (
                    <Image src={t.team_logo} alt='' width={30} height={30} />
                  )}
                  <p className=''>{t?.full_name}</p>
                </div>
                {show && (
                  <>
                    <div
                      className='w-1/6 cursor-pointer text-center'
                      onClick={() => {
                        if (show && showRoster) showRoster(t.team_id);
                      }}
                    >
                      Roster
                    </div>
                    <div
                      className='w-3/12 cursor-pointer text-center'
                      onClick={() => {
                        if (show && showDepthChart) showDepthChart(t.team_id);
                      }}
                    >
                      Depth Chart
                    </div>
                  </>
                )}
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};

export default LeagueCard;
