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
} from '../CreateUser/Styles';

const propTypes = {
  modalClose: PropTypes.func,
};

const defaultProps = {
  modalClose: undefined,
};

const EditUser = ({ modalClose, onCreate }) => {
  const { state, getAppConfig, formatPricing } = useContext(AppConfigContext);
  const {
    state: { editingUser },
    update,
  } = useContext(UsersContext);

  useEffect(() => {
    (async () => {
      await getAppConfig();
    })();
  }, []);

  return (
    <Form
      enableReinitialize
      initialValues={{
        id: editingUser.id,
        username: editingUser.username,
        email: editingUser.email,
        pricing: Object.keys(editingUser.subscription.pricing)[0],
        lastPaymentDate: editingUser.subscription.lastPayment,
      }}
      validations={{
        username: Form.is.required(),
        email: [Form.is.email(), Form.is.required()],
        pricing: Form.is.required(),
        lastPaymentDate: [Form.is.date(), Form.is.required()],
      }}
      onSubmit={async (values, form) => {
        try {
          await update(values);
          onCreate();
        } catch (error) {
          Form.handleAPIError(error, form);
        }
      }}
    >
      <FormElement>
        <FormHeading>Editar usuario</FormHeading>
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
            Guardar
          </ActionButton>
          <ActionButton type="button" variant="empty" onClick={modalClose}>
            Cancelar
          </ActionButton>
        </Actions>
      </FormElement>
    </Form>
  );
};

EditUser.propTypes = propTypes;
EditUser.defaultProps = defaultProps;

export default EditUser;
