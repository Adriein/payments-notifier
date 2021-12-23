import styled from 'styled-components';
import Button from '../../shared/components/Button/Button';
import Form from '../../shared/components/Form/Form';


import { COLORS } from '../../shared/utils/colors';

export const FormElement = styled(Form.Element)`
  padding: 25px 40px 35px;
`;

export const FormHeading = styled.div`
  padding-bottom: 15px;
  font-size: 21px;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 30px;
`;

export const ActionButton = styled(Button)`
  margin-left: 10px;
`;

export const TitleSpan = styled.span`
  color: ${COLORS.primary};
  margin-right: 6px;
`;