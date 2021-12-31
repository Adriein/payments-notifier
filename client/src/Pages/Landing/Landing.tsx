import React from 'react';
import Modal from "../../Shared/Components/Modal/Modal";
import Header from "./Header";
import useQueryParamModal from "../../Shared/Hooks/useQueryParamModal";
import Login from "../../Auth/Components/Login";

const Landing = (): JSX.Element => {
  const login = useQueryParamModal('login');

  return (
    <div>
      <Header onClick={login.open}/>
      {login.isOpen() && (
        <Modal
          isOpen
          variant={'center'}
          width={500}
          withCloseIcon={false}
          onClose={login.close}
          renderContent={(modal) => (
            <Login onSubmit={modal.close}/>
          )}
        />
      )}
    </div>
  )
}

export default Landing;