import styled from 'styled-components';
import {
  StyledInput,
  InputElement,
} from '../../shared/components/Input/Styles';
import { StyledSelect } from '../../shared/components/Select/Styles';

export const FilterElements = styled.div`
  display: flex;
  padding: 10px 2px;
`;

export const FilterStyledSelect = styled(StyledSelect)`
  margin-right: 10px;
  width: 100%;
`;

export const StyledSearch = styled(StyledInput)`
  ${InputElement} {
    padding: 18px 7px 18px 32px;
  }
`;
