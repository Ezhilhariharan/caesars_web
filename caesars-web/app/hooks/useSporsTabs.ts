'use client';
import React, { useEffect, useState } from 'react';

const initialTabs = [
  {
    id: 1,
    sport: 'mlb',
    tabs: [],
  },
  {
    id: 2,
    sport: 'nfl',
    tabs: [],
  },
  {
    id: 3,
    sport: 'cfb',
    tabs: [],
  },
  {
    id: 4,
    sport: 'nba',
    tabs: [],
  },
  {
    id: 5,
    sport: 'cbb',
    tabs: [],
  },
  {
    id: 6,
    sport: 'nhl',
    tabs: [],
  },
];

export const useSporsTabs = (
  key: string,
  value?: any
): [any, (key: any) => any] => {
  const [_tabs, set_tabs] = useState<any>(null);

  useEffect(() => {
    const tabs = localStorage.getItem('tab');
    if (tabs) {
      const t = JSON.parse(tabs);
      const updated = t.filter((t: any) => t.sport === key.toLowerCase());
      set_tabs(updated);
    }
  }, [key]);

  function setTabs(data: any) {
    const tabs = localStorage.getItem('tab');
    let updated: any = null;

    if (tabs) {
      const t = JSON.parse(tabs);
      updated = t.map((t: any) => {
        if (t.sport === key.toLowerCase()) {
          const newTabs = t.tabs.filter((t: any) => t.matchId === data.matchId);
          if (newTabs.length === 0)
            return { ...t, tabs: [...t.tabs, { id: t.tabs.length, ...data }] };
          else return { ...t };
        } else return { ...t };
      });
    } else {
      updated = initialTabs.map((t: any) => {
        if (t.sport === key.toLowerCase()) {
          return { ...t, tabs: [{ id: t.tabs.length, ...data }] };
        } else {
          return { ...t };
        }
      });
    }

    if (updated) {
      set_tabs(updated);
      localStorage.setItem('tab', JSON.stringify(updated));
    }
    return;
  }

  return [_tabs, setTabs];
};
