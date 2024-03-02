'use client';
import React, { useState } from 'react';

export const useSelected = (value: any) => {
  const [selected, setSelected] = useState(value);

  const toggleSelect = (value: any) => setSelected(value);

  return [selected, toggleSelect];
};
