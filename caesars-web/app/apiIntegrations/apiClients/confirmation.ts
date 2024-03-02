import { get, put } from '../fetcher';

export const getConfirmationData = async (
  matchId: string | number,
  playerName?: string,
  teamId?: string | number,
  playerType?: string
) => {
  try {
    let params = [];
    if (playerName) params.push(`player_name=${playerName}`);
    if (teamId) params.push(`team_id=${teamId}`);
    // if (playerType) params.push(`player_type=${playerType}`);

    let paramsString = '';
    if (params.length > 0) paramsString = '?' + params.join('&');

    const res = await get(
      `/matches-live/${playerType}/${matchId}${paramsString}`
    );

    return res.data;
  } catch (e) {
    console.warn(e);
  }
};

export const fetchConfirmedData = async (
  matchId: string | number,
  team: string,
  playerType: string,
  playerName?: string,
  homeTeamId?: string | number,
  awayTeamId?: string | number
) => {
  let homeTeamBatters = [];
  let awayTeamBatters = [];
  let homeTeamPitchers = [];
  let awayTeamPitchers = [];

  // allow to fetch data based on the roles
  const allowedBatterTypes = ['all', 'batter'];
  const allowedPitcherTypes = ['all', 'pitcher'];

  // allow to fetch data based on the roles
  const homeTeamAllowedType = ['All Team', 'Home Team'];
  const awayTeamAllowedType = ['All Team', 'Away Team'];

  // fetch the home stats data
  if (homeTeamAllowedType.includes(team)) {
    try {
      if (allowedBatterTypes.includes(playerType))
        homeTeamBatters = await getConfirmationData(
          matchId,
          playerName,
          homeTeamId,
          'batter'
        );
    } catch (e) {
      console.warn(e);
    }

    try {
      if (allowedPitcherTypes.includes(playerType))
        homeTeamPitchers = await getConfirmationData(
          matchId,
          playerName,
          homeTeamId,
          'pitcher'
        );
    } catch (e) {
      console.warn(e);
    }
  }
  // fetch the away team stats data
  if (awayTeamAllowedType.includes(team)) {
    try {
      if (allowedBatterTypes.includes(playerType))
        awayTeamBatters = await getConfirmationData(
          matchId,
          playerName,
          awayTeamId,
          'batter'
        );
    } catch (e) {
      console.warn(e);
    }

    try {
      if (allowedPitcherTypes.includes(playerType))
        awayTeamPitchers = await getConfirmationData(
          matchId,
          playerName,
          awayTeamId,
          'pitcher'
        );
    } catch (e) {
      console.warn(e);
    }
  }

  // return [
  //   ...homeTeamBatters,
  //   ...homeTeamPitchers,
  //   ...awayTeamBatters,
  //   ...awayTeamPitchers,
  // ];

  return {
    batters: [...homeTeamBatters, ...awayTeamBatters],
    pitchers: [...homeTeamPitchers, ...awayTeamPitchers],
  };
};

// update the stat confirmation
export const updateStatConfirmation = async (
  statId: string | number,
  playerType: string
) => {
  if (statId && playerType) {
    try {
      const res = await put(`player-prop-stat/${statId}`, {
        player_type: playerType,
      });
      return res;
    } catch (e) {
      console.warn(e);
    }
  }
};
