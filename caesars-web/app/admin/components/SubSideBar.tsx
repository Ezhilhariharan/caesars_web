import { useEffect, useState } from 'react';

// components
import SideSidebarLink from '@/app/components/Sidebar/SubSidebarLink';

export default function SubSidebarHome() {
  const [admin, setAdmin] = useState<any>({});

  useEffect(() => {
    //checking for the session
    const admin = localStorage.getItem('admin');
    if (admin) {
      try {
        const user_p = JSON.parse(admin);
        setAdmin(user_p);
      } catch (e) {
        alert('Invalid admin data');
      }
    } else {
    }
  }, []);

  return (
    <div style={{ width: 240, borderRight: '1px solid #EDEDED' }}>
      <div className='font-semibold text-xl pl-[5px] mt-4 text-[#0D0D54]'>
        Caesars Entertainment
      </div>
      <div className='font-normal text-sm pl-[5px] text-[#4F5B67]'>
        Player Props System
      </div>
      {admin?.is_superadmin && (
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
            // {
            //   title: 'Leagues',
            //   isActive: true,
            //   link: '/admin/app/leagues',
            //   onclick: () => {
            //     localStorage.setItem('matches tab', '');
            //   },
            // },
            {
              title: 'Members',
              isActive: false,
              link: '/admin/app/members',
              onclick: () => {
                localStorage.setItem('members tab', '');
                localStorage.setItem('profile', '');
              },
            },
            // {
            //   title: 'Market',
            //   isActive: false,
            //   link: '/admin/app/market',
            //   onclick: () => {
            //     localStorage.setItem('profile', '');
            //   },
            // },
            // {
            //   title: 'Integrations',
            //   isActive: false,
            //   link: '/admin/app/integrations',
            //   onclick: () => {
            //     localStorage.setItem('profile', '');
            //   },
            // },
          ].map((d, i) => (
            <div key={d.title}>
              <SideSidebarLink {...d} />
            </div>
          ))}
        </div>
      )}

      {!admin?.is_superadmin && (
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
            // {
            //   title: 'Leagues',
            //   isActive: true,
            //   link: '/admin/app/leagues',
            //   onclick: () => {
            //     localStorage.setItem('matches tab', '');
            //   },
            // },
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
