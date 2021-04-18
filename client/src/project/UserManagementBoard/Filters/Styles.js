import styled from 'styled-components';
import Input from '../../../shared/components/Input/Input';
import { InputElement } from '../../../shared/components/Input/Styles';
import Select from '../../../shared/components/Select/Select';

export const FilterElements = styled.div`
  display: flex;
  padding: 10px 2px;
`;

export const FilterSelect = styled(Select)`
  margin-right: 10px;
  width: 100%;
`;

export const StyledSearch = styled(Input)`
  ${InputElement} {
    padding: 18px 7px 18px 32px;
  }
`;
