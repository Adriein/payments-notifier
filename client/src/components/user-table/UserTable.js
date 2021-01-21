import React, { useEffect, useContext } from 'react';
import { Context as UsersContext } from '../../context/UsersContext';
import Switch from '../Switch/Switch';
import { FcSettings, FcMoneyTransfer } from 'react-icons/fc';
import { FiDelete } from 'react-icons/fi';
import Select from '../select/Select';

import './UserTable.scss';

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
            options={statusCriteria}
          />
          <Select
            className="user-table__select"
            title={'Todas las tarifas'}
            options={pricingCriteria}
          />
        </div>
        <div className="user-table__config" onClick={settings}>
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
            </tr>
          </thead>
          <tbody>
            {state.users.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>Activo</td>
                  <td>{user.subscription.pricing}</td>
                  <td>{user.defaulter}</td>
                  <td>{user.subscription.lastPayment}</td>
                  <td>
                    <Switch
                      active={user.config.sendWarnings === 'Si' ? true : false}
                      onClick={() => handleChange(user)}
                    />
                  </td>
                  <td>
                    <div className="user-table__button--payment">
                      <FcMoneyTransfer
                        size="24px"
                        className="user-table__svg"
                      />
                    </div>
                  </td>
                  <td>
                    <div className="user-table__delete-row">
                      <FiDelete size="24px" />
                    </div>
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
