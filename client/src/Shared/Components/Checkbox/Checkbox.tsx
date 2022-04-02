import React, { ChangeEvent, useState } from "react";
import { CheckboxProps } from "./CheckboxProps";
import { Checkbox as MantineCheckBox } from '@mantine/core';

const Checkbox = ({ text, value, onChange }: CheckboxProps) => {
  const [ checked, setChecked ] = useState(value);

  const handleOnChangeCheckBox = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.currentTarget.checked);
    }
    setChecked(event.currentTarget.checked)
  }

  return (
    <MantineCheckBox
      label={text} checked={checked}
      onChange={(event: ChangeEvent<HTMLInputElement>) => handleOnChangeCheckBox(event)}
    />
  );
}


export default Checkbox;
