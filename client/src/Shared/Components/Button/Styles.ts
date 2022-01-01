import styled, { StyledComponent } from 'styled-components';
import { COLORS } from "../Utils/Colors";
import { font } from "../Utils/Font";
import { MIXIN } from "../Utils/Mixin";

const ButtonBase = styled.button`
  display: flex;
  align-items: center;
  font-size: var(--fontSize);
  ${font.regular}
  padding: var(--padding);
  border-radius: var(--borderRadius);
  border: 2px solid transparent;

  ${MIXIN.clickable}
  &:focus {
    outline-color: ${COLORS.primary};
    outline-offset: 4px;
  }
`;

export const StyledFillButton = styled<StyledComponent<"button", any, any, never>>(ButtonBase)`
  background-color: ${COLORS.primary};
  color: ${COLORS.secondary};

  &:hover {
    background-color: ${COLORS.primaryLight};
  }
`;

export const StyledRadioIconButton = styled<StyledComponent<"button", any, any, never>>(ButtonBase)`
  color: ${COLORS.gray};
  background-color: transparent;
  border-radius: 50%;
  font-size: 16px;

  &:focus {
    outline-color: ${COLORS.lightGray};
  }

  &:hover {
    background: ${COLORS.lightGray};
    color: ${COLORS.black};
  }
`;