import React, { useEffect, useContext} from 'react';
import './UserTable.scss';
import { Context as UsersContext } from '../../context/UsersContext';
import { Context as ModalContext } from '../../context/ModalContext';
import { useToasts } from 'react-toast-notifications';
import Modal from '../modal/Modal';

import { modalData } from '../../data';
import { TableHeaderFilters } from './header/TableHeaderFilters';
import { TableRow } from './row/TableRow';
import { EditableRow } from './row/EditableRow';

export const UserTable = () => {
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

  // const handleEditPricing = (option) => {
  //   setForm({
  //     username: form.username,
  //     email: form.email,
  //     pricing: option.value,
  //   });
  // };

  return (
    <div className="users__widget">
      {/* <Animate
        play={modalState.visible}
        start={{ opacity: 0 }}
        end={{ opacity: 1 }}
      > */}
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
      {/* </Animate> */}
      <TableHeaderFilters />
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
              return state.editingUser.id === user.id ? (
                <EditableRow user={user} />
              ) : (
                <TableRow user={user} />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
