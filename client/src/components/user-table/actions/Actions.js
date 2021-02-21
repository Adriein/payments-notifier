import React, { useContext } from 'react';
import { Context as UsersContext } from '../../../context/UsersContext';
import { Context as ModalContext } from '../../../context/ModalContext';

import { FcMoneyTransfer } from 'react-icons/fc';
import { FiDelete, FiCheckCircle, FiEdit, FiX } from 'react-icons/fi';

import Switch from '../../switch/Switch';
import ActionButton from '../../action-button/ActionButton';

export const Actions = ({ user, form, setForm, reset, editing = false }) => {
  const {
    edit,
    save,
    del,
    state,
    changeNotifications,
    registerPayment,
  } = useContext(UsersContext);

  const { saveModal, paymentModal, deleteModal } = useContext(ModalContext);

  const updateNotifications = (user) => {
    const updatedUser = Object.assign({}, user, {
      config: {
        ...user.config,
        sendWarnings: user.config.sendWarnings === 'Si' ? 'No' : 'Si',
      },
    });
    changeNotifications(updatedUser);
  };

  const handleCancelEdit = () => {
    edit();
    reset();
  };

  const handleRegisterPayment = (email) => () => {
    paymentModal(() => registerPayment(email));
  };

  const handleEditUser = (user) => () => {
    edit(user);
    
    // setForm({
    //   username: user.username,
    //   email: user.email,
    //   pricing: user.subscription.pricing,
    // });
  };

  const handleSaveUser = () => {
    const updatedUser = Object.assign({}, state.editingUser, {
      username: form.username,
      email: form.email,
      subscription: { pricing: form.pricing },
    });

    saveModal([() => save(updatedUser), () => edit(), () => reset()]);
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
        {editing ? (
          <>
            <ActionButton className="user-table__save-row">
              <FiCheckCircle size="24px" onClick={handleSaveUser} />
            </ActionButton>
            <ActionButton className="user-table__delete-row">
              <FiX size="24px" onClick={handleCancelEdit} />
            </ActionButton>
          </>
        ) : (
          <>
            <ActionButton className="user-table__edit-row">
              <FiEdit size="24px" onClick={handleEditUser(user)} />
            </ActionButton>
            <ActionButton className="user-table__delete-row">
              <FiDelete size="24px" onClick={handleDelete(user.email)} />
            </ActionButton>
          </>
        )}
      </td>
    </>
  );
};
