import React from "react";

// components
import SportsLogo from "@/app/components/global/SportsLogo";
import CardContainer from "../cardContainer/CardContainer";

// antd
import { Carousel } from "antd";

type sliderContainerProps = {
  primary?: boolean;
  selectedSport?: string;
  setSelectedSport?: React.Dispatch<React.SetStateAction<string>>;
  title?: string;
  titleSize?: "small" | "medium" | "large";
  titleStyle?: {};
  children: React.ReactNode;
  customSettings?: {};
  style?: {};
  sportsStyle?: {};
  headerStyle?: {};
};

const SliderContainerWithCustomPagination = (props: sliderContainerProps) => {
  const {
    primary,
    selectedSport,
    setSelectedSport,
    title,
    titleSize,
    titleStyle,
    children,
    customSettings,
    sportsStyle,
    headerStyle,
    style,
  } = props;

  const settings = {
    className: "slider variable-width",
    infinite: false,
    dots: true,
    speed: 500,
    arrows: false,
    appendDots: (dots: any) => (
      <div className="">
        <ul
          className="flex justify-center items-center gap-5 m-0"
          style={{ border: "1ps solid red" }}
        >
          {dots}
        </ul>
      </div>
    ),
    customPaging: (i: any) => (
      <div className="w-5 h-2 flex justify-center items-center gap-5 rounded-full bg-[#4285F4]"></div>
    ),
  };
  return (
    <CardContainer header={title} headerStyle={headerStyle} style={style}>
      {/* {primary && (
        <div className='overflow-x-scroll'>
          <SportsLogo
            selectedSport={selectedSport}
            setSelectedSport={setSelectedSport}
            bgColor='#F9F9F9'
            style={{
              marginTop: 10,
            }}
          />
        </div>
      )} */}
      <Carousel {...settings} className="overflow-hidden w-full gap-5">
        {children}
      </Carousel>
    </CardContainer>
  );
};

export default SliderContainerWithCustomPagination;
