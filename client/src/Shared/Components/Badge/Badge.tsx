import { StyledBadge } from "./Styles";
import { BadgeProps } from "./BadgeProps";

const Badge = ({ text }: BadgeProps) => {
  return <StyledBadge>{text}</StyledBadge>
}

export default Badge;