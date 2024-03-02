import { Checkbox, Popover, Switch } from 'antd';
import React from 'react';

// icons
import addNotesIcon from '../../../assets/icons/addNotes.svg';
import closeNotesIcon from '../../../assets/icons/close-notes.svg';
import note from '../../../assets/icons/note.svg';
import Image from 'next/image';

type Props = {
  id: any;
  line: any;
  over: any;
  exact: any;
  under: any;
  notes: any;
  status: any;
  selected: boolean;
  selectedOdds: string;
  selectedMargin: number;
  handleNotes: (key: any, value: string) => void;
  handleOpenNotes: (key: any) => void;
  onStatusChange: (key: any) => void;
  onCheckboxChange: (id: any) => void;
  openNotes: boolean;
  setOpenNotes: React.Dispatch<React.SetStateAction<boolean>>;
  selectedNotesId: any;
  changeNotes: string;
  setChangeNotes: React.Dispatch<React.SetStateAction<string>>;
  onChangeInput: (e: any, id: any) => void;
};

const PPMTableRow = (props: Props) => {
  const {
    id,
    line,
    over,
    exact,
    under,
    notes,
    status,
    selected,
    selectedOdds,
    selectedMargin,
    handleNotes,
    handleOpenNotes,
    onStatusChange,
    onCheckboxChange,
    openNotes,
    setOpenNotes,
    selectedNotesId,
    changeNotes,
    setChangeNotes,
    onChangeInput,
  } = props;

  return (
    <tr className='ppmTableRow flex items-center justify-between text-center px-2.5 py-0.5 border-t border-t-transparent border-b border-x last:rounded-b-[5px]'>
      <td className='w-1/6 border-r border-[#E0E3E8]'>
        <input
          type='text'
          className='w-full text-center rounded-[5px] py-2 border border-transparent focus:border-green-500 invalid:border-red-500 focus-within:invalid:border-red-500 invalid:showUpdateBtn'
          name={'line'}
          value={line}
          pattern='^(\d)*(\.)?([5]{1})?$'
          onChange={(e) => onChangeInput(e, id)}
          // required
        />
      </td>
      <td className='w-1/6 border-r border-[#E0E3E8]'>
        <input
          placeholder='-'
          type='text'
          className={`w-full text-center rounded-[5px] py-2 border border-transparent focus:border-green-500 invalid:border-red-500 focus-within:invalid:border-red-500 invalid:showUpdateBtn`}
          name={'over'}
          value={over}
          pattern={
            selectedOdds === 'Decimal Odds'
              ? '^[0-9]+(\\.[0-9]{1,2})$'
              : // : selectedOdds === 'American Odds'
                // ? '^-?\\d*\\.?\\d+$'
                '^-?(?:[0-9]+(?:.[0-9]+)?|.[0-9]+)$'
          }
          // pattern='^?\d*\.\d+$'
          onChange={(e) => onChangeInput(e, id)}
          // required
        />
      </td>
      <td className='w-1/6 border-r border-[#E0E3E8]'>
        <input
          placeholder='-'
          type='text'
          className={`w-full text-center rounded-[5px] py-2 border border-transparent focus:border-green-500 invalid:border-red-500 focus-within:invalid:border-red-500 invalid:showUpdateBtn ${
            line % 1 === 0 ? 'cursor-text' : 'cursor-not-allowed'
          }`}
          name={'exact'}
          value={exact}
          disabled={line % 1 !== 0 ? true : false}
          pattern={
            selectedOdds === 'Decimal Odds'
              ? // ? '^(d)*(.)([0-9]{1,2})?$'
                '^[0-9]+(\\.[0-9]{1,2})$'
              : '^-?(?:[0-9]+(?:.[0-9]+)?|.[0-9]+)?$'
          }
          // pattern='^(d)*(.)([0-9]{1,2})?$'
          onChange={(e) => onChangeInput(e, id)}
          // required
        />
      </td>
      <td className='w-1/6 border-r border-[#E0E3E8]'>
        <input
          placeholder='-'
          type='text'
          className={`w-full text-center rounded-[5px] py-2 border border-transparent focus:border-green-500 invalid:border-red-500 focus-within:invalid:border-red-500 invalid:showUpdateBtn`}
          name={'under'}
          value={under}
          pattern={
            selectedOdds === 'Decimal Odds'
              ? '^[0-9]+(\\.[0-9]{1,2})$'
              : // : selectedOdds === 'American Odds'
                // ? '^-?\\d*\\.?\\d+$'
                '^-?(?:[0-9]+(?:.[0-9]+)?|.[0-9]+)$'
          }
          // pattern='^(d)*(.)([0-9]{1,2})?$'
          onChange={(e) => onChangeInput(e, id)}
          // required
        />
      </td>
      <td className='w-1/6 border-r border-[#E0E3E8]'>
        <div className='relative'>
          <Popover
            trigger='click'
            placement='leftBottom'
            arrow={false}
            onOpenChange={(open: boolean) => {
              if (id === selectedNotesId) handleNotes(id, changeNotes);
              setOpenNotes(open);
            }}
            content={
              <div
                className={`min-w-[350px] h-[160px] p-4 bg-white absolute top-0 -left-[320px] z-50 border rounded-md flex-col justify-between shadow-[0px_0px_10px_0px_rgba(184,184,184,1)] ${
                  openNotes && selectedNotesId === id ? 'flex' : 'hidden'
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
                      if (id === selectedNotesId) handleNotes(id, changeNotes);
                      setOpenNotes(false);
                    }}
                    width={24}
                    height={24}
                  />
                </div>
                <textarea
                  name='notes'
                  id='notes'
                  className='w-full h-[80px] text-xs font-normal outline-none resize-none'
                  value={changeNotes}
                  placeholder='Add Notes'
                  onChange={(e) => {
                    if (id === selectedNotesId) setChangeNotes(e.target.value);
                  }}
                ></textarea>
              </div>
            }
          >
            <div
              className={`w-full flex items-center justify-center mb-2 ${
                selectedMargin === 0 ? 'cursor-pointer' : 'cursor-not-allowed'
              }`}
              onClick={() => {
                if (selectedMargin === 0) handleOpenNotes(id);
              }}
            >
              <Image
                src={notes !== '' ? note : addNotesIcon}
                alt='notes icon'
                width={20}
                height={20}
              />
            </div>
          </Popover>
        </div>
      </td>
      <td className='w-1/6 border-r border-[#E0E3E8]'>
        <Switch
          size='small'
          checked={status === 1 ? true : false}
          className={`${
            status === 1 ? 'statusActive' : status === 0 && 'statusInactive'
          } `}
          onClick={() => {
            onStatusChange(id);
          }}
        />
      </td>
      <td className='w-14'>
        <Checkbox checked={selected} onChange={() => onCheckboxChange(id)} />
      </td>
    </tr>
  );
};

export default PPMTableRow;
