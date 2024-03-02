'use client';
import { getIcon } from '@/app/lib/getIcon';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
interface SBProps {
  title: string;
  link: string;
  isActive: boolean;
  _key: string;
}
export default function SidebarLink({ title, link, isActive, _key }: SBProps) {
  const path = usePathname();
  //   const isActive = path === link;
  return (
    <>
      {title === 'MLB' || title === 'Home' ? (
        <Link href={`${link}`} key={_key}>
          <div
            style={{
              textAlign: 'center',
              marginBottom: 5,
              cursor: 'pointer',
              borderLeft: isActive ? '5px solid #4285F4' : '5px solid #f9f9f9',
              background: isActive ? '#ECF3FE' : '#f9f9f9',
              paddingTop: 10,
              paddingBottom: 5,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Image src={getIcon(title)} alt='title' className='grayscale-0' />
            </div>
            <div style={{ color: '#6B6B6B', fontSize: 12, marginTop: 3 }}>
              {title}
            </div>
          </div>
        </Link>
      ) : (
        <div
          className='cursor-not-allowed grayscale'
          style={{
            textAlign: 'center',
            marginBottom: 5,
            paddingTop: 10,
            paddingBottom: 5,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Image src={getIcon(title)} alt='title' className='grayscale-0' />
          </div>
          <div style={{ color: '#6B6B6B', fontSize: 12, marginTop: 3 }}>
            {title}
          </div>
        </div>
      )}
    </>
  );
}
