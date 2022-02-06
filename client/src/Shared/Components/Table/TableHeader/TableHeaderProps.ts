import { FunctionInfer } from "../../../types";
import { UsersActionProps } from "../../../../Users/Action/UsersActionProps";

export interface TableHeaderProps {
  addFilter: FunctionInfer<UsersActionProps['addFilter']>
}