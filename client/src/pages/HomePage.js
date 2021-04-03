import React from 'react';
import './HomePage.scss';
import UserTable from '../components/user-table/UserTable';
import Modal from '../shared/components/Modal/Modal';
import CreateUser from '../project/CreateUser/CreateUser';
import useQueryParamModal from '../hooks/useQueryParamModal';
import Header from '../project/Header/Header';
import LeftMenu from '../project/LeftMenu/LeftMenu';
import AppConfig from '../project/AppConfig/AppConfig';
import CreatePricing from '../project/CreatePricing/CreatePricing';

export default function HomePage() {
  const USER_CREATE = 'user-create';
  const CONFIG_APP = 'app-config';
  const PRICING_CREATE = 'pricing-create';

  const userCreateModalHelpers = useQueryParamModal(USER_CREATE);
  const configAppModalHelpers = useQueryParamModal(CONFIG_APP);
  const pricingCreateAppModalHelpers = useQueryParamModal(PRICING_CREATE);

  return (
    <div className="page__container--main">
      <Header />
      <LeftMenu
        configAppModalOpen={configAppModalHelpers.open}
        userCreateModalOpen={userCreateModalHelpers.open}
        pricingCreateModalOpen={pricingCreateAppModalHelpers.open}
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
        <UserTable />
      </div>
    </div>
  );
}
