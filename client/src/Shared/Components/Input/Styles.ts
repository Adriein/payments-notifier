import styled, { css } from 'styled-components';
import { COLORS } from "../Utils/Colors";
import { InputProps } from "./InputProps";

export const StyledInput = styled.div`
  position: relative;
  display: inline-block;
  height: 32px;
  width: 100%;
`;

const BaseInputElement = styled.input.attrs((props: InputProps) => ({
  type: props.type || 'text',
  placeholder: props.placeholder
}))`
  font-family: inherit;
  height: 100%;
  width: 100%;
  border-radius: 3px;
  border: 1px solid ${COLORS.borderLightest};
  background: ${COLORS.backgroundLightest};
  transition: background 0.1s;
  padding: 5px;
  ${(props: InputProps) => props.hasIcon && 'padding-left: 32px;'};

  &:hover {
    background: ${COLORS.backgroundLight};
  }

  &:focus {
    background: #fff;
    border: 1px solid ${COLORS.borderInputFocus};
    box-shadow: 0 0 0 1px ${COLORS.borderInputFocus};
  }

  ${(props: InputProps) => {
    return props.invalid &&
            css`
              &,
              &:focus {
                border: 1px solid ${COLORS.danger};
                box-shadow: none;
              }
            `
  }}
`;

export const InputElement = styled(BaseInputElement)``;

export const InvertedInputElement = styled(BaseInputElement)`
  border-radius: 8px;
  background: ${COLORS.backgroundWhite};
  color: ${COLORS.textMedium};
  border: 1px solid ${COLORS.backgroundWhite};

  &:hover {
    background: ${COLORS.backgroundWhite};
  }

  &::placeholder {
    color: ${COLORS.textLightGray};
  }
`;


export const StyledIcon = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  pointer-events: none;
  color: ${COLORS.textLightGray};
`;
