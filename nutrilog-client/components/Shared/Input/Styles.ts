import styled, { css } from 'styled-components';
import { COLORS } from "../Utils/Colors";


export const StyledInput = styled.div`
  position: relative;
  display: inline-block;
  height: 32px;
  width: 100%;
`;

export const InputElement = styled.input.attrs((props: any) => ({
  type: props.type || 'text',
}))`
  height: 100%;
  width: 100%;
  padding: 0 7px;
  border-radius: 3px;
  border: 1px solid ${COLORS.borderLightest};
  background: ${COLORS.backgroundLightest};
  transition: background 0.1s;
  ${(props: any) => props.hasIcon && 'padding-left: 32px;'};

  &:hover {
    background: ${COLORS.backgroundLight};
  }

  &:focus {
    background: #fff;
    border: 1px solid ${COLORS.borderInputFocus};
    box-shadow: 0 0 0 1px ${COLORS.borderInputFocus};
  }

  ${(props: any) =>
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
