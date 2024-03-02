import React from 'react';
import DragableList from '@/app/sports/[sport]/components/DndList';

const TeamPlayerDetails = ({
  rosters,
  onPlayerClick,
  selectedPlayer,
  onOrderChange,
  allow,
}: any) => {
  return (
    <div className='w-full h-auto'>
      <DragableList
        team={rosters}
        allow={allow}
        selectedPlayer={selectedPlayer}
        onPlayerClick={(player: any) => {
          onPlayerClick(player);
        }}
        // onOrderChange={(e: any) => {
        //   // onOrderChange(e);
        // }}
        onOrderChange={onOrderChange}
      />
    </div>
  );
};

export default TeamPlayerDetails;
