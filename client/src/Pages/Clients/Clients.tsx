import React, { useContext, useEffect } from 'react';
import { UsersContext } from "../../Users/Context/UsersContext";
import TableHeader from "../../Users/Components/Table/TableHeader";
import useToastError from "../../Shared/Hooks/useToastError";
import usePagination from "../../Shared/Hooks/usePagination";
import useFilters from "../../Shared/Hooks/useFilters";

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
    <div>
      <TableHeader addFilter={addFilter}/>
    </div>
  )
}

export default Clients;