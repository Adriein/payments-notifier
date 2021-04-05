import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Form from '../../shared/components/Form/Form';
import { useToasts } from 'react-toast-notifications';

import { Context as AppConfigContext } from '../../context/AppConfigContext';

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

const AppConfig = ({ modalClose, onCreate }) => {
  const { state, getAppConfig, updateAppConfig } = useContext(AppConfigContext);
  const { addToast } = useToasts();

  useEffect(() => {
    (async () => {
      await getAppConfig();
    })();
  }, []);

  console.log(state.config);
  return (
    <Form
      enableReinitialize
      initialValues={{
        warningDelay: state.config.warningDelay,
        defaulterDelay: state.config.defaulterDelay,
        emailContent: state.config.emailContent,
      }}
      validations={{
        warningDelay: [Form.is.number(), Form.is.required()],
        defaulterDelay: [Form.is.number(), Form.is.required()],
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
        <FormHeading>Configuración de la aplicación</FormHeading>
        <Form.Field.Input
          name="warningDelay"
          label="Días de preaviso"
          tip="Determina el número de días para mandar el preaviso de caducidad de tarifa al cliente."
        />
        <Form.Field.Textarea
          name="emailContent"
          label="Email de preaviso"
          tip="Contenido del email que se envía para el preaviso."
        />
        <Actions>
          <ActionButton type="submit" variant="primary" loading={state.loading}>
            Actualizar configuración
          </ActionButton>
          <ActionButton type="button" variant="empty" onClick={modalClose}>
            Cancelar
          </ActionButton>
        </Actions>
      </FormElement>
    </Form>
  );
};

AppConfig.propTypes = propTypes;
AppConfig.defaultProps = defaultProps;

export default AppConfig;
