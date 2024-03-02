"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

// icons
import sendIcon from "../../../../assets/send.svg";

// API
import { get, post } from "@/app/apiIntegrations/fetcher";

// components
import Avatar from "@/app/components/global/Avatar";
import MatchCardExtentedTask from "@/app/components/global/matchCard/MatchCardExtentedTask";
import ProgressBar from "@/app/components/global/progressBar/ProgressBar";
import Title from "@/app/components/global/title/Title";
import CommmentCard from "@/app/components/matchDetails/CommmentCard";
import MatchDetailsTaskCard from "@/app/components/matchDetails/MatchDetailsTaskCard";
import dateConverter from "@/app/lib/dateConverter";
import WorkflowStatus from "../WorkFlowStatus";
import MatchAssignmentStatus from "../MatchAssignmentStatus";
import MatchStatus from "../MatchStatus";
import { allowedToUseMatchStatus } from "@/app/helper/sports";

type PageContainerProps = {
  match: any;
  user: any;
  taskInfo: any;
};
let interval: any = null;

export default function SummaryPageContainer(props: PageContainerProps) {
  const { match, user, taskInfo } = props;

  const [activities, setActivities] = useState<any[]>([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (match?.id) loadActivities(match?.id);
    if (user) {
      interval = setInterval(() => {
        if (match?.id) loadActivities(match?.id);
      }, 3000);
    }

    return () => clearInterval(interval);
  }, [match]);

  async function loadActivities(id: any) {
    try {
      const res = await get(`notification/activities?matchId=${id}`);
      setActivities(res.response.data);
    } catch (e) {
      console.warn(e);
    }
  }

  function addComment() {
    if (comment !== "") {
      try {
        const sendComment = post(`/notification/comment`, {
          matchId: match?.id,
          msg: comment,
        });
        setComment("");
      } catch (e) {
        console.warn(e);
      }
    } else {
      console.warn("");
    }
  }

  // match date
  const fixture_start_at = dateConverter(match?.fixture_start_at);
  const MatchDate = `${fixture_start_at?.monthInString} ${fixture_start_at?.date}, ${fixture_start_at?.year} ${fixture_start_at?.timeString}`;

  // created
  const created_at = dateConverter(match?.userInfo?.created_at);
  const matchCreated = `${created_at?.monthInString} ${created_at?.date}, ${created_at?.year} ${created_at?.timeString}`;

  // due date
  const due_date = dateConverter(match?.userInfo?.due_date);
  const dueDate = `${due_date?.monthInString} ${due_date?.date}, ${due_date?.year} ${due_date?.timeString}`;

  // last modified time
  const last_modified = dateConverter(match?.userInfo?.updated_at);
  const lastModified = `${last_modified?.monthInString} ${last_modified?.date}, ${last_modified?.year} ${last_modified?.timeString}`;

  return (
    <div className="h-[75vh] grid grid-cols-2 gap-10 text-[#141522] px-3 py-2.5">
      <div className="h-full grid grid-cols-2 gap-10">
        <div className="bg-white border rounded-[4px] p-7 py-10">
          <Title title="Match Details" size="large" />
          <div className="flex justify-between items-center text-sm font-semibold mt-5">
            <div className="flex flex-col items-start">
              <p>Home team</p>
              {match?.team1_logo_image ? (
                <Avatar
                  image={match?.team1_logo_image}
                  name={match?.team1_short_name}
                  width={80}
                  height={80}
                />
              ) : null}
            </div>
            <div className="w-[30px] h-[30px] bg-[#F9F9F9] text-sm font-semibold flex items-center justify-center rounded-[4px]">
              VS
            </div>
            <div className="flex flex-col items-end">
              <p>Away Team</p>
              {match?.team2_logo_image ? (
                <Avatar
                  image={match?.team2_logo_image}
                  name={match?.team2_short_name}
                  width={80}
                  height={80}
                />
              ) : null}
            </div>
          </div>
          <div className="flex items-center justify-between my-10 text-sm font-semibold">
            <div className="w-1/2">
              <p>Venue</p>
              <p className="text-[16px] font-normal text-[#54577A]">
                {match?.venue_name && `${match?.venue_name},`}{" "}
                {match?.country_alpha2_code && `${match?.country_alpha2_code}.`}
              </p>
            </div>
            <div className="w-1/2 text-right">
              <p>Date</p>
              <p className="text-[16px] font-normal text-[#54577A]">
                {/* Jul 6, 2023 6:05 PM ET */}
                {match?.fixture_start_at && MatchDate}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm font-semibold">
            <div>
              <p>Match Status</p>
              <div className="text-[#54577A]">
                {allowedToUseMatchStatus.includes(user?.title) && match ? (
                  <MatchStatus status={match?.m_status} />
                ) : (
                  <MatchAssignmentStatus
                    status={match?.match_assignments_status}
                  />
                )}
              </div>
            </div>
            <div className="text-right">
              <p>Weather</p>
              <p className="text-[16px] font-normal text-[#54577A]">
                36’ Mostly Warmer
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white border rounded-[4px] p-7 py-10">
          <Title title="Task Details" size="large" />
          <div className="flex justify-between items-start text-sm font-semibold mt-5">
            <div>
              <p className='mb-2.5'>Reporter</p>
              <Avatar
                image={''}
                name={`${match?.userInfo?.reporter_first_name} ${match?.userInfo?.reporter_last_name}`}
                width={60}
                height={60}
              />
            </div>
            <div className='flex flex-col items-end'>
              <p className='mb-2.5'>Last Modified by</p>
              <Avatar
                image={''}
                name={`${match?.userInfo?.trader_first_name} ${match?.userInfo?.trader_last_name}`}
                width={60}
                height={60}
              />
            </div>
          </div>
          <div className="flex items-start justify-between my-10 text-sm font-semibold gap-5">
            <div>
              <p>Created at</p>
              <p className="text-[16px] font-normal text-[#54577A]">
                {match?.userInfo?.created_at && matchCreated}
              </p>
            </div>
            <div className="text-right">
              <p>Due Date</p>
              <p className="text-[16px] font-normal text-[#54577A]">
                {match?.userInfo?.due_date && dueDate}
              </p>
            </div>
          </div>
          <div className="flex items-start justify-between text-sm font-semibold">
            <div>
              <p>Workflow Status</p>
              <p className="text-sm font-normal text-[#54577A]">
                <WorkflowStatus status={match?.match_assignments_status} />
              </p>
            </div>
            <div className="text-right">
              <p>Last Modified Time</p>
              <p className="w-32 text-[16px] font-normal text-[#54577A]">
                {match?.userInfo?.updated_at && lastModified}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white border rounded-[4px] px-5 py-10">
          <Title title="Task" size="large" />
          <div className="h-auto">
            <div className="flex items-start justify-between mb-2.5 text-[16px] font-medium mt-12">
              <div>Progress</div>
              <div className="text-[#4285F4]">
                {match?.match_assignments_overall_task_progress
                  ? match?.match_assignments_overall_task_progress
                  : 0}
                %
              </div>
            </div>
            <ProgressBar
              percentage={
                match?.match_assignments_overall_task_progress
                  ? match?.match_assignments_overall_task_progress
                  : 0
              }
            />
          </div>
          <div className="mt-10">
            <MatchCardExtentedTask matchId={match?.id} />
          </div>
        </div>
        <div className="w-full h-full bg-white border rounded-[4px] px-5 py-10">
          <Title title="Game Actions" size="large" />
          <div className="w-full h-[300px] flex items-center justify-center">
            Game action avail only in Live
          </div>
        </div>
      </div>
      <div className="h-full bg-white rounded-[4px] border">
        <div className="w-full h-full flex-1">
          <div className=" bg-white pt-5 overflow-hidden rounded-lg flex flex-col">
            <div className="mb-0 px-5 pb-5 border-b">
              <Title title="Activities" size="large" />
            </div>
            <div className="bg-[rgba(237,237,237,.4)] border w-full h-[clamp(750px,68vh,85vh)] overflow-y-scroll shadow-[linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.03) 100%)]">
              {activities[0]?.notifications.map((d: any) => {
                const { date, monthInString, timeString } = dateConverter(
                  d.triggered_at
                );

                return d.event_type === "COMMENT" ? (
                  <CommmentCard
                    type={d.event_type}
                    name={`${d.first_name} ${d.last_name}`}
                    message={d.message}
                    date={`${monthInString} ${date}`}
                    time={timeString}
                    rowDate={d.triggered_at}
                  />
                ) : (
                  <MatchDetailsTaskCard
                    type={d.event_type}
                    name={`${d.first_name}`}
                    message={d.message}
                    date={`${monthInString} ${date}`}
                    time={timeString}
                  />
                );
              })}
            </div>
            <div className=" w-full h-[70px] bg-white my-auto p-5 flex items-center justify-between">
              <input
                type="text"
                placeholder="Add a Comment"
                className="h-10 w-full outline-none"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") addComment();
                }}
              />
              <div
                className={`w-8 h-8 rounded-[5px] flex items-center justify-center cursor-pointer ${
                  comment !== "" ? "bg-[#4285F4]" : "bg-[#4285F450]"
                }`}
                onClick={addComment}
              >
                <Image src={sendIcon} alt="" width={20} height={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
