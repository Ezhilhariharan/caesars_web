import React from 'react';
import Image, { StaticImageData } from 'next/image';
import commentIcon from '../../../assets/icons/activity/comment.svg';
import updateIcon from '../../../assets/icons/activity/update.svg';
import assignIcon from '../../../assets/icons/activity/assign.svg';
import approveIcon from '../../../assets/icons/activity/approve.svg';
import rejectIcon from '../../../assets/icons/activity/re-assign.svg';
import matchStartIcon from '../../../assets/icons/activity/match-start.svg';
import matchEndIcon from '../../../assets/icons/activity/match-end.svg';

import { useRouter } from 'next/navigation';

type InfoCardProps = {
  id: number;
  icon: string | StaticImageData;
  author: string;
  text: string;
  timeStamp: string;
  fixtureName: string;
  onClick: (id: any, title: any) => void;
  type: string;
  style?: {};
};

const InfoCard = (props: InfoCardProps) => {
  const {
    id,
    icon,
    author,
    text,
    type,
    timeStamp,
    fixtureName,
    onClick,
    ...prop
  } = props;
  const router = useRouter();

  const typeOsMsg =
    type === 'ROSTER_CREATE' ||
    type === 'ROSTER_LINEUP_UPDATE' ||
    type === 'PLAYER_PROPS_MARKET_COMPLETED'
      ? updateIcon
      : type === 'MATCH_ASSIGN'
      ? assignIcon
      : type === 'COMMENT'
      ? commentIcon
      : type === 'MATCH_APPROVED'
      ? approveIcon
      : type === 'MATCH_REJECTED'
      ? rejectIcon
      : type === 'LIVE_MATCH_STARTED'
      ? matchStartIcon
      : type === 'LIVE_MATCH_ENDED' && matchEndIcon;

  return (
    <article
      className='flex items-start'
      key={id}
      {...prop}
      onClick={() => onClick(id, fixtureName)}
    >
      <Image
        src={typeOsMsg}
        alt='icons'
        width={28}
        height={28}
        className='mt-1 cursor-pointer'
      />
      <div className='w-[223px] cursor-pointer text-xs font-normal pl-3'>
        <div className='elipsis text-[#141522] leading-[18px] mb-1.5'>
          <span className='font-semibold capitalize'>{author}</span>{' '}
          <span className='font-normal'>{text}</span>
        </div>
        <p className='text-[#54577A] font-semibold opacity-50'>{timeStamp}</p>
      </div>
    </article>
  );
};

export default InfoCard;
