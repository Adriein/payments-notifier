import React, { ChangeEvent, useContext, useEffect, useMemo, useState } from 'react';
import { TableHeaderProps } from "./TableHeaderProps";
import { StyledContainer, StyledFilterForm, StyledSearchInput } from './Styles';
import { FiSearch, FiPlus } from 'react-icons/fi';
import { IoIosOptions } from 'react-icons/io';
import useDebounce from "../../../Hooks/useDebounce";
import { ACTIVE_FILTER, EXPIRED_FILTER, NAME_FILTER } from "../../../../Users/constants";
import { UsersContext } from "../../../../Users/Context/UsersContext";

import { ActionIcon, TextInput, Button, Popover, Grid, Group, Checkbox, Menu } from '@mantine/core';
import useList from "../../../Hooks/useList";
import { debounce } from "lodash";

const TableHeader = () => {
  const { state, t, addFilter } = useContext(UsersContext);
  const { hasItem, getItemByValue } = useList(state.filters)
  const [ query, setQuery ] = useState('');
  const debounceQueryMemo = useMemo(() => debounce(setQuery, 500), []);

  useEffect(() => {
    if (query.length) {
      console.log(query)
      addFilter({ field: NAME_FILTER, value: query });
    }

    return () => debounceQueryMemo.cancel()
  }, [ query ]);

  const [ , setOpen ] = useState(false);

  return (
    <StyledContainer>
      <Grid>
        <Grid.Col span={3}>
          <TextInput
            placeholder={t('clients:search_filter_placeholder')}
            icon={<FiSearch/>}
            size={'sm'}
            value={query}
            onChange={(event: ChangeEvent<HTMLInputElement>) => debounceQueryMemo(event.currentTarget.value)}
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
                  checked={hasItem({ field: 'active' })}
                  label={t('clients:active_filter_button')}
                  styles={{ label: { cursor: "pointer" }, input: { cursor: "pointer" } }}
                  onClick={() => addFilter({ field: ACTIVE_FILTER })}
                />
              </Menu.Item>
              <Menu.Item>
                <Checkbox
                  size="sm"
                  label={t('clients:inactive_filter_button')}
                  styles={{ label: { cursor: "pointer" }, input: { cursor: "pointer" } }}
                />
              </Menu.Item>
              <Menu.Label>Filtros de subscripción</Menu.Label>
              <Menu.Item>
                <Checkbox
                  size="sm"
                  label={t('clients:expired_filter_button')}
                  styles={{ label: { cursor: "pointer" }, input: { cursor: "pointer" } }}
                />
              </Menu.Item>
              <Menu.Item>
                <Checkbox
                  size="sm"
                  label={t('clients:active_subscription_filter_button')}
                  styles={{ label: { cursor: "pointer" }, input: { cursor: "pointer" } }}
                />
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