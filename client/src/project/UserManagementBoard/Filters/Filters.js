import React, { useContext, useEffect, useState } from 'react';

import { FilterElements, FilterSelect, StyledSearch } from './Styles';

import { Context as AppConfigContext } from '../../../context/AppConfigContext';
import { Context as UsersContext } from '../../../context/UsersContext';

import { FiSearch } from 'react-icons/fi';
import { selectData as data } from '../../../shared/utils/data';
import useQuery from '../../../hooks/useQuery';
import useDebounce from '../../../hooks/useDebounce';

const Filters = () => {
  const DEFAULTERS_SELECT = 'defaulter';
  const PRICING_SELECT = 'pricing';
  const SEARCH = 'username';

  const { state, getAppConfig, formatPricing } = useContext(AppConfigContext);
  const { buildReport } = useContext(UsersContext);

  const [query, setQuery, parseQuery] = useQuery();
  const [pricing, setPricing] = useState(null);
  const [defaulters, setDefaulters] = useState(null);
  const [search, setSearch] = useState('');
  const debounceSearch = useDebounce(setQuery, 800);

  useEffect(() => {
    getAppConfig();
  }, []);

  useEffect(() => {
    if (query.length) {
      buildReport(parseQuery());
      return;
    }
    buildReport();
  }, [query]);

  const onFilterChange = (field) => (value) => {
    if (field === SEARCH) {
      setSearch(value);
      debounceSearch(field, value);
      return;
    }
    if (field === PRICING_SELECT) {
      setPricing(value);
      setQuery(field, value);
      return;
    }

    setDefaulters(value);
    setQuery(field, value);
  };

  return (
    <FilterElements>
      <FilterSelect
        placeholder={'Todas las tarifas'}
        options={formatPricing(state)}
        onChange={onFilterChange(PRICING_SELECT)}
        value={pricing}
      />

      <FilterSelect
        placeholder={'Todos los usuarios'}
        options={data.defaulters}
        onChange={onFilterChange(DEFAULTERS_SELECT)}
        value={defaulters}
      />

      <StyledSearch
        icon={<FiSearch />}
        value={search}
        onChange={onFilterChange(SEARCH)}
      />
    </FilterElements>
  );
};

export default Filters;
