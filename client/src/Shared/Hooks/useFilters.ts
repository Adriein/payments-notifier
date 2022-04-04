import { FilterProps } from "../Action/Filter/FilterProps";
import { useState } from "react";

const useFilters = () => {
  const [ state, setState ] = useState<FilterProps[]>([]);

  const exists = (filter: FilterProps) => state.find(({ field }: FilterProps) => field === filter.field);
  const remove = (filter: FilterProps): void => {
    const position = state.indexOf(filter);
    const clone = [ ...state ];

    clone.splice(position, 1);
  }

  const upsert = (filter: FilterProps) => {
    const inserted = exists(filter);
    if (inserted) {
      remove(filter);

      const clone = { ...inserted, value: filter.value }
      setState([ ...state, clone ]);

      return;
    }
    setState([ ...state, filter ])
  };

  return {
    addFilter: upsert,
    filters: state
  }
}

export default useFilters;