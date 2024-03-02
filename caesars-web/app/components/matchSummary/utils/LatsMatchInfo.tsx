import Image, { StaticImageData } from "next/image";
import React from "react";
import { LastMatchProps } from "../MatchSummary.Interfaces";

const LatsMatchInfo = (props: LastMatchProps) => {
  const { id, image, inningsData } = props;
  let total = 0;
  const totalScroe = inningsData?.map((data) => (total += data?.score));

  return (
    <div className="flex items-center justify-end w-auto min-h-12 h-auto px-10 pt-2 max-[1600px]:px-0">
      <div className="w-14 h-14">
        <Image src={image} alt=" team image" width={45} height={45} />
      </div>
      <div className="flex">
        {inningsData?.map((data) => (
          <div
            className={`w-10 max-[1600px]:w-7 text-right ${
              data?.score > 0 ? "text-[#4285F4]" : "text-[#54577A]"
            }`}
          >
            {data?.score}
          </div>
        ))}
        <div
          className={`w-10 max-[1600px]:w-7 text-right ${
            total > 0 ? "text-[#4285F4]" : "text-[#54577A]"
          }`}
        >
          {total}
        </div>
      </div>
    </div>
  );
};

export default LatsMatchInfo;
