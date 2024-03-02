'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SubSidebarHomeIcons from './SubSidebarHomeIcons';

interface SBProps {
  title: string;
  link: string;
  onclick?: () => void;
}
export default function SideSidebarLink(props: SBProps) {
  const { title, link, onclick } = props;
  const path = usePathname();
  const isActive = path.includes(link);

  return (
    <Link href={`${link}`} onClick={onclick}>
      <div
        className={`p-2.5 flex items-center pl-6 cursor-pointer mb-4 border-r-[5px] ${
          isActive
            ? 'bg-[#ECF3FE] border-[#4285F4] font-medium'
            : 'bg-[#f9f9f9] border-[#f9f9f9] font-light'
        }`}
      >
        <SubSidebarHomeIcons
          title={title}
          color={isActive ? '#4285F4' : '#14171C'}
        />
        <span
          className={`ml-2.5 ${isActive ? 'font-semibold' : 'font-normal'}`}
        >
          {title}
        </span>
      </div>
    </Link>
  );
}
