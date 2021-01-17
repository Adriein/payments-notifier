import React, { useEffect, useContext } from 'react';
import { Context as UsersContext } from '../../context/UsersContext';
import Switch from '../switch/Switch';
import { FcSettings, FcMoneyTransfer } from 'react-icons/fc';
import { FiDelete } from 'react-icons/fi';
import Select from '../select/Select';

import './UserTable.scss';

const statusOptions = [
  { value: 'all', label: 'Todos los usuarios' },
  { value: 'active', label: 'Usuarios activos' },
  { value: 'inactive', label: 'Usuarios inactivos' },
];

export const UserTable = () => {
  const { settings, buildReport, state, changeNotifications } = useContext(
    UsersContext
  );
  useEffect(() => {
    buildReport();
  }, []);

  const handleChange = (user) => {
    const updatedUser = Object.assign({}, user, {
      config: {
        ...user.config,
        sendWarnings: user.config.sendWarnings === 'Si' ? 'No' : 'Si',
      },
    });
    changeNotifications(updatedUser);
  };

  return (
    <>
      <div className="user-table__header">
        <div className="user-table__filters">
          <Select
            className="user-table__select"
            title={'Todos los usuarios'}
            options={statusOptions}
          />
          <Select
            className="user-table__select"
            title={'Todas las tarifas'}
            options={statusOptions}
          />
          <Select
            className="user-table__select"
            title={'Todas las notificaciones'}
            options={statusOptions}
          />
        </div>
        <div className="user-table__config" onClick={settings}>
          <FcSettings size={30} />
        </div>
      </div>
      <div className="user-table__container">
        <ul className="user-table__table">
          <li className="user-table__table__header">
            <p>Nombre</p>
            <p>Email</p>
            <p>Estado</p>
            <p>Tipo de tarifa</p>
            <p>Tarifa expirada</p>
            <p>Fecha último pago</p>
            <p>Notificaciones</p>
            <p>Registrar pago</p>
          </li>
          {state.users.map((user) => {
            return (
              <li key={user.id}>
                <p>{user.username}</p>
                <p>{user.email}</p>
                <p>Activo</p>
                <p>{user.subscription.pricing}</p>
                <p>{user.defaulter}</p>
                <p>{user.subscription.lastPayment}</p>
                <p>
                  <Switch
                    active={user.config.sendWarnings === 'Si' ? true : false}
                    onClick={() => handleChange(user)}
                  />
                </p>
                <p>
                  <FcMoneyTransfer
                    size="24px"
                    className="user-table__table__payment"
                  />
                </p>
                <p className="user-table__delete-row">
                  <FiDelete size="24px" />
                </p>
              </li>
            );
          })}
        </ul>
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
//       <div className="config__icon" onClick={settings}>
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
//                 {state.settings ? (
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
