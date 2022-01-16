import { Dispatch } from "react";
import { ActionProps } from "../ActionProps";
import { ADD_FILTER_ACTION } from "../../../Users/constants";
import { Filter } from "../../../Users/types";
import { AddFilterActionProps } from "./AddFilterActionProps";


export const addFilter = (dispatch: Dispatch<ActionProps<Filter[]>>) => {
  return ({ filter }: AddFilterActionProps): void => {
    dispatch({ type: ADD_FILTER_ACTION, payload: [ filter ] });
  };
};