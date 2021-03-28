import styled from 'styled-components';

import { COLORS } from '../../utils';

export const StyledField = styled.div`
  margin-top: 20px;
`;

export const FieldLabel = styled.label`
  display: block;
  padding-bottom: 5px;
  color: ${COLORS.textMedium};
`;

export const FieldTip = styled.div`
  padding-top: 6px;
  color: ${COLORS.textMedium};
`;

export const FieldError = styled.div`
  margin-top: 6px;
  line-height: 1;
  color: ${COLORS.danger};
`;
