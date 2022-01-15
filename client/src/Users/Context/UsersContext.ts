import createDataContext from "../../Shared/Context/createDataContext";
import { UserStateProps } from "./UserStateProps";
import { usersReducer } from "./usersReducer";
import { UsersActionProps } from "../Action/UsersActionProps";
import { fetchUsers } from '../Action/FetchUsers/fetchUsers';

export const {
  Provider: UsersProvider,
  Context: UsersContext
} = createDataContext<UserStateProps, UsersActionProps>(
  usersReducer,
  { fetchUsers },
  { users: [], isLoading: false, filters: [] }
);