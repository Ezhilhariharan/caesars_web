'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

// icons
import addNotesIcon from '../../../assets/icons/addNotes.svg';
import closeNotesIcon from '../../../assets/icons/close-notes.svg';
import note from '../../../assets/icons/note.svg';

// API fetchers
import { del, get } from '@/app/apiIntegrations/fetcher';
import { getMarket } from '@/app/apiIntegrations/apiClients/market';

// components
import CardContainer from '../../global/cardContainer/CardContainer';
import EditableTableCell from './EditableTableCell';
import EditableTableRow from './EditableTableRow';
import './ppmCard.css';

// antd
import { Checkbox, Dropdown, MenuProps, Popover, Switch, Table } from 'antd';

type DataType = {
  key: React.Key;
  line: string | number;
  over: string | number;
  exact: string | number;
  under: string | number;
  notes: string;
  status: number;
};

type EditableTableProps = Parameters<typeof Table>[0];

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

type Props = {
  odds?: string;
  onUpdateMarket: (source: any) => void;
  selectedPlayer: {} | any;
  selectedProp: any;
  selectedMargin: number;
  propId: any;
  toastPopup: boolean;
  showUpdate: boolean;
  setShowUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  setToastPopup: React.Dispatch<React.SetStateAction<boolean>>;
  toastDetails: {};
  setToastDetails: React.Dispatch<React.SetStateAction<any>>;
  dataSource: any[];
  setDataSource: React.Dispatch<React.SetStateAction<any[]>>;
};

const PlayerPropMarketsCard = (props: Props) => {
  const {
    odds,
    onUpdateMarket,
    selectedPlayer,
    selectedProp,
    propId,
    selectedMargin,
    showUpdate,
    setShowUpdate,
    toastPopup,
    setToastPopup,
    toastDetails,
    setToastDetails,
    setDataSource,
    dataSource,
  } = props;

  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [selectAllRows, setSelectAllRows] = useState<boolean>(false);
  // const [showUpdate, setShowUpdate] = useState(false);
  const [openNotes, setOpenNotes] = useState<boolean>(false);
  const [selectedsNotesId, setSelectedsNotesId] = useState<number | string>(0);
  const [notes, setNotes] = useState<string>('');
  const [status, setStatus] = useState(1);
  const [selectedstatusKey, setselectedstatusKey] = useState<string | number>(
    0
  );
  const [edit, setEdit] = useState(false);
  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex?: string;
    odd?: string;
    playerprops?: any;
  })[] = [
    {
      title: 'Line',
      dataIndex: 'line',
      key: 'line',
      editable: selectedMargin === 0 ? true : false,
      playerprops: selectedProp,
    },
    {
      title: 'Over/Yes',
      dataIndex: 'over',
      key: 'over',
      editable: selectedMargin === 0 ? true : false,
      playerprops: selectedProp,
    },
    {
      title: 'Exact',
      dataIndex: 'exact',
      key: 'exact',
      editable: selectedMargin === 0 ? true : false,
      playerprops: selectedProp,
    },
    {
      title: 'Under/No',
      dataIndex: 'under',
      key: 'under',
      editable: selectedMargin === 0 ? true : false,
      playerprops: selectedProp,
    },
    {
      title: 'Notes',
      // dataIndex: 'notes',
      key: 'notes',
      render: (rec: DataType) => {
        return (
          <div className='relative'>
            <Popover
              trigger='click'
              // open={openNotes}
              placement='leftBottom'
              arrow={false}
              onOpenChange={(open: boolean) => {
                setOpenNotes(open);
                if (rec.key === selectedsNotesId) {
                  rec.notes = notes;
                  setOpenNotes(false);
                }
              }}
              content={
                <div
                  className={`min-w-[350px] h-[160px] p-4 bg-white absolute top-0 -left-[360px] z-50 border rounded-md flex-col justify-between shadow-[0px_0px_10px_0px_rgba(184,184,184,1)] ${
                    openNotes && selectedsNotesId === rec.key
                      ? 'flex'
                      : 'hidden'
                  }`}
                >
                  <div className='flex justify-between items-center'>
                    <p className='bg-[rgba(8,160,247,0.2)] px-5 py-1 text-xs font-medium rounded-full text-[#1778B0]'>
                      Notes
                    </p>
                    <Image
                      src={closeNotesIcon}
                      alt='notes'
                      className='cursor-pointer'
                      onClick={() => {
                        if (rec.key === selectedsNotesId) {
                          rec.notes = notes;
                          setOpenNotes(false);
                        }
                      }}
                      width={24}
                      height={24}
                    />
                  </div>
                  <textarea
                    name='notes'
                    id='notes'
                    className='w-full h-[80px] text-xs font-normal outline-none resize-none'
                    value={notes}
                    placeholder='Add Notes'
                    onChange={(e) => {
                      setNotes(e.target.value);
                    }}
                  ></textarea>
                </div>
              }
            >
              <div
                className='w-full flex items-center justify-center cursor-pointer mb-2'
                onClick={() => {
                  setSelectedsNotesId(rec.key);
                  setOpenNotes(true);
                  setNotes(rec.notes);
                  setShowUpdate(true);
                }}
              >
                <Image
                  src={rec?.notes !== '' ? note : addNotesIcon}
                  alt='notes icon'
                  width={20}
                  height={20}
                />
              </div>
            </Popover>
          </div>
        );
      },
    },
    {
      title: 'Status',
      // dataIndex: 'status',
      key: 'status',
      render: (rec: DataType) => {
        return (
          <Switch
            size='small'
            checked={rec && rec.status === 1 ? true : false}
            className={`${
              rec && rec.status === 1
                ? 'statusActive'
                : rec && rec.status === 0 && 'statusInactive'
            } `}
            onClick={(checked) => {
              setselectedstatusKey(rec.key);
              if (checked === true) {
                setStatus(1);
                rec.status = 1;
              } else {
                setStatus(0);
                rec.status = 0;
              }
              setShowUpdate(true);
            }}
          />
        );
      },
    },
    {
      dataIndex: 'checked',
      title: () => {
        return (
          <Checkbox
            checked={selectAllRows}
            onChange={(e) => selectAll(e)}
          ></Checkbox>
        );
      },
      render: (text: any, rec: any, index: any) => {
        return (
          <Checkbox
            checked={selectedRows.includes(rec?.key) || selectAllRows}
            onChange={(e) => onChange(e, rec)}
          ></Checkbox>
        );
      },
    },
  ];

  useEffect(() => {
    loadPlayer();
  }, []);

  async function loadPlayer() {
    try {
      const res = await get(
        `/rosters?match_id=${selectedPlayer.roster.match_id}&team_id=${selectedPlayer.roster.team_player_id}`
      );
      if (res.data) setDataSource(res.data);
    } catch (e) {
      console.warn(e);
    }
  }

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: any) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
        odds,
        selectedProp,
        setShowUpdate,
      }),
    };
  });

  const handleAdd = () => {
    const line = +dataSource[dataSource?.length - 1]?.line;

    if (selectedMargin !== 0) {
      setToastPopup(true);
      setToastDetails({
        type: 'alert',
        title: 'Alert',
        discription: "You can't add margin value.",
      });
    }

    if (
      propId !== 0 &&
      selectedMargin === 0
      // selectedProp?.config?.max > line
    ) {
      if (selectedProp?.config?.max <= line) {
        setToastPopup(true);
        setToastDetails({
          type: 'alert',
          title: 'Alert',
          discription: 'You reached the max line value!',
        });
        return;
      } else {
        const newData: any = {
          key: dataSource
            ? dataSource?.length !== 0
              ? dataSource?.slice(-1)[0]?.key + 1
              : 1
            : 1,
          line:
            dataSource?.length === 0 && selectedProp?.config?.min
              ? selectedProp?.config?.min
              : dataSource?.length !== 0
              ? line + 0.5
              : 0,
          over: '-',
          exact: '-',
          under: '-',
          notes: '',
          status: 1,
        };

        setShowUpdate(true);

        // if (dataSource && dataSource.length !== 0)
        //   setDataSource([...dataSource, newData]);
        // else setDataSource([newData]);
        setDataSource([...dataSource, newData]);
      }
    } else {
      if (propId === 0) {
        setToastPopup(true);
        setToastDetails({
          type: 'alert',
          title: 'Alert',
          discription: 'Select a Prop',
        });
      }
    }
  };

  const onChange = (e: any, rec: DataType) => {
    const checked = e.target.checked;
    if (checked) {
      setSelectedRows([...selectedRows, rec.key]);
    } else {
      setSelectedRows(() => selectedRows.filter((item) => item !== rec.key));
    }
  };

  const handleDelete = async () => {
    const res = await getMarket(
      selectedPlayer?.match_id,
      selectedPlayer?.team_player_id,
      propId
    );

    if (selectAllRows && res.data.length > 0) {
      const updateMarket = await del(`/player-prop-markets/${res.data[0].id}`);
    }
    if (selectedRows) {
      let data: any = [];
      const datas = dataSource?.map((rec) => {
        if (selectedRows.includes(rec.key)) return null;
        else return data.push({ ...rec });
      });

      setDataSource(data);
      setShowUpdate(true);
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

  const selectAll = (e: any) => {
    const checked = e.target.checked;
    if (checked && dataSource.length > 0) {
      setSelectAllRows(true);
    } else {
      setSelectAllRows(false);
    }
  };

  const handleSave = (row: any) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });

    if (newData) {
      setDataSource(newData);
      setShowUpdate(true);
    }
  };

  const components = {
    body: {
      row: EditableTableRow,
      cell: EditableTableCell,
    },
  };

  const actionItems: MenuProps['items'] = [
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
        setShowUpdate(true);
      },
    },
    {
      key: '1',
      label: <div>Delete</div>,
      onClick: handleDelete,
    },
  ];

  const rightSideComponent = (
    <div className='flex items-center gap-5'>
      <button
        className='px-2 py-[1.5px] bg-[#E0E3E8] rounded-[4px] text-xl'
        onClick={handleAdd}
      >
        +
      </button>
      {(selectAllRows === true || selectedRows.length > 0) && (
        <Dropdown menu={{ items: actionItems }} trigger={['click']}>
          <div className='text-sm font-semibold w-full px-3 py-1.5 bg-[#E0E3E8] text-[#282E38] cursor-pointer rounded-[4px] text-center'>
            Action
          </div>
        </Dropdown>
      )}

      {showUpdate && (
        <button
          className={`px-3 py-1.5 text-white text-sm font-semibold bg-[#4285F4] rounded-[4px]`}
          onClick={(source) => {
            onUpdateMarket(dataSource);
            setShowUpdate(false);
          }}
        >
          Update
        </button>
      )}
    </div>
  );

  const header = (
    <div>
      <div className='text-xl text-[#141522] font-medium'>
        Player Prop Markets
      </div>
      {selectedProp ? (
        <div className='text-sm flex items-center gap-5 mt-2 text-[rgba(0,0,0,0.4)]'>
          <p className='flex items-center'>
            Min : {selectedProp?.config?.min || 'Not defined'}
          </p>
          <p>Max : {selectedProp?.config?.max || 'Not defined'}</p>
        </div>
      ) : (
        <p className='text-sm font-normal text-[rgba(0,0,0,0.4)] mt-2'>
          Please Select Prop
        </p>
      )}
    </div>
  );

  return (
    <CardContainer
      // header='Player Prop Markets'
      headerComponent={header}
      rightSideComponent={rightSideComponent}
      style={{
        padding: '20px',
      }}
      headerStyle={{
        padding: '0 0 20px',
        color: '#141522',
      }}
    >
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
        pagination={false}
      />
      {/* <div className='text-xs mt-5 text-[#121212]'>
        <p>
          <span>
            <sup className='text-red-500'>*</sup>Note:
          </span>
          <span>
            If you want to edit the market, you need to edit the base value not
            the margin value.
          </span>
        </p>
      </div> */}
    </CardContainer>
  );
};

export default PlayerPropMarketsCard;
