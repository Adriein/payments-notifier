import React, { useEffect, useContext } from 'react';
import { Context as UsersContext } from '../../context/UsersContext';
import Switch from '../switch/Switch';
import { FcSettings, FcAbout } from 'react-icons/fc';

import './UserTable.css';

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
    <div className="container__table">
      <div>
        <div className="config__table">
          <p className="config__title fade-in">
            <FcAbout size={20} />
            El preaviso está configurado a 5 días
          </p>
          <div className="config__icon" onClick={settings}>
            <FcSettings size={25} />
          </div>
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
              <th>Notificaciones activadas 🔉</th>
            </tr>
          </thead>
          <tbody>
            {state.users.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.defaulter}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.subscription.pricing}</td>
                  <td>{user.subscription.lastPayment}</td>
                  <td>{user.subscription.isWarned}</td>
                  <td>
                    {state.settings ? (
                      <Switch
                        active={
                          user.config.sendWarnings === 'Si' ? true : false
                        }
                        onClick={() => handleChange(user)}
                      />
                    ) : (
                      user.config.sendWarnings
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
