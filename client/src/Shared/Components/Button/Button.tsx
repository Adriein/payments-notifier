import React, { ForwardedRef, forwardRef } from 'react';
import { ButtonProps } from "./ButtonProps";
import { ButtonBase } from './Styles';
import { getSharedColorScheme } from "../../Services/SharedColorScheme";
import Loader from "../Loader";

const SIZE = {
  xs: {
    'font-size': '12px',
    'height': '30px',
    'padding': '0 14px',
  },
  sm: {
    'font-size': '14px',
    'height': '36px',
    'padding': '0 18px',
  },
  md: {
    'font-size': '16px',
    'height': '42px',
    'padding': '0 22px',
  },
  lg: {
    'font-size': '18px',
    'height': '50px',
    'padding': '0 26px',
  },
  xl: {
    'font-size': '20px',
    'height': '60px',
    'padding': '0 32px',
  }
};

const RADIUS = {
  xs: {
    'border-radius': '2px'
  },
  sm: {
    'border-radius': '4px'
  },
  md: {
    'border-radius': '8px'
  },
  lg: {
    'border-radius': '16px'
  },
  xl: {
    'border-radius': '32px'
  }
}


const Button = forwardRef((
  { children, onClick, size, variant, rightIcon, leftIcon, isLoading, radius, color, ...otherProps }: ButtonProps,
  ref: ForwardedRef<ButtonProps>
) => {
  const themedStyles = getSharedColorScheme({ color, variant })

  const styles = {
    ...SIZE[size],
    ...RADIUS[radius],
    'background-color': themedStyles.background,
    'color': themedStyles.color
  };

  const hover = {
    'background-color': themedStyles.hover
  }

  return (
    <ButtonBase
      ref={ref}
      onClick={onClick}
      theme={styles}
      hover={hover}
      disabled={isLoading}
      {...otherProps}
    >
      {isLoading && <Loader color={'gray'} size={16}/>}
      {!isLoading && leftIcon}
      {children}
      {!isLoading && rightIcon}
    </ButtonBase>
  );
});

export default Button;