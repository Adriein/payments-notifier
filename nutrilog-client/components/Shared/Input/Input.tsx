import React, { ForwardedRef, forwardRef } from 'react';

import { StyledInput, InputElement, StyledIcon } from './Styles';
import { InputProps } from "./InputProps";

const Input = forwardRef(
  ({ icon, className, onChange, ...inputProps }: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const handleChange = (event: any) => {
      onChange(event.target.value);
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
