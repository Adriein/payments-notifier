import React, { useContext, useEffect, useState } from 'react';
import { TableHeaderProps } from "./TableHeaderProps";
import { StyledContainer, StyledFilterForm, StyledSearchInput } from './Styles';
import { FiSearch } from 'react-icons/fi';
import { IoIosOptions } from 'react-icons/io';
import { useTranslation } from "react-i18next";
import MenuButton from "../../../../Shared/Components/MenuButton";
import Checkbox from "../../../../Shared/Components/Checkbox";
import useDebounce from "../../../../Shared/Hooks/useDebounce";
import { ACTIVE_FILTER, EXPIRED_FILTER, NAME_FILTER } from "../../../constants";
import { UsersContext } from "../../../Context/UsersContext";
import { Filter } from "../../../types";

const TableHeader = ({ addFilter }: TableHeaderProps) => {
  const { t } = useTranslation('clients');
  const { state } = useContext(UsersContext);
  const [ query, setQuery ] = useState('');
  const debouncedSetQuery = useDebounce(setQuery, 1000);

  const applyFilter = (filterName: 'active' | 'name' | 'expired', value?: string) => () => {
    if (value) {
      addFilter({ filter: { field: filterName, value } })
      return;
    }
    addFilter({ filter: { field: filterName } });
  }

  const isFilterActive = (filterName: 'active' | 'name' | 'expired'): boolean => {
    const filter = state.filters.find(({ field }: Filter) => field === filterName);

    return !!filter;
  };

  useEffect(() => {
    if (query) {
      applyFilter(NAME_FILTER, query)();
    }
  }, [ query ])

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
        </MenuButton>
        <MenuButton.MenuList>
          <MenuButton.MenuItem onSelect={applyFilter(ACTIVE_FILTER)}>
            <Checkbox active={isFilterActive(ACTIVE_FILTER)} name={t('active_filter_button')}/>
          </MenuButton.MenuItem>
          <MenuButton.MenuItem onSelect={applyFilter(EXPIRED_FILTER)}>
            <Checkbox active={isFilterActive(EXPIRED_FILTER)} name={t('expired_filter_button')}/>
          </MenuButton.MenuItem>
        </MenuButton.MenuList>
      </MenuButton.Menu>
    </StyledContainer>
  );
}

export default TableHeader;