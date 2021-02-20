import React from 'react';
import { Actions } from '../actions/Actions';

export const EditableRow = ({user}) => {
  return (
    <tr key={user.id}>
      <td>
        <input
          className="user-table__table__input"
          name="username"
          type="text"
          value={form.username}
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          className="user-table__table__input"
          name="email"
          type="text"
          value={form.email}
          onChange={handleChange}
        />
      </td>
      <td>
        <span>mensual</span>
      </td>
      <td>{user.defaulter}</td>
      <td>{user.subscription.lastPayment}</td>
      <Actions editing/>
    </tr>
  );
};
