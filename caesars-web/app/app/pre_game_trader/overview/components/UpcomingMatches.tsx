import { getMatches } from '@/app/apiIntegrations/apiClients/matches';
import CardContainer from '@/app/components/global/cardContainer/CardContainer';
import React, { useEffect, useState } from 'react';
import UpcomingMatchesCard from './UpcomingMatchesCard';
import { useRouter } from 'next/navigation';

type Props = {};

const UpcomingMatches = (props: Props) => {
  const router = useRouter();
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    loadMatches();
  }, []);

  async function loadMatches() {
    const res = await getMatches({
      limit: 3,
      query: {
        // today: true,
        status: 0,
        match_assignment_status: 4,
      },
    });
    setMatches(res);
  }

  return (
    <CardContainer
      header='Upcoming Matches'
      headerStyle={{
        color: '#121212',
      }}
      style={{
        height: '315px',
        padding: 20,
      }}
    >
      <div className='mt-4 h-[200px]'>
        {matches &&
          matches.map((match, i) => {
            return (
              <UpcomingMatchesCard
                match={match}
                key={i}
                primary={true}
                width={40}
                height={40}
              />
            );
          })}
      </div>
      <div
        className='mt-5 text-center text-[#9A9A9A] cursor-pointer'
        onClick={() => {
          localStorage.setItem('matches tab', 'Newly Assigned');
          router.push('/app/pre_game_trader/matches');
        }}
      >
        View All
      </div>
    </CardContainer>
  );
};

export default UpcomingMatches;
