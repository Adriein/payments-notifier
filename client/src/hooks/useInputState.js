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
  return [value, handleChange, reset];
};

export default useInputState;
