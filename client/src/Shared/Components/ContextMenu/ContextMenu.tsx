import React from 'react';
import * as RadixContextMenu from '@radix-ui/react-context-menu';

const ContextMenu = ({ children }: RadixContextMenu.ContextMenuProps) => {
  return <RadixContextMenu.Root>{children}</RadixContextMenu.Root>
}

ContextMenu.Trigger = RadixContextMenu.Trigger;
ContextMenu.Content = RadixContextMenu.Content;
ContextMenu.Item = RadixContextMenu.Item;
ContextMenu.Label = RadixContextMenu.Label;
ContextMenu.Group = RadixContextMenu.Group;
ContextMenu.CheckBoxItem = RadixContextMenu.CheckboxItem;
ContextMenu.ItemIndicator = RadixContextMenu.ItemIndicator;
ContextMenu.RadioGroup = RadixContextMenu.RadioItem;
ContextMenu.TriggerItem = RadixContextMenu.TriggerItem;
ContextMenu.Separator = RadixContextMenu.Separator;

export default ContextMenu;