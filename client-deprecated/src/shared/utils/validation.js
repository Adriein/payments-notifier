export const is = {
  match: (testFn, message = '') => (value, fieldValues) =>
    !testFn(value, fieldValues) && message,

  required: () => (value) =>
    isNullOrEmptyString(value) && 'El campo es obligatorio',

  minLength: (min) => (value) =>
    !!value &&
    value.length < min &&
    `Tiene que tener al menos ${min} carácteres`,

  maxLength: (max) => (value) =>
    !!value &&
    value.length > max &&
    `Como mucho puede contener ${max} carácteres`,

  notEmptyArray: () => (value) =>
    Array.isArray(value) && value.length === 0 && 'Añade al menos un elemento',

  email: () => (value) =>
    !!value &&
    // eslint-disable-next-line no-useless-escape
    !/.+@.+\..+/.test(value) &&
    'Tiene que ser un email válido',

  number: () => (value) => !!value && isNaN(value) && 'Tiene que ser un número',

  date: () => (value) =>
    !!value &&
    // eslint-disable-next-line no-useless-escape
    !/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/.test(
      value
    ) &&
    'La fecha debe tener el formato dd/mm/aaaa',

  url: () => (value) =>
    !!value &&
    // eslint-disable-next-line no-useless-escape
    !/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(
      value
    ) &&
    'Tiene que ser una url valida',
};

const isNullOrEmptyString = (value) =>
  value === undefined || value === null || value === '';

export const generateErrors = (fieldValues, fieldValidators) => {
  const errors = {};

  Object.entries(fieldValidators).forEach(([fieldName, validators]) => {
    [validators].flat().forEach((validator) => {
      const errorMessage = validator(fieldValues[fieldName], fieldValues);
      if (errorMessage && !errors[fieldName]) {
        errors[fieldName] = errorMessage;
      }
    });
  });
  return errors;
};
