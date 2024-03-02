import React, { useEffect, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";

// icons
import scrollToTop from "../../assets/icons/scrollToTop.svg";

// API
import { get } from "@/app/apiIntegrations/fetcher";

// components
import CardContainer from "../global/cardContainer/CardContainer";
import FeedCard from "./components/FeedCard";

type Props = {
  match?: any;
  user?: any;
  id: number | string;
  homeTeamLogo?: string | StaticImageData;
  awayTeamLogo?: string | StaticImageData;
};

const FeedsContainer = (props: Props) => {
  const { match, user, id, homeTeamLogo, awayTeamLogo } = props;
  const [feeds, setFeeds] = useState([]);
  const [unreadCount, setUnreadCount] = useState(4);
  const [isUnread, setIsUnread] = useState(true);
  const feedContainerRef = useRef<HTMLDivElement>(null);

  let feed_interval_timer: any;

  useEffect(() => {
    if (id) loadFeed();
    feed_interval_timer = setInterval(() => {
      if (id) loadFeed();
    }, 3000);
    return () => {
      clearInterval(feed_interval_timer);
    };
  }, []);
  async function loadFeed() {
    try {
      const res = await get(
        `/match-feed-events?limit=20&match_id=${match?.id}`
      );
      setFeeds(res.data);
    } catch (e) {
      console.warn(e);
    }
  }

  const unreadMsgComponent = (
    <div
      className="flex items-center gap-2.5 cursor-pointer transition-all duration-300 ease-linear"
      onClick={() => {
        feedContainerRef.current?.scrollTo(0, 0);
        setIsUnread(false);
      }}
    >
      <p className="text-sm font-medium text-[#4285F4]">
        {unreadCount} New feed items
      </p>
      <Image src={scrollToTop} alt="scroll to top" width={25} height={25} />
    </div>
  );

  return (
    <CardContainer
      header={user?.user_role_id < 3 ? "Activity" : "Live Feed"}
      // rightSideComponent={isUnread ? unreadMsgComponent : ''}
      headerStyle={{
        background: "#F9F9F9",
        padding: "10px 20px",
      }}
    >
      <div className="bg-[#F9F9F9] flex justify-between items-center px-5 text-xs pb-2.5 text-[#9A9A9A]">
        <div>Started on 9:12:30 AM</div>
        <div>Last Updated at 11:35:45 AM</div>
      </div>
      <div
        ref={feedContainerRef}
        className="px-5 max-h-[75vh] overflow-hidden overflow-y-scroll scroll-smooth"
      >
        {feeds.length === 0 && <div>No Feed</div>}
        {feeds.map((d: any, i) => {
          return (
            <FeedCard
              image={""}
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
      </div>
    </CardContainer>
  );
};

export default FeedsContainer;
