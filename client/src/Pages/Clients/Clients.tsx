import React, { useContext, useEffect } from 'react';
import { UsersContext } from "../../Users/Context/UsersContext";
import useToastError from "../../Shared/Hooks/useToastError";
import usePagination from "../../Shared/Hooks/usePagination";
import Table from "../../Users/Components/Table";
import { User } from "../../Users/types";

const Clients = () => {
  const { state, fetchUsers, addFilter } = useContext(UsersContext);
  const { notify } = useToastError('login');
  const { pagination } = usePagination();
  console.log(state)

  useEffect(() => {
    fetchUsers({ ...pagination, filters: state.filters })
      .catch(error => notify(error));
  }, [ state.filters ]);

  return (
    <Table addFilter={addFilter} collection={state.users} pagination={pagination}>
      {state.users.map((user: User) => <p>{user.username}</p>)}
    </Table>
  )
}

export default Clients;