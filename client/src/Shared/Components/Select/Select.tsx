import * as SelectPrimitive from '@radix-ui/react-select';
import { StyledSelectRoot, StyledSelectTrigger } from "./Styles";

const Select = ({ children, ...otherProps }: SelectPrimitive.SelectProps) => {
  return <StyledSelectRoot {...otherProps}>{children}</StyledSelectRoot>
}

Select.Trigger = StyledSelectTrigger;
Select.Value = SelectPrimitive.Value;
Select.Icon = SelectPrimitive.Icon;
Select.Content = SelectPrimitive.Content;
Select.ScrollUpButton = SelectPrimitive.ScrollUpButton;
Select.ScrollDownButton = SelectPrimitive.ScrollDownButton;
Select.Item = SelectPrimitive.Item;
Select.ItemText = SelectPrimitive.ItemText;
Select.ItemIndicator = SelectPrimitive.ItemIndicator;
Select.Group = SelectPrimitive.Group;
Select.Label = SelectPrimitive.Label;
Select.Separator = SelectPrimitive.Separator;
Select.Viewport = SelectPrimitive.Viewport;

export default Select;