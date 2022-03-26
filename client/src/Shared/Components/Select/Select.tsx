import * as SelectPrimitive from '@radix-ui/react-select';
import {
  StyledSelectContent, StyledSelectedValue,
  StyledSelectItem,
  StyledSelectRoot,
  StyledSelectTrigger,
  StyledSelectViewport
} from "./Styles";

const Select = ({
  onChange,
  children,
  ...otherProps
}: SelectPrimitive.SelectProps & { onChange: (value: string) => void, fullWidth?: boolean }) => {
  return (
    <StyledSelectRoot
      onValueChange={onChange}
      {...otherProps}
    >
      {children}
    </StyledSelectRoot>)
}

Select.Trigger = StyledSelectTrigger;
Select.Value = SelectPrimitive.Value;
Select.Icon = StyledSelectedValue;
Select.Content = StyledSelectContent;
Select.ScrollUpButton = SelectPrimitive.ScrollUpButton;
Select.ScrollDownButton = SelectPrimitive.ScrollDownButton;
Select.Item = StyledSelectItem;
Select.ItemText = SelectPrimitive.ItemText;
Select.ItemIndicator = SelectPrimitive.ItemIndicator;
Select.Group = SelectPrimitive.Group;
Select.Label = SelectPrimitive.Label;
Select.Separator = SelectPrimitive.Separator;
Select.Viewport = StyledSelectViewport;

export default Select;