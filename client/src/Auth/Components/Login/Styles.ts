import styled from 'styled-components';
import Form from "../../../Shared/Components/Form";
import Button from "../../../Shared/Components/Button";
import { COLORS } from "../../../Shared/Components/Utils/Colors";


export const StyledFormElement = styled(Form.Element)`
  padding: 35px;
`;

export const StyledFormHeading = styled.div`
  font-size: 32px;
  margin-bottom: 20px;
`;

export const StyledFormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 30px;
`;

export const StyledFormActionButton = styled(Button)`
  margin-left: 10px;
`;

export const StyledFormTitleSpan = styled.span`
  color: ${COLORS.primary};
`;