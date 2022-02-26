import createDataContext from "../../Shared/Context/createDataContext";
import { UserStateProps } from "./UserStateProps";
import { usersReducer } from "./usersReducer";
import { UsersActionProps } from "../Action/UsersActionProps";
import { fetchClientList } from '../Action/FetchClientList/fetchClientList';
import { addFilter } from "../../Shared/Action/Filter/addFilter";

export const {
  Provider: UsersProvider,
  Context: UsersContext
} = createDataContext<UserStateProps, UsersActionProps>(
  usersReducer,
  { fetchClientList: fetchClientList, addFilter },
  { clientList: [], isLoading: false, filters: [], totalUsers: 0 }
);