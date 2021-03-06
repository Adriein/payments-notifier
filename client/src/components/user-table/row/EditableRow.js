import React from 'react';
import useInputState from '../../../hooks/useInputState';
import Select from '../../select/Select';
import { Actions } from '../actions/Actions';

export const EditableRow = ({ user }) => {
  const [form, handleChange, reset, setForm] = useInputState({
    username: user.username,
    email: user.email,
    pricing: Object.keys(user.subscription.pricing)[0],
    lastPaymentDate: user.subscription.lastPayment,
  });

  const handleEditPricing = (option) => {
    setForm({
      username: form.username,
      email: form.email,
      pricing: option.value,
      lastPaymentDate: form.lastPaymentDate,
    });
  };
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
        <Select
          style={{ width: '160px' }}
          url="/appConfig"
          handleChange={handleEditPricing}
        />
      </td>
      <td>{user.defaulter}</td>
      <td>
        <input
          className="user-table__table__input"
          name="lastPaymentDate"
          type="text"
          value={form.lastPaymentDate}
          onChange={handleChange}
        />
      </td>
      <Actions
        form={form}
        reset={reset}
        setForm={setForm}
        user={user}
        editing
      />
    </tr>
  );
};
