import homeIcon from '../assets/icons/home.svg';
import allSports from '../assets/icons/sports-icon/allSports.svg';
import cbbIcon from '../assets/icons/sports-icon/cbb.svg';
import cfbIcon from '../assets/icons/sports-icon/cfb.svg';
import mlbIcon from '../assets/icons/sports-icon/mlb.svg';
import nbaIcon from '../assets/icons/sports-icon/nba.svg';
import nhlIcon from '../assets/icons/sports-icon/nhl.svg';
import nflIcon from '../assets/icons/sports-icon/nlf.svg';

export function getIcon(sports: string) {
  switch (sports) {
    case 'All Sports':
      return allSports;
    case 'MLB':
      return mlbIcon;
    case 'CBB':
      return cbbIcon;
    case 'CFB':
      return cfbIcon;
    case 'NBA':
      return nbaIcon;
    case 'NHL':
      return nhlIcon;
    case 'NFL':
      return nflIcon;
    case 'Home':
      return homeIcon;
    default:
      return allSports;
  }
}
