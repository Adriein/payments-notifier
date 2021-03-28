import React from 'react';
import './HomePage.scss';
import NavBar from '../components/nav-bar/NavBar';
import UserTable from '../components/user-table/UserTable';
import Modal from '../shared/components/Modal/Modal';
import CreateUser from '../project/CreateUser/CreateUser';
import useQueryParamModal from '../hooks/useQueryParamModal';

export default function HomePage() {
  const USER_CREATE = 'user-create'
  const userCreateModalHelpers = useQueryParamModal();

  return (
    <div className="page__container--main">
      <NavBar />
      <div className="wrapper">
        {userCreateModalHelpers.isOpen(USER_CREATE) && (
          <Modal
            isOpen
            width={800}
            withCloseIcon={false}
            onClose={() => userCreateModalHelpers.close(USER_CREATE)}
            renderContent={() => <CreateUser />}
          />
        )}
        <UserTable />
      </div>
    </div>
  );
}
