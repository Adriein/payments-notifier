import styled, { css } from 'styled-components';
import { COLORS } from '../../utils/colors';
import { MIXIN } from '../../utils/mixin';


import Spinner from '../Spinner';

export const StyledButton = styled.button`
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  vertical-align: middle;
  line-height: 1;
  padding: 0 ${props => (props.iconOnly ? 9 : 12)}px;
  white-space: nowrap;
  border-radius: 3px;
  transition: all 0.1s;
  appearance: none;
  ${MIXIN.clickable}
  font-size: 14.5px;
  font-weight: 600;
  ${props => buttonVariants[props.variant]}
  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;

const colored = css`
  color: #fff;
  background: ${props => COLORS[props.variant]};
  &:not(:disabled) {
    &:hover {
      background: ${props => MIXIN.lighten(COLORS[props.variant], 0.15)};
    }
    &:active {
      background: ${props => MIXIN.darken(COLORS[props.variant], 0.1)};
    }
    ${props =>
      props.isActive &&
      css`
        background: ${MIXIN.darken(COLORS[props.variant], 0.1)} !important;
      `}
  }
`;

const secondaryAndEmptyShared = css`
  color: ${COLORS.textDark};
  &:not(:disabled) {
    &:hover {
      background: ${COLORS.backgroundLight};
    }
    &:active {
      color: ${COLORS.primary};
      background: ${COLORS.backgroundLightPrimary};
    }
    ${props =>
      props.isActive &&
      css`
        color: ${COLORS.primary};
        background: ${COLORS.backgroundLightPrimary} !important;
      `}
  }
`;

const buttonVariants = {
  primary: colored,
  success: colored,
  danger: colored,
  secondary: css`
    background: ${COLORS.secondary};
    ${secondaryAndEmptyShared};
  `,
  empty: css`
    background: #fff;
    ${secondaryAndEmptyShared};
  `,
};

export const StyledSpinner = styled(Spinner)`
  position: relative;
  top: 1px;
`;

export const Text = styled.div`
  padding-left: ${props => (props.withPadding ? 7 : 0)}px;
`;