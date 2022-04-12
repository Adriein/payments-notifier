import React, { ChangeEvent, useContext, useEffect, useMemo, useState } from 'react';
import { StyledContainer } from './Styles';
import { FiSearch, FiPlus } from 'react-icons/fi';
import { IoIosOptions } from 'react-icons/io';
import { useForm, formList } from '@mantine/form';

import { ACTIVE_FILTER, EXPIRED_FILTER, INACTIVE_FILTER, NAME_FILTER } from "../../../../Users/constants";
import { UsersContext } from "../../../../Users/Context/UsersContext";

import { ActionIcon, TextInput, Button, Select, Grid, Group, Checkbox, Menu, Popover } from '@mantine/core';
import { debounce } from "lodash";
import { useToggle } from "../../../Hooks/useToggle";
import { FilterCall } from "../../../../Users/Api/Filter";
import { Filter } from "../../../../Users/Models/Filter";
import useList from "../../../Hooks/useList";
import { StringHelper } from "../../../Services/StringHelper";


const field = [
  { value: 'user_active', label: 'active', group: 'User' },
  { value: 'user_inactive', label: 'inactive', group: 'User' },
  { value: 'type', label: 'type', group: 'Pricing' },
  { value: 'duration', label: 'duration', group: 'Pricing' },
  { value: 'subscription_active', label: 'active', group: 'Subscription' },
  { value: 'subscription_inactive', label: 'inactive', group: 'Subscription' },
]

const value = [
  { value: 'true', label: 'True' },
  { value: 'false', label: 'False' },
]

const TableHeader = () => {
  const { state, t, addFilter } = useContext(UsersContext);
  const [ values, handlers ] = useList<Filter>([]);

  const [ search, setSearch ] = useState('')
  const [ query, setQuery ] = useState('');
  const [ open, toggle ] = useToggle(false);

  const [ fields, setFields ] = useList([ {
    value: '',
    label: ''
  } ]);

  const form = useForm({
    initialValues: {
      filters: formList([ { entity: '', field: '', operation: '', value: '' } ]),
    },
  });

  const debounceQueryMemo = useMemo(() => debounce(setQuery, 500), []);

  useEffect(() => {
    (async () => {
      const filterList = await FilterCall.getClientTableFilters();
      handlers.setState(filterList);
      console.log(filterList);
    })();

    addFilter({ field: NAME_FILTER, value: query });
  }, [ query ]);

  const handleSearchUser = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value);
    debounceQueryMemo(event.currentTarget.value);

  }

  const getEntities = (): { value: string, label: string }[] => {
    return values.map((filter: Filter) => ({
      value: filter.entity,
      label: StringHelper.firstLetterToUpperCase(filter.entity)
    }));
  }

  const handleEntitySelection = (entity: string) => {
    const filter = handlers.get((filter: Filter) => filter.entity === entity);
    const fields = Object.keys(filter!.fields).map((key: string) => ({
      value: key,
      label: StringHelper.firstLetterToUpperCase(key)
    }));

    setFields.setState(fields);
  }

  /*const getEntityFields = (entity: string): { value: string, label: string }[] => {
   const filter = filterList.find((filter: Filter) => filter.entity === entity);

   return Object.keys(filter!.fields).map((key: string) => ({
   value: key,
   label: key
   }));
   }

   const getOperations = (entity: string): { value: string, label: string }[] => {
   const filter = filterList.find((filter: Filter) => filter.entity === entity);

   return filter!.operations.map((operation: string) => ({ value: operation, label: operation }));
   }

   const handleOnEntitySelection = (value: string) => {
   setEntity(value)
   }*/

  const handleCheckBoxFilter = (event: ChangeEvent<HTMLInputElement>) => {
    const checkBox = event.currentTarget.name;

    if (checkBox === ACTIVE_FILTER) {
      addFilter({ field: ACTIVE_FILTER })
    }

    if (checkBox === EXPIRED_FILTER) {
      addFilter({ field: EXPIRED_FILTER })
    }

    if (checkBox === INACTIVE_FILTER) {
      addFilter({ field: INACTIVE_FILTER })
    }
  }

  return (
    <StyledContainer>
      <Grid>
        <Grid.Col span={3}>
          <TextInput
            placeholder={t('clients:search_filter_placeholder')}
            icon={<FiSearch/>}
            size={'sm'}
            value={search}
            onChange={handleSearchUser}
          />
        </Grid.Col>
        <Grid.Col span={6} offset={3}>
          <Group position="right">
            <Popover
              position="bottom"
              placement="end"
              opened={open}
              target={
                <ActionIcon
                  color="dark"
                  variant="default"
                  size="lg"
                  onClick={toggle}
                >
                  <IoIosOptions/>
                </ActionIcon>
              }>
              <Grid>
                <Grid.Col span={3}>
                  <Select
                    label="Pick an entity"
                    data={getEntities()}
                    onChange={handleEntitySelection}
                  />
                </Grid.Col>
                <Grid.Col span={3}>
                  <Select
                    label="Pick a field"
                    data={fields}
                  />
                </Grid.Col>
                <Grid.Col span={3}>
                  <Select
                    label="Pick an operation"
                    data={[]}
                  />
                </Grid.Col>
                <Grid.Col span={3}>
                  <Select
                    label="Pick a value"
                    data={value}
                  />
                </Grid.Col>
                <Grid.Col span={12}>
                  <Button variant={'default'} leftIcon={<FiPlus/>} size={"xs"}>
                    Filter
                  </Button>
                </Grid.Col>
              </Grid>
            </Popover>
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


/*<Menu
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
 name={ACTIVE_FILTER}
 checked={false}
 label={t('clients:active_filter_button')}
 styles={{ label: { cursor: "pointer" }, input: { cursor: "pointer" } }}
 onChange={handleCheckBoxFilter}
 />
 </Menu.Item>
 <Menu.Item>
 <Checkbox
 size="sm"
 name={INACTIVE_FILTER}
 label={t('clients:inactive_filter_button')}
 styles={{ label: { cursor: "pointer" }, input: { cursor: "pointer" } }}
 onChange={handleCheckBoxFilter}
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
 </Menu>*/

export default TableHeader;