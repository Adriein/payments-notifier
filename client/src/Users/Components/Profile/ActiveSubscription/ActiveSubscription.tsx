import { ActiveSubscriptionProps } from "./ActiveSubscriptionProps";
import React from "react";
import SubscriptionResume from "../SubscriptionResume";
import Text from "../../../../Shared/Components/Text";
import {
  StyledSubscriptionInfoContainer,
} from "./Styles";

import { useTranslation } from "react-i18next";

const ActiveSubscription = ({ subscription }: ActiveSubscriptionProps) => {
  const { t } = useTranslation('profile');
  return (
    <StyledSubscriptionInfoContainer>
      <Text type={"h2"}>{t('subscription_active')}</Text>
      <SubscriptionResume
        name={subscription.pricing.name}
        duration={subscription.pricing.duration}
        price={subscription.pricing.price}
        validTo={subscription.validTo}
      />
    </StyledSubscriptionInfoContainer>

  )
}

export default ActiveSubscription;