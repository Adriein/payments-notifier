import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Form from '../../shared/components/Form/Form';

import { Context as AppConfigContext } from '../../context/AppConfigContext';
import { Context as UsersContext } from '../../context/UsersContext';

import {
  FormHeading,
  FormElement,
  Divider,
  Actions,
  ActionButton,
} from './Styles';

const propTypes = {
  modalClose: PropTypes.func,
};

const defaultProps = {
  modalClose: undefined,
};

const CreateUser = ({ modalClose, onCreate }) => {
  const { state, getAppConfig, formatPricing } = useContext(AppConfigContext);
  const { create } = useContext(UsersContext);
  useEffect(() => {
    (async () => {
      await getAppConfig();
    })();
  }, []);

  return (
    <Form
      enableReinitialize
      initialValues={{
        username: '',
        email: '',
        pricing: '',
        lastPaymentDate: '',
      }}
      validations={{
        username: Form.is.required(),
        email: [Form.is.email(), Form.is.required()],
        pricing: Form.is.required(),
        lastPaymentDate: [Form.is.date(), Form.is.required()],
      }}
      onSubmit={async (values, form) => {
        try {
          await create(values );
          onCreate();
        } catch (error) {
          Form.handleAPIError(error, form);
        }
      }}
    >
      <FormElement>
        <FormHeading>Crear usuario</FormHeading>
        <Form.Field.Input
          name="username"
          label="Nombre"
          tip="Nombre y apellido del usuario."
        />
        <Divider />
        <Form.Field.Input
          name="email"
          label="Email"
          tip="Email del usuario, no pueden repetirse emails."
        />
        <Form.Field.Select
          name="pricing"
          label="Tarifa"
          placeholder="Selecciona una tarifa"
          options={formatPricing(state)}
        />
        <Form.Field.Input
          name="lastPaymentDate"
          label="Fecha del último pago"
          tip="La fecha tiene que ser en formato dd/mm/aaaa."
        />
        <Actions>
          <ActionButton type="submit" variant="primary">
            Crear Usuario
          </ActionButton>
          <ActionButton type="button" variant="empty" onClick={modalClose}>
            Cancelar
          </ActionButton>
        </Actions>
      </FormElement>
    </Form>
  );
};

CreateUser.propTypes = propTypes;
CreateUser.defaultProps = defaultProps;

export default CreateUser;
