import React, { useEffect, useState } from "react";
import CardContainer from "../global/cardContainer/CardContainer";
import InfoCard from "./utils/InfoCard";
import { get } from "@/app/apiIntegrations/fetcher";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import MatchDetails from "../matchDetails/MatchDetails";
import dateConverter from "@/app/lib/dateConverter";

type RecentActivityProps = {
  primary?: boolean;
  style?: {};
};

const RecentActivity = ({ primary, style, ...prop }: RecentActivityProps) => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [match, setMatch] = useState({
    matchId: 0,
    fixture_name: "",
  });
  const [openMatchDetails, setOpenMatchDetails] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const kpiInterval = setInterval(() => {
      loadNotification();
    }, 3000);
    loadNotification();
    return () => {
      clearInterval(kpiInterval);
    };
  }, []);

  async function loadNotification() {
    try {
      const res = await get(`/notification/recent_activities`);
      setNotifications(res.response.data);
    } catch (e) {
      console.warn(e);
    }
  }

  const onInfoCardClick = (id: any, title: any) => {
    setMatch({
      matchId: id,
      fixture_name: title,
    });
    setOpenMatchDetails(true);
  };

  return (
    <>
      <CardContainer
        header="Recent Activities"
        titleStyle={{
          lineHeight: "24px",
          color: "#121212",
          letterSpacing: "-2%",
        }}
        style={{
          width: "319px",
          height: "333px",
          padding: "20px 28px 10px",
          ...style,
        }}
      >
        <div className="pr-[6px]">
          <div className="h-full">
            {notifications.length > 0 && (
              <>
                <div className="mt-5 h-[220px]">
                  {notifications?.map((data) => {
                    const { date, monthInString, timeString } =
                      data && dateConverter(data.triggered_at);
                    return (
                      <InfoCard
                        id={data?.match_id}
                        icon={data?.icon}
                        author={data?.first_name}
                        type={data.event_type}
                        text={data?.message}
                        timeStamp={`${monthInString} ${date} ${timeString}`}
                        fixtureName={data.fixture_name}
                        onClick={onInfoCardClick}
                        style={{
                          width: "263px",
                          height: "62px",
                          margin: "15px 0",
                        }}
                      />
                    );
                  })}
                </div>
                {primary && (
                  <div
                    className="mt-3 text-center text-[#ccc] text-sm cursor-pointer"
                    onClick={() => {
                      router.push("/app/roster_maker/notifications");
                    }}
                  >
                    View All
                  </div>
                )}
              </>
            )}
          </div>
          {notifications?.length === 0 && (
            <div className="text-center text-[#999] text-sm py-5">
              No activities yet!
            </div>
          )}
        </div>
      </CardContainer>
      <MatchDetails
        id={match.matchId}
        open={openMatchDetails}
        setModelOpen={setOpenMatchDetails}
        match={match}
      />
    </>
  );
};

export default RecentActivity;
