"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// API fetchers
import {
  getMatchesWithCount,
  getSpecificDateMatches,
} from "@/app/apiIntegrations/apiClients/matches";

// icons
import angleDown from "../../../assets/icons/arrow-down.svg";

// libs
import dayjs from "dayjs";

// utils
import { allMonths } from "@/app/components/global/staticCalenderDatas";
import { getIcon } from "@/app/lib/getIcon";
import dateConverter from "@/app/lib/dateConverter";

// components
import PageHeader from "@/app/components/app/PageHeader";
import ActivityCard from "@/app/components/overview/ActivityCard";
import ActivityTask from "@/app/components/overview/ActivityTask";
import Calender from "@/app/components/overview/Calender";
import RecentActivity from "@/app/components/overview/RecentActivity";
import MatchCardExtented from "@/app/components/global/matchCard/MatchCardExtented";
import MatchCard from "@/app/components/global/SpecificDateMatchCard";
import UpcomingMatchCard from "@/app/components/global/matchCard/UpcomingMatchCard";
import SliderContainerWithCustomPagination from "@/app/components/global/slider/SliderContainerWithCustomPagination";
import SliderContainer from "@/app/components/global/slider/SliderContainer";
import LoadingComponent from "@/app/components/global/LoadingComponent";
import { toastProps } from "@/app/components/global/toast/Toast";

// antd
import Dropdown from "antd/es/dropdown/dropdown";
import { MenuProps } from "antd";
import { useSporsTabs } from "@/app/hooks/useSporsTabs";

// global variable
const current = new Date();
let selectedDate: any = `${dateConverter(current).year}-${
  dateConverter(current).month
}-${dateConverter(current).date}`;
const today = `${dateConverter(current).year}-${dateConverter(current).month}-${
  dateConverter(current).date
}`;

export default function Overview() {
  const router = useRouter();
  const [user, setUser] = useState<any>({});
  const [matches, setMatches] = useState([]);
  const [todayMatches, setTodayMatches] = useState<any[]>([]);
  const [isMatchesLoading, setIsMatchesLoading] = useState(false);
  const [isTodayMatchLoading, setIsTodayMatchLoading] = useState(false);
  const [activityFilter, setActivityFilter] = useState("This Week");
  const [showPage, setShowPage] = useState(false);
  const [sportsTab, setSportsTab] = useSporsTabs("mlb", []);

  // Toast
  const [toastPopup, setToastPopup] = useState(false);
  const [toastDetails, setToastDetails] = useState<toastProps>({
    type: "alert",
    title: "",
    discription: "",
    logo: "",
  });

  // Toast auto close
  useEffect(() => {
    if (toastPopup === true) {
      const timeOut = setTimeout(() => {
        setToastPopup(false);
      }, 2000);
      return () => clearTimeout(timeOut);
    }
  }, [toastPopup]);

  useEffect(() => {
    //checking for the session
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
        setUser(getUserFromLocalstorage());
        if (user_p?.title !== "roster_maker") {
          setToastPopup(true);
          setToastDetails({
            type: "alert",
            title: "Alert",
            discription: "Logged in user is not Roster manager",
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
    loadMatches();
    loadTodayMatches(today);
  }, []);

  function getUserFromLocalstorage() {
    const userString = localStorage.getItem("user");
    if (!userString) return {};
    return JSON.parse(userString);
  }

  async function loadTodayMatches(date: any) {
    setIsTodayMatchLoading(true);
    // try {
    //   const res = await getMatchesWithCount({
    //     limit: 5,
    //     query: {
    //       status: 0,
    //       start_date: dayjs(date).format("YYYY-MM-DD"),
    //       end_date: dayjs(date).format("YYYY-MM-DD"),
    //       assigned_matches: true,
    //     },
    //   });
    //   setTodayMatches(res.data);
    //   setIsTodayMatchLoading(false);
    // } catch (e) {
    //   setIsTodayMatchLoading(false);
    //   console.warn(e);
    // }
    try {
      const params = {
        start_date: dayjs(date).format("YYYY-MM-DD"),
        end_date: dayjs(date).format("YYYY-MM-DD"),
        sports: "Baseball",
      };

      const res = await getSpecificDateMatches(params);
      console.log("getSpecificDateMatches", res?.data?.matchDetails);
      setTodayMatches(res?.data?.matchDetails);
      setIsTodayMatchLoading(false);
    } catch (e) {
      setIsTodayMatchLoading(false);
      console.warn(e);
    }
  }

  async function loadMatches() {
    setIsMatchesLoading(true);
    try {
      const res = await getMatchesWithCount({
        limit: 6,
        query: {
          status: 0,
          sports: "Baseball",
          assigned_matches: true,
        },
      });
      setIsMatchesLoading(false);
      setMatches(res.data);
    } catch (e) {
      setIsMatchesLoading(false);
      console.warn(e);
    }
  }

  const filterItems: MenuProps["items"] = [
    {
      key: "0",
      label: <div className="p-2">This Month</div>,
      onClick: async (e) => setActivityFilter("This Month"),
    },
    {
      key: "1",
      label: <div className="p-2">This Week</div>,
      onClick: async (e) => setActivityFilter("This Week"),
    },
  ];

  const getDates = async (date: any) => {
    loadTodayMatches(date);
  };

  return (
    <>
      {!showPage && <LoadingComponent text="Loading" />}
      {showPage && (
        <div className="w-full px-8 py-5 flex-1 overflow-hidden" style={{}}>
          <PageHeader
            title={`Hi, ${user.first_name} ${user.last_name} `}
            subTitle={"Let's finish your task today!"}
          />
          <div className="flex gap-10 w-full h-full overflow-scroll">
            <div className="w-8/12 flex-1">
              <div className="gap-10 flex justify-between items-end mb-14">
                <div className="">
                  <div className="flex items-center justify-between">
                    <div className="page-section-header">Overview</div>
                    <div>
                      <Dropdown
                        menu={{ items: filterItems }}
                        trigger={["click"]}
                        placement="bottomRight"
                      >
                        <div className="flex items-center gap-2 p-2 cursor-pointer">
                          <p className="text-xs font-medium">
                            {activityFilter}
                          </p>
                          <Image src={angleDown} alt="arrow" />
                        </div>
                      </Dropdown>
                    </div>
                  </div>
                  <div className="w-2/3 min-w-full flex items-center gap-10 justify-between mt-5">
                    <ActivityTask />
                    <ActivityCard />
                  </div>
                </div>
                <div className="overflow-hidden">
                  <RecentActivity primary={true} />
                </div>
              </div>
              <div className="relative">
                <SliderContainer
                  title="Upcoming Matches"
                  titleSize="large"
                  slideToShow={3}
                  slideToScroll={1}
                >
                  {!isMatchesLoading &&
                    matches?.map((m: any) => {
                      return (
                        <div key={`match${m?.id}`} style={{ marginRight: 10 }}>
                          <UpcomingMatchCard
                            role="user"
                            id={m?.id}
                            match={m}
                            header={{
                              team1_image: m?.team1_logo_image,
                              team2_image: m?.team2_logo_image,
                            }}
                            sports={{
                              team1_name: m?.team1_short_name,
                              team2_name: m?.team2_short_name,
                              location: {
                                name: m?.location_name,
                                city: m?.city_name,
                                country: m?.country_common_name,
                              },
                              image: getIcon(m.league_name),
                            }}
                            progress={{
                              percentage: parseFloat(
                                m?.match_assignments_overall_task_progress
                              ),
                              lastModifiedDate: "--",
                            }}
                            contributors={{
                              users: [
                                {
                                  id: m.user_id,
                                  first_name: m.first_name,
                                  last_name: m.last_name,
                                  middle_name: m.middle_name,
                                },
                              ],
                              matchDate: (() => {
                                const date1 = new Date(m?.fixture_start_at);
                                const date2 = new Date();

                                const diffTime = Math.abs(
                                  (date2 as any) - (date1 as any)
                                );
                                const diffDays = Math.ceil(
                                  diffTime / (1000 * 60 * 60 * 24)
                                );
                                return diffDays + " days ";
                              })(),
                            }}
                          />
                        </div>
                      );
                    })}
                  {!isMatchesLoading && matches?.length > 0 && (
                    <div
                      className="max-w-[320px] cursor-pointer"
                      onClick={() => {
                        localStorage.setItem(
                          "matches tab",
                          "Newly Assigned Matches"
                        );
                        router.push("/app/roster_maker/matches");
                      }}
                    >
                      <div className="bg-white full h-[420px] rounded-[10px] flex justify-center items-center">
                        View Full Assigned Matches
                      </div>
                    </div>
                  )}
                </SliderContainer>
                {isMatchesLoading && (
                  <div className="w-full h-full flex justify-center items-center">
                    <LoadingComponent text="Loading the Matches Please Wait" />
                  </div>
                )}
                {!isMatchesLoading && matches?.length === 0 && (
                  <div className="w-full h-full flex items-center justify-center">
                    No matches found
                  </div>
                )}
              </div>
            </div>

            <div className="w-3/12" style={{ minWidth: 400 }}>
              <Calender
                style={{
                  width: "100%",
                  height: "210px",
                  color: "#141522",
                  padding: "24px 15px",
                }}
                getDates={getDates}
              />

              <div
                className="mt-[50px] overflow-hidden gap-16"
                // style={{ maxWidth: 380 }}
              >
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
                <div className="w-full h-full overflow-hidden">
                  <SliderContainerWithCustomPagination>
                    {!isTodayMatchLoading &&
                      todayMatches?.map((d: any, i) => {
                        return (
                          <div key={i} className="">
                            {/* <MatchCardExtented
                              matchId={d.id}
                              header={{
                                team1_image: d.team1_logo_image,
                                team2_image: d.team2_logo_image,
                              }}
                              progress={{
                                percentage: parseFloat(
                                  d.match_assignments_overall_task_progress
                                ),
                                lastModifiedDate: '--',
                              }}
                              sports={{
                                team1_name: d.team1_short_name,
                                team2_name: d.team2_short_name,
                                location: {
                                  name: d.location_name,
                                  city: d.city_name,
                                  country: d.country_common_name,
                                },
                                image: getIcon(d.league_name),
                              }}
                              match={d}
                              contributors={{
                                users: [],
                                matchDate: (() => {
                                  const date1 = new Date(d.fixture_start_at);
                                  const date2 = new Date();
                                  const diffTime = Math.abs(
                                    (date2 as any) - (date1 as any)
                                  );
                                  const diffDays = Math.ceil(
                                    diffTime / (1000 * 60 * 60 * 24)
                                  );
                                  return diffDays + ' days';
                                })(),
                              }}
                            /> */}
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
                              venue={d?.venue_name}
                            />
                          </div>
                        );
                      })}
                  </SliderContainerWithCustomPagination>
                  {!isTodayMatchLoading && todayMatches?.length === 0 && (
                    <div className="w-full h-[550px] mt-5 rounded-lg bg-white flex items-center justify-center">
                      No Matches
                    </div>
                  )}

                  {isTodayMatchLoading && (
                    <div className="w-full h-[550px] mt-5 rounded-lg bg-white flex items-center justify-center">
                      <LoadingComponent text="Loading" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
