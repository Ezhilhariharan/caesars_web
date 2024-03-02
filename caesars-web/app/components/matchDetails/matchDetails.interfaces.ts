import { StaticImageData } from 'next/image';

export type TeamProps = {
  name: string;
  image: string | StaticImageData;
};

export type MatchdetailsTeamCardProps = {
  teamA: TeamProps;
  teamB: TeamProps;
  venue?: any;
};

export type MatchStatusCardProps = {
  create?: string;
  dueDate?: string;
  status?: number;
  user?: any;
  style?: {};
};
