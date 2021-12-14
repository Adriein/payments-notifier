import React, { ForwardedRef, forwardRef } from 'react';
import { ButtonProps } from "./ButtonProps";

const Button = forwardRef(({ children }: ButtonProps, ref: ForwardedRef<ButtonProps>) => {
  return (
    children
  );
})