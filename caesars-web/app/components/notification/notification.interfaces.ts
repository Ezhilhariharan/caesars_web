import { StaticImageData } from 'next/image';
import { TeamProps } from '../matchDetails/matchDetails.interfaces';

export type NotificationCardProps = {
  id: number;
  image: string | StaticImageData;
  name?: string;
  text?: string;
  time?: string;
};

export type NotificationTaskCardprops = {
  teamA: TeamProps;
  teamB: TeamProps;
  progress: number;
};
