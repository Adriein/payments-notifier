import React from 'react';
import { TableHeaderProps } from "./TableHeaderProps";
import { StyledContainer } from './Styles';
import Form from "../../../../Shared/Components/Form";
import useToastError from "../../../../Shared/Hooks/useToastError";
import { FiSearch } from 'react-icons/fi';

const TableHeader = (props: TableHeaderProps) => {
  const { notify } = useToastError('login');
  return (
    <StyledContainer>
      <Form
        enableReinitialize
        initialValues={{
          search: '',
        }}
        onSubmit={async ({ search }: any) => {
          try {

          } catch (error: unknown) {
            notify(error);
          }
        }}
      >
        <Form.Element>
          <Form.Field.Input name="search" icon={<FiSearch/>} inverted placeholder={"Search for name..."}/>
        </Form.Element>
      </Form>
    </StyledContainer>
  );
}

export default TableHeader;