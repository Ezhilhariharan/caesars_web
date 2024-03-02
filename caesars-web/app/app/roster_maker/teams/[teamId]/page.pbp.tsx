"use client";
import React, { useState } from "react";
import Image from "next/image";

// icons
import ArrowDown from "../assets/down.svg";

// lib
import { tabs } from "../utils/tabs";

// components
import Tabs from "@/app/components/global/Tabs";
import Title from "@/app/components/global/title/Title";
import LeaguesDropDown from "@/app/components/teams/LeaguesDropDown";

type Props = {
  params: {
    teamId: number;
  };
};

const page = (props: Props) => {
  const { params } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState<any>(tabs[1]);
  const [selectedLeague, setSelectedLeague] = useState("Baseball");

  const onTabChange = (f: any) => setSelectedTab(f);

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-5">
            <Title title="Baltimore Orioles" size="large" />
            <Image src={ArrowDown} alt="down arrow" />
          </div>
          <Tabs
            tabs={tabs}
            selectedTab={selectedTab}
            onTabChange={onTabChange}
            loading={isLoading}
          />
        </div>
        {/* <LeaguesDropDown loading={false} selectedLeague={selectedLeague} /> */}
      </div>
    </>
  );
};

export default page;
