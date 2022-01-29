import styled from 'styled-components';
import { COLORS } from "../../../../Shared/Components/Utils/Colors";
import { font } from "../../../../Shared/Components/Utils/Font";
import Button from "../../../../Shared/Components/Button";

export const StyledContainer = styled.div`
  width: 100%;
  ${font.size(14)}
  border-radius: 8px;
  background-color: ${COLORS.backgroundLightGray};
  padding: 10px;
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

export const StyledControlPageButton = styled(Button)`
  border-radius: 10px;
  background-color: ${COLORS.backgroundWhite};
  color: ${COLORS.black};
`