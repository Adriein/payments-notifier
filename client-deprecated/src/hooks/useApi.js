import { useCallback, useState } from 'react';
import server from '../api/server';

const useApi = (method, url) => {
  const [state, setState] = useState({
    error: undefined,
    data: undefined,
    loading: false,
  });

  const request = useCallback((payload) => {
    return new Promise((resolve, reject) => {
      setState({ error: undefined, data: undefined, loading: true });
      server[method](url, payload ?? undefined).then(
        (data) => {
          resolve(data);
          setState({ error: undefined, data, loading: false });
        },
        (error) => {
          reject(error);
          setState({ error, data: undefined, loading: false });
        }
      );
    });
  }, [method, url]);

  return [state, request];
};

export default useApi;
