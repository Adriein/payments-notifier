import React, { useContext } from 'react';
import { Context as UsersContext } from '../../../context/UsersContext';
import { Context as ModalContext } from '../../../context/ModalContext';

import { FcMoneyTransfer } from 'react-icons/fc';
import { FiDelete, FiEdit } from 'react-icons/fi';

import Switch from '../../switch/Switch';
import ActionButton from '../../action-button/ActionButton';

export const Actions = ({ user, openEditmodal }) => {
  const {
    edit,
    del,
    changeNotifications,
    registerPayment,
  } = useContext(UsersContext);

  const { paymentModal, deleteModal } = useContext(ModalContext);

  const updateNotifications = (user) => {
    const updatedUser = Object.assign({}, user, {
      config: {
        ...user.config,
        sendWarnings: user.config.sendWarnings === 'Si' ? 'No' : 'Si',
      },
    });
    changeNotifications(updatedUser);
  };

  const handleRegisterPayment = (email) => () => {
    paymentModal(() => registerPayment(email));
  };

  const handleEditUser = (user) => () => {
    openEditmodal();
    edit(user);
  };

  const handleDelete = (email) => () => {
    deleteModal(() => del(email));
  };

  return (
    <>
      <td>
        <Switch
          active={user.config.sendWarnings === 'Si' ? true : false}
          onClick={() => updateNotifications(user)}
        />
      </td>
      <td>
        <ActionButton className="user-table__payment-row">
          <FcMoneyTransfer
            size="24px"
            onClick={handleRegisterPayment(user.email)}
          />
        </ActionButton>
      </td>
      <td className="user-table__actions">
        <ActionButton className="user-table__edit-row">
          <FiEdit size="24px" onClick={handleEditUser(user)} />
        </ActionButton>
        <ActionButton className="user-table__delete-row">
          <FiDelete size="24px" onClick={handleDelete(user.email)} />
        </ActionButton>
      </td>
    </>
  );
};
