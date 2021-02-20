import React from 'react';
import { Actions } from '../actions/Actions';

export const TableRow = ({user}) => {
  return (
    <tr key={user.id}>
      <td>user.username</td>
      <td>user.email</td>
      <td>Object.keys(user.subscription.pricing)[0]</td>
      <td>{user.defaulter}</td>
      <td>{user.subscription.lastPayment}</td>
      <Actions />
    </tr>
  );
};
