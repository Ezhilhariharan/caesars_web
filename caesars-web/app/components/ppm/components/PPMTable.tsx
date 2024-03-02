'use client';
import { Dropdown, MenuProps } from 'antd';
import React, { useEffect, useState } from 'react';
import PPMTableRow from './PPMTableRow';
import Checkbox, { CheckboxChangeEvent } from 'antd/es/checkbox';
import { toastProps } from '../../global/toast/Toast';

type Props = {
  actionItems: any;
  selectedRoster: any;
  loading: boolean;
  // props
  selectedProp: any;
  // odds
  selectedOdds: string;
  // margin
  selectedMargin: number;
  // allow to update the market
  allow: boolean;
  // update the market
  update: () => void;
  showUpdate: boolean;
  setShowUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  // data source
  dataSource: any;
  setDataSource: React.Dispatch<React.SetStateAction<any>>;
  // Toast
  toastPopup?: boolean;
  setToastPopup?: React.Dispatch<React.SetStateAction<boolean>>;
  toastDetails?: toastProps;
  setToastDetails?: React.Dispatch<React.SetStateAction<toastProps>>;
};

const PPMTable = (props: Props) => {
  const {
    actionItems,
    selectedRoster,
    loading,
    selectedProp,
    selectedOdds,
    selectedMargin,
    allow,
    update,
    dataSource,
    setDataSource,
    showUpdate,
    setShowUpdate,
    toastPopup,
    setToastPopup,
    toastDetails,
    setToastDetails,
  } = props;

  // notes
  const [openNotes, setOpenNotes] = useState<boolean>(false);
  const [selectedNotesId, setSelectedNotesId] = useState<number | string>(0);
  const [changeNotes, setChangeNotes] = useState<string>('');

  // checkbox
  const [checkedList, setCheckedList] = useState<any>([]);
  let checkAll =
    dataSource.length > 0 && checkedList?.length === dataSource?.length;
  let indeterminate =
    checkedList?.length > 0 && checkedList?.length < dataSource?.length;

  useEffect(() => {
    checkAll = checkedList?.length === dataSource?.length;
  }, [checkedList]);

  // notes
  const handleOpenNotes = (key: number | string) => {
    setSelectedNotesId(key);
    dataSource.map((d: any) => {
      if (key === d.key) setChangeNotes(d.notes);
    });
  };

  const handleNotes = (key: number, value: string) => {
    const updatedNotes = dataSource.map((d: any) => {
      if (d.key === key) return { ...d, notes: value };
      return d;
    });
    setDataSource(updatedNotes);
    setShowUpdate(true);
  };

  // status
  const onStatusChange = (key: number | string) => {
    const updatedStatus = dataSource.map((d: any) => {
      if (d.key === key)
        if (d.status === 0) return { ...d, status: 1 };
        else return { ...d, status: 0 };
      return d;
    });
    setDataSource(updatedStatus);
    setShowUpdate(true);
  };

  const onChange = (id: number | string) => {
    dataSource.map((d: any) => {
      if (!checkedList.includes(id)) setCheckedList([...checkedList, id]);
      else {
        const alreadyChecked = checkedList.filter((d: any) => d !== id);
        setCheckedList(alreadyChecked);
      }
    });
  };

  // checkbox
  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    if (dataSource?.length !== checkedList?.length) {
      setCheckedList([]);
      const add = dataSource.map((d: any) => d.key);
      setCheckedList(add);
    } else {
      setCheckedList([]);
    }
  };

  // handle delete the market
  const handleDelete = async () => {
    if (dataSource.length > 0) {
      const removeSelectedRows = dataSource.filter(
        (d: any) => !checkedList.includes(d.key)
      );
      setDataSource(removeSelectedRows);
      setCheckedList([]);
      setShowUpdate(true);
    }

    setToastPopup?.(true);
    setToastDetails?.({
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
        const removeSelectedRows = dataSource.map((d: any) => {
          if (checkedList.includes(d.key)) return { ...d, status: 0 };
          else return d;
        });
        setDataSource(removeSelectedRows);
        setCheckedList([]);
        setShowUpdate(true);
      },
    },
    {
      key: '1',
      label: <div>Delete</div>,
      onClick: handleDelete,
    },
  ];

  
  const onChangeInput = (e: any, id: any) => {
    const { name, value } = e.target;

    const editData = dataSource.map((item: any) =>
      item.key === id && name ? { ...item, [name]: value } : item
    );

    setDataSource(editData);
    setShowUpdate(true);
  };

  const handleAdd = (line: number, length: any) => {
    const newData: any = {
      key: length !== 0 ? length + 1 : 1,
      line: length !== 0 ? line + 0.5 : 0.5,
      over: '',
      exact: '',
      under: '',
      notes: '',
      status: 1,
    };
    setDataSource([...dataSource, newData]);
    setShowUpdate(true);
  };

  return (
    <div className='ppmTable w-full p-5 border rounded-[5px] bg-white'>
      <div className='flex items-center justify-between text-xl text-[#141522] font-semibold'>
        <div>Player Prop Markets</div>
        <div className='flex items-center gap-2.5'>
          <button
            className={`px-3 py-0.5 border rounded-[5px] ${
              !loading && allow && selectedProp !== null
                ? 'cursor-pointer opacity-none'
                : 'cursor-not-allowed opacity-50'
            }`}
            onClick={() => {
              if (!loading && allow && selectedProp !== null) {
                const length =
                  dataSource?.length > 0 ? dataSource?.length + 1 : 1;
                const line =
                  dataSource?.length > 0 ? +dataSource?.slice(-1)[0].line : 0;
                handleAdd(line, length);
              }
            }}
          >
            +
          </button>

          <Dropdown
            menu={{ items: ppmTableActionItems }}
            trigger={allow && checkedList.length > 0 ? ['click'] : []}
          >
            <div
              className={`text-sm font-semibold w-full px-3 py-1.5 bg-[#E0E3E8] text-[#282E38] rounded-[4px] text-center ${
                allow && checkedList.length > 0
                  ? 'cursor-pointer opacity-none'
                  : 'cursor-not-allowed opacity-50'
              }`}
            >
              Action
            </div>
          </Dropdown>

          <button
            className={`updateBtn px-3 py-1.5 text-white text-sm font-semibold bg-[#4285F4] rounded-[4px] ${
              allow && showUpdate
                ? 'cursor-pointer opacity-none'
                : 'cursor-not-allowed opacity-50'
            }`}
            onClick={() => {
              if (allow) update();
            }}
          >
            Update
          </button>
          <button
            className={`errorUpdateBtn px-3 py-1.5 text-white text-sm font-semibold bg-red-400 rounded-[4px] cursor-not-allowed opacity-50`}
          >
            Update
          </button>
        </div>
      </div>
      <table className='w-full mt-10 border rounded-[5px] overflow-hidden bg-white max-h-[40pc'>
        <tr className='w-full flex items-center justify-between text-center rounder-t-[5px] px-2.5 py-5 bg-[#F0F1F3] text-[13px] text-[#14171C] border-t border-x border-[#E0E3E8]'>
          <td className='w-1/6 border-r border-[#E0E3E8]'>Line</td>
          <td className='w-1/6 border-r border-[#E0E3E8]'>Over/Yes</td>
          <td className='w-1/6 border-r border-[#E0E3E8]'>Exact</td>
          <td className='w-1/6 border-r border-[#E0E3E8]'>Under/No</td>
          <td className='w-1/6 border-r border-[#E0E3E8]'>Notes</td>
          <td className='w-1/6 border-r border-[#E0E3E8]'>Status</td>
          <td className='w-14'>
            <Checkbox
              indeterminate={indeterminate}
              checked={checkAll}
              onChange={(e) => onCheckAllChange(e)}
            />
          </td>
        </tr>
        {dataSource.length === 0 && (
          <div className='w-full h-20 flex justify-center items-center border-x border-b rounded-b-[5px]'>
            No Data
          </div>
        )}
        {dataSource.map((d: any) => {
          return (
            <PPMTableRow
              id={d.key}
              line={d.line}
              over={d.over}
              exact={d.exact}
              under={d.under}
              notes={d.notes}
              status={d.status}
              selected={checkedList.includes(d.key)}
              selectedMargin={selectedMargin}
              selectedOdds={selectedOdds}
              openNotes={openNotes}
              setOpenNotes={setOpenNotes}
              selectedNotesId={selectedNotesId}
              changeNotes={changeNotes}
              setChangeNotes={setChangeNotes}
              handleNotes={handleNotes}
              handleOpenNotes={handleOpenNotes}
              onStatusChange={onStatusChange}
              onCheckboxChange={onChange}
              onChangeInput={onChangeInput}
              // error={error}
              // setError={setError}
            />
          );
        })}
      </table>
    </div>
  );
};

export default PPMTable;
