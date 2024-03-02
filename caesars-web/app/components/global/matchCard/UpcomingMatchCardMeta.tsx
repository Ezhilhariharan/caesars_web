import Image from 'next/image';
import mlbLogo from '../../../assets/logos/mlbLogo.png';

type MatchCardMetaProps = {
  team1_name?: string;
  team2_name?: string;
  location?: {
    name?: string;
    city?: string;
    country?: string;
  };
  image: string;
  style?: {};
};

const UpcomingMatchMeta = (props: MatchCardMetaProps) => {
  const { team1_name, team2_name, location, image, ...prop } = props;
  return (
    <div
      className='w-full h-[65px] flex items-center justify-between pt-3 px-5'
      {...prop}
    >
      <div className='h-full max-h-[65px] flex flex-col justify-between py-1'>
        <h2 className='text-base font-semibold text-[#141522]'>
          {team1_name} <span className='h-5'>VS</span> {team2_name}
        </h2>
        <p className='text-xs font-normal text-[#54577A]'>
          {location?.name}, {location?.city}.
        </p>
      </div>
      <div className='flex items-center justify-end'>
        <Image src={image} alt='MLB Logo' width={80} height={50} />
      </div>
    </div>
  );
};

export default UpcomingMatchMeta;
