import styled from 'styled-components';
import { COLORS } from "../../../../Shared/Components/Utils/Colors";
import Input from "../../../../Shared/Components/Input";

export const StyledContainer = styled.div`
  width: 100%;
  border-radius: 8px;
  background-color: ${COLORS.backgroundLightGray};
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 40px;
`;

export const StyledFilterForm = styled.div`
  flex-grow: 1;
`;

export const StyledSearchInput = styled<any>(Input)`
`;