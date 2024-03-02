import baseballIcon from './assets/baseball.svg';

export function getLeaguesIcon(sports: string) {
  switch (sports) {
    case 'Baseball':
      return baseballIcon;

    default:
      return baseballIcon;
  }
}
