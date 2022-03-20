import React, { useState } from 'react';
import useQueryParamModal from "../../Shared/Hooks/useQueryParamModal";
import Modal from "../../Shared/Components/Modal/Modal";
import UserTable from "../../Users/Components/Table";
import Profile from "../../Users/Components/Profile";

const Clients = () => {
  const { open, isOpen, close } = useQueryParamModal('profile');
  const [ selectedClient, setSelectedClient ] = useState<string>('');

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
            <Profile id={selectedClient}/>
          )}
        />
      )}
      <UserTable openProfileModal={open} isModalOpen={isOpen} selectUser={setSelectedClient}/>
    </>
  )
}

export default Clients;