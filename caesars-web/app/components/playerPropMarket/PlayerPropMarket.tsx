'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import angleDownArrow from '../../assets/icons/arrow-down.svg';
import { Dropdown, MenuProps } from 'antd';
import PlayerPropMarketsCard from './components/PlayerPropMarketsCard';
import RosterCard from '../global/roster/RosterCard';
import Avatar from '../global/Avatar';
import {
  createMarket,
  getMarket,
  getPlayerProp,
} from '@/app/apiIntegrations/apiClients/market';
import { get, patch, post } from '@/app/apiIntegrations/fetcher';
import Toast, { toastProps } from '../global/toast/Toast';
import { calculateOddsWithMargin } from './utils/calculateMargin';
import { oddsConversion } from './utils/oddsConversion';

type Props = {
  selectedPlayer?: {} | any;
  playerPropId: any;
  setPlayerPropId?: React.Dispatch<React.SetStateAction<number>>;
  style?: {};
};

const PlayerPropMarket = ({
  selectedPlayer,
  playerPropId,
  setPlayerPropId,
  ...prop
}: Props) => {
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [selectedProp, setSelectedProp] = useState<any>(null);
  const [selectedOdds, setSelectedOdds] = useState('Decimal Odds');
  const [selectedMargin, setSelectedMargin] = useState(0);
  const [playerProps, setPlayerProps] = useState<MenuProps['items']>([]);
  const [oddsData, setOddsdata] = useState({});
  const [showUpdate, setShowUpdate] = useState(false);
  const [isShowpropsList, setisShowpropsList] = useState(false);
  const [activeMarkets, setActiveMarkets] = useState<any[]>([]);

  const [toastPopup, setToastPopup] = useState(false);
  const [toastDetails, setToastDetails] = useState<toastProps>({
    type: 'error',
    title: '',
    discription: '',
    logo: '',
  });

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setToastPopup(false);
    }, 3000);
    return () => clearTimeout(timeOut);
  }, [toastPopup]);

  useEffect(() => {
    setPlayerPropId?.(0);
    setSelectedProp(null);
    setDataSource([]);
    loadPlayerProp(
      selectedPlayer?.roster?.team_players?.players?.primary_position || 'all'
    );
    // loadActiveMarkets(
    //   selectedPlayer?.roster?.match_id,
    //   selectedPlayer?.roster?.team_player_id
    // );
  }, [selectedPlayer]);

  useEffect(() => {
    if (playerPropId && selectedPlayer) loadMarketdata();
  }, [selectedProp]);

  useEffect(() => {
    if (playerPropId && selectedPlayer) loadMarketdata();
  }, [selectedPlayer]);

  // load market
  async function loadMarketdata() {
    try {
      const res = await getMarket(
        selectedPlayer?.match_id,
        selectedPlayer?.team_player_id,
        playerPropId
      );

      if (res.data.length !== 0) {
        setSelectedMargin(res?.data[0]?.odds?.margin);
        setSelectedOdds(res?.data[0]?.odds?.oddType);
        calculateMargin(res?.data[0]?.odds?.margin);
      } else setDataSource([]);
    } catch (e) {
      console.warn(e);
    }
  }
  // load active markets
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

  // load player props
  async function loadPlayerProp(position = 'all') {
    try {
      const res = await getPlayerProp(1, position, 1);
      const res1 = await getPlayerProp(1, '', 1);
      let op = [
        { type: 'divider', title: position },
        ...res.data,
        { type: 'divider', title: 'others' },
        ...res1.data,
      ];

      const propsItems: MenuProps['items'] = op.map((d: any, i: any) => {
        if (d.type === 'divider') {
          return {
            key: i,
            label: (
              <div className='border-b border-[#ccc] text-center text-[#888] text-sm pb-2.5 capitalize'>
                {d.title}
              </div>
            ),
          };
        }
        return {
          key: i,
          label: <div>{d.name}</div>,
          onClick: async () => {
            setSelectedProp(d);
            setPlayerPropId?.(d.id);
            const market = await getMarket(
              selectedPlayer?.match_id,
              selectedPlayer?.team_player_id,
              d.id
            );
          },
        };
      });
      setPlayerProps(propsItems);
    } catch (e) {
      console.warn(e);
    }
  }

  const onOddsItemChange = (oldOddsType: string, newOddsType: string) => {
    setSelectedOdds(newOddsType);
    if (oldOddsType !== newOddsType && dataSource) {
      const _d = [...dataSource];
      const res = oddsConversion(_d, newOddsType);
      return res;
    }
  };

  const oddsItems: MenuProps['items'] = [
    {
      key: '0',
      label: <div>Decimal Odds</div>,
      onClick: async () => onOddsItemChange(selectedOdds, 'Decimal Odds'),
    },
    {
      key: '1',
      label: <div>American Odds</div>,
      onClick: async () => onOddsItemChange(selectedOdds, 'American Odds'),
    },
  ];

  const mc = (margin: any, old_o: any) => {
    const probability = 1 / old_o;
    const convertMargin = margin / 100;
    const newMargin = probability * convertMargin;
    const length = +newMargin.toFixed(4);
    const newOdd = 1 / (probability + length);
    return newOdd.toFixed(2);
  };

  async function calculateMargin(value: any) {
    const res = await getMarket(
      selectedPlayer?.match_id,
      selectedPlayer?.team_player_id,
      playerPropId
    );

    const data = res?.data[0]?.odds?.data?.map((source: any) => {
      source.over =
        source.over !== '-' ? mc(selectedMargin, parseFloat(source.over)) : '-';

      source.under =
        source.under !== '-'
          ? mc(selectedMargin, parseFloat(source.under))
          : '-';

      source.exact =
        source.under !== '-'
          ? mc(selectedMargin, parseFloat(source.exact))
          : '-';
      return source;
    });
    if (selectedOdds !== res?.data[0]?.odds?.oddType) {
      setDataSource(oddsConversion(data, selectedOdds));
    } else setDataSource(data);

    setShowUpdate(true);
  }

  const onMarginChange = (margin: number) => {
    setSelectedMargin(margin);
    calculateMargin(margin);
  };

  const marginItems: MenuProps['items'] = [
    {
      key: '0',
      label: <div>Margin 0%</div>,
      onClick: async () => onMarginChange(0),
    },
    {
      key: '1',
      label: <div>Margin 2.5%</div>,
      onClick: async () => onMarginChange(2.5),
    },
    {
      key: '2',
      label: <div>Margin 5%</div>,
      onClick: async () => onMarginChange(5),
    },
    {
      key: '3',
      label: <div>Margin 7.5%</div>,
      onClick: async () => onMarginChange(7.5),
    },
    {
      key: '4',
      label: <div>Margin 10%</div>,
      onClick: async () => onMarginChange(10),
    },
    {
      key: '5',
      label: <div>Margin 15%</div>,
      onClick: async () => onMarginChange(15),
    },
    {
      key: '6',
      label: <div>Margin 20%</div>,
      onClick: async () => onMarginChange(20),
    },
    {
      key: '7',
      label: <div>Margin 25%</div>,
      onClick: async () => onMarginChange(25),
    },
    {
      key: '8',
      label: <div>Margin 30%</div>,
      onClick: async () => onMarginChange(30),
    },
    {
      key: '9',
      label: <div>Margin 35%</div>,
      onClick: async () => onMarginChange(35),
    },
    {
      key: '10',
      label: <div>Margin 40%</div>,
      onClick: async () => onMarginChange(40),
    },
    {
      key: '11',
      label: <div>Margin 45%</div>,
      onClick: async () => onMarginChange(45),
    },
    {
      key: '12',
      label: <div>Margin 50%</div>,
      onClick: async () => onMarginChange(50),
    },
  ];

  // update the market
  const onUpdateMarket = async (source: any) => {
    const checkMarket = await getMarket(
      selectedPlayer?.match_id,
      selectedPlayer?.team_player_id,
      playerPropId
    );

    const oddsData =
      selectedMargin === 0 ? source : checkMarket?.data[0]?.odds?.data;

    // odds data is not exsting create a new market
    if (checkMarket.data.length === 0) {
      const createNewMarket = await post(`/player-prop-markets`, {
        match_id: selectedPlayer?.match_id,
        team_player_id: selectedPlayer?.team_player_id,
        player_prop_id: playerPropId,
        player_prop_market_type_id: '1',
        odds: {
          data: oddsData,
          oddType: selectedOdds,
          margin: selectedMargin,
        },
      });
    }

    // odds data is exsting add new data to existing market
    if (checkMarket.data.length !== 0) {
      const updateMarket = await patch(
        `/player-prop-markets/${checkMarket.data[0].id}`,
        {
          odds: {
            data: oddsData,
            oddType: selectedOdds,
            margin: selectedMargin,
          },
        }
      );
    }

    setToastPopup(true);
    setToastDetails({
      type: 'success',
      title: 'success',
      discription: 'Odds Updated Successfully',
    });
    // loadActiveMarkets(selectedPlayer?.match_id, selectedPlayer?.team_player_id);
  };

  const suspendMarket = (data: any) => {
    return { ...data, status: 0 };
  };

  // overall suspend the market based on the player
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
          if (res) loadMarketdata();
        });
      },
    },
  ];

  return (
    <div>
      <Toast
        type={toastDetails.type}
        title={toastDetails.title}
        discription={toastDetails.discription}
        logo={toastDetails.logo}
        toggle={toastPopup}
      />
      <div className='flex items-center justify-end gap-5'>
        <div className='w-1/3 cursor-pointer group'>
          <Dropdown menu={{ items: playerProps }}>
            <div className='flex items-center justify-center px-3 py-2'>
              <span className='pr-2 text-sm font-medium text-[#282E38] transition-all duration-300 ease-linear'>
                {selectedProp ? selectedProp?.name : 'Select Prop'}
              </span>
              <Image
                src={angleDownArrow}
                alt=''
                className='w-auto transition-all duration-300 ease-linear group-hover:rotate-180 '
              />
            </div>
          </Dropdown>
        </div>
        <div className='w-1/3 cursor-pointer group'>
          <Dropdown menu={{ items: oddsItems }}>
            <div className='flex items-center justify-center px-3 py-2'>
              <span className='pr-2 text-sm font-medium text-[#282E38] transition-all duration-300 ease-linear'>
                {selectedOdds}
              </span>
              <Image
                src={angleDownArrow}
                alt=''
                className='w-auto transition-all duration-300 ease-linear group-hover:rotate-180'
              />
            </div>
          </Dropdown>
        </div>
        <div className='w-1/3 cursor-pointer group'>
          <Dropdown menu={{ items: marginItems }}>
            <div className='flex items-center justify-center px-3 py-2'>
              <span className='pr-2 text-sm font-medium text-[#282E38] transition-all duration-300 ease-linear'>
                {`Margin ${selectedMargin}%`}
              </span>
              <Image
                src={angleDownArrow}
                alt=''
                className='w-auto transition-all duration-300 ease-linear group-hover:rotate-180'
              />
            </div>
          </Dropdown>
        </div>
      </div>
      <div className='w-full h-auto bg-white border my-5 px-3'>
        <div
          className='flex items-center justify-between cursor-pointer'
          onClick={() => setisShowpropsList(!isShowpropsList)}
        >
          <div className='py-2'>
            <div className='flex items-center'>
              <RosterCard
                name={
                  selectedPlayer?.team_players?.players?.first_name +
                  ' ' +
                  selectedPlayer?.team_players?.players?.last_name
                }
                width={40}
                height={40}
              />
              <p className='pl-3 uppercase text-sm text-[#3B82F6] font-normal'>
                {selectedPlayer?.team_players?.primary_position}
              </p>
            </div>
          </div>
          <div className='flex items-center gap-5 pr-2'>
            <div className='flex items-center'>
              <div className='text-sm text-[#555]'>
                <Avatar
                  name={selectedPlayer?.teams?.full_name}
                  image={selectedPlayer?.teams?.logo_image}
                  width={40}
                  height={40}
                />
              </div>{' '}
            </div>
            <Dropdown menu={{ items: actionItems }}>
              <div className='px-5 py-1.5 bg-[#E0E3E8] text-[#282E38] text-sm font-semibold rounded-[4px]'>
                Action
              </div>
            </Dropdown>
          </div>
        </div>
        {isShowpropsList && (
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
                No active markets available
              </div>
            )}
          </div>
        )}
      </div>
      <div>
        <PlayerPropMarketsCard
          odds={selectedOdds}
          onUpdateMarket={onUpdateMarket}
          showUpdate={showUpdate}
          setShowUpdate={setShowUpdate}
          selectedPlayer={selectedPlayer}
          selectedProp={selectedProp}
          selectedMargin={selectedMargin}
          propId={playerPropId}
          toastPopup={toastPopup}
          setToastPopup={setToastPopup}
          toastDetails={toastDetails}
          setToastDetails={setToastDetails}
          dataSource={dataSource}
          setDataSource={setDataSource}
        />
      </div>
    </div>
  );
};

export default PlayerPropMarket;
