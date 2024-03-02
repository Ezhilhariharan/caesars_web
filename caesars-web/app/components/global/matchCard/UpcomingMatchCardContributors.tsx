import Image from 'next/image';
import TimeCircleRed from '../../../assets/icons/time-circle-red.svg';
import ContributorsCard from './ContributorsCard';

type MatchCardContributorsProps = {
  users?: {
    id: number;
    first_name: string;
    last_name: string;
    middle_name: string;
  }[];
  matchDate?: string;
  style?: {};
  width?: number;
  height?: number;
};

const UpcomingMatchContributors = (props: MatchCardContributorsProps) => {
  const { users, matchDate, width, height, ...prop } = props;

  return (
    <footer
      className='h-[60px] flex items-center justify-between px-6'
      {...prop}
    >
      <div className='text-[#FF6C37] text-base font-medium flex items-center'>
        <Image
          src={TimeCircleRed}
          alt='time-circle-ed'
          width={24}
          height={24}
        />
        <p className='pl-2'>{matchDate}</p>
      </div>
      <ContributorsCard user={users} width={width} height={height} />
    </footer>
  );
};

export default UpcomingMatchContributors;
