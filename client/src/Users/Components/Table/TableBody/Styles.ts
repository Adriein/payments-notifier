import styled from 'styled-components';
import { COLORS } from "../../../../Shared/Components/Utils/Colors";
import { MIXIN } from "../../../../Shared/Components/Utils/Mixin";

export const StyledTableContainer = styled.ul`
  border: 2px solid ${COLORS.backgroundMediumGray};
  border-radius: 8px;
`;

export const StyledTableRow = styled.li<any>`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  ${(props: any) => !props.isLast && `border-bottom: 2px solid ${COLORS.backgroundMediumGray}`};
  padding: 15px;

  ${MIXIN.clickable}
  &:hover {
    background-color: ${COLORS.backgroundLightGray};
  }
`;

export const StyledTableCell = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;