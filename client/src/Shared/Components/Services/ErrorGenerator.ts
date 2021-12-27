export class ErrorGenerator {
  public static run(
    fieldValues: { [key: string]: string },
    validators: { [key: string]: Function[] | Function }
  ) {
    const errors: { [key: string]: any } = {};

    for (const field in validators) {
      const validatorFnList = [ validators[field] ].flat();

      for (const fn of validatorFnList) {
        const value = fieldValues[field];
        const error = fn(value);

        if (error && !errors[field]) {
          errors[field] = error;
        }
      }
    }

    return errors;
  }
}

/*export const generateErrors = (fieldValues, fieldValidators) => {
 const errors = {};

 Object.entries(fieldValidators).forEach(([ fieldName, validators ]) => {
 [ validators ].flat().forEach((validator) => {
 const errorMessage = validator(fieldValues[fieldName], fieldValues);
 if (errorMessage && !errors[fieldName]) {
 errors[fieldName] = errorMessage;
 }
 });
 });
 return errors;
 };*/