import React, { useState } from "react";
import { Input, Label, CheckboxContainer } from './Styles';
import { CheckboxProps } from "./CheckboxProps";

const Checkbox = ({ name, onChange, active }: CheckboxProps) => {
  const controlled = active !== undefined;
  const initialState = controlled ? active : false;

  const [ checked, setChecked ] = useState(initialState);

  const onCheck = (event: any) => {
    event.preventDefault();
    if (onChange) {
      onChange();
    }

    if (controlled) {
      setChecked(active);
      return;
    }

    setChecked(!checked);
  }

  return (
    <CheckboxContainer onClick={(event: any) => onCheck(event)}>
      <Input id={name} name={name}/>
      <Label htmlFor={name} checked={checked}>{name}</Label>
    </CheckboxContainer>
  );
}


export default Checkbox;
