"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

// icons
import booksIcon from "../assets/book.svg";
import tickIcon from "../assets/checkbox.svg";
import bookmarkIcon from "../assets/bookmark.svg";

// API fetchers
import {
  getMatches,
  getSpecificDateMatches,
  getMatchesWithCount,
} from "@/app/apiIntegrations/apiClients/matches";

// libs
import dateConverter from "@/app/lib/dateConverter";
import { getIcon } from "@/app/lib/getIcon";

// utils
import { allMonths } from "@/app/components/global/staticCalenderDatas";

// custom hooks
import { useSporsTabs } from "@/app/hooks/useSporsTabs";
import { useFetchKPI } from "@/app/hooks/useFetchKPI";
import { useToggle } from "@/app/hooks/useToggle";
import { useSelected } from "@/app/hooks/useSelected";

// components
import PageHeader from "@/app/components/app/PageHeader";
import Calender from "@/app/components/overview/Calender";
import AssignedMatchesCard from "../components/AssignedMatchesCard";
import OverviewKpiCard from "../../../components/global/OverviewKpiCard";
// import MatchCard from '../components/MatchCard';
import MatchCard from "@/app/components/global/SpecificDateMatchCard";
import RosterManagers from "../components/RosterManagers";
import AdminUpcomingMatches from "../components/AdminUpcomingMatches";
import Toast, { toastProps } from "@/app/components/global/toast/Toast";
import AssignMatch from "./components/AssignMatch";
import SliderContainer from "@/app/components/global/slider/SliderContainer";
import SliderContainerWithCustomPagination from "@/app/components/global/slider/SliderContainerWithCustomPagination";
import LoadingComponent from "@/app/components/global/LoadingComponent";
import Title from "@/app/components/global/title/Title";

// global variables
const current = new Date();
let selectedDate: any = `${dateConverter(current).year}-${
  dateConverter(current).month
}-${dateConverter(current).date}`;

export default function RosterAdminOverviewPage() {
  const router = useRouter();

  const [showPage, setShowPage] = useToggle(false);
  const [KPI, setKPI] = useFetchKPI("dashboard/overview");
  const [sportsTab, setSportsTab] = useSporsTabs("mlb", []);
  const [isAssigned, setIsAssigned] = useState(false);
  const [assignedMatches, setAssignedMatch] = useState<any>([]);
  const [isPending, setIsPending] = useState(false);
  const [pendingMatches, setPendingMatches] = useState<any>([]);
  const [sportFilter, setSportFilter] = useSelected("Baseball");

  const [user, setUser] = useState({});
  const [toastPopup, setToastPopup] = useState(false);
  const [toastDetails, setToastDetails] = useState<toastProps>({
    type: "alert",
    title: "",
    discription: "",
    logo: "",
  });

  useEffect(() => {
    if (toastPopup === true) {
      const timeOut = setTimeout(() => {
        setToastPopup(false);
      }, 2000);
      return () => clearTimeout(timeOut);
    }
  }, [toastPopup]);

  useEffect(() => {
    const _user = localStorage.getItem("user");
    if (!_user) {
      setToastPopup(true);
      setToastDetails({
        type: "alert",
        title: "Alert",
        discription: "Not loggedin",
      });
      router.push("/login");
    } else {
      try {
        const user_p = JSON.parse(_user);
        setUser(user_p);
        if (user_p?.title !== "roster_lead") {
          setToastPopup(true);
          setToastDetails({
            type: "alert",
            title: "Alert",
            discription: "Logged in user is not admin",
          });
          router.push("/app/overview");
        } else setShowPage(true);
      } catch (e) {
        setToastPopup(true);
        setToastDetails({
          type: "alert",
          title: "Alert",
          discription: "Invalid user data",
        });
        router.push("/login");
      }
    }
  }, []);

  useEffect(() => {
    fetchAssignedMatchs();
    fetchPendingMatches(selectedDate);
    setKPI();
  }, []);

  const fetchAssignedMatchs = async () => {
    setIsAssigned(true);
    try {
      const res = await getMatchesWithCount({
        limit: 7,
        query: { status: 0, assigned_matches: true },
      });
      setAssignedMatch(res?.data);
      setIsAssigned(false);
    } catch (e) {
      console.warn(e);
      setIsAssigned(false);
    }
  };

  const fetchPendingMatches = async (date: any) => {
    setIsPending(true);
    try {
      const params = {
        start_date: dayjs(date).format("YYYY-MM-DD"),
        end_date: dayjs(date).format("YYYY-MM-DD"),
        sports: sportFilter,
      };
      const res = await getSpecificDateMatches(params);

      setIsPending(false);
      setPendingMatches(res?.data?.matchDetails);
    } catch (e) {
      console.warn(e);
      setIsPending(false);
    }
  };

  const getDates = (date: any) => {
    fetchPendingMatches(date);
  };

  const overviewKpiCardData = [
    {
      id: 1,
      icon: booksIcon,
      title: "Total",
      value: KPI?.assigned | 0,
      subtitle: "Assigned Matches",
      onClick: () => {
        localStorage.setItem("matches tab", "Assigned Matches");
      },
    },
    {
      id: 2,
      icon: tickIcon,
      title: "Approved",
      value: KPI?.approved | 0,
      subtitle: "Matches",
      onClick: () => {
        localStorage.setItem("matches tab", "Approved Matches");
      },
    },
    {
      id: 3,
      icon: bookmarkIcon,
      title: "In-progress",
      value: KPI?.inProgress | 0,
      subtitle: "Matches",
      onClick: () => {
        localStorage.setItem("matches tab", "Assigned Matches");
      },
    },
  ];

  return (
    <>
      {!showPage && (
        <div className="absoluet w-full h-full overflow-hidden flex items-center justify-center">
          Please Wait Loading...
        </div>
      )}
      {showPage && (
        <>
          <Toast
            type={toastDetails.type}
            title={toastDetails.title}
            discription={toastDetails.discription}
            logo={toastDetails.logo}
            toggle={toastPopup}
          />
          <div className="overflow-hidden overflow-y-scroll flex flex-1 bg-[#f5f5f5]">
            <div className="w-full flex flex-col py-5 px-8 max-[1600px]:p-3">
              <PageHeader
                title={`Hi, ${(user as any).first_name} ${
                  (user as any).last_name
                } `}
                subTitle={"Let's finish your task today!"}
              />
              <div className="w-full gap-5 flex justify-between max-[1600px]:gap-2.5">
                <div className="max-w-[40%] w-[40%]">
                  <Title
                    title="Overview"
                    size="large"
                    style={{
                      color: "#141522",
                      lineHeight: "-0.03em",
                    }}
                  />
                  <div className="flex justify-between mt-6 gap-5 max-[1600px]:gap-2">
                    {overviewKpiCardData?.map((d: any) => {
                      return (
                        <div
                          className={`flex-1 max-w-[173px] ${
                            d?.title !== "In-progress" ? "cursor-pointer" : ""
                          } `}
                          onClick={() => {
                            if (d?.title !== "In-progress") {
                              d.onClick();
                              router.push("/app/roster_lead/matches");
                            }
                          }}
                        >
                          <OverviewKpiCard
                            icon={d.icon}
                            title={d.title}
                            value={d.value}
                            subtitle={d.subtitle}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-7 relative">
                    <SliderContainer
                      title="Assigned Matches"
                      titleSize="large"
                      slideToShow={2}
                      slideToScroll={1}
                      dots={false}
                    >
                      {!isAssigned &&
                        assignedMatches?.length > 0 &&
                        assignedMatches?.map((m: any, i: any) => {
                          return (
                            <div
                              className="max-w-[290px] flex-1"
                              key={"AMatch" + i}
                              onClick={(e) => {
                                setSportsTab({
                                  title: m.fixture_name,
                                  matchId: m.id,
                                });
                                router.push("/sports/mlb");
                              }}
                            >
                              <AssignedMatchesCard
                                matchData={m}
                                users={[
                                  {
                                    id: m.user_id,
                                    first_name: m.first_name,
                                    last_name: m.last_name,
                                    middle_name: m.middle_name,
                                  },
                                ]}
                                width={30}
                                height={30}
                                avatarStyle={{
                                  fontSize: 12,
                                }}
                              />
                            </div>
                          );
                        })}
                      {!isAssigned && assignedMatches?.length > 0 && (
                        <div
                          className="w-full cursor-pointer"
                          onClick={() => {
                            localStorage.setItem(
                              "matches tab",
                              "Assigned Matches"
                            );
                            router.push("/app/roster_lead/matches");
                          }}
                        >
                          <div className="bg-white h-[235px] rounded-[10px] flex justify-center items-center">
                            View All
                          </div>
                        </div>
                      )}
                    </SliderContainer>
                    {isAssigned && (
                      <div className="h-[240px] bg-white font-medium text-lg rounded-[10px]">
                        <LoadingComponent text="Loading" />
                      </div>
                    )}
                    {!isAssigned && assignedMatches?.length === 0 && (
                      <div className="p-5 w-full h-[235px] bg-white text-sm rounded-[10px] text-[#666] felx justify-center items-center">
                        No Matches Available
                      </div>
                    )}
                  </div>
                  <div className="mt-8">
                    <AdminUpcomingMatches />
                  </div>
                </div>
                <div className="w-[25%] max-w-[30%] h-full flex flex-col justify-between">
                  <div className="h-[50%]">
                    <AssignMatch
                      toastPopup={toastPopup}
                      setToastPopup={setToastPopup}
                      toastDetails={toastDetails}
                      setToastDetails={setToastDetails}
                      loadMatch={fetchAssignedMatchs}
                    />
                  </div>
                  <RosterManagers />
                </div>
                <div className="w-[35%] max-w-[30%] flex flex-col">
                  <Calender
                    style={{
                      width: "100%",
                      height: "210px",
                      padding: "28px 15px",
                    }}
                    getDates={getDates}
                  />
                  <div className="mt-8">
                    {dayjs()?.format("YYYY-MM-DD") ==
                    dayjs(selectedDate)?.format("YYYY-MM-DD") ? (
                      <div className="text-sm font-semibold text-[#141522]">
                        Today
                      </div>
                    ) : (
                      <div className="text-sm font-semibold text-[#141522]">
                        {allMonths[dayjs(selectedDate)?.month()]}{" "}
                        {dayjs(selectedDate)?.format("D YYYY")}
                      </div>
                    )}
                    <div className="mt-5">
                      <SliderContainerWithCustomPagination
                        title="View Matches"
                        primary={true}
                        selectedSport={sportFilter}
                        setSelectedSport={setSportFilter}
                        headerStyle={{
                          height: "50px",
                          padding: "0 30px",
                          display: "flex",
                          alignItems: "end",
                          color: "#121212",
                        }}
                        style={{
                          width: "100%",
                          height: "650px",
                          background: "#fff",
                        }}
                        sportsStyle={{
                          backgroundColor: "#f00",
                        }}
                      >
                        {!isPending &&
                          pendingMatches?.slice(0, 5)?.map((d: any) => {
                            let date = dateConverter(d.fixture_start_at);

                            return (
                              <div className="pb-5">
                                <MatchCard
                                  listData={d}
                                  user={user}
                                  matchId={d.id}
                                  primary={true}
                                  status={d.match_status}
                                  header={{
                                    team1_image: d.team1_logo_image,
                                    team2_image: d.team2_logo_image,
                                  }}
                                  progress={{
                                    percentage:
                                      d.match_assignments_overall_task_progress,
                                    lastModifiedDate: "--",
                                  }}
                                  sports={{
                                    team1_name: d.team1_short_name,
                                    team2_name: d.team2_short_name,
                                    location: {
                                      name: d.location_address_line2,
                                      city: d.city_name,
                                      country: d.country_alpha2_code,
                                    },
                                    image: getIcon(d.league_name),
                                  }}
                                  match={d}
                                  rowDate={d.fixture_start_at}
                                  date={`${date.date} ${date.monthInString}`}
                                  venue={d?.venue_name}
                                />
                              </div>
                            );
                          })}
                        {!isPending && pendingMatches?.length === 0 && (
                          <div className="w-full h-[500px] py-5 text-[#ccc] font-medium">
                            <div className="h-full w-full flex justify-center items-center">
                              No Matches
                            </div>
                          </div>
                        )}
                        {isPending && (
                          <div className="h-[500px]">
                            <LoadingComponent text="Loading" />
                          </div>
                        )}
                      </SliderContainerWithCustomPagination>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
