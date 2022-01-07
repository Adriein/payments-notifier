import styled, { StyledComponent } from 'styled-components';
import { COLORS } from "../Utils/Colors";
import { font } from "../Utils/Font";
import { MIXIN } from "../Utils/Mixin";

const ButtonBase = styled.button`
  display: inline-flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  line-height: 1;
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
  color: ${COLORS.backgroundWhite};

  &:hover {
    background-color: ${COLORS.primaryLight};
  }
`;

export const StyledOutlineButton = styled<StyledComponent<"button", any, any, never>>(ButtonBase)`
  background-color: ${COLORS.backgroundWhite};
  color: ${COLORS.textLightGray};

  &:hover {
    background-color: ${COLORS.primary};
    color: ${COLORS.backgroundWhite};
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

export const StyledIcon = styled.div`
  color: ${COLORS.backgroundWhite};
  position: relative;
  top: 1px;
`;