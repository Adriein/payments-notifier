import React, { ReactElement } from 'react';
import { Formik, Form as FormikForm, Field as FormikField } from 'formik';
import { get, mapValues } from 'lodash';

import { is } from '../Services/Validation';

import Field, { FieldProps } from './Field';
import { FieldAttributes } from "formik/dist/Field";

interface FormProps {
  validate?: Function;
  validations?: Object;
  validateOnBlur?: boolean;
  initialValues: any;
  onSubmit: any;
  enableReinitialize: boolean;
  children: ReactElement;
}

const Form = ({ validate, validations, ...otherProps }: FormProps) => (
  <Formik
    {...otherProps}
    validate={(values) => {
      if (validate) {
        return validate(values);
      }
      if (validations) {
        //return generateErrors(values, validations);
      }
      return {};
    }}
  />
);

Form.Element = (props: any) => <FormikForm noValidate {...props} />;

Form.Field = mapValues(
  Field,
  (FieldComponent) => ({ name, validate, ...props }: FieldProps) => (
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
  )
);

/*Form.initialValues = (data: any, getFieldValues: any) => {
 return getFieldValues((key: any, defaultValue = '') => {
 const value = get(data, key);
 return value === undefined || value === null ? defaultValue : value;
 });
 }*/

/*Form.handleAPIError = (error, form) => {
 if (error.data.fields) {
 form.setErrors(error.data.fields);
 } else {
 //toast.error(error);
 }
 };*/

Form.is = is;

export default Form;
