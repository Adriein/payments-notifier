import React from 'react';
import { TableHeaderProps } from "./TableHeaderProps";
import { StyledContainer, StyledFilterForm } from './Styles';
import Form from "../../../../Shared/Components/Form";
import useToastError from "../../../../Shared/Hooks/useToastError";
import { FiSearch, FiPlus } from 'react-icons/fi';
import Button from "../../../../Shared/Components/Button";

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
        <StyledFilterForm>
          <Form.Field.Input name="search" icon={<FiSearch/>} inverted placeholder={"Search for name..."}/>
        </StyledFilterForm>
      </Form>
      <Button size={'small'} variant={'fill'} icon={<FiPlus/>}>Add Filter</Button>
      <Button size={'small'} variant={'fill'}>Add Filter</Button>
      <Button size={'small'} variant={'fill'}>Add Filter</Button>
    </StyledContainer>
  );
}

export default TableHeader;