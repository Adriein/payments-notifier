import React from 'react';
import * as RadixContextMenu from '@radix-ui/react-context-menu';
import {
  StyledContextMenuContent,
  StyledContextMenuItem,
  StyledContextMenuLabel,
  StyledContextMenuSeparator
} from "./Styles";

const ContextMenu = ({ children }: RadixContextMenu.ContextMenuProps) => {
  return <RadixContextMenu.Root>{children}</RadixContextMenu.Root>
}

ContextMenu.Trigger = RadixContextMenu.Trigger;
ContextMenu.Content = StyledContextMenuContent;
ContextMenu.Item = StyledContextMenuItem;
ContextMenu.Label = StyledContextMenuLabel;
ContextMenu.Group = RadixContextMenu.Group;
ContextMenu.CheckBoxItem = RadixContextMenu.CheckboxItem;
ContextMenu.ItemIndicator = RadixContextMenu.ItemIndicator;
ContextMenu.RadioGroup = RadixContextMenu.RadioItem;
ContextMenu.TriggerItem = RadixContextMenu.TriggerItem;
ContextMenu.Separator = StyledContextMenuSeparator;

export default ContextMenu;