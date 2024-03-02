'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// lib
import { get } from '@/app/apiIntegrations/fetcher';

// components
import Title from '@/app/components/global/title/Title';
import SearchBar from '@/app/components/global/SearchBar';
import LoadingComponent from '@/app/components/global/LoadingComponent';
import LeagueCard from '@/app/components/teams/LeagueCard';

type Props = {};

const TeamsPage = (props: Props) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const [teamsList, setTeamsList] = useState<any>([]);
  const [selectedLeague, setSelectedLeague] = useState('Baseball');

  useEffect(() => {
    fetchTeamsList();
  }, []);

  // fetch all the teams
  const fetchTeamsList = async () => {
    setIsLoading(true);
    try {
      const res = await get('/team-list');
      setTeamsList(res.data);
      setIsLoading(false);
    } catch (e) {
      console.warn(e);
      setIsLoading(false);
    }
  };

  const showRoster = (teamId: number | string) =>
    router.push(`teams/${teamId}/roster`);

  const showDepthChart = (teamId: number | string) =>
    router.push(`teams/${teamId}/depth-chart`);

  if (isLoading) return <LoadingComponent text='Loading' />;

  return (
    <>
      <div className='flex items-center justify-between py-5'>
        <div className='flex gap-5'>
          <Title title='Teams' size='large' />
          <SearchBar
            searchKey={searchKey}
            setSearchKey={setSearchKey}
            placeholder='Search Team'
            style={{
              height: 40,
              background: '#fff',
            }}
          />
        </div>
        {/* <LeaguesDropDown loading={false} selectedLeague={selectedLeague} /> */}
      </div>
      <div className='w-full grid grid-cols-3 gap-10'>
        {teamsList?.map((t: any) => {
          return (
            <div className=''>
              <LeagueCard
                league={t.div_name}
                teams={t.teams}
                searchKey={searchKey}
                show={false}
                showDepthChart={showDepthChart}
                showRoster={showRoster}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TeamsPage;
