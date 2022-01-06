import React, { ForwardedRef, forwardRef } from 'react';

import { StyledInput, InputElement, StyledIcon, InvertedInputElement } from './Styles';
import { InputProps } from "./InputProps";

const TYPE = {
  normal: InputElement,
  inverted: InvertedInputElement
};

const Input = forwardRef(
  ({ icon, className, onChange, inverted, ...inputProps }: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const handleChange = (event: any) => {
      onChange(event.target.value);
    };
    const type = inverted ? 'inverted' : 'normal';

    const InputElement = TYPE[type];
    
    return (
      <StyledInput className={className}>
        {icon && <StyledIcon>{icon}</StyledIcon>}
        <InputElement {...inputProps} onChange={handleChange} hasIcon={!!icon} ref={ref}/>
      </StyledInput>
    );
  }
);

export default Input;
