import React from 'react';
import { Formik, Form as FormikForm, Field as FormikField } from 'formik';
import { get, mapValues } from 'lodash';

import { is } from '../../Services/Validation';

import Field, { FieldProps } from './Field';
import { FieldAttributes } from "formik/dist/Field";
import { ErrorGenerator } from "../../Services/ErrorGenerator";
import { FormProps } from "./FormProps";


const Form = ({ validate, validations, ...otherProps }: FormProps) => (
  <Formik
    {...otherProps}
    validate={(values) => {
      if (validate) {
        return validate(values);
      }
      if (validations) {
        return ErrorGenerator.run(values, validations);
      }
      return {};
    }}
  />
);

Form.Element = (props: any) => <FormikForm noValidate {...props} />;

Form.Field = mapValues(
  Field,
  (FieldComponent) => ({ name, validate, ...props }: FieldProps) => {
    return (
      <FormikField name={name} validate={validate}>
        {({ field, form: { touched, errors, setFieldValue } }: FieldAttributes<any>) => (
          <FieldComponent
            {...field}
            {...props}
            name={name}
            error={get(touched, name) && get(errors, name)}
            onChange={(value: React.ChangeEvent<any>) => setFieldValue(name, value)}
          />
        )}
      </FormikField>
    );
  }
);

Form.is = is;

export default Form;
