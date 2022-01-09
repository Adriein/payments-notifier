import { useState } from "react";

const useFilters = <T extends { field: string }>() => {
  const [ state, setState ] = useState<{ filters: T[] }>({ filters: [] });
  
  const removeFilter = (filter: T) => {
    const filters = state.filters.filter((f: T) => f.field !== filter.field);
    setState({ filters });
  }

  return {
    filters: state,
    setFilter: (filter: T) => setState({ filters: [ ...state.filters, filter ] }),
    removeFilter
  }
}

export default useFilters;