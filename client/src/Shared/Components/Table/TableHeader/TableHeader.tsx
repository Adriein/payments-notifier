import React, { useContext, useEffect, useState } from 'react';
import { TableHeaderProps } from "./TableHeaderProps";
import { StyledContainer, StyledFilterForm, StyledSearchInput } from './Styles';
import { FiSearch, FiPlus } from 'react-icons/fi';
import { IoIosOptions } from 'react-icons/io';
import useDebounce from "../../../Hooks/useDebounce";
import { ACTIVE_FILTER, EXPIRED_FILTER, NAME_FILTER } from "../../../../Users/constants";
import { UsersContext } from "../../../../Users/Context/UsersContext";
import useFilters from "../../../Hooks/useFilters";

import { ActionIcon, TextInput, Button, Popover, Grid, Group, Checkbox, Menu } from '@mantine/core';

const TableHeader = ({ addFilter }: TableHeaderProps) => {
  const { state, t } = useContext(UsersContext);
  const [ query, setQuery ] = useState('');
  const debouncedSetQuery = useDebounce(setQuery, 1000);

  const [ open, setOpen ] = useState(false);
  //const { isFilterActive, applyFilter } = useFilters(state.filters, addFilter);

  return (
    <StyledContainer>
      <Grid>
        <Grid.Col span={3}>
          <TextInput
            placeholder={t('clients:search_filter_placeholder')}
            icon={<FiSearch/>}
            size={'sm'}
            onChange={debouncedSetQuery}
          />
        </Grid.Col>
        <Grid.Col span={6} offset={3}>
          <Group position="right">
            <Menu
              closeOnItemClick={false}
              placement="end"
              size="lg"
              control={
                <ActionIcon
                  color="dark"
                  variant="default"
                  size="lg"
                  onClick={() => setOpen(true)}
                >
                  <IoIosOptions/>
                </ActionIcon>
              }>
              <Menu.Label>Filtros de cliente</Menu.Label>
              <Menu.Item>
                <Checkbox
                  size="sm"
                  label={t('clients:active_filter_button')}
                  styles={{ label: { cursor: "pointer" }, input: { cursor: "pointer" } }}
                />
              </Menu.Item>
              <Menu.Item>
                <Checkbox size="sm" label={t('clients:inactive_filter_button')}/>
              </Menu.Item>
              <Menu.Label>Filtros de subscripción</Menu.Label>
              <Menu.Item>
                <Checkbox size="sm" label={t('clients:expired_filter_button')}/>
              </Menu.Item>
              <Menu.Item>
                <Checkbox size="sm" label={t('clients:active_subscription_filter_button')}/>
              </Menu.Item>
            </Menu>

            <Button variant={'default'} leftIcon={<FiPlus/>}>
              {t('clients:create_user')}
            </Button>
          </Group>
        </Grid.Col>
      </Grid>
    </StyledContainer>
  )
    ;
}

/*<StyledContainer>
 <StyledFilterForm>
 <TextInput
 placeholder={t('clients:search_filter_placeholder')}
 icon={<FiSearch/>}
 size={'sm'}
 onChange={debouncedSetQuery}
 />
 </StyledFilterForm>
 <ActionIcon color="dark" variant="default" size="lg">
 <IoIosOptions/>
 </ActionIcon>
 <MenuButton.Menu>
 <MenuButton size={'sm'}>
 <IoIosOptions/>
 <span>{t('clients:add_filter_button')}</span>
 </MenuButton>
 <MenuButton.MenuList>
 <MenuButton.MenuItem onSelect={() => {}}>
 <Checkbox text={t('clients:active_filter_button')}/>
 </MenuButton.MenuItem>
 <MenuButton.MenuItem onSelect={() => {}}>
 <Checkbox text={t('clients:expired_filter_button')}/>
 </MenuButton.MenuItem>
 </MenuButton.MenuList>
 </MenuButton.Menu>
 </StyledContainer>*/

export default TableHeader;