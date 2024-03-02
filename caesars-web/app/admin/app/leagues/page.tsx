'use client';

import React, { useState } from 'react';

// components
import LeaguesCard from './components/LeaguesCard';
import LeaguesDetails from './components/LeagueDetails';
import Title from '@/app/components/global/title/Title';

type Props = {};

const leagues = [
  {
    id: 1,
    name: 'Major League Baseball',
    shortName: 'mlb',
    logo: '',
  },
  {
    id: 2,
    name: 'National Football League',
    shortName: 'nfl',
    logo: '',
  },
  {
    id: 3,
    name: 'College Football',
    shortName: 'cfb',
    logo: '',
  },
  {
    id: 4,
    name: 'National Basketball Association',
    shortName: 'nba',
    logo: '',
  },
  {
    id: 5,
    name: 'National Collegiate Athletic Association',
    shortName: 'CBB',
    logo: '',
  },
  {
    id: 6,
    name: 'National Hockey League',
    shortName: 'nhl',
    logo: '',
  },
];

export type leagueType = (typeof leagues)[0];

const page = (props: Props) => {
  const [selectedLeague, setSelectedLeague] = useState<leagueType>(leagues[0]);

  const onSelectLeague = (l: any) => setSelectedLeague(l);

  return (
    <div className='flex gap-20'>
      <div>
        <Title title='Leagues Overview' size='large' />
        <div className='grid grid-cols-4 gap-10 mt-10 items-start'>
          {leagues?.map((l) => {
            return (
              <div
                key={l.id}
                className='w-[262px] h-[289px] cursor-pointer'
                onClick={() => onSelectLeague(l)}
              >
                <LeaguesCard selectedLeague={selectedLeague} {...l} />
              </div>
            );
          })}
        </div>
      </div>

      <div className='w-[350px] h-full'>
        <LeaguesDetails selectedLeague={selectedLeague} />
      </div>
    </div>
  );
};

export default page;
