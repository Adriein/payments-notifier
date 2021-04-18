import React, { useContext } from 'react';
import Filters from '../Filters/Filters';
import { TableWrapper, StyledTable } from './Styles';
import TableHeader from './TableHeader/TableHeader';

import { Context as UsersContext } from '../../../context/UsersContext';
import Row from './TableRow/Row';

const tableHeaderElements = [
  'Nombre',
  'Email',
  'Tipo de Tarifa',
  'Tarifa expirada',
  'Fecha último pago',
  'Notificaciones',
  'Registrar pago',
  'Acciones',
];

const Table = () => {
  const { state } = useContext(UsersContext);
  return (
    <TableWrapper>
      <Filters />
      <StyledTable>
        <TableHeader items={tableHeaderElements} />
        {state.users.map((user) => (
          <Row key={user.id} user={user} />
        ))}
      </StyledTable>
    </TableWrapper>
  );
};

export default Table;
