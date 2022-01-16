import { FunctionInfer } from "../../../../Shared/types";
import { UsersActionProps } from "../../../Action/UsersActionProps";

export interface TableHeaderProps {
  addFilter: FunctionInfer<UsersActionProps['addFilter']>
}