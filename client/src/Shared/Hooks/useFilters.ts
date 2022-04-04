import { FilterProps } from "../Action/Filter/FilterProps";
import { useState } from "react";

const useFilters = () => {
  const [ state, setState ] = useState<FilterProps[]>([]);

  const isActive = (filter: FilterProps) => !!state.find(({ field }: FilterProps) => field === filter.field);
  const add = (filter: FilterProps) => {
    setState([ ...state, filter ])
  };

  return {
    addFilter: add,
    filters: state
  }
}

export default useFilters;