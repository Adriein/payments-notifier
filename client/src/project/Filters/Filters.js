import React, { useContext, useEffect, useState } from 'react';
import Select from '../../shared/components/Select/Select';
import Input from '../../shared/components/Input/Input';

import { FilterElements, FilterStyledSelect, StyledSearch } from './Styles';

import { Context as AppConfigContext } from '../../context/AppConfigContext';
import { Context as UsersContext } from '../../context/UsersContext';

import { FiSearch } from 'react-icons/fi';
import { selectData as data } from '../../shared/utils/data';
import useDebounce from '../../hooks/useDebounce';

const Filters = () => {
  const { state, getAppConfig, formatPricing } = useContext(AppConfigContext);
  const { buildReport } = useContext(UsersContext);
  const [filters, setFilter] = useState([]);
  const [pricing, setPricing] = useState(null);
  const [defaulters, setDefaulters] = useState(null);
  const [search, setSearch] = useState('');
  
  console.log(filters);

  useEffect(() => {
    getAppConfig();
  }, []);

  useEffect(() => {
    if (filters.length) {
      buildReport(filters);
      return;
    }
    buildReport();
  }, [filters]);

  return (
    <FilterElements>
      <FilterStyledSelect>
        <Select
          placeholder={'Todas las tarifas'}
          options={formatPricing(state)}
          onChange={(value) => setPricing(value)}
          value={pricing}
        />
      </FilterStyledSelect>
      <FilterStyledSelect>
        <Select
          placeholder={'Todos los usuarios'}
          options={data.defaulters}
          onChange={(value) => setDefaulters(value)}
          value={defaulters}
        />
      </FilterStyledSelect>
      <StyledSearch>
        <Input icon={<FiSearch />} value={search} onChange={(value) => setSearch(value)}/>
      </StyledSearch>
    </FilterElements>
  );
};

export default Filters;
