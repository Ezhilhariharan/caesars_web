'use client';
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

// API fetchers
import { getSportsMatches } from '@/app/apiIntegrations/apiClients/matches';

// custom hooks
import { useLocal } from '@/app/hooks/useLocal';
import { useSporsTabs } from '@/app/hooks/useSporsTabs';

// libs
import { getSportsFilterKey } from '@/app/lib/getSportsFilterKey';

// components
import SubSidebarSports from '@/app/components/Sidebar/SubSidebarSports';
import { HeaderTab } from './components/HeaderTab';
import RosterManagerMatchView from './components/RosterManagerMatchView';
import SubSidebarNotFound from '../../components/Sidebar/SiderBarNotFound';
import { getMatchesForAdmin } from '@/app/apiIntegrations/apiClients/adminMatches';
import { onPin } from './utils/onPinTab';
import { onClose } from './utils/onCloseTab';

type SportsPageProps = {
  params: {
    sport: string;
  };
};

export default function SportsPage(props: SportsPageProps) {
  const { params } = props;

  // libs
  const [matchTabs, setMatchTabs] = useLocal('matchTabs', []);

  // hooks
  const [sportsTab, setSportsTab] = useSporsTabs(params?.sport, []);

  const [mainTabs, setMainTabs] = useState<any>([]);
  const [selectedTabIndex, setSelectedTabindex] = useState<any>(null);
  const [matches, setMatches] = useState<any[]>([]);
  const [isMatchLoading, setisMatchLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('summary');
  const [user, setUser] = useState<any>(null);
  const [admin, setAdmin] = useState<any>(null);
  const [selectedMatches, setSelectedMatches] = useState({});

  // get all tabs from local storage
  let tab: any = null;

  useEffect(() => {
    const admin = getAdminFromLocalstorage();
    const user = getUserFromLocalstorage();
    if (admin) setAdmin(admin);
    if (user) setUser(user);
  }, []);

  function getUserFromLocalstorage() {
    const userString = localStorage.getItem('user');
    if (!userString) return null;
    return JSON.parse(userString);
  }
  function getAdminFromLocalstorage() {
    const userString = localStorage.getItem('admin');
    if (!userString) return null;
    return JSON.parse(userString);
  }

  useEffect(() => {
    tab = localStorage.getItem('tab');
    if (admin) loadAdminMatches();
    if (user) loadMatches();
  }, [admin, user]);

  useEffect(() => {
    if (tab) loadTabs();
  }, [mainTabs, selectedTabIndex, params?.sport]);

  function loadTabs() {
    const lastSelectedMatch: any = localStorage.getItem('matchTabs');
    if (tab !== null) {
      try {
        const t = JSON.parse(tab);
        const recentTab = JSON.parse(lastSelectedMatch);
        const selectedSport = t.filter((t: any) => t.sport === params?.sport);
        setMainTabs(selectedSport[0]?.tabs);
        if (recentTab) {
          const res = selectedSport[0]?.tabs.filter(
            (t: any) => t.matchId === recentTab.id
          );
          if (res) setSelectedTabindex(recentTab?.matchId);
          else
            setSelectedTabindex(
              selectedSport[0]?.tabs[selectedSport[0]?.tabs.length - 1]?.matchId
            );
        } else if (selectedSport[0]?.tabs?.length > 0)
          setSelectedTabindex(
            selectedSport[0]?.tabs[selectedSport[0]?.tabs.length - 1]?.matchId
          );
        else setSelectedTabindex(null);
      } catch (e) {
        console.warn(e);
      }
    } else {
      setMainTabs([]);
    }
  }

  async function loadMatches() {
    setisMatchLoading(true);
    try {
      const res = await getSportsMatches({
        limit: 1000,
        query: {
          today: true,
          sports: getSportsFilterKey(params?.sport.toUpperCase()),
        },
      });
      setMatches(res);
      setisMatchLoading(false);
    } catch (e) {
      console.warn(e);
    }
  }

  async function loadAdminMatches() {
    try {
      const res = await getMatchesForAdmin({
        limit: 1000,
        query: {
          today: true,
          sports: getSportsFilterKey(params?.sport.toUpperCase()),
        },
      });
      setMatches(res.data);
      setisMatchLoading(false);
    } catch (e) {
      console.warn(e);
    }
  }

  const onMenuClick = (d: any, item: any) => {
    if (item.name === 'pin') {
      const res = onPin(d, params?.sport);
      if (res?.length > 0) setMainTabs(res);
    }
    if (item.name === 'close') {
      const res = onClose(d, params?.sport);
      const newres = res?.filter((t: any) => t?.matchId === selectedTabIndex);
      setMainTabs(res);
      if (newres?.length === 0) {
        setSelectedTabindex(res[res.length - 1]?.matchId);
        setMatchTabs({
          matchId: res[res.length - 1]?.matchId,
          title: res[res.length - 1]?.title,
          fixture_start_at: res[res.length - 1].fixture_start_at,
        });
      }
    }
  };

  return (
    <div className='w-full h-full flex flex-1'>
      {params?.sport === 'mlb' && (
        <SubSidebarSports
          user={user}
          admin={admin}
          selectedTabIndex={selectedTabIndex}
          matches={matches}
          setMatches={setMatches}
          isLoading={isMatchLoading}
          onMatchClick={(d: any) => {
            setSelectedMatches(d);
            setMatchTabs({
              matchId: d.id,
              title: d.fixture_name,
              fixture_start_at: d.fixture_start_at,
            });
            setSportsTab({
              matchId: d.id,
              title: d.fixture_name,
              fixture_start_at: d.fixture_start_at,
              isPinned: false,
            });
            const newTabs = mainTabs.filter((t: any) => t.matchId === d.id);
            if (newTabs.length === 0)
              setMainTabs([
                ...mainTabs,
                {
                  matchId: d.id,
                  title: d.fixture_name,
                  fixture_start_at: d.fixture_start_at,
                  isPinned: false,
                },
              ]);
            setSelectedTabindex(d.id);
          }}
        />
      )}
      {params?.sport !== 'mlb' && (
        <SubSidebarNotFound pathname={params?.sport} />
      )}
      <div className='flex flex-1 flex-col w-full'>
        <HeaderTab
          tabs={mainTabs}
          setTabs={setMainTabs}
          selectedTabIndex={selectedTabIndex}
          setSelectedTabindex={setSelectedTabindex}
          sportName={params?.sport}
          onMenuClick={onMenuClick}
          setMatchTabs={setMatchTabs}
          onTabClick={(d: any) => {
            setSelectedTabindex(d.matchId);
            setMatchTabs({
              title: d.title,
              matchId: d.matchId,
              fixture_start_at: d.fixture_start_at,
            });
            setSelectedTab('summary');
          }}
        />
        {params?.sport === 'mlb' && selectedTabIndex && mainTabs.length > 0 && (
          <RosterManagerMatchView
            matchId={selectedTabIndex}
            SelectedMatches={selectedMatches}
            selectedTabIndex={selectedTabIndex}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            user={user}
            admin={admin}
            loadMatches={loadMatches}
          />
        )}
        {mainTabs?.length === 0 && (
          <div className='text-center justify-center items-center p-20 text-[#999]'>
            Please Select the Matches
          </div>
        )}

        {params?.sport !== 'mlb' && (
          <div className='text-center justify-center items-center p-20 text-[#999]'>
            Please Select the Matches
          </div>
        )}
      </div>
    </div>
  );
}
