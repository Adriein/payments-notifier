import React, { useContext, useEffect } from 'react';
import { UsersContext } from "../../Users/Context/UsersContext";
import useToastError from "../../Shared/Hooks/useToastError";
import usePagination from "../../Shared/Hooks/usePagination";
import Table from "../../Users/Components/Table";
import { User } from "../../Users/types";

const Clients = () => {
  const { state, fetchUsers, addFilter } = useContext(UsersContext);
  const { notify } = useToastError('login');

  console.log(state)
  
  const { pagination, setPage } = usePagination({ total: state.totalUsers });

  useEffect(() => {
    fetchUsers({ ...pagination, filters: state.filters })
      .catch(error => notify(error));
  }, [ state.filters, pagination ]);

  return (
    <Table>
      <Table.Header addFilter={addFilter}/>
      <Table.Body
        collection={state.users}
        renderRow={(user: User) => <p key={user.id}>{user.username}</p>}
      />
      <Table.Footer
        totalItems={state.totalUsers}
        itemPerPage={pagination.quantity}
        currentPage={pagination.page}
        setPage={setPage}
      />
    </Table>
  )
}

export default Clients;