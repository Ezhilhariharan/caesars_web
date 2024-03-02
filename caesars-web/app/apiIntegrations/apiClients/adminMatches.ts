import { get } from '../fetcher';

export async function getMatchesForAdmin({
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
    if (query.sports) qpm.push(`sports=${query.sports}`);
    if (query.type) qpm.push(`match_type=${query.type}`);
    if (query.status) qpm.push(`match_assignment_status=${query.status}`);
    if (query.searchKey) qpm.push(`searchKey=${query.searchKey}`);
    if (query.start_date) qpm.push(`start_date=${query.start_date}`);
    if (query.today) qpm.push(`today=${query.today}`);

    let qpmString = '';
    if (qpm.length > 0) {
      qpmString = '?' + qpm.join('&');
    }

    const res = await get(`/upcoming-matches-all${qpmString}`);
    return res;
  } catch (e) {
    console.warn(e);
    return null;
  }
}
