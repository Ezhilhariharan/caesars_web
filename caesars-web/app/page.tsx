"use client";
import logo from "./assets/logos/fullLogo.svg";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const initialTabs = [
  {
    id: 1,
    sport: "mlb",
    tabs: [],
  },
  {
    id: 2,
    sport: "nfl",
    tabs: [],
  },
  {
    id: 3,
    sport: "cfb",
    tabs: [],
  },
  {
    id: 4,
    sport: "nba",
    tabs: [],
  },
  {
    id: 5,
    sport: "cbb",
    tabs: [],
  },
  {
    id: 6,
    sport: "nhl",
    tabs: [],
  },
];

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const sessionToken = localStorage.getItem("sessionToken");
    const user = localStorage.getItem("user");
    if (!sessionToken || !user) {
      router.push("/login");
    } else {
      const user_p = JSON.parse(user);
      if (user_p?.title === "roster_lead") {
        router.push("/app/roster_lead/overview");
      }
      if (user_p?.title === "roster_maker") {
        router.push("/app/roster_maker/overview");
      }
      if (user_p?.title === "trading_lead") {
        router.push("/app/trading_lead/overview");
      }
      if (user_p?.title === "pre_game_trader") {
        router.push("/app/pre_game_trader/overview");
      }
      if (user_p?.title === "in_game_trader") {
        router.push("/app/in_game_trader/overview");
      }
    }
    localStorage.setItem("tab", JSON.stringify(initialTabs));
  }, []);

  // useEffect(() => {
  //   localStorage.setItem('tab', JSON.stringify(initialTabs));
  // }, []);

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center p-24"
      style={{ textAlign: "center" }}
    >
      <div>
        <Image src={logo} alt="Caesars" priority />
      </div>

      <div style={{ margin: 20 }}>Please wait ... </div>
    </main>
  );
}
