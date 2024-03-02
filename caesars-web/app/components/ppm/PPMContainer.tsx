'use client';
import React, { useEffect, useState } from 'react';
import SearchBar from '../global/SearchBar';
import RosterList from './components/RosterList';
import { del, get } from '@/app/apiIntegrations/fetcher';
import { StaticImageData } from 'next/image';
import PPMTableContainer from './components/PPMTableContainer';
import { MenuProps } from 'antd';
import {
  getMarket,
  getPlayerProp,
} from '@/app/apiIntegrations/apiClients/market';
import { oddsConversion } from './utils/oddsConversion';
import { calculateOddsWithMargin } from './utils/calculateMargin';
import { onUpdateMarket } from './utils/onUpdateMarket';
import FeedsContainer from './components/FeedsContainer';
import FeedCardContainer from './components/FeedCardContainer';
import Toast, { toastProps } from '../global/toast/Toast';
import { oddsWithoutMargin } from './utils/reverseMarginCalculation';

type Props = {
  matchId: any;
  match: any;
  user: any;
  place: string;
  fixtureStartAt: any;
  allow: boolean;
  allowToContinue: boolean;
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

let initialData: any = null;

const PPMContainer = (props: Props) => {
  const {
    matchId,
    match,
    user,
    place,
    fixtureStartAt,
    allow,
    allowToContinue,
    team1,
    team2,
  } = props;

  const [selectedTeam, setselectedTeam] = useState<string>('all');

  // rosters
  const [team1Roster, setTeam1Roster] = useState<any>([]);
  const [team2Roster, setTeam2Roster] = useState<any>([]);
  const [allRoster, setAllRoster] = useState<any>([]);
  const [selectedRoster, setselectedRoster] = useState<any>(null);
  const [searchKey, setSearchKey] = useState('');

  // props
  const [playerProps, setPlayerProps] = useState<MenuProps['items']>([]);
  const [propsItemLoading, setPropsItemLoading] = useState(false);
  const [selectedProp, setSelectedProp] = useState<any>(null);

  // odds
  const [selectedOdds, setSelectedOdds] = useState('Decimal Odds');

  // margin
  const [selectedMargin, setSelectedMargin] = useState(0);

  // ppm table
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [selectAllRows, setSelectAllRows] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  // toast
  const [toastPopup, setToastPopup] = useState(false);
  const [toastDetails, setToastDetails] = useState<toastProps>({
    type: 'error',
    title: '',
    discription: '',
    logo: '',
  });

  useEffect(() => {
    if (toastPopup === true) {
      const timeOut = setTimeout(() => {
        setToastPopup(false);
      }, 2000);
      return () => clearTimeout(timeOut);
    }
  }, [toastPopup]);

  // load teams data
  useEffect(() => {
    if (matchId) {
      loadTeam1();
      loadTeam2();
    }
  }, [matchId]);

  useEffect(() => {
    setAllRoster([...team1Roster, ...team2Roster]);
  }, [team1Roster, team2Roster]);

  // load props based on the selected player
  useEffect(() => {
    loadPlayerProp(
      selectedRoster?.team_players?.players?.primary_position || 'all'
    );
    setSelectedProp(null);
    setDataSource([]);
    setSelectedMargin(0);
  }, [selectedRoster]);

  useEffect(() => {
    if (selectedRoster !== null && selectedProp !== null && matchId !== null)
      loadMarket();
  }, [selectedProp]);

  async function loadTeam1() {
    try {
      const res = await get(
        `/rosters?match_id=${matchId}&team_id=${team1?.id}`
      );
      setTeam1Roster(res.data);
    } catch (e) {
      console.warn(e);
    }
  }

  async function loadTeam2() {
    try {
      const res = await get(
        `/rosters?match_id=${matchId}&team_id=${team2?.id}`
      );
      setTeam2Roster(res?.data);
    } catch (e) {
      console.warn(e);
    }
  }

  const onTabClick = (t: any) => setselectedTeam(t.filter);

  // props
  async function loadPlayerProp(position = 'all') {
    setPropsItemLoading(true);
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
          onClick: () => setSelectedProp(d),
        };
      });
      setPlayerProps(propsItems);
      setPropsItemLoading(false);
    } catch (e) {
      setPropsItemLoading(false);
      console.warn(e);
    }
  }

  // odds
  const onOddsItemChange = (oldOddsType: string, newOddsType: string) => {
    setSelectedOdds(newOddsType);
    if (oldOddsType !== newOddsType && dataSource.length > 0) {
      const _d = [...dataSource];
      const res = oddsConversion(_d, newOddsType);
      setShowUpdate(true);
      return res;
    } else setDataSource([]);
  };

  // margin
  async function calculateMargin(value: any) {
    const res = await getMarket(
      selectedRoster?.match_id,
      selectedRoster?.team_player_id,
      selectedProp?.id
    );

    // let data: any = null;

    // if (res?.data[0]?.odds?.margin === 0 && dataSource.length === 0) {
    //   // data = res?.data[0]?.odds?.data?.map((source: any) =>
    //   //   calculateOddsWithMargin(value, source)
    //   // );
    //   data = res?.data[0]?.odds?.data;
    // } else {
    //   if (dataSource.length !== res?.data[0]?.odds?.data?.length)
    //     data = dataSource?.map((source: any) =>
    //       calculateOddsWithMargin(value, source)
    //     );
    //   else
    //     data = res?.data[0]?.odds?.data?.map((source: any) =>
    //       calculateOddsWithMargin(value, source)
    //     );
    // }

    let data = res?.data[0]?.odds?.data?.map((source: any) =>
      calculateOddsWithMargin(value, source)
    );

    if (data)
      if (selectedOdds !== res?.data[0]?.odds?.oddType)
        setDataSource(oddsConversion(data, selectedOdds));
      else setDataSource(data);
  }

  const onMarginChange = (margin: number) => {
    setSelectedMargin(margin);
    calculateMargin(margin);
    setShowUpdate(true);
  };

  // ppm table
  const handleDelete = async () => {
    if (selectAllRows && initialData.data.length > 0) {
      const updateMarket = await del(
        `/player-prop-markets/${initialData.data[0].id}`
      );
    }
    if (selectedRows) {
      let data: any = [];
      const datas = dataSource?.map((rec) => {
        if (selectedRows.includes(rec.key)) return null;
        else return data.push({ ...rec });
      });

      setDataSource(data);
    }

    setSelectAllRows(false);
    setSelectedRows([]);

    setToastPopup(true);
    setToastDetails({
      type: 'alert',
      title: 'Alert',
      discription: 'Market Deleted',
    });
  };

  const ppmTableActionItems: MenuProps['items'] = [
    {
      key: '0',
      label: <div>Suspend</div>,
      onClick: async (e) => {
        if (selectedRows && selectAllRows === false) {
          const datas = dataSource.map((data) => {
            if (selectedRows.includes(data.key)) return { ...data, status: 0 };
            else return { ...data };
          });
          setDataSource(datas);
          setSelectedRows([]);
        }
        if (selectAllRows === true) {
          const datas = dataSource.map((data) => {
            return { ...data, status: 0 };
          });
          setDataSource(datas);
          setSelectAllRows(false);
        }
      },
    },
    {
      key: '1',
      label: <div>Delete</div>,
      onClick: handleDelete,
    },
  ];

  // ppm market
  const loadMarket = async () => {
    setLoading(true);

    try {
      const res = await getMarket(
        selectedRoster?.match_id,
        selectedRoster?.team_player_id,
        selectedProp?.id
      );

      initialData = res?.data[0]?.odds;

      if (res?.data?.length > 0) {
        setSelectedMargin(res.data[0].odds.margin);
        setSelectedOdds(res.data[0].odds.oddType);
        calculateMargin(res.data[0].odds.margin);
        setLoading(false);
      } else {
        setDataSource([]);
        setLoading(false);
      }
    } catch (e) {
      console.warn(e);
      setLoading(false);
    }
  };

  const update = async () => {
    try {
      const data = dataSource.map((d: any) =>
        oddsWithoutMargin(d, selectedMargin)
      );

      if (data) {
        onUpdateMarket(
          data,
          selectedRoster,
          selectedProp,
          selectedOdds,
          selectedMargin
        );
        // calculateMargin(selectedMargin);
        loadMarket();
        setShowUpdate(false);
        setToastPopup(true);
        setToastDetails({
          type: 'success',
          title: 'success',
          discription: 'Odds Updated Successfully',
        });
        setLoading(false);
      }
    } catch (e) {
      console.warn(e);
      setLoading(false);
    }
  };

  return (
    <>
      <Toast
        type={toastDetails.type}
        title={toastDetails.title}
        discription={toastDetails.discription}
        logo={toastDetails.logo}
        toggle={toastPopup}
      />
      <div className='w-full h-[80vh] flex items-start gap-5'>
        <div className='w-1/4 h-full border rounded-[5px] overflow-hidden'>
          {/* <FeedsContainer id={matchId} homeTeamLogo={''} awayTeamLogo={''} /> */}
          <FeedCardContainer
            user={user}
            id={matchId}
            match={match}
            homeTeamLogo={match?.team1_logo_image}
            awayTeamLogo={match?.team2_logo_image}
          />
        </div>
        <div className='w-1/4 h-full'>
          <div className='mb-5'>
            <SearchBar
              searchKey={searchKey}
              setSearchKey={setSearchKey}
              style={{
                background: 'white',
              }}
            />
          </div>
          <div className='h-[72.5vh] overflow-hidden border rounded-[5px]'>
            <RosterList
              matchId={matchId}
              selectedTeam={selectedTeam}
              rosterData={
                selectedTeam === 'all'
                  ? allRoster
                  : selectedTeam === 'team1'
                  ? team1Roster
                  : selectedTeam === 'team2'
                  ? team2Roster
                  : allRoster
              }
              searchKey={searchKey}
              selectedRoster={selectedRoster}
              team1={team1}
              team2={team2}
              onTabClick={onTabClick}
              onRosterClick={(r: any) => setselectedRoster(r)}
            />
          </div>
        </div>
        <div className='w-2/4 h-full'>
          {selectedRoster ? (
            <PPMTableContainer
              matchId={matchId}
              place={place}
              fixtureStartAt={fixtureStartAt}
              selectedRoster={selectedRoster}
              actionItems={ppmTableActionItems}
              loading={loading}
              // allow to update the market
              allow={allow}
              // props
              selectedProp={selectedProp}
              propsItems={playerProps}
              propsItemsLoading={propsItemLoading}
              // odds
              selectedOdds={selectedOdds}
              onOddsItemChange={onOddsItemChange}
              // margin
              selectedMargin={selectedMargin}
              onMarginChange={onMarginChange}
              // refresh the market
              loadMarket={loadMarket}
              // update the market
              update={update}
              // data source
              initialDataSource={initialData}
              dataSource={dataSource}
              setDataSource={setDataSource}
              showUpdate={showUpdate}
              setShowUpdate={setShowUpdate}
              // teams data
              team1={team1}
              team2={team2}
              // Toast
              toastPopup={toastPopup}
              setToastPopup={setToastPopup}
              toastDetails={toastDetails}
              setToastDetails={setToastDetails}
            />
          ) : (
            <div className='w-full h-full flex justify-center items-center'>
              Select a Player
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PPMContainer;
