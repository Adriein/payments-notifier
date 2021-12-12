import styled from 'styled-components';
import Form from "../../../Shared/Form/Form";

export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
`;

export const FormElement = styled(Form.Element)`
  padding: 25px 40px 35px;
`;