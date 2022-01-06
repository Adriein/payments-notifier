import React from 'react';
import { TableHeaderProps } from "./TableHeaderProps";
import { StyledContainer, StyledFilterForm } from './Styles';
import Form from "../../../../Shared/Components/Form";
import useToastError from "../../../../Shared/Hooks/useToastError";
import { FiSearch } from 'react-icons/fi';
import Button from "../../../../Shared/Components/Button";
import { useTranslation } from "react-i18next";

const TableHeader = (props: TableHeaderProps) => {
  const { notify } = useToastError('clients');
  const { t } = useTranslation('clients');
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
          <Form.Field.Input inverted name="search" icon={<FiSearch/>} placeholder={t('search_filter_placeholder')}/>
        </StyledFilterForm>
      </Form>
      <Button size={'small'} variant={'fill'}>{t('active_filter_button')}</Button>
      <Button size={'small'} variant={'fill'}>{t('expired_filter_button')}</Button>
    </StyledContainer>
  );
}

export default TableHeader;