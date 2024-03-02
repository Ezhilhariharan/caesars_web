'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// utils
import { today } from '@/app/utils/CalenderStaticDatas';

// API
import { getMatchesShort } from '@/app/apiIntegrations/apiClients/matches';

// custom hooks
import { useQuery } from '@/app/hooks/useQuery';
import { useSelected } from '@/app/hooks/useSelected';

// components
import SportsLogo from '../../../components/global/SportsLogo';
import AdminupcomingMatchesCard from './AdminUpcomingMatchesCard';
import LoadingComponent from '@/app/components/global/LoadingComponent';

const AdminUpcomingMatches = () => {
  const router = useRouter();

  const [sportFilter, setSportFilter] = useSelected('Baseball');
  const [matches, setMatches] = useQuery();

  const { isLoading, data: unAssignedMatches } = matches;

  useEffect(() => {
    setMatches(fetchMatches);
  }, [sportFilter]);

  const fetchMatches = async () =>
    await getMatchesShort({
      limit: 3,
      query: {
        status: 0,
        start_date: today,
        unasigned: true,
        sports: sportFilter,
      },
    });

  return (
    <div className='w-full h-[290px] rounded-[10px] bg-white'>
      <div className='text-[#121212] p-5 pb-3 text-base font-semibold border-b'>
        Upcoming Matches
      </div>
      {/* <div className="overflow-x-scroll">
        <SportsLogo
          selectedSport={sportFilter}
          setSelectedSport={setSportFilter}
          bgColor="#fff"
          // bgColor='#F9F9F9'
          style={{
            columnGap: 40,
          }}
        />
      </div> */}

      <div className=''>
        {isLoading && (
          <div className='h-[200px] text-lg font-medium'>
            <LoadingComponent text='Loading' />
          </div>
        )}
        <div className='h-[180px]'>
          {!isLoading &&
            unAssignedMatches?.data?.length > 0 &&
            unAssignedMatches?.data?.map((match: any, i: any) => {
              return (
                <div
                  className='px-5 border-b border-[#E0E3E8]'
                  key={'upcoming-match' + i}
                >
                  <AdminupcomingMatchesCard
                    primary={true}
                    team1_name={match.team1_name}
                    team1_short_name={match.team1_short_name}
                    team1_image={match.team1_logo_image}
                    team2_name={match.team2_name}
                    team2_short_name={match.team2_short_name}
                    team2_image={match.team2_logo_image}
                    date={match.fixture_start_at}
                  />
                </div>
              );
            })}
        </div>

        {!isLoading && unAssignedMatches?.data?.length === 0 && (
          <div className='w-full h-[215px] flex items-center justify-center text-[rgba(20,21,34,.4)]'>
            No Matches Available
          </div>
        )}

        {!isLoading && unAssignedMatches?.data?.length >= 3 && (
          <div
            style={{ textAlign: 'center' }}
            className='w-full h-auto pt-3 flex justify-center items-center cursor-pointer font-normal text-base text-[#9A9A9A]'
            onClick={() => {
              localStorage.setItem('matches tab', 'Unassigned Matches');
              router.push('/app/roster_lead/matches');
            }}
          >
            View Upcoming Matches
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUpcomingMatches;
