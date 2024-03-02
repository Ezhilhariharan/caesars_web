export const mainTabs = [
  {
    id: 1,
    title: 'All Employees',
    tab: 'All Employees',
    subTabs: [],
  },
];

export const AdminMainTabs = [
  {
    id: 2,
    title: 'Admin',
    tab: 'admin',
    subTabs: [],
  },
];

export const userMainTabs = [
  {
    id: 3,
    title: 'Roster Team',
    // tab: 'Roster Team',
    subTabs: [
      {
        id: 1,
        title: 'Roster Lead',
        option: 'ROSTER LEAD',
        tab: 'roster_lead',
      },
      {
        id: 2,
        title: 'Roster Maker',
        option: 'ROSTER MAKER',
        tab: 'roster_maker',
      },
    ],
  },
  {
    id: 4,
    title: 'Trading Team',
    // tab: 'Trading Team',
    subTabs: [
      {
        id: 1,
        title: 'Trading Lead',
        option: 'TRADING LEAD',
        tab: 'trading_lead',
      },
      {
        id: 2,
        title: 'Pre-game Trader',
        option: 'PRE GAME TRADER',
        tab: 'pre_game_trader',
      },
      {
        id: 3,
        title: 'In-game Trader',
        option: 'IN GAME TRADER',
        tab: 'in_game_trader',
      },
    ],
  },
];
