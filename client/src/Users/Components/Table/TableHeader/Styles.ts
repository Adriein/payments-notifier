import styled from 'styled-components';
import { COLORS } from "../../../../Shared/Components/Utils/Colors";
import Form from "../../../../Shared/Components/Form";

export const StyledContainer = styled.div`
  width: 100%;
  border-radius: 8px;
  background-color: ${COLORS.backgroundLightGray};
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 40px;
`;

export const StyledFilterForm = styled(Form.Element)`
  width: 100%;
`;