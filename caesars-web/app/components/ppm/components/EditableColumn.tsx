import React from 'react';

type Props = {
  id: number | string;
  key: string;
  value: string | number;
  onChange: (e: any) => void;
};

const EditableColumn = (props: Props) => {
  const { id, key, value, onChange } = props;
  return (
    <div>
      <input
        type='text'
        className='border w-1/6 border-red-400'
        value={value}
        // onChange={(e) => {
        // }}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
};

export default EditableColumn;
