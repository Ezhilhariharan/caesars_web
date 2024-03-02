'use client';
import { Form, FormInstance, Input, InputRef } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';

type DataType = {
  key: React.Key;
  balancedLine: string | number;
  over: number;
  exact: string | number;
  under: string | number;
  notes: boolean;
  status: boolean;
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof DataType;
  record: DataType;
  selectedProp?: any;
  setShowUpdate?: React.Dispatch<React.SetStateAction<boolean>>;
  handleSave: (record: DataType) => void;
  odds: string;
  margin?: string;
}
export const EditableContext = React.createContext<FormInstance<any> | null>(
  null
);
const EditableTableCell = (props: EditableCellProps) => {
  const {
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    odds,
    margin,
    selectedProp,
    setShowUpdate,
    ...restProps
  } = props;

  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });

      // if (title === 'Line') {
      //   if (
      //     +values.line > selectedProp?.config?.min &&
      //     +values.line < selectedProp?.config?.max
      //   )
      //     handleSave({ ...record, ...values });
      //   else alert('invalid value');
      // } else {
      //   handleSave({ ...record, ...values });
      // }
    } catch (errInfo) {
      console.warn('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0, padding: 0 }}
        className='p-0'
        name={dataIndex}
        rules={[
          {
            required: true,
            message: ``,
          },
          {
            pattern:
              odds === 'Decimal Odds'
                ? title === 'Line'
                  ? /^[0-9]+(?:\.[5]+)?$/
                  : // ? /^(\d)*(\.)?([5]{1})?$/
                  title === 'Exact'
                  ? /^(\d)*(\.)([0-9]{1,2})$/
                  : // /^\d+$/
                  title === 'Over/Yes' || title === 'Under/No'
                  ? /^(\d)*(\.)([0-9]{1,2})$/
                  : /^\d+$/
                : odds === 'American Odds'
                ? title === 'Line'
                  ? /^[0-9]+(?:\.[5]+)?$/
                  : /^-?\d*\.?\d+$/
                : // /^(?!(?:\d{1,2}|100)$)[0-9]\d+$/
                  /^\d+$/,
            message: '',
          },
        ]}
      >
        <Input
          ref={inputRef}
          onPressEnter={save}
          onBlur={save}
          className='p-1 text-center'
        />
      </Form.Item>
    ) : (
      <div
        className='text-center w-full h-full'
        // style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

export default EditableTableCell;
