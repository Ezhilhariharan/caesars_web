import { Form } from "antd";
import React from "react";
import { EditableContext } from "./EditableTableCell";

interface EditableRowProps {
  index: number;
}

const EditableTableRow = ({ index, ...props }: EditableRowProps) => {
  const [form] = Form.useForm();

  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

export default EditableTableRow;
