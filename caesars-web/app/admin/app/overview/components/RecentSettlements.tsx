import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// API fetchers
import { getMatchesForAdmin } from '@/app/apiIntegrations/apiClients/adminMatches';

// custom hooks
import { useLocal } from '@/app/hooks/useLocal';
import { useToggle } from '@/app/hooks/useToggle';

// components
import CardContainer from '@/app/components/global/cardContainer/CardContainer';
import UpcomingMatchesCard from '@/app/app/in_game_trader/overview/components/UpcomingMatchesCard';
import LoadingComponent from '@/app/components/global/LoadingComponent';

type Props = {};

const RecentSettlements = (props: Props) => {
  const router = useRouter();

  // custom hooks
  const [isMatches, setIsMatches] = useToggle(true);

  const [matches, setMatches] = useState<any[]>([]);
  const [matchesTab, setMatchesTab] = useLocal('matches tab', {});

  useEffect(() => {
    loadMatches();
  }, []);

  async function loadMatches() {
    try {
      const res = await getMatchesForAdmin({
        limit: 4,
        query: {
          type: 'in-game',
          status: 'end',
        },
      });
      setMatches(res.data);
      setIsMatches(false);
    } catch (e) {
      setIsMatches(false);
      console.warn(e);
    }
  }

  return (
    <CardContainer
      header='Recent settlements'
      headerStyle={{
        color: '#121212',
      }}
      style={{
        width: '100%',
        height: 330,
        padding: 20,
      }}
    >
      <div className='mt-3'>
        {isMatches && (
          <div className='w-full h-[250px]'>
            <LoadingComponent text='Loading' />
          </div>
        )}
        {!isMatches && matches.length === 0 && (
          <div className='w-full h-[250px] flex justify-center items-center'>
            No Data
          </div>
        )}
        {!isMatches &&
          matches?.map((match, i) => {
            return (
              <UpcomingMatchesCard
                match={match}
                key={i}
                width={50}
                height={50}
                style={{
                  padding: '8px 0',
                }}
              />
            );
          })}
      </div>
      {!isMatches && matches.length > 0 && (
        <div
          className='mt-3 text-center text-[#9A9A9A] cursor-pointer'
          onClick={() => {
            setMatchesTab({ team: 'in-game', tab: 'End Matches' });
            router.push('/admin/app/matches');
          }}
        >
          View All
        </div>
      )}
    </CardContainer>
  );
};

export default RecentSettlements;
