import { get } from '../fetcher';

export async function getActivity({ matchId }: { matchId?: any }) {
  try {
    let qpm: any[] = [];

    if (matchId) qpm.push(`matchId=${matchId}`);
    let qpmString = '';
    if (qpm.length > 0) {
      qpmString = '?' + qpmString;
    }
    const res = await get(`/notification/activities${qpmString}`);
    return res;
  } catch (e) {
    console.warn(e);
    return null;
  }
}
