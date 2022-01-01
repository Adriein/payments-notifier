import React, { useContext, useEffect } from 'react';
import { UsersContext } from "../../Users/Context/UsersContext";

const Clients = () => {
  const { fetchUsers } = useContext(UsersContext);

  useEffect(() => {
    (async () => {
      await fetchUsers();
    })()
  }, []);

  return <div>clients</div>
}

export default Clients;