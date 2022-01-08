import React from 'react';
import { TableHeaderProps } from "./TableHeaderProps";
import { StyledContainer, StyledFilterForm } from './Styles';
import Form from "../../../../Shared/Components/Form";
import useToastError from "../../../../Shared/Hooks/useToastError";
import { FiSearch } from 'react-icons/fi';
import { IoIosOptions } from 'react-icons/io';
import { useTranslation } from "react-i18next";
import MenuButton from "../../../../Shared/Components/MenuButton";
import Checkbox from "../../../../Shared/Components/Checkbox";

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
      <MenuButton.Menu>
        <MenuButton size={'sm'}>
          <IoIosOptions/>
        </MenuButton>
        <MenuButton.MenuList>
          <MenuButton.MenuItem onSelect={() => console.log('a')}>
            <Checkbox name={t('active_filter_button')} onChange={() => console.log('changed')}/>
          </MenuButton.MenuItem>
          <MenuButton.MenuItem onSelect={() => console.log('a')}>
            <Checkbox name={t('expired_filter_button')} onChange={() => console.log('changed')}/>
          </MenuButton.MenuItem>
        </MenuButton.MenuList>
      </MenuButton.Menu>
    </StyledContainer>
  );
}

export default TableHeader;