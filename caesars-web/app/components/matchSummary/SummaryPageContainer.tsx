"use client";
import React, { useEffect, useState } from "react";

// components
import RosterDetailsContainer from "./RosterDetailsContainer";
import MatchDeatilsCard from "../global/MatchDeatilsCard";
import Toast, { toastProps } from "../global/toast/Toast";

// interfaces
import {
  CompetitionDetailsProps,
  LastMatchProps,
  MatchDetailsProps,
  RosterDetails,
} from "./MatchSummary.Interfaces";

type SummaryPageProps = {
  match: any;
  matchDetails?: MatchDetailsProps;
  competitionDetails?: CompetitionDetailsProps;
  lastMatchData?: LastMatchProps[];
  user: any;
  admin: any;
  allow: boolean;
  allowToContinue: boolean;
  setAllowToContinue: React.Dispatch<React.SetStateAction<boolean>>;
  rosterDetails?: {
    team1: RosterDetails;
    team2: RosterDetails;
  };
};

const SummaryPageContainer = (props: SummaryPageProps) => {
  const {
    match,
    matchDetails,
    rosterDetails,
    user,
    admin,
    allow,
    allowToContinue,
    setAllowToContinue,
  } = props;
  const [toastPopup, setToastPopup] = useState(false);
  const [toastDetails, setToastDetails] = useState<toastProps>({
    type: "error",
    title: "",
    discription: "",
  });

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setToastPopup(false);
    }, 3000);
    return () => clearTimeout(timeOut);
  }, [toastPopup]);

  return (
    <div className="flex w-auto h-[100%] flex-1 overflow-scroll gap-5">
      <Toast
        type={toastDetails.type}
        title={toastDetails.title}
        discription={toastDetails.discription}
        toggle={toastPopup}
      />
      <div className="w-[40%] max-[1600px]:w-[35%]">
        <div className="flex justify-between gap-5 mb-5 max-[1600px]:flex-col overflow-hidden">
          <MatchDeatilsCard match={match} />
        </div>
      </div>
      <div className="min-w-[60%] max-w-[80%]">
        <RosterDetailsContainer
          match={match}
          toastPopup={toastPopup}
          setToastPopup={setToastPopup}
          toastDetails={toastDetails}
          setToastDetails={setToastDetails}
          isAdmin={admin}
          user={user}
          allow={allow}
          allowToContinue={allowToContinue}
          setAllowToContinue={setAllowToContinue}
        />
      </div>
    </div>
  );
};

export default SummaryPageContainer;
