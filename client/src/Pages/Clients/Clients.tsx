import React, { useContext, useEffect, useState } from 'react';
import useQueryParamModal from "../../Shared/Hooks/useQueryParamModal";
import Modal from "../../Shared/Components/Modal/Modal";
import UserTable from "../../Users/Components/UserTable";
import UserProfile from "../../Users/Components/UserProfile";
import { User } from "../../Users/types";

const Clients = () => {
  const { open, isOpen, close } = useQueryParamModal('profile');
  const [ selected, setSelected ] = useState<User>();

  return (
    <>
      {isOpen() && (
        <Modal
          isOpen
          variant={'center'}
          width={1000}
          withCloseIcon={false}
          onClose={close}
          renderContent={(modal) => (
            <UserProfile user={selected}/>
          )}
        />
      )}
      <UserTable openProfileModal={open} selectUser={setSelected}/>
    </>
  )
}

export default Clients;