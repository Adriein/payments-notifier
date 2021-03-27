import styled, { css } from 'styled-components';

import { COLORS } from '../../utils/colors';
import { MIXIN } from '../../utils/mixin';

export const StyledSelect = styled.div`
  position: relative;
  border-radius: 4px;
  cursor: pointer;
  ${props => props.variant === 'empty' && `display: inline-block;`}
  ${props =>
    props.variant === 'normal' &&
    css`
      width: 100%;
      border: 1px solid ${COLORS.borderLightest};
      background: ${COLORS.backgroundLightest};
      transition: background 0.1s;
      &:hover {
        background: ${COLORS.backgroundLight};
      }
    `}
  &:focus {
    outline: none;
    ${props =>
      props.variant === 'normal' &&
      css`
        border: 1px solid ${COLORS.borderInputFocus};
        box-shadow: 0 0 0 1px ${COLORS.borderInputFocus};
        background: #fff;
      }
    `}
  }
  ${props =>
    props.invalid &&
    css`
      &,
      &:focus {
        border: 1px solid ${COLORS.danger};
        box-shadow: none;
      }
    `}
`;

export const ValueContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  ${props =>
    props.variant === 'normal' &&
    css`
      min-height: 32px;
      padding: 5px 5px 5px 10px;
    `}
`;

export const Placeholder = styled.div`
  color: ${COLORS.textLight};
`;

export const Dropdown = styled.div`
  z-index: 1000;
  position: absolute;
  top: 100%;
  left: 0;
  border-radius: 0 0 4px 4px;
  background: #fff;
  ${MIXIN.boxShadowDropdown}
  ${props => (props.width ? `width: ${props.width}px;` : 'width: 100%;')}
`;

export const Options = styled.div`
  max-height: 200px;
  ${MIXIN.scrollableY};
  ${MIXIN.customScrollbar()};
`;

export const Option = styled.div`
  padding: 8px 14px;
  word-break: break-word;
  cursor: pointer;
  &:last-of-type {
    margin-bottom: 8px;
  }
  &.jira-select-option-is-active {
    background: ${COLORS.backgroundLightPrimary};
  }
`;

export const OptionsNoResults = styled.div`
  padding: 5px 15px 15px;
  color: ${COLORS.textLight};
`;