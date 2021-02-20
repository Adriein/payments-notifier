import React, { useEffect, useContext, useState } from 'react';
import './UserTable.scss';
import { Context as UsersContext } from '../../context/UsersContext';
import { useToasts } from 'react-toast-notifications';
import { Animate } from 'react-simple-animate';
import Switch from '../switch/Switch';
import ActionButton from '../action-button/ActionButton';
import Modal from '../modal/Modal';

import { FcMoneyTransfer } from 'react-icons/fc';
import { FiDelete, FiCheckCircle, FiEdit, FiX } from 'react-icons/fi';

import useInputState from '../../hooks/useInputState';
import { modalData } from '../../data';
import { TableHeaderFilters } from './header/TableHeaderFilters';

export const UserTable = () => {
  const {
    create,
    edit,
    save,
    del,
    state,
    changeNotifications,
    registerPayment,
    resetToastState,
  } = useContext(UsersContext);

  const { addToast } = useToasts();

  const [form, handleChange, reset, setForm] = useInputState({
    username: '',
    email: '',
    pricing: '',
  });

  const [modal, setModal] = useState({
    state: false,
    type: '',
    callback: undefined,
  });

  useEffect(() => {
    if (state.success) {
      addToast(state.success, { appearance: 'success' });
      resetToastState();
    }
    if (state.error) {
      addToast(state.error, { appearance: 'error' });
      resetToastState();
    }
  }, [state.success, state.error]);

  
  const handleCancelEdit = () => {
    edit();
    reset();
  };

  const handleRegisterPayment = (email) => () => {
    setModal({
      state: true,
      callback: () => registerPayment(email),
      type: 'payment',
    });
  };

  const handleEditUser = (user) => () => {
    edit(user);
    setForm({
      username: user.username,
      email: user.email,
      pricing: user.subscription.pricing,
    });
  };

  const handleSaveUser = () => {
    const updatedUser = Object.assign({}, state.editingUser, {
      username: form.username,
      email: form.email,
      subscription: { pricing: form.pricing },
    });
    setModal({
      state: true,
      callback: [() => save(updatedUser), () => edit(), () => reset()],
      type: 'save',
    });
  };

  const handleDelete = (email) => () => {
    setModal({ state: true, callback: () => del(email), type: 'hardDelete' });
  };

  const closeModal = () => {
    setModal({ state: false, callback: undefined, type: '' });
  };

  const handleEditPricing = (option) => {
    setForm({
      username: form.username,
      email: form.email,
      pricing: option.value,
    });
  };

  return (
    <div className="users__widget">
      <Animate play={modal.state} start={{ opacity: 0 }} end={{ opacity: 1 }}>
        {modal.state && (
          <Modal
            title={modalData[modal.type].title}
            type={modalData[modal.type].colors}
            message={modalData[modal.type].message}
            icon={modalData[modal.type].icon}
            handleClose={closeModal}
            callback={modal.callback}
          />
        )}
      </Animate>
      <TableHeaderFilters />
      <div className="user-table__container">
        <table className="user-table__table">
          <thead className="user-table__table__header">
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Tipo de tarifa</th>
              <th>Tarifa expirada</th>
              <th>Fecha último pago</th>
              <th>Notificaciones</th>
              <th>Registrar pago</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {state.users.map((user) => {
              return (
                <div>eeee</div>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
