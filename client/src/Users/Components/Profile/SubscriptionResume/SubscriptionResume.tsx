import React, { useContext } from "react";

import useDateFormatter from "../../../../Shared/Hooks/useDateFormatter";
import Text from "../../../../Shared/Components/Text";

import {
  StyledActiveSubscription,
  StyledDetailsContainer,
  StyledOptionContainer,
  StyledTitleContainer,
  StyledSeparator, ActiveBadge, ExpiredBadge, StyledDropdownMenuTrigger, StyledDropdownMenuArrow,
} from './Styles'
import { SubscriptionResumeProps } from "./SubscriptionResumeProps";
import { StringHelper } from "../../../../Shared/Services/StringHelper";
import DropdownMenu from "../../../../Shared/Components/DropdownMenu";
import { FiMoreVertical, FiArchive, FiZap, FiTrash } from "react-icons/fi";
import { UsersContext } from "../../../Context/UsersContext";

const SubscriptionResume = ({ name, price, validTo, duration, expired }: SubscriptionResumeProps) => {
  const { format } = useDateFormatter();
  const { t } = useContext(UsersContext);
  return (
    <StyledActiveSubscription>
      <StyledTitleContainer>
        <Text type={"h3"}>{StringHelper.firstLetterToUpperCase(name)}</Text>
        {expired ? <ExpiredBadge text={t('profile:subscription_badge_expired')}/> :
          <ActiveBadge text={t('profile:subscription_badge_active')}/>}
        {!expired && <StyledOptionContainer>
          <DropdownMenu>
            <StyledDropdownMenuTrigger>
              <FiMoreVertical/>
            </StyledDropdownMenuTrigger>
            <DropdownMenu.Content sideOffset={5}>
              <DropdownMenu.Item><FiZap/> Renew</DropdownMenu.Item>
              <DropdownMenu.Item><FiArchive/> Pause</DropdownMenu.Item>
              <DropdownMenu.Separator/>
              <DropdownMenu.Item><FiTrash/> Cancel</DropdownMenu.Item>
              <StyledDropdownMenuArrow/>
            </DropdownMenu.Content>
          </DropdownMenu>
        </StyledOptionContainer>}
      </StyledTitleContainer>
      <StyledDetailsContainer>
        <span>{t('profile:subscription_duration')} {duration} {t('profile:subscription_days')}</span>
        <StyledSeparator decorative orientation="vertical"/>
        <span>{t('profile:subscription_price')} {price} €</span>
        <StyledSeparator decorative orientation="vertical"/>
        <span>{t('profile:subscription_valid_to')} {format(validTo)}</span>
      </StyledDetailsContainer>
    </StyledActiveSubscription>
  )
}

export default SubscriptionResume;