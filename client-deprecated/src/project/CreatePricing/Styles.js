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

export const SelectItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 15px;
  ${props => props.withBottomMargin && `margin-bottom: 5px;`}
`;

export const SelectItemLabel = styled.div`
  padding: 0 3px 0 6px;
`;

export const Divider = styled.div`
  margin-top: 22px;
  border-top: 1px solid ${COLORS.borderLightest};
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 30px;
`;

export const ActionButton = styled(Button)`
  margin-left: 10px;
`;