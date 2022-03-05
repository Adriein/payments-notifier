import styled from 'styled-components';
import { font } from "../Utils/Font";
import { COLORS } from "../Utils/Colors";

export const StyledH1 = styled.h1``;
export const StyledH2 = styled.h2``;
export const StyledH3 = styled.h3``;
export const StyledH4 = styled.h4``;
export const StyledH5 = styled.h5``;
export const StyledH6 = styled.h6``;

export const StyledSubtitle = styled.p<{ bold?: boolean, color?: string }>`
  ${font.size(14)};
  ${(props) => props.bold && font.bold};
  ${(props) => props.color ? `color: ${props.color}` : `color: ${COLORS.textMedium}`};
`;