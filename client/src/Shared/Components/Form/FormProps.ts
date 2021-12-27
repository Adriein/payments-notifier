import { ReactElement } from "react";

type ValidatorFn = (...args: any[]) => string | boolean;

export interface FormProps {
  validate?: Function;
  validations?: { [key: string]: ValidatorFn[] | ValidatorFn };
  validateOnBlur?: boolean;
  initialValues: any;
  onSubmit: any;
  enableReinitialize: boolean;
  children: ReactElement;
}