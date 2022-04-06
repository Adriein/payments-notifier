import { useState } from "react";
import { isEqual } from "lodash";

const useList = <T extends Record<string, any>>(list: T[]) => {
  const [ state, setState ] = useState<T[]>(list);

  const hasItem = (item: T) => !!state.find((current: T) => isEqual(item, current));

  const getItem = (item: T) => state.find((current: T) => isEqual(item, current));

  const getItemByValue = (value: any) => state.find((current: T) => {
    for (const key of Object.keys(current)) {
      return current[key] === value;
    }

    return false;
  });

  const removeItem = (item: T): void => {
    const position = state.indexOf(item);
    const clone = [ ...state ];

    clone.splice(position, 1);
  }

  const upsertItem = (item: T) => {
    if (hasItem(item)) {
      const inserted = getItem(item);

      removeItem(item);

      const clone = { ...inserted, ...item }

      setState([ ...state, clone ]);

      return;
    }

    setState([ ...state, item ])
  };

  return {
    hasItem,
    getItemByValue
  }
}

export default useList;