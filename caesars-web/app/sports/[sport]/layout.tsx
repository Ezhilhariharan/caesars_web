"use client";
import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  getAdminFromLocalstorage,
  getUserFromLocalstorage,
} from "@/app/lib/localstorageHelpers";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const [showPage, setShowPage] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const user = getUserFromLocalstorage();
    const admin = getAdminFromLocalstorage();

    if (user?.hasOwnProperty("user_role_id")) {
      setShowPage(true);
    } else if (admin?.hasOwnProperty("created_at")) {
      setShowPage(true);
    } else {
      setShowPage(false);

      if (!user?.hasOwnProperty("user_role_id")) {
        router.push("/login");
      }
      if (!admin?.hasOwnProperty("created_at")) {
        router.push("/admin/login");
      }
      if (
        !user?.hasOwnProperty("created_at") &&
        !admin?.hasOwnProperty("created_at")
      ) {
        router.push("/login");
      }
    }
  }, []);

  return (
    <>
      {showPage ? (
        <div
          className="absolute w-full h-full overflow-hidden flex"
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            overflow: "hidden",
            display: "flex",
          }}
        >
          <Sidebar />
          <div className="flex flex-1">{children}</div>
        </div>
      ) : (
        <div className="absolute w-full h-full overflow-hidden flex items-center justify-center">
          Please Wait Loading...
        </div>
      )}
    </>
  );
}
