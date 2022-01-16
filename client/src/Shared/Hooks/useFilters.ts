import { FilterProps } from "../Action/Filter/FilterProps";

const useFilters = <T extends FilterProps>(filters: T[], fn: (filter: FilterProps) => void) => {

  const isFilterActive = (field: string) => !!filters.find((filter: T) => filter.field === field);

  const applyFilter = (fieldName: string, value?: string) => () => {
    fn({ field: fieldName, value })
  }


  return {
    isFilterActive,
    applyFilter
  }
}

export default useFilters;