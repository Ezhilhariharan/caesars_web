'use client';
import React, { useEffect, useState } from 'react';
import { get } from '@/app/apiIntegrations/fetcher';
import Image, { StaticImageData } from 'next/image';

type Props = {
  matchId: number;
  team1: {
    id: number;
    logo: string | StaticImageData;
    name: string;
    short_name: string;
  };
  team2: {
    id: number;
    logo: string | StaticImageData;
    name: string;
    short_name: string;
  };
};

const MoneyLineTable = (props: Props) => {
  const { matchId, team1, team2 } = props;
  const [team1Data, setTeam1Data] = useState<any>(null);
  const [team2Data, setTeam2Data] = useState<any>(null);

  useEffect(() => {
    fetchMoneLine();
  }, []);

  const fetchMoneLine = async () => {
    const res = await get(`match-market/${matchId}`);
    const ml = res?.data?.filter((r: any) => r.mmt_name === 'Money Line');
    const total = res?.data?.filter((r: any) => r.mmt_name === 'Total Points');

    const team1ML = ml?.[0]?.teams?.filter((l: any) => l.team_id === team1?.id);
    const team2ML = ml?.[0]?.teams?.filter((l: any) => l.team_id === team2?.id);

    const team1Total = total?.[0]?.teams?.filter(
      (l: any) => l.team_id === team1?.id
    );
    const team2Total = total?.[0]?.teams?.filter(
      (l: any) => l.team_id === team2?.id
    );

    setTeam1Data({
      ml: team1ML?.[0],
      total: team1Total?.[0],
    });
    setTeam2Data({
      ml: team2ML?.[0],
      total: team2Total?.[0],
    });
  };

  return (
    <table className='w-full h-full text-center text-sm font-normal text-[#14171C]'>
      <thead>
        <tr className='h-10 bg-[#F0F1F3] rounded-t-[10px]'>
          <td className='w-1/3'>Team</td>
          <td className='w-1/3'>Total</td>
          <td className='w-1/3'>Moneyline</td>
        </tr>
      </thead>
      <tbody>
        <tr className='h-10 border-x border-b last:rounded-b-[10px]'>
          <td className='max-w-1/3 w-full h-full flex items-center justify-center gap-2.5'>
            {team1?.logo && (
              <Image src={team1?.logo} alt='logo' width={20} height={20} />
            )}
            <p>{team1?.short_name}</p>
          </td>
          <td className='w-1/3 border-x'>{team1Data?.total?.american_odds}</td>
          <td className='w-1/3'>{team1Data?.ml?.american_odds}</td>
        </tr>
        <tr className='h-10 border-x border-b last:rounded-b-[10px]'>
          <td className='max-w-1/3 w-full h-full flex items-center justify-center gap-2.5'>
            {team2?.logo && (
              <Image src={team2?.logo} alt='logo' width={20} height={20} />
            )}
            <p>{team2?.short_name}</p>
          </td>
          <td className='w-1/3 border-x'>{team2Data?.total?.american_odds}</td>
          <td className='w-1/3'>{team2Data?.ml?.american_odds}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default MoneyLineTable;

const list = [
  {
    id: 1,
    name: 'WAS',
    total: '5(-130)',
    moneyLine: '+135',
  },
  {
    id: 2,
    name: 'CIN',
    total: '5(+110)',
    moneyLine: '-135',
  },
];
