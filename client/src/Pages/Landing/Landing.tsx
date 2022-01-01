import React, { useContext, useEffect } from 'react';
import Modal from "../../Shared/Components/Modal/Modal";
import Header from "./Header";
import useQueryParamModal from "../../Shared/Hooks/useQueryParamModal";
import Login from "../../Auth/Components/Login";
import Register from "../../Auth/Components/Register";
import { AuthContext } from "../../Auth/Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Landing = (): JSX.Element => {
  const login = useQueryParamModal('login');
  const register = useQueryParamModal('register');

  const { getToken } = useContext(AuthContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (getToken()) {
      navigate('/clients', { replace: true });
    }
  }, [ getToken, navigate ]);

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
      {register.isOpen() && (
        <Modal
          isOpen
          variant={'center'}
          width={500}
          withCloseIcon={false}
          onClose={register.close}
          renderContent={(modal) => (
            <Register/>
          )}
        />
      )}
    </div>
  )
}

export default Landing;