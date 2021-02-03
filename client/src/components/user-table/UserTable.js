import React, { useEffect, useContext, useState } from 'react';
import './UserTable.scss';
import { Context as UsersContext } from '../../context/UsersContext';
import { useToasts } from 'react-toast-notifications';
import { Animate } from 'react-simple-animate';

import Switch from '../switch/Switch';
import Select from '../select/Select';
import ActionButton from '../action-button/ActionButton';
import Modal from '../modal/Modal';

import { FcMoneyTransfer } from 'react-icons/fc';
import {
  FiDelete,
  FiCheckCircle,
  FiEdit,
  FiX,
  FiUserPlus,
} from 'react-icons/fi';

import useInputState from '../../hooks/useInputState';
import { selectData, modalData } from '../../data';
import { DEFAULTERS_SELECT, PRICING_SELECT } from '../../constants';

export const UserTable = () => {
  const {
    edit,
    save,
    del,
    buildReport,
    state,
    changeNotifications,
    registerPayment,
    resetToastState,
    filterReport,
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

  const [filters, setFilter] = useState([]);

  useEffect(() => {
    if (filters.length) {
      buildReport(filters);
      return;
    }
    buildReport();
  }, [filters]);

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
      callback: [() => save(updatedUser), () => edit({}), () => reset()],
      type: 'save',
    });
  };

  const handleDelete = (email) => () => {
    setModal({ state: true, callback: () => del(email), type: 'hardDelete' });
  };

  const closeModal = () => {
    setModal({ state: false, callback: undefined, type: '' });
  };

  const selectFilter = (type) => (event) => {
    setFilter((prevState) => {
      const state = [...prevState.filter((filter) => filter.field !== type)];
      return [
        ...state,
        { field: type, value: event.currentTarget.dataset.value },
      ];
    });
    // if (filters.length) {
    //   const nonRepeatedFilters = filters.filter(
    //     (filter) => filter.field !== type
    //   );
    //   if (
    //     event.currentTarget.dataset.value === 'all' &&
    //     nonRepeatedFilters.length
    //   ) {
    //     setFilter([...nonRepeatedFilters]);
    //     return;
    //   }
    //   if (event.currentTarget.dataset.value === 'all') {
    //     setFilter([]);
    //     buildReport();
    //     return;
    //   }
    //   setFilter([
    //     ...nonRepeatedFilters,
    //     { field: type, value: event.currentTarget.dataset.value },
    //   ]);
    //   return;
    // }

    // if (event.currentTarget.dataset.value === 'all') {
    //   buildReport();
    // }

    // setFilter([{ field: type, value: event.currentTarget.dataset.value }]);
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
      <div className="user-table__header">
        <div className="user-table__filters">
          <Select
            className="user-table__select"
            options={selectData.defaulters}
            handleChange={selectFilter(DEFAULTERS_SELECT)}
          />
          <Select
            className="user-table__select"
            options={selectData.pricings}
            handleChange={selectFilter(PRICING_SELECT)}
          />
        </div>
        <div className="user-table__config">
          <ActionButton>
            <FiUserPlus />
          </ActionButton>
        </div>
      </div>
      <div className="user-table__container">
        <table className="user-table__table">
          <thead className="user-table__table__header">
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Estado</th>
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
                <tr key={user.id}>
                  <td>
                    {user.id === state.editingUser.id ? (
                      <input
                        className="user-table__table__input"
                        name="username"
                        type="text"
                        value={form.username}
                        onChange={handleChange}
                      />
                    ) : (
                      user.username
                    )}
                  </td>
                  <td>
                    {user.id === state.editingUser.id ? (
                      <input
                        className="user-table__table__input"
                        name="email"
                        type="text"
                        value={form.email}
                        onChange={handleChange}
                      />
                    ) : (
                      user.email
                    )}
                  </td>
                  <td>Activo</td>
                  <td>
                    {user.id === state.editingUser.id ? (
                      <input
                        className="user-table__table__input"
                        name="pricing"
                        type="text"
                        value={form.pricing}
                        onChange={handleChange}
                      />
                    ) : (
                      user.subscription.pricing
                    )}
                  </td>
                  <td>{user.defaulter}</td>
                  <td>{user.subscription.lastPayment}</td>
                  <td>
                    <Switch
                      active={user.config.sendWarnings === 'Si' ? true : false}
                      onClick={() => updateNotifications(user)}
                    />
                  </td>
                  <td>
                    <ActionButton>
                      <FcMoneyTransfer
                        size="24px"
                        className="user-table__svg"
                        onClick={handleRegisterPayment(user.email)}
                      />
                    </ActionButton>
                  </td>
                  <td className="user-table__actions">
                    {user.id === state.editingUser.id ? (
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
                          <FiDelete
                            size="24px"
                            onClick={handleDelete(user.email)}
                          />
                        </ActionButton>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
