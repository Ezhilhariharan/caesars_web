import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import moment from "moment";

// custom hooks
import { useToggle } from "@/app/hooks/useToggle";
import { useLocal } from "@/app/hooks/useLocal";
import { useSporsTabs } from "@/app/hooks/useSporsTabs";

// icons
import mlbIcon from "@/app/assets/icons/sports-icon/mlb.svg";
import Xmark from "@/app/assets1/custom-icons/Xmark";
import TickMark from "@/app/assets1/custom-icons/TickMark";
import TimeCircle from "@/app/assets1/custom-icons/TimeCircle";
import UserPlus from "@/app/assets1/custom-icons/UserPlus";

// components
import Title from "../global/title/Title";
import Avatar from "./Avatar";
import StatusOftask from "../global/StatusOftask";
import UpcomingMatchProgress from "../global/matchCard/UpcomingMatchCardProgress";
import MatchCardExtentedTask from "../global/matchCard/MatchCardExtentedTask";
import MatchDeatilsCard from "../global/MatchDeatilsCard";
import MatchDetails from "@/app/components/matchDetails/MatchDetails";

type Props = {
  matchId?: any;
  primary?: boolean;
  match?: any;
  header: {
    team1_image: string;
    team2_image: string;
  };
  sports: {
    team1_name?: string;
    team2_name?: string;
    location?: {
      name?: string;
      city?: string;
      country?: string;
    };
    image: string;
  };
  rowDate?: string;
  progress: {
    percentage?: number;
    lastModifiedDate?: string;
  };
  status?: any;
  date?: string;
  venue?: any;
  listData?: any;
  user?: any;
};

const SpecificDateMatchCard = (props: Props) => {
  const {
    matchId,
    match,
    primary = false,
    header,
    sports,
    progress,
    rowDate,
    date,
    status,
    venue,
    listData,
    user,
  } = props;
  const router = useRouter();
  const [openModal, setOpenModal] = useToggle(false);
  const [matchTabs, setMatchTabs] = useLocal("matchTabs", []);
  const [sportsTab, setSportsTab] = useSporsTabs("mlb", []);
  console.log("pendingMatches", listData);

  const viewMatches = (id: any) => {
    if (id)
      setMatchTabs({
        title: sports?.team1_name + " vs " + sports?.team2_name,
        matchId: id,
      });

    let tab: any = {
      title: match.fixture_name,
      matchId: id,
      isPinned: false,
    };

    setSportsTab(tab);
    router.push("/sports/mlb");
  };

  return (
    <div className="w-full h-full">
      <div className="w-full h-[120px] flex justify-center items-center">
        <div>
          {header.team1_image && (
            <Image src={header.team1_image} alt="" width={70} height={70} />
          )}
        </div>
        <div className="text-sm font-medium px-5">vs</div>
        <div>
          {header.team2_image && (
            <Image src={header.team2_image} alt="" width={70} height={70} />
          )}
        </div>
      </div>
      <div className="px-5">
        <div className="flex pb-1 border-b border-[#F5F5F7] items-center justify-between">
          <div className="h-full flex flex-col justify-between py-1">
            <h2 className="text-base font-semibold text-[#141522]">
              {sports.team1_name}{" "}
              <span className="h-3 text-xs font-semibold">VS</span>{" "}
              {sports.team2_name}
            </h2>
            <p className="w-[90%] text-xs font-normal text-[#54577A] ellipsisOne">
              {listData?.location_name}, {listData?.city_name}.
            </p>
          </div>
          <Image src={mlbIcon} alt="" width={70} height={50} className="" />
        </div>
      </div>
      {primary && (
        <div className="px-5 ">
          <UpcomingMatchProgress
            percentage={parseInt(
              listData?.match_assignments_overall_task_progress
            )}
            style={{
              padding: 0,
              fontSize: 14,
            }}
          />
        </div>
      )}
      {user?.title === "roster_lead" && (
        <div className="px-5  py-2 flex items-center justify-between ">
          {!listData?.ma_status &&
            !listData?.match_assignments_reporter_type && (
              <>
                <div className="flex items-center text-[#ff6c37] text-[17px] font-normal">
                  <div className="ml-1">Yet to Assign</div>
                </div>
                <UserPlus size={25} color="	#c4cad3" />
              </>
            )}
          {(listData?.ma_status === 1 || listData?.ma_status === 0) && (
            <>
              <div className="flex items-center text-[#ff6c37] text-[17px] font-normal">
                <TimeCircle size={20} color="#ff6c37" />
                <div className="ml-1">In-progress</div>
              </div>
              <Avatar />
            </>
          )}
          {listData?.ma_status === 2 && (
            <>
              <div className="flex items-center text-[#34a770] text-[16px] font-normal">
                <TimeCircle size={20} color="#34a770" />
                <div className="ml-1">Submitted</div>
              </div>
              <Avatar />
            </>
          )}
        </div>
      )}
      {/* <div className="flex items-center text-[#54577a] text-[17px] font-normal">
          <TimeCircle size={20} color="#54577a" />
          <div className="ml-1">
            Live at {moment(listData?.match_started_at).format("LT")}
          </div>
        </div>
        <Avatar /> */}

      {user?.title === "roster_lead" && (
        <div className="flex justify-center">
          {listData?.ma_status === 2 ? (
            <button
              onClick={() => viewMatches(listData?.id)}
              className="w-[90%] h-[44px]  text-sm font-semibold rounded-[10px] my-3 text-[#4285F4] border border-2 border-[#4285F4]"
            >
              View Match
            </button>
          ) : (
            <button
              onClick={() => viewMatches(listData?.id)}
              className="w-[90%] h-[44px]  text-sm font-semibold text-white rounded-[10px] my-3 bg-[#4285F4]"
            >
              View Match
            </button>
          )}
        </div>
      )}

      {/* <div className="mx-5 my-2 py-4 px-5  rounded-[10px] border-2 border-[#e0e3e8] ">
        <div className="text-[#141522] text-[21px] text-extrabold pb-2">
          Match Details
        </div>
        <div className="w-full flex justify-between">
          <div>
            <div className="text-[#141522] text-sm font-semibold mb-1">
              Venue
            </div>
            <div className="text-[#54577A] text-sm font-normal">{venue}</div>
            <div className="text-[#54577A] text-sm font-normal">
              {match?.location_name}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[#141522] text-sm font-semibold mb-1">
              Date
            </div>
            <div className="text-[#54577A] text-sm font-normal">
              {moment(listData?.match_started_at).format("ll")}
            </div>
            <div className="text-[#54577A] text-sm font-normal">
              {moment(listData?.match_started_at).format("LT")} ET
            </div>
          </div>
        </div>
      </div> */}

      {/* {primary ? (
        <> */}
      <div className="px-5">
        <div className="flex items-center justify-between pt-2 border-t border-[#F5F5F7]">
          <Title title="Task" style={{ color: "#141522" }} />
        </div>
        <div className="my-2">
          <MatchCardExtentedTask matchId={listData?.id} primary={false} />
        </div>
        {/* <div className="my-2">
              <div className="text-[#141522] text-[18px] text-extrabold mt-2">
                Status
              </div>
              <div className="border border-[#f5f5f7] my-2" />
              <div className="flex items-center justify-between my-3">
                <div>
                  <Avatar />
                  <div className="ml-2 text-[#141522] text-[18px] font-normal">
                    Pre-game Trader
                  </div>
                </div>
                <div className="text-[#34a770] text-[18px] font-medium">
                  Completed
                </div>
              </div>
              <div className="flex items-center justify-between my-3">
                <div>
                  <Avatar />
                  <div className="ml-2 text-[#141522] text-[18px] font-normal">
                    In-game Trader
                  </div>
                </div>
                <div className="text-[#4285F4] text-[18px] font-medium">
                  Assigned
                </div>
              </div>
            </div> */}
        {user?.title === "roster_lead" && (
          <>
            {!listData?.ma_status &&
              !listData?.match_assignments_reporter_type && (
                <div className="flex items-center justify-between mb-2">
                  <button
                    className="w-[45%] flex items-center justify-center h-[44px]  my-2 bg-[white]"
                    onClick={() => setOpenModal(true)}
                  >
                    <p className="text-[#F85640] text-base font-normal mr-1">
                      Reject
                    </p>
                    <div className="border-2 border-[#F85640] rounded-full">
                      <Xmark color="#F85640" size={15} />
                    </div>
                  </button>
                  <button
                    className="w-[45%] h-[44px] flex items-center justify-center my-2 rounded-[10px] bg-[#34A770]"
                    onClick={() => setOpenModal(true)}
                  >
                    <div className="border-2 border-[white] rounded-full p-1">
                      <TickMark color="white" size={9} />
                    </div>
                    <p className="text-[white] text-base font-normal ml-1">
                      Approve
                    </p>
                  </button>
                </div>
              )}
            {listData?.ma_status === 2 && (
              <button className="w-[90%] h-[44px]  text-sm font-semibold text-white rounded-[10px] my-3 bg-[#4285F4]">
                Assign
              </button>
            )}
            {(listData?.ma_status === 1 || listData?.ma_status === 0) && (
              <button className="w-[90%] h-[44px]  text-sm font-semibold text-white rounded-[10px] my-3 bg-[#4285F4]">
                View Activity
              </button>
            )}
          </>
        )}
        {user?.title === "roster_maker" && (
          <div className="flex justify-center">
            <button className="w-[90%] h-[44px]  text-sm font-semibold text-white rounded-[10px] my-3 bg-[#4285F4]">
              View Details
            </button>
            <button className="w-[90%] h-[44px] flex justify-center items-center text-base font-normal  rounded-[10px] my-3 bg-[white] border-[#34a770] border-2 ">
              <TimeCircle size={23} color="#34a770" />
              <div className="ml-1 text-[#34a770]">Submitted</div>
            </button>
          </div>
        )}

        <div className="flex justify-center">
          {/* <button className="w-[90%] h-[44px]  text-sm font-semibold text-white rounded-[10px] my-3 bg-[#4285F4]">
                View Match
              </button> */}
          {/* <button className="w-[90%] h-[44px]  text-sm font-semibold text-white rounded-[10px] my-3 bg-[#4285F4]">
               Assign the Match
              </button> */}
        </div>
      </div>
      {/* </>
      ) : (
        <div className="w-full border-t px-4 py-2 ">
          <MatchDeatilsCard match={match} venue={venue} rowDate={rowDate} />
          <button
            className="w-full h-[44px] text-sm font-semibold text-white rounded-[10px] my-3 mb-[40px] bg-[#4285F4]"
            onClick={() => setOpenModal(true)}
          >
            View Match
          </button>
        </div>
      )} */}
      <MatchDetails
        match={match}
        title={sports?.team1_name + " vs " + sports?.team2_name}
        id={matchId}
        open={openModal}
        setModelOpen={setOpenModal}
      />
    </div>
  );
};

export default SpecificDateMatchCard;
