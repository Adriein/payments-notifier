import React, { useEffect, useState } from "react";
import { Input, Label, CheckboxContainer } from './Styles';

const Checkbox = ({ name, onChange }: any) => {
  //const [ checked, setChecked ] = useState(false);

  const onCheck = (event: any) => {
    event.preventDefault();
    console.log('aaaaa')
  }

  return (
    <CheckboxContainer onClick={(e) => onCheck(e)}>
      <Input id={name} name={name}/>
      <Label htmlFor={name} checked={false}>{name}</Label>
    </CheckboxContainer>
  );
}


export default Checkbox;
