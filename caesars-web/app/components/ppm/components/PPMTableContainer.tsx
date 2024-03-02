import React from 'react';
import PropsDropDown from './PropsDropDown';
import OddsDropDown from './OddsDropDown';
import MarginDropDown from './MarginDropDown';
import ActiveMarketCard from './ActiveMarketCard';
import PPMTable from './PPMTable';
import { StaticImageData } from 'next/image';
import { toastProps } from '../../global/toast/Toast';

type Props = {
  matchId: number;
  place: string;
  fixtureStartAt: any;
  selectedRoster: any;
  actionItems: any;
  loading: boolean;
  // teams data
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
  // allow to update the market
  allow: boolean;
  // props
  selectedProp: any;
  propsItems: any;
  propsItemsLoading: boolean;
  // odds
  selectedOdds: string;
  onOddsItemChange: (selectedOdds: string, newOdds: string) => void;
  // margin
  selectedMargin: number;
  onMarginChange: (m: number) => void;
  // refresh the market
  loadMarket: () => void;
  // update the market
  update: () => void;
  showUpdate: boolean;
  setShowUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  // data source
  initialDataSource: any;
  dataSource: any;
  setDataSource: React.Dispatch<React.SetStateAction<any>>;

  //Toast
  toastPopup?: boolean;
  setToastPopup?: React.Dispatch<React.SetStateAction<boolean>>;
  toastDetails?: toastProps;
  setToastDetails?: React.Dispatch<React.SetStateAction<toastProps>>;
};

const PPMTableContainer = (props: Props) => {
  const {
    matchId,
    place,
    fixtureStartAt,
    selectedRoster,
    actionItems,
    loading,
    team1,
    team2,
    allow,
    selectedProp,
    propsItems,
    propsItemsLoading,
    selectedOdds,
    onOddsItemChange,
    selectedMargin,
    onMarginChange,
    loadMarket,
    update,
    initialDataSource,
    dataSource,
    setDataSource,
    showUpdate,
    setShowUpdate,
    toastPopup,
    setToastPopup,
    toastDetails,
    setToastDetails,
  } = props;

  return (
    <div className='w-full'>
      <div className='w-full flex items-center justify-between gap-10'>
        <div className='w-1/3'>
          <PropsDropDown
            allow={allow}
            selectedProp={selectedProp}
            items={propsItems}
            propsLoading={propsItemsLoading}
            loading={loading}
            // showUpdate={showUpdate}
          />
        </div>
        <div className='w-1/3'>
          <OddsDropDown
            allow={allow}
            selectedOdds={selectedOdds}
            loading={loading}
            onOddsItemChange={onOddsItemChange}
            // showUpdate={showUpdate}
          />
        </div>
        <div className='w-1/3'>
          <MarginDropDown
            allow={allow}
            selectedMargin={selectedMargin}
            onMarginChange={onMarginChange}
            showUpdate={showUpdate}
            loading={loading}
          />
        </div>
      </div>
      <div className='my-5'>
        <ActiveMarketCard
          matchId={matchId}
          selectedRoster={selectedRoster}
          loadMarket={loadMarket}
          allow={allow}
          showSuspend={true}
          team1={team1}
          team2={team2}
          place={place}
          fixtureStartAt={fixtureStartAt}
        />
      </div>
      <div>
        <PPMTable
          dataSource={dataSource}
          setDataSource={setDataSource}
          allow={allow}
          selectedOdds={selectedOdds}
          selectedMargin={selectedMargin}
          selectedRoster={selectedRoster}
          selectedProp={selectedProp}
          actionItems={actionItems}
          update={update}
          showUpdate={showUpdate}
          setShowUpdate={setShowUpdate}
          loading={loading}
          toastPopup={toastPopup}
          setToastPopup={setToastPopup}
          toastDetails={toastDetails}
          setToastDetails={setToastDetails}
        />
      </div>
    </div>
  );
};

export default PPMTableContainer;
