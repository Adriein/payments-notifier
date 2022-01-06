import styled from 'styled-components';
import Form from "../../../Shared/Components/Form";
import Button from "../../../Shared/Components/Button";
import { COLORS } from "../../../Shared/Components/Utils/Colors";
import { font } from "../../../Shared/Components/Utils/Font";
import { Link } from "react-router-dom";


export const StyledFormElement = styled(Form.Element)`
  padding: 35px;
`;

export const StyledFormHeading = styled.div`
  ${font.size(32)};
  margin-bottom: 5px;
`;

export const StyledFormSubHeading = styled.div`
  ${font.size(14)};
  margin-bottom: 20px;
`;

export const StyledLink = styled(Link)`
  color: ${COLORS.primary};
  font-weight: 500;

  &:hover {
    color: ${COLORS.primaryLight}
  }
`;

export const StyledFormInput = styled(Form.Field.Input)`
  margin-bottom: 10px;
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