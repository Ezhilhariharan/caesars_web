'use client';
import React, { useEffect, useState } from 'react';

const initialState = {
  isLoading: false,
  data: null,
  count: null,
  isSuccess: false,
  isError: false,
  error: '',
};

export const useQuery = () => {
  const [state, setState] = useState<any>(initialState);

  const loadData = async (fetchData: () => void) => {
    setState((prev: any) => {
      return { ...prev, isLoading: true };
    });

    try {
      const res = await fetchData();
      setState((prev: any) => {
        return { ...prev, data: res, isSuccess: true, isLoading: false };
      });
    } catch (e: any) {
      setState((prev: any) => {
        return {
          ...prev,
          data: null,
          isLoading: false,
          isSuccess: false,
          isError: true,
          error: e.message,
        };
      });
    }
  };

  return [state, loadData];
};
