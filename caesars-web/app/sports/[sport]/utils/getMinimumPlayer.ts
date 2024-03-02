export const getMinimumPlayer = (sportName: string) => {
  switch (sportName) {
    case 'mlb':
      return 9;
    default:
      return 0;
  }
};
