export function getSportsFilterKey(sports: string) {
  switch (sports) {
    case 'All Sports':
      return '';
    case 'MLB':
      return 'Baseball';
    case 'CBB':
      return 'CBB';
    case 'CFB':
      return 'College Football';
    case 'NBA':
      return 'National Basketball';
    case 'NHL':
      return 'Hocky';
    case 'NFL':
      return 'Football';
    default:
      return '';
  }
}
