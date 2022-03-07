import { StyledBadge } from "./Styles";
import { BadgeProps } from "./BadgeProps";

const Badge = ({ text, ...props }: BadgeProps) => {
  return <StyledBadge {...props}>{text}</StyledBadge>
}

export default Badge;