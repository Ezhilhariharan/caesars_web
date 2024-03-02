import React from 'react';
import Image, { StaticImageData } from 'next/image';
import Avatar from '../global/Avatar';
import dateConverter from '@/app/lib/dateConverter';
// import notificationProfile from "../../assets/notification-card.svg";

type NotificationCardProps = {
  id: number;
  image: string | StaticImageData;
  firstName?: string;
  lastName?: string;
  eventType?: string;
  text?: string;
  triggeredAt?: any;
};

const NotificationCard = (props: NotificationCardProps) => {
  const { image, firstName, lastName, eventType, text, triggeredAt } = props;
  const { date, monthInString, timeString } = dateConverter(triggeredAt);

  return (
    <div className='w-full flex items-center justify-between p-5'>
      <div className='flex'>
        {/* <Image src={image} alt='' width={51} height={51} /> */}
        <Avatar
          image={image}
          name={`${firstName?.toUpperCase()} ${lastName?.toUpperCase()}`}
          width={50}
          height={50}
        />{' '}
        <div className='pl-5'>
          <div className='flex justify-between items-center gap-5 mb-2'>
            <div className='text-base font-medium capitalize'>
              {firstName} {lastName}
            </div>
            {eventType === 'COMMENT' && (
              <div className='text-[14px] font-normal text-[#54577A]'>
                Commented on the Match:
              </div>
            )}
          </div>
          <div className='text-[14px] font-normal text-[#54577A]'>{text}</div>
        </div>
      </div>
      <div className='text-[14px] font-normal text-[#B6B6B6]'>
        {monthInString} {date}
        <br />
        {timeString}
      </div>
    </div>
  );
};

export default NotificationCard;
