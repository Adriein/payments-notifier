import React from 'react';
import { StyledMenuButton, StyledMenuList, StyledMenuItem } from './Styles';
import { Menu as ReachMenu } from "@reach/menu-button";

interface MenuButtonProps {
  size: 'sm' | 'md' | 'lg';
  children: any
}

const SIZES = {
  sm: {
    "--borderRadius": "4px",
    "--fontSize": "14px",
    "--padding": "8px"
  },
  md: {
    "--borderRadius": "2px",
    "--fontSize": 18 / 16 + "rem",
    "--padding": "12px 20px"
  },
  lg: {
    "--borderRadius": "4px",
    "--fontSize": 21 / 16 + "rem",
    "--padding": "16px 32px"
  }
};

const MenuButton = ({ size, children }: MenuButtonProps) => {
  const styles = SIZES[size];
  return (
    <StyledMenuButton style={styles}>
      {children}
    </StyledMenuButton>
  );
}

MenuButton.Menu = ReachMenu;
MenuButton.MenuList = StyledMenuList;
MenuButton.MenuItem = StyledMenuItem;


export default MenuButton;