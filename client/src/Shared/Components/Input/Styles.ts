import styled, { css } from 'styled-components';
import { COLORS } from "../Utils/Colors";

export const StyledInput = styled.div`
  position: relative;
  display: inline-block;
  height: 32px;
  width: 100%;
`;

export const InputElement = styled.input.attrs((props: { type?: string, hasIcon?: boolean, invalid?: boolean, placeholder?: string }) => ({
  type: props.type || 'text',
  placeholder: props.placeholder
}))`
  height: 100%;
  width: 100%;
  border-radius: 3px;
  border: 1px solid ${COLORS.borderLightest};
  background: ${COLORS.backgroundLightest};
  transition: background 0.1s;
  ${(props: { type?: string, hasIcon?: boolean, invalid?: boolean }) => props.hasIcon && 'padding-left: 32px;'};

  &:hover {
    background: ${COLORS.backgroundLight};
  }

  &:focus {
    background: #fff;
    border: 1px solid ${COLORS.borderInputFocus};
    box-shadow: 0 0 0 1px ${COLORS.borderInputFocus};
  }

  ${(props: { type?: string, hasIcon?: boolean, invalid?: boolean }) =>
          props.invalid &&
          css`
            &,
            &:focus {
              border: 1px solid ${COLORS.danger};
              box-shadow: none;
            }
          `}
`;

export const StyledIcon = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  pointer-events: none;
  color: ${COLORS.textMedium};
`;
