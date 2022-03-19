import React, { ReactElement } from 'react';
import { uniqueId } from 'lodash';


import { FieldError, FieldLabel, FieldTip, StyledField } from './Styles';
import Input from "../Input";
import Select from "../Select";


export interface FieldProps {
  name: string;
  value?: string;
  type?: string;
  placeholder?: string;
  validate?: Function;
  className?: any;
  label?: string;
  tip?: string;
  error?: string;
  icon?: ReactElement;
  inverted?: boolean;
  children?: ReactElement[];
  defaultValue?: string;
}


const buildField = (FormComponent: any, type?: string) => {
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
      <StyledField className={className} type={type}>
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
  Select: buildField(Select, 'select')
};
