'use client';
import React, { useState } from 'react';

export const useSearch = (initialValue: any) => {
  const [search, setSearch] = useState(initialValue);

  const onSearch = (value: string) => setSearch(value);

  return [search, onSearch];
};
