export const is = {
  match: (testFn: (...args: any[]) => boolean, message: string = '') => {
    return (value: any, fieldValues: any) => {
      return !testFn(value, fieldValues) && message;
    }
  },

  required: () => (value: string) => {
    return isNullOrEmptyString(value) && 'El campo es obligatorio';
  },

  minLength: (min: number) => (value: string) => {
    return !!value && value.length < min && `Tiene que tener al menos ${min} carácteres`;
  },

  maxLength: (max: number) => (value: string) => {
    return !!value && value.length > max && `Como mucho puede contener ${max} carácteres`;
  },

  notEmptyArray: () => (value: any[]) => {
    return Array.isArray(value) && value.length === 0 && 'Añade al menos un elemento';
  },

  email: () => (value: string) => {
    return !!value && !/.+@.+\..+/.test(value) && 'Tiene que ser un email válido';
  },

  number: () => (value: number) => {
    return !!value && isNaN(value) && 'Tiene que ser un número';
  },

  date: () => (value: string) => {
    const isValidDate = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/.test(value);
    return !!value && !isValidDate && 'La fecha debe tener el formato dd/mm/aaaa';
  },

  url: () => (value: string) => {
    return !!value && !/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(value) && 'Tiene que ser una url valida';
  }
};

const isNullOrEmptyString = (value: any) => {
  return value === undefined || value === null || value === '';
}

/*
 export const generateErrors = (fieldValues: any, fieldValidators: any) => {
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