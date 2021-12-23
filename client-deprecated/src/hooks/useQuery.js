import { useState } from 'react';

const useQuery = (initialState = []) => {
  const [filters, setFilters] = useState(initialState);

  const parseQuery = () => {
    console.log(filters);
    if (!filters) return null;
    return `?${filters
      .map((filter) => {
        return `${filter.field.toLowerCase()}=${filter.value.toLowerCase()}`;
      })
      .join('&')}`;
  };

  const onFilterChange = (field, value) => {
    setFilters((prevState) => {
      const state = [...prevState.filter((filter) => filter.field !== field)];

      if (!value) return state;

      return [...state, { field, value }];
    });
  };

  return [filters, onFilterChange, parseQuery];
};

export default useQuery;
