import React, { useEffect, useState } from "react";
import { del, post } from "@/app/apiIntegrations/fetcher";
import Toast, { toastProps } from "@/app/components/global/toast/Toast";
import Image from "next/image";
import moment from "moment";

// icons
import addNotesIcon from "../../assets/icons/addNotes.svg";
import closeNotesIcon from "../../assets/icons/close-notes.svg";
import note from "../../assets/icons/note.svg";
// import Add from "../../assets/add.svg";
// import Minus from "../../assets/minus.svg";
import thickArrowDown from "../../assets/thickArrowDown.svg";
import upArrow from "./assets/up.svg";
import downArrow from "./assets/down.svg";

import OddsDropDown from "../ppm/components/OddsDropDown";
import {
  convertValuesToDecimal,
  convertValuesToAmerican,
  oddsConversion,
} from "../ppm/utils/oddsConversion";
import TableHeader from "./PpmTableHeader";

import {
  Checkbox,
  Popover,
  Switch,
  Tooltip,
  Dropdown,
  MenuProps,
  Spin,
} from "antd";

import SearchBar from "../global/SearchBar";
import { searchPlayerPosition } from "@/app/lib/searchPlayerFrame";
import LoadingComponent from "../global/LoadingComponent";

type Props = {
  match: any;
  selectedPlayer: any;
  setDataSource: React.Dispatch<React.SetStateAction<any>>;
  dataSource: any;
  unchangedDataSource: any;
  // PropList: () => void;
  loadMarketData: (matchId: any, playerId: any, load: boolean) => void;
  handleCreateOrUpdateProp: (data: any) => void;
  loader: Boolean;
  setLoader: React.Dispatch<React.SetStateAction<any>>;
};

const tdStyle = { width: "calc(86%/10)" };
const tdNestedStyle = { width: "calc(100%/10)" };

const ProbabilityMarketTable = ({
  match,
  selectedPlayer,
  setDataSource,
  dataSource,
  loadMarketData,
  unchangedDataSource,
  // PropList,
  handleCreateOrUpdateProp,
  loader,
  setLoader,
}: Props) => {
  const [selectedProp, setSelectedProp] = useState<any>(null);
  const [selectedNotesId, setSelectedNoteId] = useState(null);
  const [openNotes, setOpenNotes] = useState(false);
  const [notes, setNotes] = useState<string | null>(null);
  const [mouseAction, setMouseAction] = useState<any>("");
  const [selectAllChecked, setSelectAllChecked] = useState<any>(false);
  const [selectedOdds, setSelectedOdds] = useState<string>("Decimal Odds");
  const [filterPlayer, setFilterPlayer] = useState<string>("");

  const [toastPopup, setToastPopup] = useState(false);
  const [toastDetails, setToastDetails] = useState<toastProps>({
    type: "error",
    title: "",
    discription: "",
    logo: "",
  });

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setToastPopup(false);
    }, 3000);
    return () => clearTimeout(timeOut);
  }, [toastPopup]);

  useEffect(() => {
    setSelectedProp(null);
    setDataSource([]);
    setSelectAllChecked(false);
    setSelectedOdds("Decimal Odds");
    setMouseAction("");
  }, [selectedPlayer]);

  useEffect(() => {
    if (dataSource?.length > 0) {
      dataSource[0]?.odd_type && setSelectedOdds(dataSource[0]?.odd_type);
    }
  }, [dataSource]);

  const addDecimalValue = (data: string) => {
    return (parseFloat(data) + 0.01).toFixed(2);
  };

  const minusDecimalValue = (data: string) => {
    return (parseFloat(data) - 0.01).toFixed(2);
  };

  const addOneDecimalValue = (data: string) => {
    return (parseFloat(data) + 1).toFixed(2);
  };

  const multipleConvert = (data: any, action: string) => {
    let toDecimal = convertValuesToDecimal(data);
    let valueAction =
      action === "plus"
        ? addDecimalValue(toDecimal)
        : minusDecimalValue(toDecimal);

    return convertValuesToAmerican(valueAction);
  };

  // useEffect(() => {
  //   if (match?.id) loadMarketdata(match?.id, selectedPlayer?.team_player_id);
  // }, [selectedPlayer]);

  // load market
  // async function loadMarketdata(matchId: any, playerId: any) {
  //   try {
  //     const res = await get(
  //       `/player-props-market-probabilities?match_id=${matchId}&player_id=${playerId}`
  //     );
  //     // const res = await get(`/player-props-market-probabilities?player_id=343`);
  //     if (res.data.length === 0) {
  //       const res = await getMarket(
  //         selectedPlayer?.match_id,
  //         selectedPlayer?.team_player_id
  //       );
  //       setDataSource(res.data);
  //     } else setDataSource(res.data);
  //   } catch (e) {
  //     console.warn(e);
  //   }
  // }

  async function playerPropMarketDelete(payload: any) {
    try {
      const res = await del(`player-prop-market`, payload);
      // if(res)
      loadMarketData(match?.id, selectedPlayer?.team_player_id, false);
      // PropList();
      setToastDetails({
        type: "success",
        title: "Success",
        discription: "Successfully Deleted",
      });
    } catch (e) {
      console.warn(e);
    }
  }

  const playerPropOver = (data: any, action: string) => {
    setDataSource((prev: any[]) => {
      const State = prev?.map((item: any) => {
        const newState = item?.data?.map((nestedItem: any) => {
          if (nestedItem?.ppmp_id === data?.ppmp_id) {
            return {
              ...nestedItem,
              over:
                selectedOdds === "Decimal Odds"
                  ? action === "plus"
                    ? addDecimalValue(nestedItem?.over)
                    : minusDecimalValue(nestedItem?.over)
                  : multipleConvert(nestedItem?.over, action),
            };
          } else {
            return { ...nestedItem };
          }
        });
        return { ...item, data: newState };
      });
      return State;
    });
  };

  const playerPropUnder = (data: any, action: string) => {
    setDataSource((prev: any[]) => {
      const State = prev?.map((item: any) => {
        const newState = item?.data?.map((nestedItem: any) => {
          if (nestedItem?.ppmp_id === data?.ppmp_id) {
            return {
              ...nestedItem,
              under:
                selectedOdds === "Decimal Odds"
                  ? action === "plus"
                    ? addDecimalValue(nestedItem?.under)
                    : minusDecimalValue(nestedItem?.under)
                  : multipleConvert(nestedItem?.over, action),
            };
          } else {
            return { ...nestedItem };
          }
        });
        return { ...item, data: newState };
      });
      return State;
    });
  };

  const handlePlayerPropsStatus = (data: any) => {
    let particularValue: any;
    dataSource?.map((item: any) => {
      item?.data?.map((nestedItem: any) => {
        if (nestedItem?.ppmp_id === data?.ppmp_id) {
          particularValue = item;
        }
      });
    });

    setDataSource((prev: any[]) => {
      const State = prev?.map((item: any) => {
        const newState = item?.data?.map((nestedItem: any) => {
          if (nestedItem?.ppmp_id === data?.ppmp_id) {
            return {
              ...nestedItem,
              ppmp_status:
                data?.ppmp_status === 1 ? 0 : data?.ppmp_status === 0 && 1,
            };
          } else {
            return { ...nestedItem };
          }
        });
        return { ...item, data: newState };
      });
      return State;
    });

    if (data) {
      const createLists = {
        match_id: match?.id,
        team_player_id: selectedPlayer?.team_player_id,
        player_prop_id: particularValue?.player_prop_id,
        ppmp_id: [data?.ppmp_id],
        status: data?.ppmp_status === 1 ? 0 : data?.ppmp_status === 0 && 1,
        roster_id: selectedPlayer?.roster_id,
        player_type: searchPlayerPosition(selectedPlayer?.position),
      };

      handleCreateOrUpdateProp(createLists);
    }

    // setDataSource((prev: any[]) => {
    //   const State = prev?.map((item: any) => {
    //     const newState = item?.data?.map((nestedItem: any) => {
    //       if (nestedItem?.ppmp_id === data?.ppmp_id) {
    //         return {
    //           ...nestedItem,
    //           ppmp_status: data?.ppmp_status === 1 ? 0 : 1,
    //         };
    //       } else {
    //         return { ...nestedItem };
    //       }
    //     });
    //     return { ...item, data: newState };
    //   });
    //   return State;
    // });
  };

  const addPropsMarket = (data: any) => {
    if (!loader) {
      let addedValue;
      dataSource?.map((item: any) => {
        if (item?.ppm_id === data?.ppm_id) {
          const lastArray = item?.data?.slice(-1);
          addedValue =
            lastArray[0]?.balanced_line !== "-" && lastArray[0]?.balanced_line
              ? addOneDecimalValue(lastArray[0]?.balanced_line)
              : "";
        }
      });
      if (addedValue) {
        const createLists = {
          match_id: match?.id,
          team_player_id: selectedPlayer?.team_player_id,
          player_prop_id: data?.player_prop_id,
          balanced_line: addedValue,
          over: null,
          under: null,
          notes: null,
        };
        setLoader(true);
        handleCreateOrUpdateProp(createLists);
      }
    }

    // setDataSource((prev: any[]) => {
    //   const State = prev?.map((item: any) => {
    //     if (item?.ppm_id === data?.ppm_id) {
    //       const lastArray = item?.data?.slice(-1);
    //       let addedValue = addOneDecimalValue(lastArray[0]?.balanced_line);
    //       const createNewProp: any = {
    //         ppmp_id: Math.random(),
    //         current_stats: null,
    //         balanced_line: addedValue,
    //         over: null,
    //         under: null,
    //         over_probability: null,
    //         under_probability: null,
    //         notes: null,
    //         ppmp_status: 0,
    //         checked: false,
    //       };
    //       return { ...item, data: [...item?.data, createNewProp] };
    //     } else {
    //       return { ...item };
    //     }
    //   });
    //   return State;
    // });
  };

  const handleAction = (data: any) => {
    setSelectAllChecked(false);
    // if (data === "Delete Market") {
    //   let ppmp: any = [];
    //   let ppm: any = [];
    //   dataSource?.map((item: any) => {
    //     const nestedArray = item?.data?.filter(
    //       (nestedItem: any) => nestedItem?.checked
    //     );

    //     if (
    //       nestedArray?.length > 0 &&
    //       item?.data?.length == nestedArray?.length
    //     ) {
    //       ppm = [...ppm, item?.ppm_id];
    //     }

    //     item?.data?.map((nestedItem: any) => {
    //       if (nestedItem?.checked) {
    //         ppmp = [...ppmp, nestedItem?.ppmp_id];
    //       }
    //     });
    //   });

    //   let deletePayload = Object.assign(
    //     {},
    //     ppm?.length > 0 && { ppm_id: ppm },
    //     ppmp?.length > 0 && { ppmp_id: ppmp }
    //   );

    //   playerPropMarketDelete(deletePayload);
    //   // setDataSource((prev: any[]) => {
    //   //   const State = prev?.map((item: any) => {
    //   //     const newState = item?.data?.filter(
    //   //       (nestedItem: any) => !nestedItem?.checked

    //   //       // return { ...nestedItem, checked: e.target.checked ? true : false };
    //   //     );
    //   //     return { ...item, data: newState };
    //   //   });
    //   //   return State;
    //   // });
    // } else {
    let ppmp: any = [];

    if (data === "Active All Lines" || data === "Suspend All Lines") {
      dataSource?.map((item: any) => {
        item?.data?.map((nestedItem: any) => {
          ppmp = [...ppmp, nestedItem?.ppmp_id];
        });
      });
    } else {
      dataSource?.map((item: any) => {
        item?.data?.map((nestedItem: any) => {
          if (nestedItem?.checked) {
            ppmp = [...ppmp, nestedItem?.ppmp_id];
          }
        });
      });
    }

    const createLists = {
      match_id: match?.id,
      team_player_id: selectedPlayer?.team_player_id,
      ppmp_id: ppmp,
      status:
        data === "Suspend All Lines" || data === "Suspend"
          ? 0
          : data === "Active All Lines" && 1,
      roster_id: selectedPlayer?.roster_id,
      player_type: searchPlayerPosition(selectedPlayer?.position),
    };

    handleCreateOrUpdateProp(createLists);
    // }
  };

  const handleCheckbox = (e: any, data: any) => {
    if (data === "all") {
      setSelectAllChecked(e.target.checked);
      setDataSource((prev: any[]) => {
        const State = prev?.map((item: any) => {
          const newState = item?.data?.map((nestedItem: any) => {
            return { ...nestedItem, checked: e.target.checked ? true : false };
          });
          return { ...item, data: newState };
        });
        return State;
      });
    } else {
      setDataSource((prev: any[]) => {
        const State = prev?.map((item: any) => {
          const newState = item?.data?.map((nestedItem: any) => {
            if (nestedItem?.ppmp_id === data?.ppmp_id) {
              return {
                ...nestedItem,
                checked: e.target.checked ? true : false,
              };
            } else {
              return { ...nestedItem };
            }
          });
          return { ...item, data: newState };
        });
        return State;
      });
    }
  };

  const isDecimal = (value: any) => {
    const numericValue = Number(value);
    return (
      !isNaN(numericValue) && isFinite(numericValue) && numericValue % 1 !== 0
    );
  };

  const innerApiCall = async (payload: any) => {
    try {
      const res = await post(`/player-prop-market`, payload);
    } catch (e) {
      console.warn(e);
    }
  };

  const handleUnderAndOver = (val: any, data: any, type: any) => {
    let particularValue: any;
    dataSource?.map((item: any) => {
      item?.data?.map((nestedItem: any) => {
        if (nestedItem?.ppmp_id === data?.ppmp_id) {
          particularValue = item;
        }
      });
    });

    const checkDecimal = isDecimal(val);

    const validatingValue = checkDecimal ? val : convertValuesToDecimal(val);

    if (validatingValue && data && validatingValue !== "Infinity") {
      const createLists = Object.assign(
        {
          match_id: match?.id,
          team_player_id: selectedPlayer?.team_player_id,
          player_prop_id: particularValue?.player_prop_id,
          ppmp_id: [data?.ppmp_id],
        },
        type === "over" && { over: validatingValue },
        type === "under" && { under: validatingValue }
      );
      innerApiCall(createLists);
    }
    setDataSource((prev: any[]) => {
      const State = prev?.map((item: any) => {
        const newState = item?.data?.map((nestedItem: any) => {
          if (nestedItem?.ppmp_id === data?.ppmp_id) {
            return type === "over"
              ? {
                  ...nestedItem,
                  over: val,
                }
              : {
                  ...nestedItem,
                  under: val,
                };
          } else {
            return { ...nestedItem };
          }
        });
        return { ...item, data: newState };
      });
      return State;
    });
  };

  const handleNotes = (e: any, data: any) => {
    let particularValue: any;
    dataSource?.map((item: any) => {
      item?.data?.map((nestedItem: any) => {
        if (nestedItem?.ppmp_id === data?.ppmp_id) {
          particularValue = item;
        }
      });
    });

    if (data) {
      const createLists = {
        match_id: match?.id,
        team_player_id: selectedPlayer?.team_player_id,
        player_prop_id: particularValue?.player_prop_id,
        ppmp_id: [data?.ppmp_id],
        notes: e.target.value,
        roster_id: selectedPlayer?.roster_id,
        player_type: searchPlayerPosition(selectedPlayer?.position),
      };

      handleCreateOrUpdateProp(createLists);
    }

    // setDataSource((prev: any[]) => {
    //   const State = prev?.map((item: any) => {
    //     const newState = item?.data?.map((nestedItem: any) => {
    //       if (nestedItem?.ppmp_id === data?.ppmp_id) {
    //         return { ...nestedItem, notes: e.target.value };
    //       } else {
    //         return { ...nestedItem };
    //       }
    //     });
    //     return { ...item, data: newState };
    //   });
    //   return State;
    // });
  };

  const propMarketSearch = (e: any) => {
    setFilterPlayer(e);

    const searchedMarket = unchangedDataSource?.filter((item: any) =>
      item?.props_name?.toLowerCase()?.includes(e?.toLowerCase())
    );
    setDataSource(searchedMarket);
  };

  const handleSuspend = (data: any) => {
    let particularValue: any;
    dataSource?.map((item: any) => {
      item?.data?.map((nestedItem: any) => {
        if (nestedItem?.ppmp_id === data?.ppmp_id) {
          particularValue = item;
        }
      });
    });

    if (data) {
      const createLists = {
        match_id: match?.id,
        team_player_id: selectedPlayer?.team_player_id,
        player_prop_id: particularValue?.player_prop_id,
        ppmp_id: [data?.ppmp_id],
        status: 2,
      };

      handleCreateOrUpdateProp(createLists);
    }
  };

  const measureProbability = (currentData: any, prevData: any) => {
    if (currentData && prevData)
      return parseFloat(currentData) > parseFloat(prevData) ||
        parseFloat(currentData) === parseFloat(prevData)
        ? true
        : false;
    else if (currentData) return true;
    else return null;
  };

  const assignCondition = (value: any) => {
    if (isDecimal(value)) return value >= 1 ? true : false;
    return true;
  };
  const onOddsItemChange = (oldOddsType: string, newOddsType: string) => {
    setSelectedOdds(newOddsType);

    const createLists = {
      match_id: match?.id,
      team_player_id: selectedPlayer?.team_player_id,
      odd_type: newOddsType === "Decimal Odds" ? 2 : 1,
      roster_id: selectedPlayer?.roster_id,
      player_type: searchPlayerPosition(selectedPlayer?.position),
    };

    innerApiCall(createLists);

    if (oldOddsType !== newOddsType) {
      setDataSource((prev: any[]) => {
        const State = prev?.map((item: any) => {
          const newState = item?.data?.map((nestedItem: any) => {
            return {
              ...nestedItem,
              over:
                newOddsType === "Decimal Odds"
                  ? nestedItem?.over_probability
                    ? (1 / nestedItem?.over_probability).toFixed(2)
                    : "-"
                  : nestedItem?.over_probability
                  ? calculateProb(nestedItem?.over_probability * 100)
                  : "-",
              under:
                newOddsType === "Decimal Odds"
                  ? nestedItem?.under_probability
                    ? (1 / nestedItem?.under_probability).toFixed(2)
                    : "-"
                  : nestedItem?.under_probability
                  ? calculateProb(nestedItem?.under_probability * 100)
                  : "-",
            };
          });
          return { ...item, data: newState };
        });
        return State;
      });
    }
  };

  const calculateProb = (value: any) => {
    if (value < 50) {
      let step1 = value / 100;
      let step2 = 100 / step1;
      return (step2 - 100).toFixed();
    }
    if (value > 50) {
      let step1 = value / 100;
      let step2 = 1 - step1 / 100;
      let step3 = value / step2;
      return (step3 * -1).toFixed();
    }
  };

  const filterItems: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <div className="p-2 text-base text-[#6C6D6F] font-normal">Suspend</div>
      ),
      onClick: async (e) => handleAction("Suspend"),
    },
    {
      key: "1",
      label: (
        <div className="p-2 text-base text-[#6C6D6F] font-normal">
          Active All Lines
        </div>
      ),
      onClick: async (e) => handleAction("Active All Lines"),
    },
    {
      key: "2",
      label: (
        <div className="p-2 text-base text-[#F43F5E] font-normal">
          Suspend All Lines
        </div>
      ),
      onClick: async (e) => handleAction("Suspend All Lines"),
    },
  ];

  // if (loader) return <LoadingComponent text='Loading' />;

  return (
    <div className="bg-white border px-4 py-5 rounded-[4px] w-auto h-[61.8vh] overflow-scroll">
      <Toast
        type={toastDetails.type}
        title={toastDetails.title}
        discription={toastDetails.discription}
        logo={toastDetails.logo}
        toggle={toastPopup}
      />
      <TableHeader
        selectedOdds={selectedOdds}
        onOddsItemChange={onOddsItemChange}
        loader={loader}
        filterItems={filterItems}
        filterPlayer={filterPlayer}
        propMarketSearch={propMarketSearch}
      />

      <table
        border={1}
        className="w-full border border-[#E5E7EB] last:border-b-[0px] overflow-scroll mt-3 rounded-[4px]"
      >
        <tr className="w-full h-[50px] flex items-center text-center text-[14px] font-medium text-[#6B7280] border-b border-[#E5E7EB] bg-gray-100 last:rounded-t-[5px]">
          <td className="text-[#14171C]" style={{ width: "14%" }}>
            Player Prop
          </td>
          <td className="text-[#14171C]" style={tdStyle}>
            Line
          </td>
          <td className="text-[#14171C]" style={tdStyle}>
            Over
          </td>
          <td className="text-[#14171C]" style={tdStyle}>
            Over Prob. %
          </td>
          <td className="text-[#14171C]" style={tdStyle}>
            Under
          </td>
          <td className="text-[#14171C]" style={tdStyle}>
            Under Prob. %
          </td>
          <td className="text-[#14171C]" style={tdStyle}>
            Notes
          </td>
          <td className="text-[#14171C]" style={tdStyle}>
            Action
          </td>
          <td className="text-[#14171C]" style={tdStyle}>
            Status
          </td>
          <td className="text-[#14171C]" style={tdStyle}>
            Last Update
          </td>
          <td className="" style={tdStyle}>
            <Checkbox
              checked={selectAllChecked}
              onChange={(e) => handleCheckbox(e, "all")}
            />
          </td>
        </tr>
        {!loader && dataSource?.length === 0 && (
          <div className="flex items-center justify-center py-10 border-x border-b rounded-b-[5px] border-[#E5E7EB]">
            No Data
          </div>
        )}
        {loader && (
          <div className="py-10 flex items-center justify-center border-b rounded-b-[5px] border-[#E5E7EB] gap-2.5">
            <Spin size="small" />
            <div className="pr-2 font-medium text-[#6B7280]"> Loading...</div>
          </div>
        )}
        {!loader &&
          dataSource?.map((d: any) => {
            return (
              <div className="w-full flex items-center text-center text-[14px] font-medium text-[#6B7280] border-x border-b border-[#E5E7EB] last:rounded-b-[5px]">
                <td
                  className=" flex  "
                  rowSpan={d?.data?.length}
                  style={{
                    ...tdNestedStyle,
                    height: `${d?.odds?.data?.length * 50}px`,
                    width: "16.4%",
                  }}
                >
                  <div className="w-full flex px-3 justify-between items-center">
                    <div className="addMarket  text-[#14171C] font-normal ">
                      {d?.props_name ? d?.props_name : "-"}
                    </div>
                  </div>
                </td>
                <div className="w-full ">
                  {d?.data?.length > 0 &&
                    d?.data?.map((odd: any) => {
                      return (
                        <tr
                          className="w-full h-[50px] border-b flex items-center justify-center "
                          style={{
                            background: odd?.is_balanced
                              ? "rgba(236, 243, 254, 1)"
                              : "",
                          }}
                        >
                          <td
                            className="border-l border-r text-[#14171C] font-normal"
                            style={tdNestedStyle}
                          >
                            {odd?.balanced_line ? odd?.balanced_line : "-"}
                          </td>
                          <td
                            className=" border-r flex items-center justify-around text-[#14171C] font-normal px-2.5"
                            style={tdNestedStyle}
                          >
                            {odd?.over == "-" ? (
                              "-"
                            ) : (
                              <div
                                className={`w-full text-center rounded-[5px] py-2 border border-transparent focus:border-green-500 invalid:border-red-500 focus-within:invalid:border-red-500 invalid:showUpdateBtn`}
                              >
                                {odd?.over}
                              </div>
                            )}
                          </td>
                          <td className=" border-r" style={tdNestedStyle}>
                            {odd?.over_probability < 50 ? (
                              <div className="flex items-center justify-center font-normal">
                                {odd?.over_probability ? (
                                  `${odd?.over_probability * 100}  %`
                                ) : (
                                  <div className="text-[#212121]"> -</div>
                                )}
                                {odd?.over_probability && (
                                  <Image
                                    src={
                                      measureProbability(
                                        odd?.over_probability,
                                        odd?.previous_over_probability
                                      )
                                        ? upArrow
                                        : downArrow
                                    }
                                    alt="notes"
                                    className="cursor-pointer ml-2"
                                    width={10}
                                    height={10}
                                  />
                                )}
                              </div>
                            ) : (
                              <div className="flex items-center justify-center font-normal ">
                                {odd?.over_probability ? (
                                  `${odd?.over_probability * 100} %`
                                ) : (
                                  <div className="text-[#212121]"> -</div>
                                )}
                                {odd?.over_probability && (
                                  <Image
                                    src={
                                      measureProbability(
                                        odd?.over_probability,
                                        odd?.previous_over_probability
                                      )
                                        ? upArrow
                                        : downArrow
                                    }
                                    alt="notes"
                                    className="cursor-pointer ml-2"
                                    width={10}
                                    height={10}
                                  />
                                )}
                              </div>
                            )}
                          </td>
                          <td
                            className=" border-r flex items-center justify-around text-[#14171C] font-normal px-2.5"
                            style={tdNestedStyle}
                          >
                            {odd?.under == "-" ? (
                              "-"
                            ) : (
                              <div
                                className={`w-full text-center rounded-[5px] py-2 border border-transparent focus:border-green-500 invalid:border-red-500 focus-within:invalid:border-red-500 invalid:showUpdateBtn`}
                              >
                                {odd?.under}
                              </div>
                            )}
                          </td>
                          <td className=" border-r " style={tdNestedStyle}>
                            {odd?.under_probability < 50 ? (
                              <div className="flex items-center justify-center font-normal">
                                {odd?.under_probability ? (
                                  `${odd?.under_probability * 100} %`
                                ) : (
                                  <div className="text-[#212121]"> -</div>
                                )}
                                {odd?.under_probability && (
                                  <Image
                                    src={
                                      measureProbability(
                                        odd?.under_probability,
                                        odd?.previous_under_probability
                                      )
                                        ? upArrow
                                        : downArrow
                                    }
                                    alt="notes"
                                    className="cursor-pointer ml-2"
                                    width={10}
                                    height={10}
                                  />
                                )}
                              </div>
                            ) : (
                              <div className="flex items-center justify-center font-normal ">
                                {odd?.under_probability ? (
                                  `${odd?.under_probability * 100} %`
                                ) : (
                                  <div className="text-[#212121]"> -</div>
                                )}
                                {odd?.under_probability && (
                                  <Image
                                    src={
                                      measureProbability(
                                        odd?.under_probability,
                                        odd?.previous_under_probability
                                      )
                                        ? upArrow
                                        : downArrow
                                    }
                                    alt="notes"
                                    className="cursor-pointer ml-2"
                                    width={10}
                                    height={10}
                                  />
                                )}
                              </div>
                            )}
                          </td>

                          <td
                            className="relative  border-r"
                            style={tdNestedStyle}
                          >
                            <Popover
                              trigger="click"
                              // open={openNotes}
                              placement="leftBottom"
                              arrow={false}
                              onOpenChange={(open: boolean) => {
                                setOpenNotes(open);
                                if (d.key === selectedNotesId) {
                                  d.notes = notes;
                                  setOpenNotes(false);
                                }
                              }}
                              content={
                                <div
                                  className={`min-w-[350px] h-[160px] p-4 bg-white absolute top-0 -left-[330px] z-50 border rounded-md flex-col justify-between shadow-[0px_0px_10px_0px_rgba(184,184,184,1)] ${
                                    openNotes && selectedNotesId === d.key
                                      ? "flex"
                                      : "hidden"
                                  }`}
                                >
                                  <div className="flex justify-between items-center">
                                    <p className="bg-[rgba(8,160,247,0.2)] px-5 py-1 text-xs font-medium rounded-full text-[#1778B0]">
                                      Notes
                                    </p>
                                    <Image
                                      src={closeNotesIcon}
                                      alt="notes"
                                      className="cursor-pointer"
                                      onClick={() => {
                                        if (odd?.key === selectedNotesId) {
                                          odd.notes = notes;
                                          setOpenNotes(false);
                                        }
                                      }}
                                      width={24}
                                      height={24}
                                    />
                                  </div>
                                  <textarea
                                    name="notes"
                                    id="notes"
                                    className="w-full h-[80px] text-xs font-normal outline-none resize-none"
                                    value={notes ? notes : ""}
                                    placeholder="Add Notes"
                                    onChange={(e) => {
                                      setNotes(e.target.value);
                                      handleNotes(e, odd);
                                    }}
                                  ></textarea>
                                </div>
                              }
                            >
                              <div
                                className="w-full flex items-center justify-center cursor-pointer mb-2"
                                onClick={() => {
                                  setSelectedNoteId(odd?.id);
                                  setOpenNotes(true);
                                  setNotes(odd?.notes);
                                }}
                              >
                                <Image
                                  src={odd?.notes ? note : addNotesIcon}
                                  alt="notes icon"
                                  width={20}
                                  height={20}
                                />
                              </div>
                            </Popover>
                          </td>
                          <td
                            className=" border-r border-[#E0E3E8] flex items-center justify-evenly text-[#FB532E]"
                            style={tdNestedStyle}
                          >
                            <Switch
                              checked={odd?.ppmp_status === 1 ? true : false}
                              className={`${
                                odd?.ppmp_status === 1
                                  ? "statusActive"
                                  : odd?.ppmp_status === 0 && "statusInactive"
                              } `}
                              onClick={() => handlePlayerPropsStatus(odd)}
                            />
                          </td>
                          <td
                            className={` border-r border-[#E0E3E8] flex items-center justify-evenly  ${
                              odd?.ppmp_status === 1
                                ? "text-[#14171C]"
                                : "text-[#FB532E]"
                            }`}
                            style={tdNestedStyle}
                          >
                            {odd?.ppmp_status === 1 ? "Active" : "Suspend"}
                          </td>
                          <td
                            className={` border-r border-[#E0E3E8] flex items-center justify-evenly  `}
                            style={tdNestedStyle}
                          >
                            <p className="text-xs font-light text-[#14171C]">
                              {moment(odd?.last_updated_at).fromNow()}
                            </p>
                          </td>
                          <td className="" style={tdNestedStyle}>
                            <Checkbox
                              checked={odd?.checked}
                              onChange={(e) => handleCheckbox(e, odd)}
                            />
                          </td>
                        </tr>
                      );
                    })}
                </div>
              </div>
            );
          })}
      </table>
    </div>
  );
};

export default ProbabilityMarketTable;
