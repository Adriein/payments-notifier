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

const Login = ({ modalClose, onCreate, signin }) => {
  return (
    <Form
      enableReinitialize
      initialValues={{
        email: '',
        password: '',
      }}
      validations={{
        email: [Form.is.email(), Form.is.required()],
        password: Form.is.required(),
      }}
      onSubmit={async ({email, password}, form) => {
        try {
          signin({ email, password });
          onCreate();
        } catch (error) {
          Form.handleAPIError(error, form);
        }
      }}
    >
      <FormElement>
        <FormHeading>
          Accede a Nutri<TitleSpan>log</TitleSpan>
        </FormHeading>
        <Form.Field.Input name="email" label="Email" />
        <Form.Field.Input name="password" label="Password" type="password"/>
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

Login.propTypes = propTypes;
Login.defaultProps = defaultProps;

export default Login;
