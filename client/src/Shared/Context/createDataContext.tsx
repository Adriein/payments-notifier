import React, { useReducer, createContext, Reducer } from 'react';
import { MappedActions } from "../types";

const createDataContext = <T extends unknown, A extends { [key: string]: any }>(
    reducer: Reducer<T, any>,
    actions: A,
    defaultValue: T
  ) => {
    const Context = createContext<{ state: T } & MappedActions<A>>({ state: defaultValue, ...actions });

    const Provider = ({ children }: any) => {
      const [ state, dispatch ] = useReducer<Reducer<T, any>>(reducer, defaultValue);

      const boundActions: { [key: string]: any } = {};

      for (let key in actions) {
        boundActions[key] = actions[key](dispatch) as MappedActions<A>;
      }
      const a = { ...boundActions } as MappedActions<A>
      return (
        <Context.Provider value={{ state, ...a }}>
          {children}
        </Context.Provider>
      );
    };

    return { Context, Provider };
  }
;

export default createDataContext;