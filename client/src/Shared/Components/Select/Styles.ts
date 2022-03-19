import styled from 'styled-components';
import * as SelectPrimitive from '@radix-ui/react-select';
import { COLORS } from "../Utils/Colors";

export const StyledSelectRoot = styled(SelectPrimitive.Root)`

`;

export const StyledSelectTrigger = styled(SelectPrimitive.Trigger)`
  all: unset;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  gap: 5px;
  border: 1px solid ${COLORS.borderLightest};
  background-color: ${COLORS.backgroundLightest};
  border-radius: 3px;
  
  &:hover {
    background: ${COLORS.backgroundLight};
  }

  &:focus {
    background: #fff;
    border: 1px solid ${COLORS.borderInputFocus};
    box-shadow: 0 0 0 1px ${COLORS.borderInputFocus};
  }

`;