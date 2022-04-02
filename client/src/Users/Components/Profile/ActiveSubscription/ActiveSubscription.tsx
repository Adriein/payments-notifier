import { ActiveSubscriptionProps } from "./ActiveSubscriptionProps";
import React, { useContext } from "react";
import SubscriptionResume from "../SubscriptionResume";
import Text from "../../../../Shared/Components/Text";
import {
  StyledSubscriptionInfoContainer,
} from "./Styles";
import { UsersContext } from "../../../Context/UsersContext";

const ActiveSubscription = ({ subscription, clientId }: ActiveSubscriptionProps) => {
  const { t } = useContext(UsersContext);
  return (
    <StyledSubscriptionInfoContainer>
      <Text type={"h2"}>{t('profile:subscription_active')}</Text>
      <SubscriptionResume
        name={subscription.pricing.name}
        duration={subscription.pricing.duration}
        price={subscription.pricing.price}
        validTo={subscription.validTo}
        expired={subscription.isExpired}
        pricingId={subscription.pricing.id}
        clientId={clientId}
      />
    </StyledSubscriptionInfoContainer>

  )
}

export default ActiveSubscription;