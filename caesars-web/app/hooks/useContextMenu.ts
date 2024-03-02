'use client';
import React, { useEffect, useState } from 'react';

export const useContextMenu = () => {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [coords, setCoords] = useState({
    x: 0,
    y: 0,
  });
  const [id, setId] = useState(null);

  useEffect(() => {
    const handleClick = () => {
      setShowContextMenu(false);
    };
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return {
    showContextMenu,
    setShowContextMenu,
    coords,
    setCoords,
    id,
    setId,
  };
};
