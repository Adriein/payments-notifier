import React, { useState } from "react";
import { Input, Label, CheckboxContainer } from './Styles';
import { CheckboxProps } from "./CheckboxProps";

const Checkbox = ({ name, onChange }: CheckboxProps) => {
  const [ checked, setChecked ] = useState(false);

  const onCheck = (event: any) => {
    event.preventDefault();
    setChecked(!checked);
    if (onChange) {
      onChange();
    }
  }

  return (
    <CheckboxContainer onClick={(event: any) => onCheck(event)}>
      <Input id={name} name={name}/>
      <Label htmlFor={name} checked={checked}>{name}</Label>
    </CheckboxContainer>
  );
}


export default Checkbox;
