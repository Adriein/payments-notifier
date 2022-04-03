import { HistorySubscriptionProps } from "./HistorySubscriptionProps";
import {
  StyledScrollArea, StyledScrollBar, StyledScrollContent,
  StyledThumb, StyledViewport
} from "../Shared/Styles";
import Text from "../../../../Shared/Components/Text";
import React, { useContext } from "react";
import { StyledSubscriptionHistoryContainer } from "./Styles";
import SubscriptionResume from "../SubscriptionResume";
import { UsersContext } from "../../../Context/UsersContext";
import { Subscription } from "../../../Models/Subscription";

const HistorySubscription = ({ inactiveSubscriptions, clientId }: HistorySubscriptionProps) => {
  const { t } = useContext(UsersContext);

  return (
    <StyledSubscriptionHistoryContainer>
      <Text type={"h2"}>{t('profile:subscription_history')}</Text>
      <StyledScrollArea height={398}>
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
                  clientId={clientId}
                  pricingId={subscription.pricing.id}
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