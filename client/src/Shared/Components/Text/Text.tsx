import { TextProps } from "./TextProps";
import { StyledH1, StyledSubtitle } from "./Styles";
import { StyledComponent } from "styled-components";

const TYPE: { [key: string]: StyledComponent<any, any> } = {
  h1: StyledH1,
  h2: StyledH1,
  h3: StyledH1,
  h4: StyledH1,
  h5: StyledH1,
  subtitle: StyledSubtitle,
}

const Text = ({ type, children, bold, color, ...otherProps }: TextProps) => {
  const Text = TYPE[type] as StyledComponent<any, any>;

  return <Text bold={bold} color={color} {...otherProps}>{children}</Text>;
}

export default Text;