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
import { FilterForm, SelectedFilterForm } from "../../../../Users/types";

const TableHeader = () => {
  const { state, t, addFilter } = useContext(UsersContext);
  const [ values, handlers ] = useList<Filter>([]);

  const [ search, setSearch ] = useState('')
  const [ query, setQuery ] = useState('');
  const [ open, toggle ] = useToggle(false);

  const existingFilter = useForm({
    initialValues: {
      filters: formList<FilterForm>(
        [ { entity: '', fields: [], operations: [], values: [] } ]),
    },
  });

  const selectedFilter = useForm({
    initialValues: {
      filters: formList<SelectedFilterForm>([]),
    },
  });

  const debounceQueryMemo = useMemo(() => debounce(setQuery, 500), []);

  useEffect(() => {
    (async () => {
      const filterList = await FilterCall.getClientTableFilters();
      handlers.setState(filterList);
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

  const handleEntitySelection = (index: number) => (entity: string) => {
    const filter = handlers.get((filter: Filter) => filter.entity === entity);
    const fields = Object.keys(filter!.fields).map((key: string) => {
      return {
        value: key,
        label: StringHelper.firstLetterToUpperCase(key)
      }
    });

    const operations = filter!.operations.map((operation: string) => ({
      value: operation,
      label: operation
    }));

    existingFilter.setListItem('filters', index, { entity, fields: fields, operations: operations, values: [] });
  }

  const handleFieldSelection = (index: number, entity: string) => (field: string) => {
    const filter = handlers.get((filter: Filter) => filter.entity === entity);

    const values = filter!.fields[field].map((value: string) => ({
      value,
      label: value
    }))

    existingFilter.setListItem(
      'filters',
      index,
      {
        entity,
        fields: existingFilter.getListInputProps('filters', index, 'fields').value,
        operations: existingFilter.getListInputProps('filters', index, 'operations').value,
        values: values
      }
    );
  }

  const handleOperationSelection = (index: number, entity: string) => (operation: string) => {
    selectedFilter.setListItem('filters', index, { entity: entity, field: '', operation: operation, value: '' });
  }

  const handleValueSelection = (index: number, entity: string) => (field: string) => {
    const filter = handlers.get((filter: Filter) => filter.entity === entity);

    const values = filter!.fields[field].map((value: string) => ({
      value,
      label: value
    }))

    existingFilter.setListItem(
      'filters',
      index,
      {
        entity,
        fields: existingFilter.getListInputProps('filters', index, 'fields').value,
        operations: existingFilter.getListInputProps('filters', index, 'operations').value,
        values: values
      }
    );
  }

  const handleAddNewFilter = () => {
    existingFilter.addListItem('filters', { entity: '', fields: [], operations: [], values: [] });
  }

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
                <Grid.Col span={12}>
                  {existingFilter.values.filters.map((_, index: number) => {
                    return (
                      <Grid>
                        <Grid.Col span={3}>
                          <Select
                            label="Pick an entity"
                            clearable
                            withinPortal={false}
                            data={getEntities()}
                            onChange={handleEntitySelection(index)}
                          />
                        </Grid.Col>
                        <Grid.Col span={3}>
                          <Select
                            label="Pick a field"
                            clearable
                            withinPortal={false}
                            data={existingFilter.getListInputProps('filters', index, 'fields').value}
                            onChange={handleFieldSelection(
                              index,
                              existingFilter.getListInputProps('filters', index, 'entity').value
                            )}
                          />
                        </Grid.Col>
                        <Grid.Col span={3}>
                          <Select
                            label="Pick an operation"
                            clearable
                            withinPortal={false}
                            data={existingFilter.getListInputProps('filters', index, 'operations').value}
                            onChange={handleOperationSelection(
                              index,
                              existingFilter.getListInputProps('filters', index, 'entity').value
                            )}
                          />
                        </Grid.Col>
                        <Grid.Col span={3}>
                          <Select
                            label="Pick a value"
                            clearable
                            withinPortal={false}
                            data={existingFilter.getListInputProps('filters', index, 'values').value}
                            onChange={handleValueSelection(
                              index,
                              existingFilter.getListInputProps('filters', index, 'entity').value
                            )}
                          />
                        </Grid.Col>
                      </Grid>
                    );
                  })}
                </Grid.Col>
                <Grid.Col span={12}>
                  <Button variant={'default'} leftIcon={<FiPlus/>} size={"xs"} onClick={handleAddNewFilter}>
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