import { useState } from "react";

const useFilters = <T extends { field: string }>() => {
  const [ state, setState ] = useState<T[]>([]);

  const exists = ({ field }: T) => state.find((filter: T) => filter.field === field);

  const removeFilter = (filter: T) => {
    const filters = state.filter(({ field }: T) => field !== filter.field);
    setState(filters);
  }

  const setFilter = (filter: T) => {
    if (exists(filter)) {
      removeFilter(filter);
      return;
    }
    setState([ ...state, filter ]);
  }

  return {
    filters: state,
    setFilter
  }
}

export default useFilters;