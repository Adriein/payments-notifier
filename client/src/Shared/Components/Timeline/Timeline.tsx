import {
  StyledBullet,
  StyledBulletContainer,
  StyledTimeLineBar,
  StyledTimeLineBulletContainer,
  StyledTimeLineContainer,
  StyledTimeLineItemContainer, StyledTimeLineItemContent, StyledTimeLineItemTitle
} from "./Styles";
import { TimelineItemProps } from "./TimelineItemProps";
import { TimelineProps } from "./TimelineProps";
import { StringHelper } from "../../Services/StringHelper";

const Timeline = ({ children }: TimelineProps) => {
  return <StyledTimeLineContainer>{children}</StyledTimeLineContainer>
}

Timeline.Item = ({ title, bullet, children, isLast }: TimelineItemProps) => {
  return (
    <StyledTimeLineItemContainer>
      <StyledTimeLineBulletContainer>
        <StyledBulletContainer>
          <StyledBullet>{bullet}</StyledBullet>
        </StyledBulletContainer>
        {!isLast && <StyledTimeLineBar/>}
      </StyledTimeLineBulletContainer>
      <StyledTimeLineItemContent>
        <StyledTimeLineItemTitle type={"h3"}>{StringHelper.firstLetterToUpperCase(title)}</StyledTimeLineItemTitle>
        {children}
      </StyledTimeLineItemContent>
    </StyledTimeLineItemContainer>
  )
}

export default Timeline;