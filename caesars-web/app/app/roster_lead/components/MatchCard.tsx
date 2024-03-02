import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// custom hooks
import { useToggle } from "@/app/hooks/useToggle";

// icons
import timeCircle from "../assets/time-circle.svg";

// components
import Title from "@/app/components/global/title/Title";
import StatusOftask from "@/app/components/global/StatusOftask";
import UpcomingMatchProgress from "@/app/components/global/matchCard/UpcomingMatchCardProgress";
import MatchCardExtentedTask from "@/app/components/global/matchCard/MatchCardExtentedTask";
import MatchDeatilsCard from "@/app/components/global/MatchDeatilsCard";
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
};

const MatchCard = (props: Props) => {
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
  } = props;

  const router = useRouter();
  const [openModal, setopenModal] = useToggle(false);
  return (
    <div className="w-full h-full">
      <div className="w-full h-[150px] flex justify-center items-center">
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
        <div className="flex pb-2 border-b border-[#F5F5F7] items-end justify-between">
          <div className="h-full flex flex-col justify-between py-1">
            <h2 className="text-base font-semibold text-[#141522]">
              {sports.team1_name}{" "}
              <span className="h-3 text-xs font-semibold">VS</span>{" "}
              {sports.team2_name}
            </h2>
            <p className="text-xs font-normal text-[#54577A]">
              {/* Nationals Park,Washington US. */}
              {sports.location?.city}, {sports.location?.country}.
            </p>
          </div>
          <div className="text-xs font-semibold text-[#54577A]">{date}</div>
        </div>
      </div>

      {primary && (
        <div className="px-5 mt-3">
          <UpcomingMatchProgress
            percentage={progress.percentage}
            style={{
              padding: 0,
              fontSize: 14,
            }}
          />
        </div>
      )}

      <div className="h-10 my-2 flex justify-between items-center px-5">
        <div className="text-xs font-semibold text-[#54577A]">{date}</div>

        {/* <div className='text-[#34A770] text-base font-medium flex items-center gap-2'>
          <Image src={timeCircle} alt='time circle' />
          <p className=''>
            <StatusOftask status={match && match.match_status} />
          </p>
        </div> */}
      </div>

      {primary ? (
        <>
          <div className="px-5">
            <div className="flex items-center justify-between pt-2 border-t border-[#F5F5F7]">
              <Title title="Task" style={{ color: "#141522" }} />
            </div>
            <div className="my-4">
              <MatchCardExtentedTask matchId={matchId} primary={false} />
            </div>

            {status === 0 ? (
              <button
                className="w-full h-[44px] text-sm font-semibold text-white rounded-[10px] my-3 bg-[#4285F4]"
                onClick={() => setopenModal(true)}
              >
                View Task
              </button>
            ) : status === 1 ? (
              <button
                className="w-full h-[44px] text-sm font-semibold text-white rounded-[10px] my-3 bg-[#4285F4]"
                onClick={() => setopenModal(true)}
              >
                View Task
              </button>
            ) : (
              status === 2 && (
                <div className="flex items-center justify-between gap-10">
                  <button
                    className="w-full h-[44px] text-sm font-semibold text-white rounded-[10px] my-3 bg-[#4285F4]"
                    onClick={() => setopenModal(true)}
                  >
                    Approve
                  </button>
                  <button
                    className="w-full h-[44px] text-sm font-semibold text-white rounded-[10px] my-3 bg-[#4285F4]"
                    onClick={() => setopenModal(true)}
                  >
                    Reject
                  </button>
                </div>
              )
            )}
          </div>
        </>
      ) : (
        <div className="w-full border-t px-4 py-4 pb-2">
          <MatchDeatilsCard match={match} venue={venue} rowDate={rowDate} />
          <button
            className="w-full h-[44px] text-sm font-semibold text-white rounded-[10px] my-3 mb-[40px] bg-[#4285F4]"
            onClick={() => setopenModal(true)}
          >
            View Match
          </button>
        </div>
      )}
      <MatchDetails
        match={match}
        title={sports?.team1_name + " vs " + sports?.team2_name}
        id={matchId}
        open={openModal}
        setModelOpen={setopenModal}
      />
    </div>
  );
};

export default MatchCard;
