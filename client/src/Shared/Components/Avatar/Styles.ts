import styled from 'styled-components';
import { font } from "../Utils/Font";

interface StyledLetterProps {
  size: number;
  color: string;
}


export const StyledLetter = styled.div<StyledLetterProps>`
  display: inline-block;
  width: ${(props: StyledLetterProps) => props.size}px;
  height: ${(props: StyledLetterProps) => props.size}px;
  border-radius: 100%;
  text-transform: uppercase;
  color: #fff;
  background: ${(props: StyledLetterProps) => props.color};
  font-weight: 600;
  padding: ${(props: StyledLetterProps) => props.size - 15}px;

  ${(props: StyledLetterProps) => font.size(Math.round(props.size / 1.7))}
  & > span {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
`;