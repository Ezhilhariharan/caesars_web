"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// icons
import liveIcon from "../../../assets/icons/play-circle-red.svg";
import playCircle from "./assets/play-circle.svg";
import Plus from "@/app/assets1/custom-icons/Plus";
import UserPlus from "@/app/assets1/custom-icons/UserPlus";

// libs
import dateConverter from "@/app/lib/dateConverter";
import dateDifferenceInDays from "@/app/lib/dateDifferenceInDays";

// hooks
import { useLocal } from "@/app/hooks/useLocal";
import { useSporsTabs } from "@/app/hooks/useSporsTabs";

// componene
import CardContainer from "@/app/components/global/cardContainer/CardContainer";
import UpcomingMatchCardHeader from "@/app/components/global/matchCard/UpcomingMatchCardHeader";
import UpcomingMatchMeta from "@/app/components/global/matchCard/UpcomingMatchCardMeta";
import AssignMatch from "../../../app/trading_lead/overview/components/AssignMatch";
import Toast, { toastProps } from "@/app/components/global/toast/Toast";

// antd
import { Modal } from "antd";

type MatchCardProps = {
  id: number;
  primary?: boolean;
  modal?: string;
  header: {
    team1_image?: string | null;
    team2_image?: string | null;
  };
  match?: any;
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
  progress?: {
    percentage?: number;
    lastModifiedDate?: string;
  };
  contributors?: {
    liveTime?: string;
    matchDate?: string;
  };
  loadMatch?: (sport: any, skip?: any) => void;
  toastPopup?: boolean;
  setToastPopup?: React.Dispatch<React.SetStateAction<boolean>>;
  toastDetails?: toastProps;
  setToastDetails?: React.Dispatch<React.SetStateAction<toastProps>>;
};

// global variable
const today = new Date();

const ManagerMatchCard = (props: MatchCardProps) => {
  const {
    id,
    primary,
    header,
    sports,
    progress,
    contributors,
    modal,
    match,
    loadMatch,
    toastPopup,
    setToastPopup,
    toastDetails,
    setToastDetails,
  } = props;

  const router = useRouter();
  const [matchTabs, setMatchTabs] = useLocal("matchTabs", []);
  const [assignModal, setAssignModal] = useState(false);
  const [sportsTab, setSportsTab] = useSporsTabs("mlb", []);

  // date convert variables
  const fixtureDate = dateConverter(match.fixture_start_at);
  const balanceDate = dateDifferenceInDays(
    new Date(match.fixture_start_at),
    new Date(today)
  );

  return (
    <CardContainer
      style={{
        width: "318px",
        height: "400px",
      }}
    >
      <UpcomingMatchCardHeader
        team1_image={match.team1_logo_image || null}
        team2_image={match.team2_logo_image || null}
        team1_name={match.team1_short_name || null}
        team2_name={match.team2_short_name || null}
        primary={false}
      />
      <UpcomingMatchMeta
        team1_name={match.team1_short_name || null}
        team2_name={match.team2_short_name || null}
        location={sports?.location}
        image={sports?.image}
      />

      <div className="h-[50px] flex items-center justify-between px-5">
        <div className="text-[#54577A] text-[12px]">Match Date</div>
        <div className="text-[#141522] text-xs font-semibold">
          {fixtureDate.date} {fixtureDate.monthInString} {fixtureDate.year}
        </div>
      </div>
      {match?.match_status <= 7 && (
        <div className="h-[50px] px-5 gap-5">
          {/* {match?.match_status === 3 && (
            <p className='text-sm text-[#54577A] font-semibold'>Not Assigned</p>
          )} */}
          {match?.match_status >= 3 && match?.match_status < 7 && (
            <p className="text-sm text-[#54577A] font-semibold">
              Live in {balanceDate} days
            </p>
          )}
          {match?.match_status === 7 && (
            <div className="flex items-center gap-2">
              <Image src={liveIcon} alt="live icon" width={20} height={20} />
              <p className="text-sm text-[#FB532E] font-semibold">Live</p>
            </div>
          )}
        </div>
      )}
      <div
        onClick={(e) => {
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
        }}
        className="h-[55px] px-5 cursor-pointer border-y-[3px] border-[#F9F9F9] text-[#54577A] text-sm font-medium flex justify-center items-center"
      >
        <span>View Full Details</span>
      </div>
      <div className="h-[80px] w-full flex items-center justify-between px-5">
        <div>
          {match?.match_status === 3 && <UserPlus color="" size={20} />}
        </div>
        <div
          className={`text-xs font-medium px-2 py-2 rounded-[4px] flex items-center gap-2.5
          ${
            match.match_status === 3
              ? "bg-[#4285F4] gap-2 cursor-pointer"
              : match.match_status === 4
              ? "bg-transparent border border-[#4285F4]"
              : match.match_status === 5
              ? "bg-transparent border border-[#4285F4]"
              : match.match_status === 6
              ? "bg-transparent border border-[#4285F4]"
              : match.match_status === 7
              ? "bg-[#FB532E] gap-2 flex-row-reverse"
              : match.match_status === 8 && "bg-[#FB532E] text-white"
          }`}
          onClick={() => {
            if (match?.match_status === 3) {
              setAssignModal(true);
            }
          }}
        >
          <p
            className={`${
              match.match_status === 3
                ? "text-white"
                : match.match_status === 4
                ? "text-[#4285F4]"
                : match.match_status === 5
                ? "text-[#4285F4]"
                : match.match_status === 6
                ? "text-[#4285F4]"
                : match.match_status === 7
                ? "bg-[#FB532E] flex-row-reverse text-white"
                : match.match_status === 8 && ""
            }`}
          >
            {match.match_status === 3
              ? "Assign"
              : match.match_status === 4
              ? "Assigned"
              : match.match_status === 5
              ? "In-progress"
              : match.match_status === 6
              ? "Submitted"
              : match.match_status === 7
              ? "Live"
              : match.match_status === 8 && "Match Ended"}
          </p>
          {match.match_status === 7 && <Image src={playCircle} alt="" />}
          {match.match_status === 3 && <Plus color="#fff" size={12} />}
        </div>
        <Modal
          footer={false}
          open={assignModal}
          centered
          onCancel={() => {
            setAssignModal(false);
          }}
        >
          <AssignMatch
            match={match}
            open={assignModal}
            setOpen={setAssignModal}
            toastPopup={toastPopup}
            setToastPopup={setToastPopup}
            toastDetails={toastDetails}
            setToastDetails={setToastDetails}
            loadMatch={loadMatch}
          />
        </Modal>
      </div>
    </CardContainer>
  );
};

export default ManagerMatchCard;
