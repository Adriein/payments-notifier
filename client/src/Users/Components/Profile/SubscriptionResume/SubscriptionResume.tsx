import React from "react";

import useDateFormatter from "../../../../Shared/Hooks/useDateFormatter";
import { useTranslation } from "react-i18next";

import Badge from "../../../../Shared/Components/Badge";
import Text from "../../../../Shared/Components/Text";

import {
  StyledActiveSubscription,
  StyledDetailsContainer,
  StyledOptionContainer,
  StyledTitleContainer,
  StyledOptionsIcon,
  StyledSeparator,
} from './Styles'
import { SubscriptionResumeProps } from "./SubscriptionResumeProps";

const firstLetterUpperCase = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

const SubscriptionResume = ({ name, price, validTo, duration }: SubscriptionResumeProps) => {
  const { format } = useDateFormatter();
  const { t } = useTranslation('profile');

  return (
    <StyledActiveSubscription>
      <StyledTitleContainer>
        <Text type={"h3"}>{firstLetterUpperCase(name)}</Text>
        <Badge text={t('subscription_badge_active')}/>
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