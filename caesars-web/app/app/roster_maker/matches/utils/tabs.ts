export const tabs = [
  {
    title: 'Matches in progress',
    filter: { match_asignment_status: 1 },
  },
  {
    title: 'Newly Assigned Matches',
    filter: { match_asignment_status: 0 },
  },
  {
    title: 'Submitted Matches',
    filter: { match_asignment_status: 2 },
  },
];
