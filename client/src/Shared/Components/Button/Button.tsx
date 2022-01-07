import React, { ForwardedRef, forwardRef } from 'react';
import { ButtonProps } from "./ButtonProps";
import { StyledFillButton, StyledRadioIconButton, StyledIcon, StyledOutlineButton } from './Styles';

const SIZES = {
  small: {
    "--borderRadius": "2px",
    "--fontSize": "14px",
    "--padding": "8px"
  },
  medium: {
    "--borderRadius": "2px",
    "--fontSize": 18 / 16 + "rem",
    "--padding": "12px 20px"
  },
  large: {
    "--borderRadius": "4px",
    "--fontSize": 21 / 16 + "rem",
    "--padding": "16px 32px"
  }
};

const TYPE = {
  icon: StyledRadioIconButton,
  fill: StyledFillButton,
  outline: StyledOutlineButton
}

const Button = forwardRef((
  { children, icon, isLoading, onClick, size, variant, ...otherProps }: ButtonProps,
  ref: ForwardedRef<ButtonProps>
) => {
  const styles = SIZES[size];
  const StyledButton = TYPE[variant];

  return (
    <StyledButton ref={ref} onClick={onClick} style={styles} {...otherProps}>
      {icon && <StyledIcon>{icon}</StyledIcon>}
      {children}
    </StyledButton>
  );
});

export default Button;