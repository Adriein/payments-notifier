import { useCallback, useState } from 'react';


const useDebounce = (wait, initialState = '') => {
  const [debouncedValue, setDebouncedValue] = useState(initialState);

  const debounce = useCallback((fn, wait) => {
    let timerId;
    return (...args) => {
      const context = this;
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        timerId = null;
        fn.apply(context, args);
      }, wait);
    };
  }, []);

  return [debouncedValue, debounce(setDebouncedValue, wait)];
};

export default useDebounce;
