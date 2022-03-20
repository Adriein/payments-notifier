import React, { useContext, useEffect, useState } from 'react';
import { TableHeaderProps } from "./TableHeaderProps";
import { StyledContainer, StyledFilterForm, StyledSearchInput } from './Styles';
import { FiSearch } from 'react-icons/fi';
import { IoIosOptions } from 'react-icons/io';
import { useTranslation } from "react-i18next";
import MenuButton from "../../MenuButton";
import Checkbox from "../../Checkbox";
import useDebounce from "../../../Hooks/useDebounce";
import { ACTIVE_FILTER, EXPIRED_FILTER, NAME_FILTER } from "../../../../Users/constants";
import { UsersContext } from "../../../../Users/Context/UsersContext";
import useFilters from "../../../Hooks/useFilters";

const TableHeader = ({ addFilter }: TableHeaderProps) => {
  const { t } = useTranslation('clients');
  const { state } = useContext(UsersContext);
  const [ query, setQuery ] = useState('');
  const debouncedSetQuery = useDebounce(setQuery, 1000);
  //const { isFilterActive, applyFilter } = useFilters(state.filters, addFilter);
  
  return (
    <StyledContainer>
      <StyledFilterForm>
        <StyledSearchInput
          inverted
          icon={<FiSearch/>}
          placeholder={t('search_filter_placeholder')}
          onChange={debouncedSetQuery}
        />
      </StyledFilterForm>
      <MenuButton.Menu>
        <MenuButton size={'sm'}>
          <IoIosOptions/>
          <span>{t('add_filter_button')}</span>
        </MenuButton>
        <MenuButton.MenuList>
          <MenuButton.MenuItem onSelect={() => {}}>
            <Checkbox active={false} name={t('active_filter_button')}/>
          </MenuButton.MenuItem>
          <MenuButton.MenuItem onSelect={() => {}}>
            <Checkbox active={false} name={t('expired_filter_button')}/>
          </MenuButton.MenuItem>
        </MenuButton.MenuList>
      </MenuButton.Menu>
    </StyledContainer>
  );
}

export default TableHeader;