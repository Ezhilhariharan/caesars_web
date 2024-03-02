import React, { useEffect, useRef, useState } from 'react';
import Image, { StaticImageData } from 'next/image';

// icons
import scrollToTop from '../../../assets/icons/scrollToTop.svg';

// API
import { get } from '@/app/apiIntegrations/fetcher';

// components
import CardContainer from '../../global/cardContainer/CardContainer';
import FeedCard from './FeedCard';
import { Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { allowedToUseMatchStatus } from '@/app/helper/sports';

let skip: any = 0;
let count = 0;

type Props = {
  match?: any;
  user?: any;
  id: number | string;
  homeTeamLogo?: string | StaticImageData;
  awayTeamLogo?: string | StaticImageData;
};

const FeedCardContainer = (props: Props) => {
  const { match, user, id, homeTeamLogo, awayTeamLogo } = props;
  const [loading, setLoading] = useState(false);
  const [feeds, setFeeds] = useState<any>([]);
  const [unreadCount, setUnreadCount] = useState(4);
  const [isUnread, setIsUnread] = useState(true);
  const feedContainerRef = useRef<HTMLDivElement>(null);

  let feed_interval_timer: any;

  // temp commented
  useEffect(() => {
    if (id) loadFeed();
    feed_interval_timer = setInterval(() => {
      loadFeed();
    }, 10000);

    return () => {
      clearInterval(feed_interval_timer);
    };
  }, []);

  async function loadFeed() {
    setLoading(true);
    try {
      const res = await get(
        `/match-feed-events?limit=20&skip=${skip}&match_id=${id}`
      );
      count = res.count;
      //   skip += res.data.length;
      setFeeds([...feeds, ...res.data]);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.warn(e);
    }
  }

  const unreadMsgComponent = (
    <div
      className='flex items-center gap-2.5 cursor-pointer transition-all duration-300 ease-linear'
      onClick={() => {
        feedContainerRef.current?.scrollTo(0, 0);
        setIsUnread(false);
      }}
    >
      <p className='text-sm font-medium text-[#4285F4]'>
        {unreadCount} New feed items
      </p>
      <Image src={scrollToTop} alt='scroll to top' width={25} height={25} />
    </div>
  );

  return (
    <CardContainer
      header={
        allowedToUseMatchStatus.includes(user?.title) ? 'Activity' : 'Live Feed'
      }
      // rightSideComponent={isUnread ? unreadMsgComponent : ''}
      headerStyle={{
        background: '#F9F9F9',
        padding: '10px 20px',
        borderRadius: '8px',
      }}
      style={{
        height: '100%',
      }}
    >
      <div className='bg-[#F9F9F9] flex justify-between items-center px-5 text-xs pb-2.5 text-[#9A9A9A]'>
        {allowedToUseMatchStatus.includes(user?.title) && (
          <>
            <div>
              Started on{' '}
              {match?.match_started_at
                ? new Date(match?.match_started_at).toLocaleTimeString('en-US')
                : '--'}
            </div>
            <div>
              Last Updated at{' '}
              {/* {dateConverter(feeds[0]?.event_occurred_ts).timeStringWithMilliSec} */}
              {feeds.length > 0
                ? new Date(+feeds[0].event_occurred_ts).toLocaleTimeString(
                    'en-US'
                  )
                : '--'}
            </div>
          </>
        )}
      </div>
      <div
        ref={feedContainerRef}
        className='px-5 max-h-[75vh] overflow-hidden  overflow-y-scroll scroll-smooth'
      >
        {/* event_occurred_ts */}
        <div
          id='scrollableDiv'
          style={{
            height: '75vh',
            overflow: 'auto',
            // padding: '0 16px',
            // border: "1px solid rgba(140, 140, 140, 0.35)",
          }}
          className='listScroll'
        >
          {allowedToUseMatchStatus.includes(user?.title) ? (
            <InfiniteScroll
              dataLength={feeds.length}
              next={() => {
                skip += 20;
                loadFeed();
              }}
              hasMore={feeds?.length < count}
              loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
              //   endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
              scrollableTarget='scrollableDiv'
            >
              {!loading && feeds?.length === 0 && (
                <div className='w-full h-full flex justify-center items-center'>
                  No Feed
                </div>
              )}
              {feeds?.length > 0 &&
                feeds?.map((d: any, i: any) => {
                  return (
                    <FeedCard
                      image={''}
                      name={d?.side}
                      type={d?.side}
                      message={d?.message}
                      score={d?.match_score}
                      time={+d?.event_occurred_ts}
                      homeTeamLogo={homeTeamLogo}
                      awayTeamLogo={awayTeamLogo}
                    />
                  );
                })}
            </InfiniteScroll>
          ) : (
            <div className='w-full h-full flex justify-center items-center text-[#121212] text-sm'>
              No Activities Available
            </div>
          )}
        </div>
      </div>
    </CardContainer>
  );
};

export default FeedCardContainer;
