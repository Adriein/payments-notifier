import { ActionProps } from "../Action/ActionProps";
import { FilterService } from "../Services/FilterService";
import { FilterProps } from "../Action/Filter/FilterProps";

export const addFilterReducer = <T extends FilterProps, S extends { filters: FilterProps[] }>(
  state: S,
  action: ActionProps<T>
): S => {
  const filterToAdd = action.payload ?? {} as FilterProps;
  const filterService = new FilterService<FilterProps>(state.filters);

  const isRepeated = filterService.exists(filterToAdd);

  if (!isRepeated) {
    return {
      ...state,
      filters: [ ...state.filters, filterToAdd ]
    };
  }

  const isDifferent = filterService.isValueDiff(filterToAdd);

  if (isDifferent) {
    const filters = filterService.remove(filterToAdd);
    return {
      ...state,
      filters: [ ...filters, filterToAdd ]
    };
  }

  return {
    ...state,
    filters: [ ...filterService.remove(filterToAdd) ]
  };
}