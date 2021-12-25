import React, { useReducer, createContext, Reducer } from 'react';
import { MappedActions } from "../types";

const createDataContext = <T extends unknown, A extends { [key: string]: any }>(
    reducer: Reducer<T, any>,
    actions: A,
    defaultValue: T
  ) => {
    const boundActions: MappedActions<A> = { ...actions };
    const Context = createContext<{ state: T } & MappedActions<A>>({ state: defaultValue, ...boundActions });

    const Provider = ({ children }: any) => {
      const [ state, dispatch ] = useReducer<Reducer<T, any>>(reducer, defaultValue);

      for (let key in actions) {
        boundActions[key] = actions[key](dispatch);
      }

      return (
        <Context.Provider value={{ state, ...boundActions }}>
          {children}
        </Context.Provider>
      );
    };

    return { Context, Provider };
  }
;

export default createDataContext;