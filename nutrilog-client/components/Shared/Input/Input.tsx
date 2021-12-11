import React, { forwardRef } from 'react';

import { StyledInput, InputElement, StyledIcon } from './Styles';
import { InputProps } from "./InputProps";

const Input = forwardRef(
  ({ icon, className, onChange, ...inputProps }: InputProps, ref) => {
    const handleChange = (event: any) => {

    };

    return (
      <StyledInput className={className}>
        {icon && <StyledIcon>{icon}</StyledIcon>}
        <InputElement {...inputProps} onChange={handleChange} hasIcon={!!icon} ref={ref}/>
      </StyledInput>
    );
  }
);

export default Input;
