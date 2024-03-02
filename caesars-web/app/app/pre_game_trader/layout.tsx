'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../../components/Sidebar';
import SubSidebarHome from '../../components/Sidebar/SubSidebarHome';
export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [showPage, setShowPage] = useState(false);
  useEffect(() => {
    //checking for the session
    const user = localStorage.getItem('user');
    if (!user) {
      alert('Not loggedin');
      router.push('/login');
    } else {
      try {
        const user_p = JSON.parse(user);
        setShowPage(true);
      } catch (e) {
        alert('Invalid user data');
        router.push('/login');
      }
    }
  }, []);
  return (
    <>
      {!showPage && (
        <div className='w-full h-full overflow-hidden flex items-center justify-center'>
          Please Wait Loading...
        </div>
      )}
      {showPage && (
        <div className='flex flex-1 overflow-hidden'>
          <div className='flex flex-1 overflow-hidden'>{children}</div>
        </div>
      )}
    </>
  );
}
