import styled from 'styled-components';
import { COLORS } from "../../../../Shared/Components/Utils/Colors";

export const StyledTableContainer = styled.ul`
  border: 1px solid ${COLORS.black};
  border-radius: 8px;
`;

export const StyledTableRow = styled.li<any>`
  display: flex;
  align-items: center;
  ${(props: any) => !props.isLast && `border-bottom: 1px solid ${COLORS.black}`};
  padding: 15px;
  gap: 20px;
`;