import React from 'react';
import MemberOverviewDesign1 from './Design1';
import icon1 from './Design1/images/Group1.png';
import icon2 from './Design1/images/Group2.png';
import icon3 from './Design1/images/Group3.png';
import MemberOverviewDesign2 from './Design2';
import profile1 from './Design2/images/Group1.png';
import progress1 from './Design2/images/progress1.png';
import profile from './Design2/images/Group.png';
import progress from './Design2/images/progress.png';

function MembersOverview({ memberOverview, overview, admin }: any) {
  // MemberOverviewDesign1
  let matchData = [
    {
      profileicon: icon1,
      number: memberOverview?.admins || 0,
      title: 'Admins',
      tab: 'Admin',
    },
    {
      profileicon: icon2,
      number: memberOverview?.data_scientists || 0,
      title: 'Data Scientist',
      tab: 'Data Scientist',
    },
    {
      profileicon: icon3,
      number: memberOverview?.trade_analysts || 0,
      title: 'Trade Analyst',
      tab: 'Trade Analyst',
    },
  ];

  // MemberOverviewDesign12
  let matchDataArray = [
    {
      profileicon: profile,
      progressicon: progress1,
      title: 'Pre-Game Team',
      admin: 'Roster Admin',
      number: memberOverview?.roster_admins | 0,
      manager: 'Roster Manager',
      numbers: memberOverview?.roster_managers | 0,
      color: '#FF6C37',
      tab1: 'Roster Admin',
      tab2: 'Roster Manager',
    },
    {
      profileicon: profile1,
      progressicon: progress,
      title: 'In-Game Team',
      admin: 'In-game Manager',
      number: memberOverview?.in_game_managers | 0,
      manager: 'In-game Trader',
      numbers: memberOverview?.in_game_traders | 0,
      color: '#34A770',
      tab1: 'In-game Manager',
      tab2: 'In-game Trader',
    },
  ];
  return (
    <div className='w-full flex justify-between gap-5 max-[1700px]:gap-1'>
      <MemberOverviewDesign1 matchData={matchData} admin={admin} />
      <MemberOverviewDesign2 matchDataArray={matchDataArray} />
    </div>
  );
}
export default MembersOverview;
