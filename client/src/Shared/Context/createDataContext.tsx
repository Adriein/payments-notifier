import React, { useReducer, createContext, Reducer } from 'react';
import { AuthStateProps } from "../../Auth/Context/AuthStateProps";

const createDataContext = (
  reducer: Reducer<any, any>,
  actions: any,
  defaultValue: any
) => {
  const Context = createContext(defaultValue);

  const Provider = ({ children }: any) => {
    const [ state, dispatch ] = useReducer<Reducer<AuthStateProps, any>>(reducer, defaultValue);

    const boundActions: { [key: string]: Function } = {};

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
};


export default createDataContext;