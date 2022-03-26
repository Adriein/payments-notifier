import styled, { ThemedStyledInterface } from 'styled-components';
import * as SelectPrimitive from '@radix-ui/react-select';
import { COLORS } from "../Utils/Colors";
import { MIXIN } from "../Utils/Mixin";
import React from "react";

export const StyledSelectRoot = styled(SelectPrimitive.Root)`

`;

export const StyledSelectTrigger = styled(
  SelectPrimitive.Trigger)`
  all: unset;
  display: inline-flex;
  padding: 5px;
  border: 1px solid ${COLORS.borderLightest};
  background-color: ${COLORS.backgroundLightest};
  border-radius: 3px;

  box-sizing: inherit;
  width: 100%;

  &:hover {
    background: ${COLORS.backgroundLight};
  }

  &:focus {
    background: #fff;
    border: 1px solid ${COLORS.borderInputFocus};
    box-shadow: 0 0 0 1px ${COLORS.borderInputFocus};
  }
`;

export const StyledSelectContent = styled(SelectPrimitive.Content)`
  overflow: hidden;
  background-color: ${COLORS.backgroundWhite};
  border-radius: 6px;
  box-shadow: 0 10px 38px -10px rgba(22, 23, 24, 0.35), 0 10px 20px -15px rgba(22, 23, 24, 0.2);
`;

export const StyledSelectViewport = styled(SelectPrimitive.Viewport)`
  padding: 5px;
`;

export const StyledSelectItem = styled(SelectPrimitive.Item)`
  all: unset;
  border-radius: 3px;
  display: flex;
  align-items: center;
  height: 25px;
  padding: 0 35px 0 25px;
  position: relative;


  &[data-disabled] {
    color: ${COLORS.textMedium};
  }

  &:focus {
    background-color: ${COLORS.primary};
    color: ${COLORS.backgroundWhite};
  }

  ${MIXIN.clickable};
`;

export const StyledSelectedValue = styled(SelectPrimitive.Icon)`
  margin-left: auto;
`;

