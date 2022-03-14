import styled from "styled-components";
import { COLORS } from "../../../../Shared/Components/Utils/Colors";

export const StyledUserResume = styled.div`
  margin-top: 30px;
  border: 2px solid ${COLORS.backgroundMediumGray};
  border-radius: 10px;
  display: flex;
`;

export const StyledProfileResumePart = styled.div<{ part?: 'middle' }>`
  ${({ part }) => {
    return part && {
      'border-left': `2px solid ${COLORS.backgroundMediumGray}`,
      'border-right': `2px solid ${COLORS.backgroundMediumGray}`
    }
  }};
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  gap: 5px;
  min-width: 100px;
  padding: 8px;
`;