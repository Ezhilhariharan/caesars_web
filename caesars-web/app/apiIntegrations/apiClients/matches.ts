import { get } from "../fetcher";

export async function getMatches({
  limit,
  skip,
  query,
}: {
  limit?: number;
  skip?: number;
  query?: any;
}) {
  try {
    let qpm: any[] = [];
    if (limit) qpm.push(`limit=${limit}`);
    if (skip !== null && skip !== undefined) qpm.push(`skip=${skip}`);
    if (query.status === 0 || query.status) qpm.push(`status=${query.status}`);
    if (query.today) qpm.push(`today=${query.today}`);
    if (query.sports) qpm.push(`sports=${query.sports}`);
    if (query.searchKey) qpm.push(`searchKey=${query.searchKey}`);
    if (query.start_date) qpm.push(`start_date=${query.start_date}`);
    if (query.end_date) qpm.push(`end_date=${query.end_date}`);
    if (query.user_id) qpm.push(`user_id=${query.user_id}`);
    if (query.match_asignment_status || query.match_asignment_status === 0)
      qpm.push(`match_asignment_status=${query.match_asignment_status}`);
    if (query.in_progress) qpm.push(`in_progress=${query.in_progress}`);

    let qpmString = "";
    if (qpm.length > 0) {
      qpmString = "?" + qpm.join("&");
    }

    const res = await get(`/upcoming-matches${qpmString}&order=asc`);

    return res.data;
  } catch (e) {
    console.warn(e);
    return null;
  }
}

export async function getSportsMatches({
  limit,
  skip,
  query,
}: {
  limit?: number;
  skip?: number;
  query?: any;
}) {
  try {
    let qpm: any[] = [];
    if (limit) qpm.push(`limit=${limit}`);
    if (skip !== null && skip !== undefined) qpm.push(`skip=${skip}`);
    if (query.status === 0 || query.status) qpm.push(`status=${query.status}`);
    if (query.today) qpm.push(`today=${query.today}`);
    if (query.sports) qpm.push(`sports=${query.sports}`);
    if (query.searchKey) qpm.push(`searchKey=${query.searchKey}`);
    if (query.start_date) qpm.push(`start_date=${query.start_date}`);
    if (query.end_date) qpm.push(`end_date=${query.end_date}`);
    if (query.user_id) qpm.push(`user_id=${query.user_id}`);
    if (query.match_asignment_status || query.match_asignment_status === 0)
      qpm.push(`match_asignment_status=${query.match_asignment_status}`);

    let qpmString = "";
    if (qpm.length > 0) {
      qpmString = "?" + qpm.join("&");
    }
    const res = await get(`/newUpcoming-matches${qpmString}&order=asc`);

    return res.data;
  } catch (e) {
    console.warn(e);
    return null;
  }
}

export async function getMatchesShort({
  limit,
  skip,
  query,
}: {
  limit?: number;
  skip?: number;
  query?: any;
}) {
  try {
    let qpm: any[] = [];
    if (limit) qpm.push(`limit=${limit}`);
    if (skip !== null && skip !== undefined) qpm.push(`skip=${skip}`);
    if (query.status === 0 || query.status) qpm.push(`status=${query.status}`);
    if (query.today) qpm.push(`today=${query.today}`);
    if (query.sports) qpm.push(`sports=${query.sports}`);
    if (query.searchKey) qpm.push(`search_key=${query.searchKey}`);
    if (query.start_date) qpm.push(`start_date=${query.start_date}`);
    if (query.unasigned) qpm.push(`unasigned=${query.unasigned}`);
    if (query.end_date) qpm.push(`end_date=${query.end_date}`);
    if (query.match_asignment_status || query.match_asignment_status === 0)
      qpm.push(`match_asignment_status=${query.match_asignment_status}`);
    if (query.in_progress) qpm.push(`in_progress=${query.in_progress}`);

    let qpmString = "";
    if (qpm.length > 0) {
      qpmString = "?" + qpm.join("&");
    }

    const res = await get(`/matches-short${qpmString}&order=asc`);

    return res;
  } catch (e) {
    console.warn(e);
    return null;
  }
}

export async function getMatchesWithCount({
  limit,
  skip,
  query,
}: {
  limit?: number;
  skip?: number;
  query?: any;
}) {
  try {
    let qpm: any[] = [];
    if (limit) qpm.push(`limit=${limit}`);
    if (skip !== null && skip !== undefined) qpm.push(`skip=${skip}`);
    if (query.status === 0 || query.status) qpm.push(`status=${query.status}`);
    if (query.today) qpm.push(`today=${query.today}`);
    if (query.sports) qpm.push(`sports=${query.sports}`);
    if (query.searchKey) qpm.push(`searchKey=${query.searchKey}`);
    if (query.start_date) qpm.push(`start_date=${query.start_date}`);
    if (query.end_date) qpm.push(`end_date=${query.end_date}`);
    if (query.match_asignment_status || query.match_asignment_status === 0)
      qpm.push(`match_asignment_status=${query.match_asignment_status}`);
    if (query.assigned_matches)
      qpm.push(`assigned_matches=${query.assigned_matches}`);
    if (query.in_progress) qpm.push(`in_progress=${query.in_progress}`);

    let qpmString = "";
    if (qpm.length > 0) {
      qpmString = "?" + qpm.join("&");
    }

    const res = await get(`/upcoming-matches${qpmString}&order=asc`);

    return res;
  } catch (e) {
    console.warn(e);
    return null;
  }
}

export async function getMatchesWithCount1({
  limit,
  skip,
  query,
}: {
  limit?: number;
  skip?: number;
  query?: any;
}) {
  try {
    let qpm: any[] = [];
    if (limit) qpm.push(`limit=${limit}`);
    if (skip !== null && skip !== undefined) qpm.push(`skip=${skip}`);
    if (query.status === 0 || query.status) qpm.push(`status=${query.status}`);
    if (query.today) qpm.push(`today=${query.today}`);
    if (query.sports) qpm.push(`sports=${query.sports}`);
    if (query.searchKey) qpm.push(`searchKey=${query.searchKey}`);
    if (query.match_asignment_status || query.match_asignment_status === 0)
      qpm.push(`match_asignment_status=${query.match_asignment_status}`);
    if (query.start_date) qpm.push(`start_date=${query.start_date}`);
    if (query.in_progress) qpm.push(`in_progress=${query.in_progress}`);

    let qpmString = "";
    if (qpm.length > 0) {
      qpmString = "?" + qpm.join("&");
    }

    const res = await get(`/upcoming-matches1${qpmString}&order=asc`);

    return res;
  } catch (e) {
    console.warn(e);
    return null;
  }
}

export async function getMatch(id: string) {
  try {
    const res = await get(`/matches/${id}`);

    return res;
  } catch (e) {
    console.warn(e);
    return null;
  }
}

export async function getSpecificDateMatches(params: any) {
  try {
    const res = await get(
      `/all-matches?start_date=${params?.start_date}&end_date=${params?.end_date}&sports=${params?.sports}`
    );
    return res;
  } catch (e) {
    console.warn(e);
    return null;
  }
}
