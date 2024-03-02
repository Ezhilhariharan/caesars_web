import { StaticImageData } from "next/image";

export type PlayerProps = {
  //   prop: string;
  //   balancedLine: number;
  margin: string;
  over: string;
  exact: string;
  under: string;
  //   openNotes: boolean;
};

export type MatchDetailsProps = {
  venue: string;
  Date: string;
  weather?: string;
};

export type CompetitionDetailsProps = {
  matchNumber: number;
  round: string;
  coaches?: string;
};

export type LastMatchProps = {
  id: number;
  image: string | StaticImageData;
  inningsData: {
    id: number;
    innings: number;
    score: number;
  }[];
};

export type RosterDetails = {
  name: string;
  image: string | StaticImageData;
  rosterData?: {
    id: number;
    name: string;
    image: string | StaticImageData;
    position: string;
  }[];
};
