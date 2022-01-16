import createDataContext from "../../Shared/Context/createDataContext";
import { UserStateProps } from "./UserStateProps";
import { usersReducer } from "./usersReducer";
import { UsersActionProps } from "../Action/UsersActionProps";
import { fetchUsers } from '../Action/FetchUsers/fetchUsers';
import { addFilter } from "../../Shared/Action/Filter/addFilter";

export const {
  Provider: UsersProvider,
  Context: UsersContext
} = createDataContext<UserStateProps, UsersActionProps>(
  usersReducer,
  { fetchUsers, addFilter },
  { users: [], isLoading: false, filters: [] }
);