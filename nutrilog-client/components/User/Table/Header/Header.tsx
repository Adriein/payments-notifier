import React from "react";
import { HeaderProps } from "./HeaderProps";
import { StyledTableHeader, StyledFormBody } from './Styles';
import { FiSearch, FiMoreVertical } from 'react-icons/fi';
import Form from "../../../Shared/Form";


const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  return (
    <StyledTableHeader>
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
        <StyledFormBody>
          <Form.Field.Input name="search" placeholder="Search" icon={<FiSearch/>}/>
          <button type="submit">button</button>
        </StyledFormBody>
      </Form>
    </StyledTableHeader>
  );
}

export default Header;