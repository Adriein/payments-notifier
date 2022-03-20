import React from 'react';
import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import { StyledDropDownContent, StyledDropDownItem, StyledDropdownSeparator } from "./Styles";

const DropdownMenu = ({ children }: RadixDropdownMenu.DropdownMenuProps) => {
  return <RadixDropdownMenu.Root>{children}</RadixDropdownMenu.Root>
}

DropdownMenu.Trigger = RadixDropdownMenu.Trigger;
DropdownMenu.Content = StyledDropDownContent;
DropdownMenu.Label = RadixDropdownMenu.Label;
DropdownMenu.Item = StyledDropDownItem;
DropdownMenu.Group = RadixDropdownMenu.Group;
DropdownMenu.CheckboxItem = RadixDropdownMenu.CheckboxItem;
DropdownMenu.ItemIndicator = RadixDropdownMenu.ItemIndicator;
DropdownMenu.RadioGroup = RadixDropdownMenu.RadioGroup;
DropdownMenu.RadioItem = RadixDropdownMenu.RadioItem;
DropdownMenu.TriggerItem = RadixDropdownMenu.TriggerItem;
DropdownMenu.Separator = StyledDropdownSeparator;
DropdownMenu.Arrow = RadixDropdownMenu.Arrow;

export default DropdownMenu;
