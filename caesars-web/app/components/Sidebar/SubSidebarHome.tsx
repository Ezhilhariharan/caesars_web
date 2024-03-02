import { useEffect, useState } from 'react';

// lib
import { getAdminFromLocalstorage } from '@/app/lib/localstorageHelpers';

// components
import SideSidebarLink from './SubSidebarLink';

export default function SubSidebarHome() {
  const [user, setUser] = useState();
  const [admin, setadmin] = useState<any>({});

  useEffect(() => {
    //checking for the session
    const user = localStorage.getItem('user');
    if (!user) {
      setadmin(getAdminFromLocalstorage());
    } else {
      try {
        const user_p = JSON.parse(user);
        setUser(user_p);
      } catch (e) {
        alert('Invalid user data');
      }
    }
  }, []);

  return (
    <div style={{ width: 240, borderRight: '1px solid #EDEDED' }}>
      <div className='font-semibold text-xl pl-[5px] mt-[15px] text-[#0D0D54]'>
        Caesars Entertainment
      </div>
      <div className='font-normal text-sm pl-[5px] text-[#4F5B67]'>
        Player Props System
      </div>
      {user && (user as any)?.title === 'roster_lead' && (
        <div style={{ marginTop: 47, fontSize: 16 }}>
          {[
            {
              title: 'Overview',
              isActive: false,
              link: '/app/roster_lead/overview',
            },
            {
              title: 'Teams',
              isActive: false,
              link: '/app/roster_lead/teams',
            },
            {
              title: 'Matches',
              isActive: true,
              link: '/app/roster_lead/matches',
              onclick: () => {
                localStorage.setItem('matches tab', '');
              },
            },
            {
              title: 'Members',
              isActive: false,
              link: '/app/roster_lead/members',
            },
            {
              title: 'Notifications',
              isActive: false,
              link: '/app/roster_lead/notifications',
            },
          ].map((d, i) => (
            <div key={d.title}>
              <SideSidebarLink {...d} />
            </div>
          ))}
        </div>
      )}

      {user && (user as any)?.title === 'roster_maker' && (
        <div style={{ marginTop: 47, fontSize: 16 }}>
          {[
            {
              title: 'Overview',
              isActive: false,
              link: '/app/roster_maker/overview',
            },
            {
              title: 'Teams',
              isActive: false,
              link: '/app/roster_maker/teams',
            },
            {
              title: 'Matches',
              isActive: false,
              link: '/app/roster_maker/matches',
              onclick: () => {
                localStorage.setItem('matches tab', '');
              },
            },
            {
              title: 'Notifications',
              isActive: false,
              link: '/app/roster_maker/notifications',
            },
          ].map((d, i) => (
            <div key={d.title}>
              <SideSidebarLink {...d} />
            </div>
          ))}
        </div>
      )}

      {user && (user as any)?.title === 'trading_lead' && (
        <div style={{ marginTop: 47, fontSize: 16 }}>
          {[
            {
              title: 'Overview',
              isActive: false,
              link: '/app/trading_lead/overview',
            },
            {
              title: 'Teams',
              isActive: false,
              link: '/app/trading_lead/teams',
            },
            {
              title: 'Matches',
              isActive: false,
              link: '/app/trading_lead/matches',
              onclick: () => {
                localStorage.setItem('matches tab', '');
              },
            },
            {
              title: 'Members',
              isActive: false,
              link: '/app/trading_lead/members',
            },
            {
              title: 'Notifications',
              isActive: false,
              link: '/app/trading_lead/notifications',
            },
          ].map((d, i) => (
            <div key={d.title}>
              <SideSidebarLink {...d} />
            </div>
          ))}
        </div>
      )}

      {(user as any)?.title === 'pre_game_trader' && (
        <div style={{ marginTop: 47, fontSize: 16 }}>
          {[
            {
              title: 'Overview',
              isActive: false,
              link: '/app/pre_game_trader/overview',
            },
            {
              title: 'Teams',
              isActive: false,
              link: '/app/pre_game_trader/teams',
            },
            {
              title: 'Matches',
              isActive: false,
              link: '/app/pre_game_trader/matches',
              onclick: () => {
                localStorage.setItem('matches tab', 'Newly Assigned');
              },
            },
            {
              title: 'Notifications',
              isActive: false,
              link: '/app/pre_game_trader/notifications',
            },
          ].map((d, i) => (
            <div key={d.title}>
              <SideSidebarLink {...d} />
            </div>
          ))}
        </div>
      )}

      {user && (user as any)?.title === 'in_game_trader' && (
        <div style={{ marginTop: 47, fontSize: 16 }}>
          {[
            {
              title: 'Overview',
              isActive: false,
              link: '/app/in_game_trader/overview',
            },
            {
              title: 'Matches',
              isActive: false,
              link: '/app/in_game_trader/matches',
              onclick: () => {
                localStorage.setItem('matches tab', '');
              },
            },
            {
              title: 'Notifications',
              isActive: false,
              link: '/app/in_game_trader/notifications',
            },
          ].map((d, i) => (
            <div key={d.title}>
              <SideSidebarLink {...d} />
            </div>
          ))}
        </div>
      )}

      {!user && admin?.is_superadmin && (
        <div style={{ marginTop: 47, fontSize: 16 }}>
          {[
            {
              title: 'Overview',
              isActive: false,
              link: '/admin/app/overview',
              onclick: () => {
                localStorage.setItem('profile', '');
              },
            },
            {
              title: 'Matches',
              isActive: true,
              link: '/admin/app/matches',
              onclick: () => {
                localStorage.setItem('matches tab', '');
                localStorage.setItem('profile', '');
              },
            },

            {
              title: 'Members',
              isActive: false,
              link: '/admin/app/members',
              onclick: () => {
                localStorage.setItem('members tab', '');
                localStorage.setItem('profile', '');
              },
            },
            {
              title: 'Market',
              isActive: false,
              link: '/admin/app/market',
              onclick: () => {
                localStorage.setItem('profile', '');
              },
            },
            {
              title: 'Integrations',
              isActive: false,
              link: '/admin/app/integrations',
              onclick: () => {
                localStorage.setItem('profile', '');
              },
            },
          ].map((d, i) => (
            <div key={d.title}>
              <SideSidebarLink {...d} />
            </div>
          ))}
        </div>
      )}

      {!user && !admin?.is_superadmin && (
        <div style={{ marginTop: 47, fontSize: 16 }}>
          {[
            {
              title: 'Overview',
              isActive: false,
              link: '/admin/app/overview',
            },
            {
              title: 'Matches',
              isActive: true,
              link: '/admin/app/matches',
              onclick: () => {
                localStorage.setItem('matches tab', '');
              },
            },

            {
              title: 'Members',
              isActive: false,
              link: '/admin/app/members',
              onclick: () => {
                localStorage.setItem('members tab', '');
              },
            },
          ].map((d, i) => (
            <div key={d.title}>
              <SideSidebarLink {...d} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
