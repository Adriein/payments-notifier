import * as SelectPrimitive from '@radix-ui/react-select';
import {
  StyledSelectContent,
  StyledSelectItem,
  StyledSelectRoot,
  StyledSelectTrigger,
  StyledSelectViewport
} from "./Styles";

const Select = ({
  onChange,
  children,
  ...otherProps
}: SelectPrimitive.SelectProps & { onChange: (value: string) => void }) => {
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
Select.Icon = SelectPrimitive.Icon;
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