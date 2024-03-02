"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

//IMAGE
import laptopImage from "./assets/notFoundPage.svg";

type Props = {};

const notFound = (props: Props) => {
  let User: any;
  let Admin: any;
  let URL: any;
  useEffect(() => {
    User = localStorage.getItem("user");
    Admin = localStorage.getItem("admin");
    URL = window.location.href?.split("3000")[1]?.startsWith("/admin");
  }, []);

  return (
    <div className="h-screen w-full flex justify-center items-center bg-[#EDEDED]">
      <div className="flex flex-col justify-center items-center">
        <Image src={laptopImage} alt="" width={500} height={500} className="" />
        <div className="font-bold text-[#252F40] text-5xl mt-5">
          No Result Found!
        </div>
        <div className="font-normal text-[#AEAEAE] text-xl w-[55%] mt-5 text-center">
          "Sorry, We Came Up Empty-Handed. Its Look Like You are Off the Grid
        </div>
        {/* <Link
          href={`${URL ? "/admin/login" : "/login"}`}
          className="bg-[#4285F4] text-base font-semibold flex justify-center items-center text-[#fff] w-[154px] h-[51px] rounded-[8px] mt-5"
        >
          {" "}
          Go to Login
        </Link> */}
        <div
          onClick={() =>
            (window.location.href = `${URL ? "/admin/login" : "/login"}`)
          }
          className="bg-[#4285F4] text-base font-semibold flex justify-center items-center text-[#fff] w-[154px] h-[51px] rounded-[8px] mt-5 cursor-pointer"
        >
          Go to Login
        </div>
      </div>
    </div>
  );
};

export default notFound;
