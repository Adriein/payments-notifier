import React, { useContext, useEffect, useState } from 'react';
import './TableHeaderFilters.scss';
import { Context as UsersContext } from '../../../context/UsersContext';

import Select from '../../select/Select';
import ActionButton from '../../action-button/ActionButton';
import { selectData } from '../../../shared/utils/data';
import { DEFAULTERS_SELECT, PRICING_SELECT } from '../../../shared/utils/constants';

import { FiUserPlus } from 'react-icons/fi';

export const TableHeaderFilters = () => {
  const { create, edit, buildReport } = useContext(UsersContext);
  const [filters, setFilter] = useState([]);
  useEffect(() => {
    if (filters.length) {
      buildReport(filters);
      return;
    }
    buildReport();
  }, [filters]);

  const handleCreateUser = () => {
    edit();
    create();
  };
  const selectFilter = (type) => (option) => {
    setFilter((prevState) => {
      const state = [...prevState.filter((filter) => filter.field !== type)];
      if (option.value === 'default') {
        return state;
      }

      return [...state, { field: type, value: option.value }];
    });
  };
  return (
    <div className="user-table__header">
      <div className="user-table__filters">
        <Select
          data={selectData.defaulters}
          handleChange={selectFilter(DEFAULTERS_SELECT)}
        />
        <Select
          handleChange={selectFilter(PRICING_SELECT)}
          url="/appConfig"
          defaultOption={{ label: 'Todas las tarifas', value: 'default' }}
        />
      </div>
      <div className="user-table__config">
        <ActionButton>
          <FiUserPlus size="25px" onClick={handleCreateUser} />
        </ActionButton>
      </div>
    </div>
  );
};
