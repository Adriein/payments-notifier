import React, { useContext, useEffect } from 'react';
import { UsersContext } from "../../Users/Context/UsersContext";
import useToastError from "../../Shared/Hooks/useToastError";
import usePagination from "../../Shared/Hooks/usePagination";
import Table from "../../Users/Components/Table";
import { User } from "../../Users/types";
import Avatar from "../../Shared/Components/Avatar";
import { StyledTableRow } from "../../Users/Components/Table/TableBody/Styles";

const Clients = () => {
  const { state, fetchUsers, addFilter } = useContext(UsersContext);
  const { notify } = useToastError('login');
  const { pagination, setPage } = usePagination({ total: state.totalUsers });

  useEffect(() => {
    fetchUsers({ ...pagination, filters: state.filters })
      .catch(error => notify(error));
  }, [ state.filters, pagination ]);

  return (
    <Table>
      <Table.Header
        addFilter={addFilter}
      />
      <Table.Body
        collection={state.users}
        renderRow={(user: User, index: number) => {
          const isLast = index === state.users.length - 1
          return (
            <StyledTableRow key={user.id} isLast={isLast}>
              <Avatar name={user.username} size={25}/>
              {user.username}
              {user.subscription.lastPayment}
            </StyledTableRow>
          );
        }}
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