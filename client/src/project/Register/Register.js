import React from 'react';
import PropTypes from 'prop-types';
import Form from '../../shared/components/Form/Form';
import { useToasts } from 'react-toast-notifications';

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

const Register = ({ modalClose, send, onCreate }) => {
  const { addToast } = useToasts();
  return (
    // <Form
    //   enableReinitialize
    //   initialValues={{
    //     username: '',
    //     email: '',
    //     password: '',
    //   }}
    //   validations={{
    //     username: Form.is.required(),
    //     email: [Form.is.email(), Form.is.required()],
    //     password: Form.is.required(),
    //   }}
    //   onSubmit={async (values, form) => {
    //     try {
    //     } catch (error) {
    //       Form.handleAPIError(error, form);
    //     }
    //   }}
    // >
    //   <FormElement>
    //     {/* <FormHeading>
    //       Regístrate en Nutri<TitleSpan>log</TitleSpan>
    //     </FormHeading> */}
    //     <Form.Field.Input
    //       name="username"
    //       label="Nombre de usuario"
    //       tip="El nombre de usuario debe de ser único"
    //     />
    //     <Form.Field.Input
    //       name="email"
    //       label="Email"
    //       tip="Asegúrate de escribir correctamente tu email"
    //     />
    //     <Form.Field.Input name="password" label="Password" />
    //     <Actions>
    //       <ActionButton type="submit" variant="primary">
    //         Entrar
    //       </ActionButton>
    //       <ActionButton type="button" variant="empty" onClick={modalClose}>
    //         Cancelar
    //       </ActionButton>
    //     </Actions>
    //   </FormElement>
    // </Form>
    <Form
      enableReinitialize
      initialValues={{
        subject: '',
        emailContent: '',
        email: '',
      }}
      validations={{
        subject: Form.is.required(),
        emailContent: Form.is.required(),
        email: Form.is.required(),
      }}
      onSubmit={async (values, form) => {
        try {
          addToast('Mensaje enviado correctamente', { appearance: 'success' });
          send({
            subject: values.subject,
            email: values.email,
            emailContent: values.emailContent,
          });
          onCreate();
        } catch (error) {
          addToast('Error enviando el mensaje', { appearance: 'error' });
          Form.handleAPIError(error, form);
        }
      }}
    >
      <FormElement>
        <FormHeading>
          Si deseas registrarte contacta para obtener una prueba de 60 días
        </FormHeading>
        <Form.Field.Input name="subject" label="Asunto" />
        <Form.Field.Input
          name="email"
          label="Email"
          tip="Escribe el email al que quieres que te respondamos"
        />
        <Form.Field.Textarea
          name="emailContent"
          label="Contenido"
          tip="Indica que deseas una prueba de 60 días y nos pondremos en contacto"
        />
        <Actions>
          <ActionButton type="submit" variant="primary">
            Enviar
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
