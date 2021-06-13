import React from 'react';
import PropTypes from 'prop-types';
import Form from '../../shared/components/Form/Form';

import {
  FormHeading,
  FormElement,
  Actions,
  TitleSpan,
  ActionButton,
} from './Styles';

const propTypes = {
  modalClose: PropTypes.func,
};

const defaultProps = {
  modalClose: undefined,
};

const Register = ({ modalClose, onCreate }) => {
  return (
    <Form
      enableReinitialize
      initialValues={{
        username: '',
        email: '',
        password: '',
      }}
      validations={{
        username: Form.is.required(),
        email: [Form.is.email(), Form.is.required()],
        password: Form.is.required(),
      }}
      onSubmit={async (values, form) => {
        try {
        } catch (error) {
          Form.handleAPIError(error, form);
        }
      }}
    >
      <FormElement>
        <FormHeading>
          Regístrate en Nutri<TitleSpan>log</TitleSpan>
        </FormHeading>
        <Form.Field.Input
          name="username"
          label="Nombre de usuario"
          tip="El nombre de usuario debe de ser único"
        />
        <Form.Field.Input
          name="email"
          label="Email"
          tip="Asegúrate de escribir correctamente tu email"
        />
        <Form.Field.Input name="password" label="Password" />
        <Actions>
          <ActionButton type="submit" variant="primary">
            Entrar
          </ActionButton>
          <ActionButton type="button" variant="empty" onClick={modalClose}>
            Cancelar
          </ActionButton>
        </Actions>
      </FormElement>
    </Form>
  );
};

Register.propTypes = propTypes;
Register.defaultProps = defaultProps;

export default Register;
