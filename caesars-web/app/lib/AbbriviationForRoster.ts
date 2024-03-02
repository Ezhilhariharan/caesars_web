type props = {
  value: any;
};

const AbbriviationForRoster = ({ value }: props) => {
  switch (value) {
    case 'pitcher':
      return 'P';
    case 'catcher':
      return 'C';
    case 'infielder':
      return 'IF';
    case 'outfielder':
      return 'OF';
    case 'designated hitter':
      return 'DH';

    default:
      return value;
  }
};

export default AbbriviationForRoster;
