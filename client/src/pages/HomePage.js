import React, { useContext } from 'react';
import './HomePage.scss';
import UserTable from '../components/user-table/UserTable';
import Modal from '../shared/components/Modal/Modal';
import CreateUser from '../project/CreateUser/CreateUser';
import EditUser from '../project/EditUser/EditUser';
import useQueryParamModal from '../hooks/useQueryParamModal';
import Header from '../project/Header/Header';
import LeftMenu from '../project/LeftMenu/LeftMenu';
import AppConfig from '../project/AppConfig/AppConfig';
import CreatePricing from '../project/CreatePricing/CreatePricing';
import { Context as AuthContext } from '../context/AuthContext';
import Account from '../project/Account/Account';

export default function HomePage() {
  const { logout } = useContext(AuthContext);

  const USER_CREATE = 'user-create';
  const USER_EDIT = 'user-edit';
  const CONFIG_APP = 'app-config';
  const PRICING_CREATE = 'pricing-create';
  const ACCOUNT = 'account';

  const userCreateModalHelpers = useQueryParamModal(USER_CREATE);
  const userEditModalHelpers = useQueryParamModal(USER_EDIT);
  const configAppModalHelpers = useQueryParamModal(CONFIG_APP);
  const pricingCreateAppModalHelpers = useQueryParamModal(PRICING_CREATE);
  const accountModalHelpers = useQueryParamModal(ACCOUNT);

  return (
    <div className="page__container--main">
      <Header />
      <LeftMenu
        configAppModalOpen={configAppModalHelpers.open}
        userCreateModalOpen={userCreateModalHelpers.open}
        pricingCreateModalOpen={pricingCreateAppModalHelpers.open}
        accountModalOpen={accountModalHelpers.open}
        logout={logout}
      />
      <div className="wrapper">
        {userCreateModalHelpers.isOpen() && (
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
        {userEditModalHelpers.isOpen() && (
          <Modal
            isOpen
            width={800}
            withCloseIcon={false}
            onClose={userEditModalHelpers.close}
            renderContent={(modal) => (
              <EditUser
                modalClose={modal.close}
                onCreate={userEditModalHelpers.close}
              />
            )}
          />
        )}
        {configAppModalHelpers.isOpen() && (
          <Modal
            isOpen
            width={800}
            withCloseIcon={false}
            onClose={configAppModalHelpers.close}
            renderContent={(modal) => (
              <AppConfig
                modalClose={modal.close}
                onCreate={configAppModalHelpers.close}
              />
            )}
          />
        )}
        {pricingCreateAppModalHelpers.isOpen() && (
          <Modal
            isOpen
            width={800}
            withCloseIcon={false}
            onClose={pricingCreateAppModalHelpers.close}
            renderContent={(modal) => (
              <CreatePricing
                modalClose={modal.close}
                onCreate={pricingCreateAppModalHelpers.close}
              />
            )}
          />
        )}
        {accountModalHelpers.isOpen() && (
          <Modal
            isOpen
            width={800}
            withCloseIcon={false}
            onClose={accountModalHelpers.close}
            renderContent={(modal) => (
              <Account
                modalClose={modal.close}
                onCreate={accountModalHelpers.close}
              />
            )}
          />
        )}
        <UserTable edit={userEditModalHelpers.open}/>
      </div>
    </div>
  );
}
