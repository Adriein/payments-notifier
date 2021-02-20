import { useState, useEffect } from 'react';
import server from '../api/server';

const fetch = async (url) => {
  const response = (await server.get(url)).data;
  return Object.keys(response.pricing).map((pricing) => {
    return {
      value: pricing,
      label: pricing.charAt(0).toUpperCase() + pricing.slice(1),
    };
  });
};

const useDynamicSelect = (
  initialVal,
  url = undefined,
  defaultOption = undefined
) => {
  const [data, setData] = useState(initialVal);
  useEffect(() => {
    if (initialVal.length > 1) {
      if (defaultOption) {
        setData([defaultOption, ...initialVal]);
        return;
      }
      setData(initialVal);
      return;
    }
    fetch(url).then((response) => {
      if (defaultOption) {
        setData([defaultOption, ...response]);
        return;
      }

      setData(response);
    });
  }, []);

  return data;
};

export default useDynamicSelect;
