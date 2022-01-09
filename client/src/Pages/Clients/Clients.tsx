import React, { useContext, useEffect } from 'react';
import { UsersContext } from "../../Users/Context/UsersContext";
import TableHeader from "../../Users/Components/Table/TableHeader";
import useToastError from "../../Shared/Hooks/useToastError";
import usePagination from "../../Shared/Hooks/usePagination";
import useFilters from "../../Shared/Hooks/useFilters";
import { UserTableFilter } from "../../Users/Action/FetchUsers/FetchUsersActionProps";

const Clients = () => {
  const { state, fetchUsers } = useContext(UsersContext);
  const { notify } = useToastError('login');
  const { pagination } = usePagination();
  const { filters, setFilter, removeFilter } = useFilters<UserTableFilter>();

  useEffect(() => {
    (async () => {
      try {
        await fetchUsers({ ...pagination });
      } catch (error: unknown) {
        notify(error)
      }
    })();
  }, []);

  return (
    <div>
      <TableHeader/>
    </div>
  )
}

export default Clients;