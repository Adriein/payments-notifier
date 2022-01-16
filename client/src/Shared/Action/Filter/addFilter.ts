import { Dispatch } from "react";
import { ActionProps } from "../ActionProps";
import { ADD_FILTER_ACTION } from "../../constants";
import { FilterProps } from "./FilterProps";

export const addFilter = (dispatch: Dispatch<ActionProps<FilterProps>>) => {
  return (filter: FilterProps): void => {
    dispatch({ type: ADD_FILTER_ACTION, payload: filter });
  };
};