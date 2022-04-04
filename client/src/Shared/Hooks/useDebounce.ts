import { useEffect, useState, useRef } from 'react';

const useDebounce = <T = any>(value: T, wait: number, options = { leading: false }) => {
  const [ _value, setValue ] = useState(value);
  const mountedRef = useRef(false);
  const timeoutRef = useRef<number>(-1);
  const coolDownRef = useRef(false);

  const cancel = () => window.clearTimeout(timeoutRef.current);

  useEffect(() => {
    if (mountedRef.current) {
      if (!coolDownRef.current && options.leading) {
        coolDownRef.current = true;
        setValue(value);
      } else {
        cancel();
        timeoutRef.current = window.setTimeout(() => {
          coolDownRef.current = false;
          setValue(value);
        }, wait);
      }
    }
  }, [ value, options.leading ]);

  useEffect(() => {
    mountedRef.current = true;
    return cancel;
  }, []);

  return [ _value, cancel ] as const;
}

export default useDebounce;