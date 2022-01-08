import React, { useContext, useEffect } from 'react';
import { UsersContext } from "../../Users/Context/UsersContext";
import TableHeader from "../../Users/Components/Table/TableHeader";

const Clients = () => {
  const { fetchUsers } = useContext(UsersContext);

  useEffect(() => {
    (async () => {
      await fetchUsers({ page: 1, quantity: 20 });
    })()
  }, []);

  return (
    <TableHeader/>
  )
}

export default Clients;