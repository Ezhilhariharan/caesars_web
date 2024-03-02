// upcoming - matches - trading - lead;
import { get } from '../fetcher';

export async function getTradingTeamMatchesWithCount({
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
    if (query.trader_type) qpm.push(`trader_type=${query.trader_type}`);

    let qpmString = '';
    if (qpm.length > 0) {
      qpmString = '?' + qpm.join('&');
    }

    const res = await get(
      `/upcoming-matches-trading-lead${qpmString}&order=asc`
    );

    return res;
  } catch (e) {
    console.warn(e);
    return null;
  }
}
