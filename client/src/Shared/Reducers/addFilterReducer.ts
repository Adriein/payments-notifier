import { ActionProps } from "../Action/ActionProps";
import { FilterService } from "../Services/FilterService";
import { FilterProps } from "../Action/Filter/FilterProps";

export const addFilterReducer = <T extends FilterProps, S extends { filters: FilterProps[] }>(
  state: S,
  action: ActionProps<T>
): S => {
  const filterToAdd = action.payload ?? {} as FilterProps;
  const filterService = new FilterService<FilterProps>(state.filters);

  const repeated = filterService.exists(filterToAdd);
  const isDifferent = filterService.isValueDiff(filterToAdd);

  if (repeated && !isDifferent) {
    const filtersToKeep = filterService.remove(filterToAdd);
    return {
      ...state,
      filters: [ ...filtersToKeep ]
    };
  }

  if (isDifferent) {
    const cleanFilters = filterService.remove(filterToAdd);

    return {
      ...state,
      filters: [ ...cleanFilters, filterToAdd ]
    };
  }
  
  return {
    ...state,
    filters: [ ...state.filters, filterToAdd ]
  };
}