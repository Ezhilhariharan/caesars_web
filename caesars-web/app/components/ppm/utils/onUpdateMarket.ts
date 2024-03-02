import { getMarket } from '@/app/apiIntegrations/apiClients/market';
import { patch, post } from '@/app/apiIntegrations/fetcher';

export const onUpdateMarket = async (
  source: any,
  selectedRoster: any,
  selectedProp: any,
  selectedOdds: string,
  selectedMargin: any
) => {
  const checkMarket = await getMarket(
    selectedRoster.match_id,
    selectedRoster.team_player_id,
    selectedProp.id
  );

  // const oddsData =
  //   selectedMargin === 0 ? source : checkMarket?.data[0]?.odds?.data;

  // odds data is not exsting create a new market
  if (checkMarket.data.length === 0) {
    const createNewMarket = await post(`/player-prop-markets`, {
      match_id: selectedRoster.match_id,
      team_player_id: selectedRoster.team_player_id,
      player_prop_id: selectedProp.id,
      player_prop_market_type_id: '1',
      odds: {
        data: source,
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
          data: source,
          oddType: selectedOdds,
          margin: selectedMargin,
        },
      }
    );
  }

  //   setToastPopup(true);
  //   setToastDetails({
  //     type: 'success',
  //     title: 'success',
  //     discription: 'Odds Updated Successfully',
  //   });
  //   loadActiveMarkets(
  //     selectedRoster.roster.match_id,
  //     selectedRoster.roster.team_player_id
  //   );
};
