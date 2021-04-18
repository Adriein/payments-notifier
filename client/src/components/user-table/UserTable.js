import React, { useEffect, useContext } from 'react';
import './UserTable.scss';
import { Context as UsersContext } from '../../context/UsersContext';
import { Context as ModalContext } from '../../context/ModalContext';
import { useToasts } from 'react-toast-notifications';
import Modal from '../modal/Modal';

import { modalData } from '../../shared/utils/data';
import { TableRow } from './row/TableRow';
import Filters from '../../project/UserManagementBoard/Filters/Filters';

export const UserTable = ({ edit }) => {
  const { state, resetToastState } = useContext(UsersContext);
  const { state: modalState, closeModal } = useContext(ModalContext);

  const { addToast } = useToasts();

  useEffect(() => {
    if (state.success) {
      addToast(state.success, { appearance: 'success' });
      resetToastState();
    }
    if (state.error) {
      addToast(state.error, { appearance: 'error' });
      resetToastState();
    }
  }, [state.success, state.error]);

  return (
    <div className="users__widget">
      {modalState.visible && (
        <Modal
          title={modalData[modalState.type].title}
          type={modalData[modalState.type].colors}
          message={modalData[modalState.type].message}
          icon={modalData[modalState.type].icon}
          handleClose={closeModal}
          callback={modalState.callback}
        />
      )}

      <Filters />
      <div className="user-table__container">
        <table className="user-table__table">
          <thead className="user-table__table__header">
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Tipo de tarifa</th>
              <th>Tarifa expirada</th>
              <th>Fecha último pago</th>
              <th>Notificaciones</th>
              <th>Registrar pago</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {state.users.map((user) => {
              return (
                <TableRow user={user} key={user.id} openEditmodal={edit} />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
