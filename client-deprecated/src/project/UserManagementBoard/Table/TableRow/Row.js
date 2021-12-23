import React from 'react';
import Button from '../../../../shared/components/Button/Button';

const Row = ({ user }) => {
  return (
    <tr key={user.id}>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>{Object.keys(user.subscription.pricing)[0]}</td>
      <td>{user.defaulter}</td>
      <td>{user.subscription.lastPayment}</td>
      <td>
        <Button type="submit" variant="primary">
          Activar notificaciones
        </Button>
      </td>
      <td>
        <Button type="submit" variant="primary">
          Registrar pago
        </Button>
      </td>
      <td>
        <Button type="submit" variant="primary">
          Editar
        </Button>
        <Button type="submit" variant="primary">
          Borrar
        </Button>
      </td>
    </tr>
  );
};

export default Row;
