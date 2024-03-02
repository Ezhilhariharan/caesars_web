import { get } from '../fetcher';

async function fetchRosters(matchId: string | number, teamId: string | number) {
  if (matchId && teamId)
    try {
      const res = await get(`/rosters?match_id=${matchId}&team_id=${teamId}`);
      return res.data;
    } catch (e) {
      console.warn(e);
    }
}

export const fetchRosterList = async (
  matchId: string | number,
  team: string,
  playerType: string,
  homeTeamId: string | number,
  awayTeamId: string | number
) => {
  let homeTeamBatters = [];
  let homeTeamPitchers = [];
  let awayTeamBatters = [];
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
      // homeTeamBatters = await fetchRosters(matchId, homeTeamId);
      const res = await fetchRosters(matchId, homeTeamId);

      if (allowedBatterTypes.includes(playerType)) {
        const batterType = ['outfielder', 'infielder', 'catcher'];
        homeTeamBatters = res.filter((p: any) =>
          batterType.includes(p?.team_players.players.primary_position)
        );
      }

      if (allowedPitcherTypes.includes(playerType)) {
        const batterType = ['pitcher'];
        homeTeamPitchers = res.filter((p: any) =>
          batterType.includes(p?.team_players.players.primary_position)
        );
      }
    } catch (e) {
      console.warn(e);
    }
  }
  // fetchRosters the away team stats data
  if (awayTeamAllowedType.includes(team)) {
    try {
      const res = await fetchRosters(matchId, awayTeamId);

      if (allowedBatterTypes.includes(playerType)) {
        const batterType = ['outfielder', 'infielder', 'catcher'];
        awayTeamBatters = res.filter((p: any) =>
          batterType.includes(p?.team_players.players.primary_position)
        );
      }

      if (allowedPitcherTypes.includes(playerType)) {
        const batterType = ['pitcher'];
        awayTeamPitchers = res.filter((p: any) =>
          batterType.includes(p?.team_players.players.primary_position)
        );
      }
    } catch (e) {
      console.warn(e);
    }
  }

  return [
    ...homeTeamBatters,
    ...homeTeamPitchers,
    ...awayTeamBatters,
    ...awayTeamPitchers,
  ];

  // return {
  //   batters: [...homeTeamBatters, ...awayTeamBatters],
  //   pitchers: [...homeTeamPitchers, ...awayTeamPitchers],
  // };
};
