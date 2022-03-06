import { SubscriptionInfoProps } from "./SubscriptionInfoProps";
import Text from "../../../../Shared/Components/Text";
import {
  StyledActiveSubscription,
  StyledDetailsContainer, StyledOptionContainer, StyledOptionsIcon,
  StyledScrollArea,
  StyledScrollBar,
  StyledScrollContent,
  StyledSeparator,
  StyledSubscriptionInfoContainer,
  StyledSubscriptionTitle, StyledThumb,
  StyledTitleContainer,
  StyledViewport
} from "./Styles";
import Badge from "../../../../Shared/Components/Badge";
import useDateFormatter from "../../../../Shared/Hooks/useDateFormatter";
import { useTranslation } from "react-i18next";
import { SubscriptionHistory } from "../../../types";
import React from "react";
import { FiMoreVertical } from "react-icons/fi";

const firstLetterUpperCase = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

const SubscriptionInfo = ({ subscription }: SubscriptionInfoProps) => {
  const activeSubscription = subscription[0];
  const { format } = useDateFormatter();
  const { t } = useTranslation('profile');
  console.log(subscription)
  return (
    <StyledSubscriptionInfoContainer>
      <Text type={"h2"}>{t('subscription_active')}</Text>
      <StyledActiveSubscription>
        <StyledTitleContainer>
          <StyledSubscriptionTitle
            type={"h3"}>{firstLetterUpperCase(activeSubscription.pricing.name)}</StyledSubscriptionTitle>
          <Badge text={"Active"}/>
          <StyledOptionContainer>
            <StyledOptionsIcon/>
          </StyledOptionContainer>
        </StyledTitleContainer>
        <StyledDetailsContainer>
          <span>Duration {activeSubscription.pricing.duration} days</span>
          <StyledSeparator decorative orientation="vertical"/>
          <span>Price {activeSubscription.pricing.price} €</span>
          <StyledSeparator decorative orientation="vertical"/>
          <span>Valid to {format(activeSubscription.validTo)}</span>
        </StyledDetailsContainer>
      </StyledActiveSubscription>
      <Text type={"subtitle"}>Events</Text>
      <StyledScrollArea>
        <StyledViewport>
          <StyledScrollContent>
            {activeSubscription.history.map((event: SubscriptionHistory, index: number) => {
              return <span key={index}>{event.event} at {format(event.createdAt)}</span>
            })}
          </StyledScrollContent>
        </StyledViewport>
        <StyledScrollBar>
          <StyledThumb/>
        </StyledScrollBar>
      </StyledScrollArea>
      <Text type={"h2"}>History</Text>
    </StyledSubscriptionInfoContainer>
  );
}

export default SubscriptionInfo;