'use client';
import React, { useEffect, useState } from 'react';
import { get } from '../apiIntegrations/fetcher';

export const useFetchKPI = (route: string | null) => {
  const [kpi, setKpi] = useState<any>(null);

  useEffect(() => {
    loadKpi();
  }, [route]);

  const loadKpi = async (filter?: string | null) => {
    if (filter) {
      const res = await get(filter);
      setKpi(res);
    } else if (route) {
      const res = await get(route);
      setKpi(res);
    } else {
      setKpi(null);
    }
  };

  return [kpi, loadKpi];
};
