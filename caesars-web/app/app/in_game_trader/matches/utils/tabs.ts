export const tabs = [
  {
    title: 'Newly Assigned',
    filter: { match_asignment_status: 4 },
  },
  {
    title: 'In-progress',
    filter: { in_progress: true },
  },
  {
    title: 'Completed',
    filter: { match_asignment_status: 9 },
  },
];
