import styled from 'styled-components';
import {COLORS} from "../Utils/Colors";
import {font} from "../Utils/Font";


export const StyledField = styled.div`
  margin-top: 20px;
`;

export const FieldLabel = styled.label`
  display: block;
  padding-bottom: 5px;
  font-weight: 600;
  ${font.size(13)}
  color: ${COLORS.textMedium};
`;

export const FieldTip = styled.div`
  padding-top: 6px;
  ${font.size(12.5)}
  color: ${COLORS.textMedium};
`;

export const FieldError = styled.div`
  margin-top: 6px;
  line-height: 1;
  font-size: 12.5px;
  font-weight: 600;
  color: ${COLORS.danger};
`;
