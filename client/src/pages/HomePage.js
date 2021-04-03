import React from 'react';
import './HomePage.scss';
import UserTable from '../components/user-table/UserTable';
import Modal from '../shared/components/Modal/Modal';
import CreateUser from '../project/CreateUser/CreateUser';
import useQueryParamModal from '../hooks/useQueryParamModal';
import Header from '../project/Header/Header';
import LeftMenu from '../project/LeftMenu/LeftMenu';

export default function HomePage() {
  const USER_CREATE = 'user-create';
  const userCreateModalHelpers = useQueryParamModal(USER_CREATE);

  return (
    <div className="page__container--main">
      <Header />
      <LeftMenu
        issueSearchModalOpen={userCreateModalHelpers.open}
        issueCreateModalOpen={userCreateModalHelpers.open}
      />
      <div className="wrapper">
        {userCreateModalHelpers.isOpen(USER_CREATE) && (
          <Modal
            isOpen
            width={800}
            withCloseIcon={false}
            onClose={userCreateModalHelpers.close}
            renderContent={(modal) => (
              <CreateUser
                modalClose={modal.close}
                onCreate={userCreateModalHelpers.close}
              />
            )}
          />
        )}
        <UserTable />
      </div>
    </div>
  );
}
