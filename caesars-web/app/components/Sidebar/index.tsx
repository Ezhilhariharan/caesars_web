'use client';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image, { StaticImageData } from 'next/image';

// icons
import smallLogo from '../../assets/logos/smallLogo.svg';
import SidebarLink from '../Sidebar/SideBarLink';

// API
import { post } from '@/app/apiIntegrations/fetcher';

// components
import Toast, { toastProps } from '../global/toast/Toast';
import Avatar from '../global/Avatar';
import UserRoleConverter from '@/app/lib/UserRoleConverter';

// antd
import { Popover } from 'antd';

type Props = {};

export default function Sidebar(props: Props) {
  const [user, setUser] = useState<any>(null);
  const [admin, setAdmin] = useState<any>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [toastPopup, setToastPopup] = useState(false);
  const [toastDetails, setToastDetails] = useState<toastProps>({
    type: 'success',
    title: '',
    discription: '',
    logo: '',
  });

  useEffect(() => {
    if (toastPopup) {
      const timeOut = setTimeout(() => {
        setToastPopup(false);
      }, 1000);
      return () => clearTimeout(timeOut);
    }
  }, [toastPopup]);

  useEffect(() => {
    setUser(getUserFromLocalstorage());
    setAdmin(getAdminFromLocalstorage());
  }, []);

  function getUserFromLocalstorage() {
    const userString = localStorage.getItem('user');
    if (!userString) return null;
    return JSON.parse(userString);
  }

  function getAdminFromLocalstorage() {
    const adminString = localStorage.getItem('admin');
    if (!adminString) return null;
    return JSON.parse(adminString);
  }

  const adminLogout = async () => {
    const res = await post(`admin/logout`);
  };

  const userLogout = async () => {
    const res = await post(`user/logout`);
  };

  const path = usePathname();
  const router = useRouter();

  const profileCardContent = (
    <div className='bg-white rounded-lg '>
      <div className='flex items-center gap-3 border-b p-3'>
        <div className='relative'>
          <div className='border-[2px] border-[#D8D8FE] rounded-full cursor-pointer'>
            <Avatar
              image={''}
              name={`${
                admin
                  ? `${admin?.first_name} ${admin?.last_name}`
                  : user && `${user?.first_name} ${user?.last_name}`
              }`}
              width={36}
              height={36}
              background='#eee'
            />
          </div>
          <span className='w-[14px] h-[14px] absolute rounded-full border-[2px] border-white contents-[""] right-0 bottom-0 bg-[#12B76A] z-20'></span>
        </div>
        <div>
          <p className='text-sm font-semibold text-[#344054] capitalize'>
            {/* {user?.first_name} {user?.last_name} */}
            {admin
              ? `${admin?.first_name} ${admin?.last_name}`
              : user && `${user?.first_name} ${user?.last_name}`}
          </p>
          <p className='text-[#667085] text-sm font-normal'>
            {admin ? admin?.email : user && user?.email}
          </p>
        </div>
      </div>
      <div className='px-3 py-2 border-b'>
        <div className='text-sm flex items-center text-[#344054] gap-2'>
          <p className='font-bold'>Team:</p>
          <p className='font-normal capitalize'>
            {admin
              ? admin?.is_superadmin
                ? 'Super Admin'
                : 'Admin'
              : user && <UserRoleConverter id={user?.title} />}
          </p>
        </div>
        <div
          className='text-sm pt-3 flex items-center font-medium text-[#344054] gap-2 cursor-pointer'
          onClick={() => {
            router.push('/app/profile/my_profile');
            setIsProfileOpen(false);
          }}
        >
          View profile
        </div>
        {/* <div className="text-sm pt-3 flex items-center justify-between text-[#344054] gap-2">
          <p className="font-medium">Settings</p>
        </div> */}
      </div>
      <div
        className='px-3 py-3 font-bold text-sm text-[#344054] cursor-pointer'
        onClick={(e) => {
          setToastPopup(true);
          setToastDetails({
            type: 'success',
            title: 'Success',
            discription: 'logout successfully',
          });
          if (admin) {
            adminLogout();
            router.push('/admin/login');
            localStorage.clear();
          }
          if (user) {
            userLogout();
            router.push('/login');
            localStorage.clear();
          }
        }}
      >
        Log Out
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex' }} className='select-none'>
      <Toast
        type={toastDetails.type}
        title={toastDetails.title}
        discription={toastDetails.discription}
        logo={toastDetails.logo}
        toggle={toastPopup}
      />
      <div
        style={{
          width: 86,
          height: '100%',
          background: 'F9F9F9',
          borderRight: '1px solid #EDEDED',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', padding: 20 }}>
          <Image src={smallLogo} alt='logo' />
        </div>
        <div style={{ flex: 1, overflow: 'scroll', marginTop: 10 }}>
          {[
            {
              title: 'Home',
              link:
                admin !== null && admin !== undefined
                  ? '/admin/app/overview'
                  : user !== null && user !== undefined
                  ? user?.title === 'roster_lead'
                    ? '/app/roster_lead/overview'
                    : user?.title === 'roster_maker'
                    ? '/app/roster_maker/overview'
                    : user?.title === 'trading_lead'
                    ? '/app/trading_lead/overview'
                    : user?.title === 'pre_game_trader'
                    ? '/app/pre_game_trader/overview'
                    : user?.title === 'in_game_trader'
                    ? '/app/in_game_trader/overview'
                    : '/app/overview'
                  : '/app/overview',
              isActive: path.includes('/app/'),
            },
            {
              title: 'MLB',
              link: '/sports/mlb',
              isActive: path.includes('/sports/mlb'),
            },
            {
              title: 'NFL',
              link: '/sports/nfl',
              isActive: path.includes('/sports/nfl'),
            },
            {
              title: 'CFB',
              link: '/sports/cfb',
              isActive: path.includes('/sports/cfb'),
            },
            {
              title: 'NBA',
              link: '/sports/nba',
              isActive: path.includes('/sports/nba'),
            },
            {
              title: 'CBB',
              link: '/sports/cbb',
              isActive: path.includes('/sports/cbb'),
            },
            {
              title: 'NHL',
              link: '/sports/nhl',
              isActive: path.includes('/sports/nhl'),
            },
          ].map((e, i) => {
            return (
              <div key={e.title}>
                <SidebarLink
                  title={e.title}
                  link={e.link}
                  isActive={e.isActive}
                  _key={e.title}
                />
              </div>
            );
          })}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', padding: 20 }}>
          <Popover
            trigger='click'
            open={isProfileOpen}
            placement='rightBottom'
            content={profileCardContent}
            arrow={false}
            onOpenChange={(open: boolean) => setIsProfileOpen(open)}
          >
            <div
              className='border-[2px] border-[#D8D8FE] rounded-full cursor-pointer'
              // onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <Avatar
                image={''}
                name={`${
                  admin
                    ? `${admin?.first_name} ${admin?.last_name}`
                    : user && `${user?.first_name} ${user?.last_name}`
                }`}
                width={35}
                height={35}
                background='#eee'
              />
            </div>
          </Popover>
        </div>
      </div>
    </div>
  );
}
