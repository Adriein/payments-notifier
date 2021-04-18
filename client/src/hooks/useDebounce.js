import { useCallback, useRef } from 'react';

const useDebounce = (fn, wait = 1000) => {
  let debounce = useRef(null);
  return useCallback(
    (...args) => {
      const context = this;
      clearTimeout(debounce.current);
      debounce.current = setTimeout(() => {
        fn.apply(context, args);
      }, wait);
    },
    [fn, wait]
  );
};

export default useDebounce;
