'use client';
import React, { useState } from 'react';

export const useToggle = (value: boolean) => {
  const [toggle, setToggle] = useState<any>(value);

  const toggleValue = (currentValue: boolean) =>
    setToggle((prev: boolean) =>
      typeof currentValue === 'boolean' ? currentValue : !prev
    );

  return [toggle, toggleValue];
};
