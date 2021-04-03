import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Form from '../../shared/components/Form/Form';

import { Context as AppConfigContext } from '../../context/AppConfigContext';

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

const CreatePricing = ({ modalClose, onCreate }) => {
  const { state, getAppConfig } = useContext(AppConfigContext);

  useEffect(() => {
    (async () => {
      await getAppConfig();
    })();
  }, []);

  const createPricings = () => {
    const pricingObject = state.config.pricing ?? {};

    return Object.keys(pricingObject).reduce((acc, pricing) => {
      return [...acc, { value: pricing, label: `${pricing}, ${pricingObject[pricing].duration} días, ${pricingObject[pricing].price} euros` }];
    }, []);
  };

  return (
    <Form
      enableReinitialize
      initialValues={{
        pricingName: '',
        pricingDuration: '',
        pricingPrice: '',
      }}
      validations={{
        pricingDuration: Form.is.number(),
        pricingPrice: Form.is.number(),
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
        <FormHeading>Crear tarifa</FormHeading>
        <Form.Field.Input
          name="pricingName"
          label="Nombre de la tarifa"
          tip="Nombre de la tarifa que aparecerá en los seleccionables. ej: trimestral"
        />
        <Form.Field.Input
          name="pricingDuration"
          label="Duración de la tarifa"
          tip="Duración que tiene la tarifa en días. ej: 90"
        />
        <Form.Field.Input
          name="pricingPrice"
          label="Precio de la tarifa"
          tip="Precio que tendrá la tarifa en euros. ej: 150"
        />
        <Divider/>
        <Form.Field.Select
          label="Tarifas existentes"
          tip="Lista de las tarifas existentes"
          options={createPricings()}
        />
        <Actions>
          <ActionButton type="submit" variant="primary" loading={false}>
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
