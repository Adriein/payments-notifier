import styled from 'styled-components';
import { font } from "../Utils/Font";
import { MIXIN } from "../Utils/Mixin";
import { COLORS } from "../Utils/Colors";
import {
  MenuButton as ReachMenuButton,
  MenuItem as ReachMenuItem,
  MenuList as ReachMenuList,
} from "@reach/menu-button";

export const StyledMenuButton = styled<any>(ReachMenuButton)`
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
  background-color: ${COLORS.backgroundWhite};
  color: ${COLORS.black};
  ${MIXIN.clickable};

  &:focus {
    outline-color: ${COLORS.primary};
    outline-offset: 4px;
  }

  &:hover {
    background: ${COLORS.lightGray};
    color: ${COLORS.black};
  }
`;

export const StyledMenuList = styled(ReachMenuList)`
  border: 1px solid ${COLORS.backgroundLightGray};
  border-radius: 5px;
  margin-top: 10px;
  background-color: ${COLORS.backgroundWhite};
  padding: 10px;
  ${MIXIN.boxShadowDropdown}
`;

export const StyledMenuItem = styled(ReachMenuItem)`
  ${font.size(14)}
  padding: 10px;
  border-radius: 5px;

  ${MIXIN.clickable}
  &:hover {
    background-color: ${COLORS.backgroundLightGray};
  }
`;