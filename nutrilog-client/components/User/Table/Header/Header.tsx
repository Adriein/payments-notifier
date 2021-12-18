import React from "react";
import { HeaderProps } from "./HeaderProps";
import { StyledTableHeader, StyledFormBody, StyledInputContainer, StyledButtonContainer } from './Styles';
import { FiSearch, FiMoreVertical } from 'react-icons/fi';
import Form from "../../../Shared/Form";
import Button from "../../../Shared/Button";


const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  return (
    <StyledTableHeader>
      <StyledInputContainer>
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
          <Form.Field.Input name="search" placeholder="Search" icon={<FiSearch/>}/>
        </Form>
      </StyledInputContainer>
      <StyledButtonContainer>
        <Button
          size={'small'}
          variant={'icon'}
          icon={<FiMoreVertical/>}
          onClick={() => console.log('vertical button')}
        />
      </StyledButtonContainer>
    </StyledTableHeader>
  );
}

export default Header;