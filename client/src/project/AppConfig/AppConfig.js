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

const AppConfig = ({ modalClose, onCreate }) => {
  const { state, getAppConfig } = useContext(AppConfigContext);

  useEffect(() => {
    (async () => {
      await getAppConfig();
    })();
  }, []);

  const createPricings = () => {
    const pricingObject = state.config.pricing ?? {};

    return Object.keys(pricingObject).reduce((acc, pricing) => {
      return [...acc, { value: pricing, label: pricing }];
    }, []);
  };
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
          console.log(values);
        } catch (error) {
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
          <ActionButton type="submit" variant="primary">
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
