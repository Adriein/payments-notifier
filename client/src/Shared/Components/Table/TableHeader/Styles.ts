import styled from 'styled-components';
import { COLORS } from "../../Utils/Colors";
import Input from "../../Input";

export const StyledContainer = styled.div`
  width: 100%;
  border-radius: 8px;
  background-color: ${COLORS.backgroundLightGray};
  padding: 20px;
`;

export const StyledFilterForm = styled.div`
  flex-grow: 1;
`;

export const StyledSearchInput = styled<any>(Input)`
`;