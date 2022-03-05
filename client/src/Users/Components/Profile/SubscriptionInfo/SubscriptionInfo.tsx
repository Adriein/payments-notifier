import { SubscriptionInfoProps } from "./SubscriptionInfoProps";
import Text from "../../../../Shared/Components/Text";
import {
  StyledActiveSubscription,
  StyledDetailsContainer, StyledSeparator, StyledSubscriptionInfoContainer,
  StyledSubscriptionTitle,
  StyledTitleContainer
} from "./Styles";
import Badge from "../../../../Shared/Components/Badge";
import useDateFormatter from "../../../../Shared/Hooks/useDateFormatter";

const firstLetterUpperCase = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

const SubscriptionInfo = ({ subscription }: SubscriptionInfoProps) => {
  const activeSubscription = subscription[0];
  const { format } = useDateFormatter();


  return (
    <StyledSubscriptionInfoContainer>
      <Text type={"h2"}>Active Subscription</Text>
      <StyledActiveSubscription>
        <StyledTitleContainer>
          <StyledSubscriptionTitle
            type={"h3"}>{firstLetterUpperCase(activeSubscription.pricing.name)}</StyledSubscriptionTitle>
          <Badge text={"Active"}/>
        </StyledTitleContainer>
        <StyledDetailsContainer>
          <span>Duration {activeSubscription.pricing.duration} days</span>
          <StyledSeparator decorative orientation="vertical"/>
          <span>Price {activeSubscription.pricing.price} €</span>
          <StyledSeparator decorative orientation="vertical"/>
          <span>Valid to {format(activeSubscription.validTo)}</span>
        </StyledDetailsContainer>
        <Text type={"subtitle"}>Events</Text>
      </StyledActiveSubscription>
      <Text type={"h2"}>History</Text>
    </StyledSubscriptionInfoContainer>
  );
}

export default SubscriptionInfo;