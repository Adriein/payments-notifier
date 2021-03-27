import React, { useContext } from 'react';
import './HomePage.scss';
import { Context as UsersContext } from '../context/UsersContext';
import NavBar from '../components/nav-bar/NavBar';
import UserTable from '../components/user-table/UserTable';
import UserForm from '../components/user-form/UserForm';
import Modal from '../shared/components/Modal/Modal';
import { useHistory } from "react-router-dom";

export default function HomePage() {
  const { state } = useContext(UsersContext);
  const history = useHistory();
  return (
    <div className="page__container--main">
      <NavBar />
      <div className="wrapper">
        {state.createUser.status === 'create' ? (
          <Modal
            isOpen
            testid="modal:issue-create"
            width={800}
            withCloseIcon={false}
            onClose={() => history.push("/home")}
            renderContent={() => <UserForm />}
          />
        ) : (
          <UserTable />
        )}
      </div>
    </div>
  );
}
