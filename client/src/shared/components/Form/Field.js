import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';

import Input from '../Input/Input';
import Select from '../Select/Select';
import Textarea from '../Textarea/Textarea';

import { StyledField, FieldLabel, FieldTip, FieldError } from './Styles';

const propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  tip: PropTypes.string,
  error: PropTypes.string,
  name: PropTypes.string,
};

const defaultProps = {
  className: undefined,
  label: undefined,
  tip: undefined,
  error: undefined,
  name: undefined,
};

const buildField = (FormComponent) => {
  const FieldComponent = ({
    className,
    label,
    tip,
    error,
    name,
    ...otherProps
  }) => {
    const fieldId = uniqueId('form-field-');

    return (
      <StyledField className={className} hasLabel={!!label}>
        {label && <FieldLabel htmlFor={fieldId}>{label}</FieldLabel>}
        <FormComponent
          id={fieldId}
          invalid={!!error}
          name={name}
          {...otherProps}
        />
        {tip && <FieldTip>{tip}</FieldTip>}
        {error && <FieldError>{error}</FieldError>}
      </StyledField>
    );
  };

  FieldComponent.propTypes = propTypes;
  FieldComponent.defaultProps = defaultProps;

  return FieldComponent;
};

export default {
  Input: buildField(Input),
  Select: buildField(Select),
  Textarea: buildField(Textarea),
};
