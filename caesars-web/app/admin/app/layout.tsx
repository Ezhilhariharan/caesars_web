"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// lib
import { getAdminFromLocalstorage } from "@/app/lib/localstorageHelpers";

// components
import Sidebar from "@/app/components/Sidebar";
import SubSidebarHome from "../components/SubSideBar";
import PageHeader from "@/app/components/app/PageHeader";

type AdminLayout = {
  children: React.ReactNode;
};

export default function AdminLayout(props: AdminLayout) {
  const { children } = props;
  const router = useRouter();
  const [admin, setAdmin] = useState<any>({});

  useEffect(() => {
    //checking for the session
    let value = getAdminFromLocalstorage();
    if (value?.hasOwnProperty("created_at")) {
      setAdmin(value);
    } else {
      router.push("/admin/login");
    }
  }, []);

  return (
    <>
      {admin?.hasOwnProperty("created_at") ? (
        <div className="absolute w-full h-full overflow-hidden flex">
          <Sidebar />
          <SubSidebarHome />
          <div className="flex flex-col flex-1 bg-[#f5f5f5] overflow-hidden py-5 px-8 max-[1600px]:p-3">
            <PageHeader
              title={`Hi, ${admin?.first_name} ${admin?.last_name}`}
              subTitle={"Let's finish your task today!"}
            />
            <div className="overflow-y-scroll">{children}</div>
          </div>
        </div>
      ) : (
        <div className="absolute w-full h-full overflow-hidden flex items-center justify-center">
          Please Wait Loading...
        </div>
      )}
    </>
  );
}
