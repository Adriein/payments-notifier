import React from 'react';

import './UserTable.css';

export const UserTable = () => {
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
            <tr>
              <td>No</td>
              <td>Adri</td>
              <td>adria.claret@gmail.com</td>
              <td>mensual</td>
              <td>08/12/2020</td>
              <td>No</td>
            </tr>
            <tr>
              <td>No</td>
              <td>Adri</td>
              <td>adria.claret@gmail.com</td>
              <td>mensual</td>
              <td>08/12/2020</td>
              <td>No</td>
            </tr>
            <tr>
              <td>No</td>
              <td>Adri</td>
              <td>adria.claret@gmail.com</td>
              <td>mensual</td>
              <td>08/12/2020</td>
              <td>No</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="styled-footer">
        <p>Este es un correo automático de @IvanMFit</p>
      </div>
    </div>
  );
};
