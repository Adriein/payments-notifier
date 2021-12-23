import { useState } from 'react';
const useInputState = (initialVal) => {
  const [value, setValue] = useState(initialVal);
  const handleChange = (event) => {
    if (event.target.type === 'checkbox') {
      setValue(
        Object.assign({}, value, { [event.target.name]: event.target.checked })
      );
      return;
    }
    setValue(
      Object.assign({}, value, { [event.target.name]: event.target.value })
    );
  };
  const reset = () => {
    setValue(initialVal);
  };

  const setForm = (newValue) => {
    setValue(Object.assign({}, value, newValue));
  };
  return [value, handleChange, reset, setForm];
};

export default useInputState;
