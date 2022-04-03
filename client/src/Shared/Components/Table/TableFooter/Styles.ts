import styled from 'styled-components';
import { COLORS } from "../../Utils/Colors";
import { font } from "../../Utils/Font";
import ActionIcon from "../../ActionIcon";

export const StyledContainer = styled.div`
  width: 100%;
  ${font.size(14)}
  border-radius: 8px;
  background-color: ${COLORS.backgroundLightGray};
  padding: 20px;
  display: flex;
  align-items: center;
`;

export const StyledPaginationInfo = styled.div`
  flex-grow: 1;
`;

export const StyledPagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;
export const StyledCurrentPage = styled.p`
`;

export const StyledPaginationButtons = styled.div`
  display: flex;
  gap: 10px;
`;

export const StyledControlPageButton = styled(ActionIcon)`
  border-radius: 10px;
  background-color: ${COLORS.backgroundWhite};
  color: ${COLORS.black};
`