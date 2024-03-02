'use client';
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

// svg-icons
import ArrowDown from '../../../../components/teams/assets/down.svg';

// custom-icons
import TickMark from '@/app/assets1/custom-icons/TickMark';

// API
import { get } from '@/app/apiIntegrations/fetcher';

// lib
import { tabs } from '../utils/tabs';

// components
import Tabs from '@/app/components/global/Tabs';
import Title from '@/app/components/global/title/Title';
import SearchBar from '@/app/components/global/SearchBar';
import LoadingComponent from '@/app/components/global/LoadingComponent';

// antd
import { Dropdown } from 'antd';
import { findUniqBy } from '@/app/helper/findUniq';

type Props = {
  children: React.ReactNode;
  params: {
    teamId: number;
  };
};

const SingleTeamLayout = (props: Props) => {
  const { children, params } = props;

  const router = useRouter();
  const path = usePathname();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState<any>(null);
  const [selectedLeague, setSelectedLeague] = useState('Baseball');
  const [teamList, setTeamList] = useState<any>([]);
  const [currentTeam, setCurrentTeam] = useState<any>(null);
  const [searchTeam, setSearchTeam] = useState('');

  const onTabChange = (f: any) => {
    setSelectedTab(f);
    router.push(`${f.route}`);
  };

  useEffect(() => {
    fetchTeamList();
    if (path.includes(`${params.teamId}/roster`)) setSelectedTab(tabs[0]);
    if (path.includes(`${params.teamId}/depth-chart`)) setSelectedTab(tabs[1]);
  }, []);

  const fetchTeamList = async () => {
    setIsLoading(true);
    try {
      const res = await get('/team-list');
      let teams: any = [];
      const getTeamsOnly = res?.data?.map((d: any) => {
        d.teams.map((t: any) => {
          if (params?.teamId === t?.team_id) setCurrentTeam(t);
          teams.push(t);
        });
      });
      setTeamList(findUniqBy(teams, JSON.stringify));
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.warn(e);
    }
  };

  if (isLoading) return <LoadingComponent text='Loading' />;

  return (
    <>
      <div className='w-full flex items-center justify-between'>
        <div className='flex items-center gap-10'>
          <Dropdown
            trigger={['click']}
            dropdownRender={(menu) => (
              <div className='z-50 bg-white max-h-[60vh] rounded-lg shadow-lg'>
                <div className=''>
                  <SearchBar
                    searchKey={searchTeam}
                    setSearchKey={setSearchTeam}
                    placeholder='Search Team'
                    icon={false}
                    style={{
                      fontSize: 16,
                      color: '#737373',
                    }}
                  />
                </div>
                <div className='p-0.5 max-h-[55vh] overflow-y-scroll py-5'>
                  {teamList.map((t: any) => {
                    const searchResult = t.full_name
                      .toLowerCase()
                      .includes(searchTeam.toLowerCase());
                    return (
                      searchResult && (
                        <div
                          className={`py-2.5 px-5 cursor-pointer flex items-center justify-between ${
                            params.teamId === t.team_id
                              ? 'bg-[#E3E9F4] border border-[#4285F4] rounded-lg text-[#1A1A1A] font-bold'
                              : 'text-[#484848]'
                          }`}
                          onClick={() => {
                            router.push(
                              `/app/roster_lead/teams/${t.team_id}/depth-chart`
                            );
                          }}
                        >
                          <p>{t.full_name}</p>
                          {params.teamId === t.team_id && (
                            <TickMark color='#4285F4' size={20} />
                          )}
                        </div>
                      )
                    );
                  })}
                </div>
              </div>
            )}
          >
            <div className='flex items-center gap-5 cursor-pointer'>
              <Title title={currentTeam?.full_name} size='large' />
              <Image src={ArrowDown} alt='down arrow' />
            </div>
          </Dropdown>
          <Tabs
            tabs={tabs}
            selectedTab={selectedTab}
            onTabChange={onTabChange}
            loading={isLoading}
          />
        </div>
        {/* <LeaguesDropDown loading={false} selectedLeague={selectedLeague} /> */}
      </div>
      <>{children}</>
    </>
  );
};

export default SingleTeamLayout;
