import { StyledInput, StyledLabel, StyledIndicator } from './Styles';

const Checkbox = ({
  value,
  onChange,
  name,
  id,
  disabled,
  checked,
  children
}: any) => {
  return (
    <StyledLabel htmlFor={id} disabled={disabled}>
      {children}
      <StyledInput
        id={id}
        type="radio"
        role="radio"
        name={name}
        value={value}
        disabled={disabled}
        onChange={onChange}
        checked={checked}
      />
      <StyledIndicator/>
    </StyledLabel>
  );
}


export default Checkbox;
