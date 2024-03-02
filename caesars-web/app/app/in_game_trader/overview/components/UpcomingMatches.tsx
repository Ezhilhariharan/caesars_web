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
      limit: 4,
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
      <div className='mt-3 h-[200px]'>
        {matches &&
          matches.map((match, i) => {
            return (
              <UpcomingMatchesCard
                match={match}
                key={i}
                primary={true}
                width={35}
                height={35}
              />
            );
          })}
      </div>
      <div
        className='mt-4 text-center text-[#9A9A9A] cursor-pointer'
        onClick={() => router.push('/app/in_game_trader/matches')}
      >
        View All
      </div>
    </CardContainer>
  );
};

export default UpcomingMatches;
