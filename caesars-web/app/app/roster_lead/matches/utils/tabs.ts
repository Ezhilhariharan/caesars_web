'use client';

import dateConverter from '@/app/lib/dateConverter';

export const tabs = [
  {
    title: 'Unassigned Matches',
    filter: {
      unasigned: true,
      start_date: dateConverter(new Date()).dateString,
    },
  },
  {
    title: 'Assigned Matches',
    filter: { assigned_matches: true },
  },
  {
    title: 'Pending Approval',
    filter: { match_asignment_status: 2 },
  },
  {
    title: 'Approved Matches',
    filter: { match_asignment_status: 3 },
  },
];
