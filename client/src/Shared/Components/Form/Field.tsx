import React, { ReactElement } from 'react';
import { uniqueId } from 'lodash';


import { FieldError, FieldLabel, FieldTip, StyledField } from './Styles';
import Input from "../Input";


export interface FieldProps {
  name: string;
  placeholder?: string;
  validate?: Function;
  className?: string;
  label?: string;
  tip?: string;
  error?: string;
  icon?: ReactElement
}


const buildField = (FormComponent: any) => {
  return ({
    className,
    label,
    tip,
    error,
    name,
    ...otherProps
  }: FieldProps) => {
    const fieldId = uniqueId('form-field-');

    return (
      <StyledField className={className}>
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
};

export default {
  Input: buildField(Input),
};
