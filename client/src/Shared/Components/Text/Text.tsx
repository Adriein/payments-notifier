import { TextProps } from "./TextProps";
import { StyledH1, StyledH2, StyledH3, StyledH4, StyledH5, StyledH6, StyledSubtitle } from "./Styles";
import { StyledComponent } from "styled-components";

const TYPE: { [key: string]: StyledComponent<any, any> } = {
  h1: StyledH1,
  h2: StyledH2,
  h3: StyledH3,
  h4: StyledH4,
  h5: StyledH5,
  h6: StyledH6,
  subtitle: StyledSubtitle,
}

const Text = ({ type, children, bold, color, ...otherProps }: TextProps) => {
  const Text = TYPE[type] as StyledComponent<any, any>;

  return <Text bold={bold} color={color} {...otherProps}>{children}</Text>;
}

export default Text;