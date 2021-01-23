import React, { useEffect, useContext } from 'react';
import { Context as UsersContext } from '../../context/UsersContext';
import Switch from '../switch/Switch';
import { FcSettings, FcMoneyTransfer } from 'react-icons/fc';
import { FiDelete, FiCheckCircle, FiEdit, FiX } from 'react-icons/fi';
import Select from '../select/Select';
import ActionButton from '../action-button/ActionButton';

import './UserTable.scss';
import useInputState from '../../hooks/useInputState';

const statusCriteria = [
  { value: 'all-users', label: 'Todos los usuarios' },
  { value: 'active-users', label: 'Usuarios activos' },
  { value: 'inactive-users', label: 'Usuarios inactivos' },
];

const pricingCriteria = [
  { value: 'all-pricings', label: 'Todas las tarifas' },
  { value: 'monthly', label: 'Mensual' },
  { value: 'quarterly', label: 'Trimestral' },
];

export const UserTable = () => {
  const {
    edit,
    save,
    del,
    buildReport,
    state,
    changeNotifications,
    registerPayment,
  } = useContext(UsersContext);
  const [form, handleChange, reset, setForm] = useInputState({
    username: '',
    email: '',
    pricing: '',
  });

  useEffect(() => {
    buildReport();
  }, []);

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
    edit({});
    reset();
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
    save(updatedUser);
    edit({});
    reset();
  };

  const handleDelete = (id) => () => {
    del(id);
  };

  return (
    <>
      <div className="user-table__header">
        <div className="user-table__filters">
          <Select
            className="user-table__select"
            title={'Todos los usuarios'}
            options={statusCriteria}
          />
          <Select
            className="user-table__select"
            title={'Todas las tarifas'}
            options={pricingCriteria}
          />
        </div>
        <div className="user-table__config">
          <FcSettings size={30} />
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
                        onClick={() => registerPayment(user.id)}
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
                            onClick={handleDelete(user.id)}
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
    </>
  );
};

export default UserTable;

// <div className="container__table">
//   <div>
//     <div className="config__table">
//       <p className="config__title fade-in">
//         <FcAbout size={20} />
//         El preaviso está configurado a 5 días
//       </p>
//       <div className="config__icon" onClick={edit}>
//         <FcSettings size={25} />
//       </div>
//     </div>
//     <table className="styled-table">
//       <thead>
//         <tr>
//           <th>Tarifa expirada ❌</th>
//           <th>Nombre 👦</th>
//           <th>Correo 📬</th>
//           <th>Tipo de tarifa 💰</th>
//           <th>Fecha último pago 📅</th>
//           <th>Notificado 📢</th>
//           <th>Notificaciones activadas 🔉</th>
//         </tr>
//       </thead>
//       <tbody>
//         {state.users.map((user) => {
//           return (
//             <tr key={user.id}>
//               <td>{user.defaulter}</td>
//               <td>{user.username}</td>
//               <td>{user.email}</td>
//               <td>{user.subscription.pricing}</td>
//               <td>{user.subscription.lastPayment}</td>
//               <td>{user.subscription.isWarned}</td>
//               <td>
//                 {state.edit ? (
//                   <Switch
//                     active={
//                       user.config.sendWarnings === 'Si' ? true : false
//                     }
//                     onClick={() => handleChange(user)}
//                   />
//                 ) : (
//                   user.config.sendWarnings
//                 )}
//               </td>
//             </tr>
//           );
//         })}
//       </tbody>
//     </table>
//   </div>
// </div>
