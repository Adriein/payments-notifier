import { useCallback } from 'react';

const useDebounce = (fn: (...args: any[]) => void, wait: number = 1000) => {
  let timerId: NodeJS.Timeout | undefined = undefined;
  return useCallback(
    (...args: any[]) => {
      const context = this;
      clearTimeout(timerId!);
      timerId = setTimeout(() => {
        fn.apply(context, args);
      }, wait);
    },
    [ fn, wait ]
  );
};

export default useDebounce;