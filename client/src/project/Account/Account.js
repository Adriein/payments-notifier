import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Form from '../../shared/components/Form/Form';
import { useToasts } from 'react-toast-notifications';

import { Context as AppConfigContext } from '../../context/AppConfigContext';

import {
  FormHeading,
  FormElement,
  Actions,
  ActionButton,
} from './Styles';

const propTypes = {
  modalClose: PropTypes.func,
};

const defaultProps = {
  modalClose: undefined,
};

const Account = ({ modalClose, onCreate }) => {
  const { state, getAppConfig, updateAppConfig } = useContext(AppConfigContext);
  const { addToast } = useToasts();

  return (
    <Form
      enableReinitialize
      initialValues={{
        password: '',
        oldPassword: ''
      }}
      validations={{
        password: Form.is.required(),
        oldPassword: Form.is.required(),
      }}
      onSubmit={async (values, form) => {
        try {
          await updateAppConfig(values);
          addToast('Configuración actualizada correctamente', { appearance: 'success' });
          onCreate();
        } catch (error) {
          addToast('Error actualizando la configuración', { appearance: 'error' });
          Form.handleAPIError(error, form);
        }
      }}
    >
      <FormElement>
        <FormHeading>Cuenta</FormHeading>
        <Form.Field.Input
          name="password"
          label="Nueva constraseña"
          tip="Escribe aquí la nueva contraseña"
        />
        <Form.Field.Input
          name="oldPassword"
          label="Vieja contraseña"
          tip="Escribe aquí la vieja contraseña"
        />
        <Actions>
          <ActionButton type="submit" variant="primary" loading={state.loading}>
            Actualizar
          </ActionButton>
          <ActionButton type="button" variant="empty" onClick={modalClose}>
            Cancelar
          </ActionButton>
        </Actions>
      </FormElement>
    </Form>
  );
};

Account.propTypes = propTypes;
Account.defaultProps = defaultProps;

export default Account;
