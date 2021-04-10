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
  Divider,
} from './Styles';

const propTypes = {
  modalClose: PropTypes.func,
};

const defaultProps = {
  modalClose: undefined,
};

const CreatePricing = ({ modalClose, onCreate }) => {
  const { state, getAppConfig, createPricing } = useContext(AppConfigContext);
  const { addToast } = useToasts();

  useEffect(() => {
    (async () => {
      await getAppConfig();
    })();
  }, []);

  const formatPricing = () => {
    const pricingObject = state.config.pricing ?? {};

    return Object.keys(pricingObject).reduce((acc, pricing) => {
      return [
        ...acc,
        {
          value: pricing,
          label: `${pricing}, ${pricingObject[pricing].duration} días, ${pricingObject[pricing].price} euros`,
        },
      ];
    }, []);
  };
  return (
    <Form
      enableReinitialize
      initialValues={{
        name: '',
        duration: '',
        pricing: '',
      }}
      validations={{
        name: Form.is.required(),
        duration: [Form.is.number(), Form.is.required()],
        pricing: [Form.is.number(), Form.is.required()],
      }}
      onSubmit={async (values, form) => {
        try {
          await createPricing(values);
          addToast('Tarifa creada correctamente', { appearance: 'success' });
          onCreate();
        } catch (error) {
          addToast('Error creando la tarifa', { appearance: 'error' });
          Form.handleAPIError(error, form);
        }
      }}
    >
      <FormElement>
        <FormHeading>Crear tarifa</FormHeading>
        <Form.Field.Input
          name="name"
          label="Nombre de la tarifa"
          tip="Nombre de la tarifa que aparecerá en los seleccionables. e.g: trimestral"
        />
        <Form.Field.Input
          name="duration"
          label="Duración de la tarifa"
          tip="Duración que tiene la tarifa en días. e.g: 90"
        />
        <Form.Field.Input
          name="pricing"
          label="Precio de la tarifa"
          tip="Precio que tendrá la tarifa en euros. e.g: 150"
        />
        <Divider />
        <Form.Field.Select
          label="Tarifas existentes"
          tip="Lista de las tarifas existentes"
          options={formatPricing()}
        />
        <Actions>
          <ActionButton type="submit" variant="primary" loading={state.loading}>
            Crear tarifa
          </ActionButton>
          <ActionButton type="button" variant="empty" onClick={modalClose}>
            Cancelar
          </ActionButton>
        </Actions>
      </FormElement>
    </Form>
  );
};

CreatePricing.propTypes = propTypes;
CreatePricing.defaultProps = defaultProps;

export default CreatePricing;
