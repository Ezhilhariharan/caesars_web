"use client";
import PageHeader from "@/app/components/app/PageHeader";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ProfileCard from "./components/ProfileCard";
import { Dropdown, MenuProps } from "antd";
import angleDown from "../../../assets/icons/arrow-down.svg";
import Image from "next/image";
import NotificationTaskContainer from "@/app/components/notification/NotificationTaskContainer";
import FilterCard from "./components/FilterCard";
import ProfilePageContainer from "@/app/components/global/ProfileContainer";

type Props = {};

const page = (props: Props) => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [filter, setFilter] = useState("This Week");

  useEffect(() => {
    setUser(getUserFromLocalstorage());
  }, []);

  function getUserFromLocalstorage() {
    const userString = localStorage.getItem("user");
    if (!userString) return {};
    return JSON.parse(userString);
  }
  const filterItems: MenuProps["items"] = [
    {
      key: "0",
      label: <div className="p-2">This Month</div>,
      onClick: async (e) => {
        setFilter("This Month");
      },
    },
    {
      key: "1",
      label: <div className="p-2">This Week</div>,
      onClick: async (e) => {
        setFilter("This Week");
      },
    },
  ];

  return (
    <div className="overflow-hidden overflow-y-scroll p-5">
      {/* <PageHeader
        title={`Hi, ${user?.first_name} ${user?.last_name} `}
        subTitle={"Let's finish your task today!"}
      /> */}
      {/* <div className='h-auto flex gap-20 max-[1600px]:gap-5'>
        <div className='h-[90vh]'>
          <ProfileCard primary={true} />
        </div>
        <div className='flex-1 h-[90vh]'>
          <div className='flex justify-between items-center'>
            <div>
              <h1 className='text-[#0D0D54] text-xl font-bold'>
                Matches History
              </h1>
              <p className='text-[#4F5B67] text-sm font-semibold'>
                Let's track your status here!
              </p>
            </div>
            <div className='bg-white text-sm px-2 rounded-md text-[#141522]'>
              <Dropdown
                menu={{ items: filterItems }}
                trigger={['click']}
                placement='bottomRight'
              >
                <div className='flex items-center gap-2 p-2 cursor-pointer'>
                  <p className='text-xs font-medium'>{filter}</p>
                  <Image src={angleDown} alt='' />
                </div>
              </Dropdown>
            </div>
          </div>
          <div className='flex gap-5 mt-5'>
            <FilterCard
              background='#4285F4'
              label='Newly Assigned Matches'
              filter={filter}
              setFilter={setFilter}
            />
            <FilterCard
              background='#34A770'
              label='In-progress Matches'
              filter={filter}
              setFilter={setFilter}
            />
            <FilterCard
              background='#FF6C37'
              label='Submitted Matches'
              filter={filter}
              setFilter={setFilter}
            />
          </div>
          <div className='mt-10'>
            <h1 className='text-xl font-bold text-[#141522]'>Matches</h1>
            <p className='text-sm font-normal text-[#91929E] my-2'>{filter}</p>
            <div className='max-[1600px]:h-[45vh] h-[55vh] overflow-y-scroll'></div>
          </div>
        </div>
      </div> */}
      <ProfilePageContainer id={user?.user_id} />
    </div>
  );
};

export default page;
