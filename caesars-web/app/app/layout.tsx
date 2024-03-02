"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";
import SubSidebarHome from "../components/Sidebar/SubSidebarHome";
import { toastProps } from "../components/global/toast/Toast";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [showPage, setShowPage] = useState(false);

  const [toastPopup, setToastPopup] = useState(false);
  const [toastDetails, setToastDetails] = useState<toastProps>({
    type: "alert",
    title: "",
    discription: "",
    logo: "",
  });

  useEffect(() => {
    //checking for the session
    const user = localStorage.getItem("user");
    if (!user) {
      setToastPopup(true);
      setToastDetails({
        type: "alert",
        title: "Alert",
        discription: "Not logged In",
      });
      router.push("/login");
    } else {
      try {
        const user_p = JSON.parse(user);
        setShowPage(true);
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

  return (
    <>
      {!showPage && (
        <div className="w-full h-screen overflow-hidden flex items-center justify-center">
          Please Wait Loading...
        </div>
      )}
      {showPage && (
        <div className="w-full h-screen overflow-hidden flex">
          <Sidebar />
          <SubSidebarHome />
          <div className="flex overflow-hidden flex-1">{children}</div>
        </div>
      )}
    </>
  );
}
