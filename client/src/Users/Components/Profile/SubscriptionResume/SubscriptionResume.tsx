import React from "react";

import useDateFormatter from "../../../../Shared/Hooks/useDateFormatter";
import { useTranslation } from "react-i18next";

import Text from "../../../../Shared/Components/Text";

import {
  StyledActiveSubscription,
  StyledDetailsContainer,
  StyledOptionContainer,
  StyledTitleContainer,
  StyledOptionsIcon,
  StyledSeparator, ActiveBadge, ExpiredBadge,
} from './Styles'
import { SubscriptionResumeProps } from "./SubscriptionResumeProps";

const firstLetterUpperCase = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

const SubscriptionResume = ({ name, price, validTo, duration, expired }: SubscriptionResumeProps) => {
  const { format } = useDateFormatter();
  const { t } = useTranslation('profile');
  console.log(expired)
  return (
    <StyledActiveSubscription>
      <StyledTitleContainer>
        <Text type={"h3"}>{firstLetterUpperCase(name)}</Text>
        {expired ? <ExpiredBadge text={t('subscription_badge_expired')}/> :
          <ActiveBadge text={t('subscription_badge_active')}/>}
        <StyledOptionContainer>
          <StyledOptionsIcon/>
        </StyledOptionContainer>
      </StyledTitleContainer>
      <StyledDetailsContainer>
        <span>{t('subscription_duration')} {duration} {t('subscription_days')}</span>
        <StyledSeparator decorative orientation="vertical"/>
        <span>{t('subscription_price')} {price} €</span>
        <StyledSeparator decorative orientation="vertical"/>
        <span>{t('subscription_valid_to')} {format(validTo)}</span>
      </StyledDetailsContainer>
    </StyledActiveSubscription>
  )
}

export default SubscriptionResume;