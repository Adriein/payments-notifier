import styled from 'styled-components';
import { font } from "../Utils/Font";
import { COLORS } from "../Utils/Colors";

export const StyledH1 = styled.h1``;

export const StyledSubtitle = styled.p<{ bold?: boolean, color?: string }>`
  ${font.size(14)};
  ${(props) => props.bold && font.bold};
  ${(props) => props.color ? `color: ${props.color}` : `color: ${COLORS.textMedium}`};
`;