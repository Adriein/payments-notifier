import { useState, useEffect } from 'react';
import server from '../api/server';

const useDynamicSelect = (initialVal) => {
  const [data, setData] = useState(initialVal);

  useEffect(() => {
    if (initialVal.length > 1) {
      setData(initialVal);
      return;
    }
    (async () => {
      const response = (await server.get('/appConfig')).data;
      const formatedResponse = Object.keys(response.pricing).map((pricing) => {
        return {
          value: pricing,
          label: pricing.charAt(0).toUpperCase() + pricing.slice(1),
        };
      });

      setData([
        { value: 'default', label: 'Todas las tarifas' },
        ...formatedResponse,
      ]);
    })();
  }, []);

  return data;
};

export default useDynamicSelect;
