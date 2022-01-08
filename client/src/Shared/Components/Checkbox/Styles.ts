import styled from 'styled-components';
import { COLORS } from "../Utils/Colors";
import { font } from "../Utils/Font";

export const Input = styled.input.attrs(() => ({ type: 'radio' }))`
  display: none;
`;

export const Label = styled.label<any>`
  position: relative;
  cursor: pointer;
  margin-left: 24px;

  ${font.size(14)}
  &::before {
    content: '';
    position: absolute;
    left: -24px;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 1px solid #6f686a;
  }

  &::after {
    content: '';
    position: absolute;
    left: -20px;
    top: 4px;
    border-radius: 50%;
    width: 9px;
    height: 9px;
    background: ${COLORS.primary};
    ${(props) => !props.checked && 'display: none'}
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
`;
