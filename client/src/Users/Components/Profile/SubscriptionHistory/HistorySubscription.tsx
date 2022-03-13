import { HistorySubscriptionProps } from "./HistorySubscriptionProps";
import {
  StyledScrollArea, StyledScrollBar, StyledScrollContent, StyledSubscriptionInfoContainer,
  StyledThumb, StyledViewport
} from "../Shared/Styles";
import Text from "../../../../Shared/Components/Text";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyledSubscriptionHistoryContainer } from "./Styles";
import { Subscription } from "../../../types";
import SubscriptionResume from "../SubscriptionResume";

const HistorySubscription = ({ inactiveSubscriptions }: HistorySubscriptionProps) => {
  const { t } = useTranslation('profile');

  return (
    <StyledSubscriptionHistoryContainer>
      <Text type={"h2"}>{t('subscription_history')}</Text>
      <StyledScrollArea height={300}>
        <StyledViewport>
          <StyledScrollContent>
            {inactiveSubscriptions.map((subscription: Subscription, index: number) => {
              if (index === 0) {
                return null;
              }
              return (
                <SubscriptionResume
                  key={index}
                  name={subscription.pricing.name}
                  duration={subscription.pricing.duration}
                  price={subscription.pricing.price}
                  validTo={subscription.validTo}
                  expired={subscription.isExpired}
                />
              );
            })}
          </StyledScrollContent>
        </StyledViewport>
        <StyledScrollBar>
          <StyledThumb/>
        </StyledScrollBar>
      </StyledScrollArea>
    </StyledSubscriptionHistoryContainer>
  );
}

export default HistorySubscription;