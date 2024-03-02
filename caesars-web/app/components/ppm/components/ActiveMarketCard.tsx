'use client';
import { get, patch } from '@/app/apiIntegrations/fetcher';
import React, { useEffect, useState } from 'react';
import RosterCard from '../../global/roster/RosterCard';
import Avatar from '../../global/Avatar';
import { Dropdown, MenuProps } from 'antd';
import { StaticImageData } from 'next/image';
import AbbriviationForRoster from '@/app/lib/AbbriviationForRoster';
import dateConverter from '@/app/lib/dateConverter';
import PlayerPropDropdown from './PropsDropDown';

type Props = {
  matchId: number;
  place: string;
  fixtureStartAt: any;
  selectedRoster: any;
  loadMarket: () => void;
  allow: boolean;
  showSuspend: boolean;
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

const ActiveMarketCard = (props: Props) => {
  const {
    matchId,
    place,
    fixtureStartAt,
    selectedRoster,
    loadMarket,
    allow,
    showSuspend,
    team1,
    team2,
  } = props;

  const [activeMarkets, setActiveMarkets] = useState<any[]>([]);
  const [propsList, setPropsList] = useState<any[]>([]);
  const [isShowpropsList, setisShowpropsList] = useState(false);

  // useEffect(() => {
  //   if (matchId && selectedRoster)
  //     loadActiveMarkets(matchId, selectedRoster.team_player_id);
  // }, [matchId, selectedRoster]);

  // async function loadActiveMarkets(matchId: any, teamPlayerId: any) {
  //   try {
  //     const res = await get(
  //       `/player-prop-markets/match/${matchId}/player/${teamPlayerId}/markets`
  //     );

  //     setActiveMarkets(res.data);
  //   } catch (e) {
  //     console.warn(e);
  //   }
  // }

  const suspendMarket = (data: any) => {
    return { ...data, status: 0 };
  };

  const actionItems: MenuProps['items'] = [
    {
      key: '0',
      label: <div>Suspend</div>,
      onClick: async () => {
        const suspendAllMarket = activeMarkets?.map(async (market) => {
          const suspendedOddsData = market.odds.data.map((odd: any) =>
            suspendMarket(odd)
          );
          const res = await patch(`/player-prop-markets/${market.id}`, {
            odds: { ...market.odds, data: suspendedOddsData },
          });
          if (res) loadMarket();
        });
      },
    },
  ];

  // const propListItems: MenuProps["items"] = propsList?.map(
  //   (data: any, i: any) => {}
  // );

  return (
    <div className='w-full h-auto bg-white border mb-3.5 px-3 py-1 rounded-[5px]'>
      <div className='flex items-center cursor-pointer'>
        <div
          className='py-2 w-3/4'
          // onClick={() => setisShowpropsList(!isShowpropsList)}
        >
          <div className='flex items-center gap-4'>
            <div className='flex items-center'>
              <RosterCard
                name={
                  selectedRoster?.team_players?.players?.first_name +
                  ' ' +
                  selectedRoster?.team_players?.players?.last_name
                }
                width={40}
                height={40}
                highLightName={true}
              />
              <p className=' uppercase text-sm text-[#4285F4] font-normal  '>
                <AbbriviationForRoster
                  value={selectedRoster?.team_players?.primary_position}
                />
                {/* {selectedRoster?.team_players?.primary_position} */}
              </p>
            </div>
            <div className='text-sm text-[#54577A] flex items-center'>
              {selectedRoster?.matches?.team1_id !==
                +selectedRoster?.team_id && (
                <div className='gap-1.5 flex items-center'>
                  <p className='text-[10px]'>VS</p>
                  {team1?.short_name}
                </div>
              )}
              {selectedRoster?.matches?.team2_id !==
                +selectedRoster?.team_id && (
                <div className='gap-1.5 flex items-center'>
                  <p className='text-[10px]'>VS</p>
                  {team2?.short_name}
                </div>
              )}
              {place && <p className='pl-1.5'>@</p>}
              <p className='px-1.5'>{place && `${place}`}</p>
              <p className=''>{dateConverter(fixtureStartAt).timeString}</p>
            </div>
          </div>
        </div>
        <div className='w-1/4 flex items-center justify-end gap-4 pr-2'>
          <div className='px-6 py-1.5 text-base rounded-full bg-[#4285F4] text-[#FFF]'>
            Starter
          </div>
          <PlayerPropDropdown items={actionItems} />
          {/* <div>Add Prop</div> */}
          {/* <div className="flex items-center">
            <div className="text-sm text-[#555]">
              <Avatar
                name={selectedRoster?.teams?.full_name}
                image={selectedRoster?.teams?.logo_image}
                width={40}
                height={40}
              />
            </div>
          </div> */}
          {/* {showSuspend && (
            <Dropdown
              menu={{ items: actionItems }}
              trigger={allow && activeMarkets.length > 0 ? ["click"] : []}
            >
              <div
                className={`px-5 py-1.5 bg-[#E0E3E8] text-[#282E38] text-sm font-semibold rounded-[4px] ${
                  allow && activeMarkets.length > 0
                    ? "cursor-pointer"
                    : "cursor-not-allowed"
                }`}
              >
                Action
              </div>
            </Dropdown>
          )} */}
        </div>
      </div>
      {/* {isShowpropsList && (
        <div className='text-[#141522] my-2'>
          <div className='text-base font-semibold'>Active Markets</div>
          {activeMarkets.length > 0 && (
            <div className='w-full text-sm font-normal mt-3 grid grid-cols-4'>
              {activeMarkets?.map((activeMarket) => {
                return (
                  <p className='py-2'>{activeMarket?.player_props?.name}</p>
                );
              })}
            </div>
          )}
          {activeMarkets.length === 0 && (
            <div className='w-full text-sm font-medium flex justify-center'>
              No Active Markets Available
            </div>
          )}
        </div>
      )} */}
    </div>
  );
};

export default ActiveMarketCard;
