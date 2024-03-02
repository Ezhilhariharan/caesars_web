import React, { useState } from 'react';
import Image from 'next/image';
import cbb from '../../assets/icons/sports-icon/cbb.svg';
import cfb from '../../assets/icons/sports-icon/cfb.svg';
import mlb from '../../assets/icons/sports-icon/mlb.svg';
import nba from '../../assets/icons/sports-icon/nba.svg';
import nhl from '../../assets/icons/sports-icon/nhl.svg';
import nlf from '../../assets/icons/sports-icon/nlf.svg';

const sportsLogoList = [
  {
    title: 'MLB',
    sport: 'Baseball',
    image: mlb,
  },
  {
    title: 'NFL',
    sport: 'NFL',
    image: nlf,
  },
  {
    title: 'CFB',
    sport: 'CFB',
    image: cfb,
  },
  {
    title: 'NBA',
    sport: 'NBA',
    image: nba,
  },
  {
    title: 'CBB',
    sport: 'Football',
    image: cbb,
  },
  {
    title: 'NHL',
    sport: 'NHL',
    image: nhl,
  },
];

type Props = {
  selectedSport?: string;
  setSelectedSport?: React.Dispatch<React.SetStateAction<string>>;
  bgColor: string;
  style?: {};
  logoStyle?: {};
};

const SportsLogo = (props: Props) => {
  const { logoStyle, selectedSport, setSelectedSport, bgColor, ...prop } =
    props;
  return (
    <div className={`w-full flex justify-between`} {...prop}>
      {sportsLogoList.map((sport, i) => {
        return (
          <div
            key={i}
            className={`min-w-[100px] max-h-[70px] overflow-y-hidden z-30 flex flex-col justify-center items-center border-b-[5px] cursor-pointer ${
              selectedSport === sport.sport
                ? 'bg-[#ECF3FE] border-[#4285F4]'
                : 'border-transparent bg-transparent'
            }`}
            onClick={() => {
              if (setSelectedSport) setSelectedSport(sport.sport);
            }}
            style={{
              backgroundColor:
                selectedSport === sport.sport ? '#ECF3FE' : bgColor,
              borderBottomWidth: '5px',
              borderColor: selectedSport === sport.sport ? '#4285F4' : bgColor,
              ...logoStyle,
            }}
          >
            <Image src={sport.image} alt={sport.title} height={50} />
            <div
              className={`h-auto text-[10px] ${
                selectedSport === sport.title ? 'text-[#4285F4]' : '#121212'
              }`}
            >
              {sport.title}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SportsLogo;
