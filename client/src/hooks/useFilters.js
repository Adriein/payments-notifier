import useDebounce from './useDebounce';

const useQuery = (initialState = []) => {
  const [filters, setFilters] = useDebounce(500, initialState);

  const createQuery = () => {
    return `?${filters
      .map((filter) => {
        return `${filter.field.toLowerCase()}=${filter.value.toLowerCase()}`;
      })
      .join('&')}`;
  };

  return [filters, setFilters, createQuery];
};

export default useFilters;
