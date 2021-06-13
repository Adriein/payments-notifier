import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Form from '../../shared/components/Form/Form';
import { useToasts } from 'react-toast-notifications';

import {
  FormHeading,
  FormElement,
  Actions,
  ActionButton,
  Divider
} from './Styles';

const propTypes = {
  modalClose: PropTypes.func,
};

const defaultProps = {
  modalClose: undefined,
};

const Contact = ({ modalClose, onCreate }) => {
  const { addToast } = useToasts();

  return (
    <Form
      enableReinitialize
      initialValues={{
        subject: '',
        emailContent: '',
      }}
      validations={{
        subject: Form.is.required(),
        emailContent: Form.is.required(),
      }}
      onSubmit={async (values, form) => {
        try {
          addToast('Mensaje correctamente', { appearance: 'success' });
         
        } catch (error) {
          addToast('Error mandando el mensaje', { appearance: 'error' });
          Form.handleAPIError(error, form);
        }
      }}
    >
      <FormElement>
        <FormHeading>Formulario de contacto</FormHeading>
        <Form.Field.Input
          name="subject"
          label="Asunto"
        />
        <Form.Field.Textarea
          name="emailContent"
          label="Contenido"
          tip="Escribe tus dudas o tus sugerencias, en Nutrilog nos encanta ayudar a nuestros clientes"
        />
        <Actions>
          <ActionButton type="submit" variant="primary" /*loading={state.loading}*/>
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

Contact.propTypes = propTypes;
Contact.defaultProps = defaultProps;

export default Contact;
