import React, { useReducer, createContext, Reducer } from 'react';
import { BaseDataContext, MappedActions } from "../types";
import { useTranslation } from "react-i18next";
import useToast from "../Hooks/useToast";

const createDataContext = <State extends unknown, Action extends { [key: string]: any }>(
    reducer: Reducer<State, any>,
    actions: Action,
    defaultValue: State
  ) => {
    const Context = createContext<BaseDataContext<State, Action>>(undefined!);

    const Provider = ({ children }: any) => {
      const [ state, dispatch ] = useReducer<Reducer<State, any>>(reducer, defaultValue);

      const { t } = useTranslation([ 'landing', 'login', 'register', 'profile', 'clients', 'common' ]);
      const { notify } = useToast();

      const boundActions: { [key: string]: any } = {};

      for (let key in actions) {
        boundActions[key] = actions[key](dispatch) as MappedActions<Action>;
      }
      const actionsWithDispatch = { ...boundActions } as MappedActions<Action>

      return (
        <Context.Provider value={{ state, t, notify, ...actionsWithDispatch }}>
          {children}
        </Context.Provider>
      );
    };

    return { Context, Provider };
  }
;

export default createDataContext;