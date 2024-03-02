type Props = {
  status: any;
};

export default function MatchStatus(props: Props) {
  const { status } = props;

  switch (status) {
    case 0:
      return 'Not Started';
    case 1:
      return 'Not Started';
    case 2:
      return 'Live';
    case 3:
      return 'Ended';
    case 4:
      return 'Delayed';
    case 5:
      return 'Postponed';
    case 6:
      return 'Cancelled';
    default:
      return '';
  }
}
