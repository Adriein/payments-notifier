import React, { useContext, useEffect } from 'react';
import { UsersContext } from "../../Users/Context/UsersContext";
import useToastError from "../../Shared/Hooks/useToastError";
import usePagination from "../../Shared/Hooks/usePagination";
import Table from "../../Users/Components/Table";
import { User } from "../../Users/types";
import Avatar from "../../Shared/Components/Avatar";
import { StyledTableCell, StyledTableRow } from "../../Users/Components/Table/TableBody/Styles";
import { FiArrowRight } from "react-icons/fi";

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
              <StyledTableCell>
                <Avatar name={user.username} size={25}/>
                {user.username}
              </StyledTableCell>
              <StyledTableCell>
                {user.subscription.pricing.name}
              </StyledTableCell>
              <StyledTableCell>
                {user.config.sendWarnings ? 'true' : 'false'}
              </StyledTableCell>
              <StyledTableCell>
                {user.subscription.lastPayment}
                <FiArrowRight/>
                {user.subscription.validTo}
              </StyledTableCell>
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