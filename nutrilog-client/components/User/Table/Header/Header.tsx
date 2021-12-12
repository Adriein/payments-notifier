import React from "react";
import { HeaderProps } from "./HeaderProps";
import { TableHeader, FormElement } from './Styles';
import { FiSearch, FiMoreVertical } from 'react-icons/fi';
import Form from "../../../Shared/Form/Form";


const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  return (
    <TableHeader>
      <Form
        enableReinitialize
        initialValues={{
          search: '',
        }}
        onSubmit={(values: any, form: any) => {
          console.log(values);
          console.log(form);
        }}
      >
        <FormElement>
          <Form.Field.Input name="search" placeholder="Search" icon={<FiSearch/>}/>
          <button type="submit">button</button>
        </FormElement>

      </Form>
    </TableHeader>
  );
}

export default Header;