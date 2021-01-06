import React, { useEffect, useContext } from 'react';

import { Context as UsersContext } from '../../context/UsersContext';

import './UserTable.css';

export const UserTable = () => {
  const { buildReport, state } = useContext(UsersContext);
  useEffect(() => {
    buildReport();
  }, []);

  console.log(state);

  return (
    <div className="container__table">
      <div>
        <div className="config__table">
          <p>⚙️</p>
        </div>
        <table className="styled-table">
          <thead>
            <tr>
              <th>Tarifa expirada ❌</th>
              <th>Nombre 👦</th>
              <th>Correo 📬</th>
              <th>Tipo de tarifa 💰</th>
              <th>Fecha último pago 📅</th>
              <th>Notificado 📢</th>
            </tr>
          </thead>
          <tbody>
            {state.users.map((user) => {
              return (
                <tr>
                  <td>{user.defaulter}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.subscription.pricing}</td>
                  <td>{user.subscription.lastPayment}</td>
                  <td>{user.subscription.isNotified}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* <div className="styled-footer">
        <p>Este es un correo automático de @IvanMFit</p>
      </div> */}
    </div>
  );
};
