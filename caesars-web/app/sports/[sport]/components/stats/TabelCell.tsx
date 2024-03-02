import React, { useEffect, useState } from 'react';

type Props = {
  id: string | number;
  statId: string | number;
  name: string;
  value: string | number;
  externalMatchId: string | number;
  externalPlayerId: string | number;
  updatedStatValue: any;
  onChange: (
    e: any,
    id: any,
    stateId: string | number,
    externalMatchId: string | number,
    externalPlayerId: string | number
  ) => void;
};

const TableCel = (props: Props) => {
  const {
    id,
    statId,
    name,
    value,
    updatedStatValue,
    externalMatchId,
    externalPlayerId,
    onChange,
  } = props;
  const [seconds, setSeconds] = useState(0);
  const [updated, setUpdated] = useState<null | number>(null);

  let diff =
    updatedStatValue?.new_stat_value - updatedStatValue?.old_stat_value || 0;

  useEffect(() => {
    const timer = setInterval(() => {
      var t1 = new Date(updatedStatValue?.updated_at);
      var t2 = new Date();

      var dif = Math.abs(t1.getTime() - t2.getTime()) / 1000;

      const sec = Math.floor(dif);
      setSeconds(sec);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds, updatedStatValue]);

  return (
    <div
      className={`w-full h-full flex items-center justify-center ${
        updated !== null ? 'text-[#4285F4]' : ''
      }`}
      style={{
        background: `${
          updatedStatValue.updated_at !== ''
            ? seconds > 0 && seconds <= 5
              ? '#CF5914'
              : seconds > 5 && seconds <= 30
              ? '#FDA038 '
              : seconds > 30 && seconds <= 60
              ? '#FEF6C0 '
              : updated !== null
              ? '#ECF3FE'
              : '#fff'
            : '#fff'
        }`,
      }}
    >
      <input
        type='text'
        name={name}
        value={value}
        className={`h-8 text-center bg-transparent ${
          updated !== null ? 'w-2/3' : 'w-full'
        }`}
        onChange={(e) => {
          setUpdated(+e.target.value - +value);
          onChange(e, id, statId, externalMatchId, externalPlayerId);
        }}
      />
      {diff !== 0 &&
        seconds <= 60 &&
        seconds > 0 &&
        (Math.sign(diff) === -1 ? (
          <span className='w-1/3 h-10 flex items-center text-[#34A770]'>
            {diff}
          </span>
        ) : (
          <span className='w-1/3 h-10 flex items-center text-[#34A770]'>{`+${diff}`}</span>
        ))}
      <br />
    </div>
  );
};

export default TableCel;
