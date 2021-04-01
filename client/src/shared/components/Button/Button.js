import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { COLORS } from '../../utils/colors';
import { StyledButton, StyledSpinner, Text } from './Styles';

const propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  variant: PropTypes.oneOf([
    'primary',
    'success',
    'danger',
    'secondary',
    'empty',
  ]),
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  iconSize: PropTypes.number,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
};

const defaultProps = {
  className: undefined,
  children: undefined,
  variant: 'secondary',
  icon: undefined,
  iconSize: 18,
  disabled: false,
  loading: false,
  onClick: () => {},
};

const Button = forwardRef(
  (
    {
      children,
      variant,
      icon,
      iconSize,
      disabled,
      loading,
      onClick,
      ...buttonProps
    },
    ref
  ) => {
    const handleClick = () => {
      if (!disabled && !loading) {
        onClick();
      }
    };

    return (
      <StyledButton
        {...buttonProps}
        onClick={handleClick}
        variant={variant}
        disabled={disabled || loading}
        loading={loading}
        iconOnly={!children}
        ref={ref}
      >
        {loading && (
          <StyledSpinner size={26} COLORS={getIconCOLORS(variant)} />
        )}

        {icon}
        {children && <Text withPadding={loading || icon}>{children}</Text>}
      </StyledButton>
    );
  }
);

const getIconCOLORS = (variant) =>
  ['secondary', 'empty'].includes(variant) ? COLORS.textDark : '#fff';

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
