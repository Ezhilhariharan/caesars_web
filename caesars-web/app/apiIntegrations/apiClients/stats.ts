import { get, post, put } from '../fetcher';

// fetch the single team stats for perticular match based on the player_type
export const getStatsData = async (
  matchId: string | number,
  playerName?: string,
  teamId?: string | number,
  playerType?: string
) => {
  try {
    let params = [];
    if (playerName) params.push(`player_name=${playerName}`);
    if (teamId) params.push(`team_id=${teamId}`);
    if (playerType)
      params.push(
        `player_type=${
          playerType === 'batter' ? 'outfielder,infielder,catcher' : playerType
        }`
      );

    let paramsString = '';
    if (params.length > 0) paramsString = '?' + params.join('&');

    const res = await get(`/matches-live/${matchId}${paramsString}`);

    return res.data;
  } catch (e) {
    console.warn(e);
  }
};

// fetch the live match info
export const getMatchInfo = async (matchId: string | number) => {
  try {
    const res = await get(`/match-overview/${matchId}`);
    return res.data;
  } catch (e) {
    console.warn(e);
  }
};

// update the stats
export const updateStats = async (data: any) => {
  // try {
  //   const res = await post(`/match-stat`, data);
  //   return res;
  // } catch (e) {
  //   console.warn(e);
  // }

  let battersRes = null;
  let pitcherRes = null;

  if (data.batters.length > 0) {
    try {
      battersRes = await post(`/match-stat/batter`, data.batters);
      // return res;
    } catch (e) {
      console.warn(e);
    }
  }

  if (data.pitchers.length > 0) {
    try {
      pitcherRes = await post(`/match-stat/pitcher`, data.pitchers);
      // return res;
    } catch (e) {
      console.warn(e);
    }

    return {
      batter: battersRes,
      pitcher: pitcherRes,
    };
  }
};

// fetch the live stats based on the search, player_type and team
export const fetchPlayerStats = async (
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
        homeTeamBatters = await getStatsData(
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
        homeTeamPitchers = await getStatsData(
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
        awayTeamBatters = await getStatsData(
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
        awayTeamPitchers = await getStatsData(
          matchId,
          playerName,
          awayTeamId,
          'pitcher'
        );
    } catch (e) {
      console.warn(e);
    }
  }

  return {
    batters: [...homeTeamBatters, ...awayTeamBatters],
    pitchers: [...homeTeamPitchers, ...awayTeamPitchers],
  };
};
