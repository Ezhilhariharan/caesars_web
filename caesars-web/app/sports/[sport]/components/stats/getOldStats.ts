export const getOldStats = (
  id: string | number,
  stat: string,
  playerType: 'batter' | 'pitcher'
) => {
  const localData = localStorage.getItem('stats data');

  if (localData) {
    if (playerType === 'batter') {
      const parsedData = JSON.parse(localData);
      const playerData = parsedData?.batters?.filter(
        (p: any) => p.player_id === id
      );

      if (playerData.length > 0) return playerData[0][stat];
      else return '0';
    }

    if (playerType === 'pitcher') {
      const parsedData = JSON.parse(localData);
      const playerData = parsedData?.pitchers?.filter(
        (p: any) => p.player_id === id
      );

      if (playerData.length > 0) return playerData[0][stat];
      else return '0';
    }
  }
};
