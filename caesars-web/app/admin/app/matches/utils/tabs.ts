export const tabs = [
  {
    id: 1,
    title: 'pre-game',
    subtabs: [
      {
        id: 1,
        title: 'Newly Assigned Matches',
        filter: {
          status: 'new',
        },
      },
      {
        id: 2,
        title: 'Inprogress Matches',
        filter: {
          status: 'in-progress',
        },
      },
      {
        id: 3,
        title: 'Pending Approval',
        filter: {
          status: 'pending',
        },
      },
      {
        id: 4,
        title: 'Approved Matches',
        filter: {
          status: 'approved',
        },
      },
    ],
  },
  {
    id: 2,
    title: 'in-game',
    subtabs: [
      {
        id: 1,
        title: 'Unassigned Matches',
        filter: {
          status: 'unassigned',
        },
      },
      {
        id: 2,
        title: 'Assigned Matches',
        filter: {
          status: 'assigned',
        },
      },
      {
        id: 3,
        title: 'Live Matches',
        filter: {
          status: 'live',
        },
      },
      {
        id: 4,
        title: 'End Matches',
        filter: {
          status: 'end',
        },
      },
    ],
  },
];
