import styled, { keyframes } from 'styled-components';
import { COLORS } from "../Utils/Colors";
import { font } from "../Utils/Font";

export const StyledInput = styled.input`
  height: 0;
  width: 0;
  opacity: 0;
  z-index: -1;
`;

const popIn = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1.5);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

export const StyledLabel = styled.label<any>`
  position: relative;
  display: inline-block;
  cursor: ${(props: any) => (props.disabled ? "not-allowed" : "pointer")};
  margin: 0.6em 1em;
  ${font.size(14)}
`;

export const StyledIndicator = styled.div`
  border: 1px solid ${COLORS.textLightGray};
  border-radius: 1em;
  width: 1.2em;
  height: 1.2em;
  position: absolute;
  top: 0;
  left: -1.5em;

  ${StyledLabel}:hover & {
    background: #ccc;
  }

  &::after {
    content: "";
    position: absolute;
    display: none;
  }

  ${StyledInput}:checked + &::after {
    display: block;
    border: solid ${COLORS.textLightGray};
    border-radius: 50%;
    background-color: ${COLORS.textLightGray};
    width: 10%;
    height: 10%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation-name: ${popIn};
    animation-duration: 0.3s;
    animation-fill-mode: forwards;
  }

  ${StyledInput}:disabled + & {
    pointer-events: none;
    opacity: 0.6;
    background: #e6e6e6;
  }
`;