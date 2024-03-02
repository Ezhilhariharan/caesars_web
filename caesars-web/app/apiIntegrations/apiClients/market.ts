import { get, put } from "../fetcher";

export async function getMarket(
  match_id: string,
  team_player_id: string,
  player_prop_id?: string
) {
  try {
    let qry = "";
    if (player_prop_id) qry = `&player_prop_id=${player_prop_id}`;
    const res = await get(
      `/player-prop-markets?match_id=${match_id}&team_player_id=${team_player_id}${qry}`
    );
    return res;
  } catch (e) {
    console.warn(e);
    return null;
  }
}

export async function createMarket(
  match_id: string,
  team_player_id: string,
  player_prop_id: string,
  odds: any
) {
  try {
    const res = await get(`/player-prop-markets`, {
      match_id,
      team_player_id,
      player_prop_id,
      player_prop_market_type_id: 1,
      status: 1,
      odds,
    });
    return res;
  } catch (e) {
    console.warn(e);
    return null;
  }
}

export async function getPlayerProp(
  sports_id: any = null,
  player_type: any = null,
  status: any = null
) {
  let query = "";
  if (status) query = `&status=${status}`;
  try {
    const res = await get(
      `/player-props?sports_id=${sports_id}&player_type=${player_type}${query}`
    );
    return res;
  } catch (e) {
    console.warn(e);
    return null;
  }
}

export const makeAsDefaultPlayer = async (
  id: string | number,
  team_id: string | number,
  position: string
) => {
  try {
    const params = {
      position: position,
      team_id: team_id,
    };
    const res = await put(`team-player/${id}`, params);
    return res;
  } catch (e) {
    console.warn(e);
  }
};
