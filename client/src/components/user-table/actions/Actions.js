import React from 'react';

export const Actions = ({ user, editing = false }) => {
  const updateNotifications = (user) => {
    const updatedUser = Object.assign({}, user, {
      config: {
        ...user.config,
        sendWarnings: user.config.sendWarnings === 'Si' ? 'No' : 'Si',
      },
    });
    changeNotifications(updatedUser);
  };

  return (
    <>
      <td>
        <Switch
          active={user.config.sendWarnings === 'Si' ? true : false}
          onClick={() => updateNotifications(user)}
        />
      </td>
      <td>
        <ActionButton className="user-table__payment-row">
          <FcMoneyTransfer
            size="24px"
            onClick={handleRegisterPayment(user.email)}
          />
        </ActionButton>
      </td>
      <td className="user-table__actions">
        {editing ? (
          <>
            <ActionButton className="user-table__save-row">
              <FiCheckCircle size="24px" onClick={handleSaveUser} />
            </ActionButton>
            <ActionButton className="user-table__delete-row">
              <FiX size="24px" onClick={handleCancelEdit} />
            </ActionButton>
          </>
        ) : (
          <>
            <ActionButton className="user-table__edit-row">
              <FiEdit size="24px" onClick={handleEditUser(user)} />
            </ActionButton>
            <ActionButton className="user-table__delete-row">
              <FiDelete size="24px" onClick={handleDelete(user.email)} />
            </ActionButton>
          </>
        )}
      </td>
    </>
  );
};
