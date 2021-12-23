import styled, { css } from 'styled-components';
import { COLORS } from '../../utils/colors';

export const StyledTextarea = styled.div`
  display: inline-block;
  width: 100%;
  textarea {
    overflow-y: hidden;
    width: 100%;
    padding: 8px 12px 9px;
    border-radius: 3px;
    border: 1px solid ${COLORS.borderLightest};
    color: ${COLORS.textDarkest};
    background: ${COLORS.backgroundLightest};
    font-size: 15px;
    &:focus {
      background: #fff;
      border: 1px solid ${COLORS.borderInputFocus};
      box-shadow: 0 0 0 1px ${COLORS.borderInputFocus};
    }
    ${(props) =>
      props.invalid &&
      css`
        &,
        &:focus {
          border: 1px solid ${COLORS.danger};
        }
      `}
  }
`;
