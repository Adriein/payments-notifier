import React, { useContext, useState } from "react";
import { FiMoreVertical, FiArchive, FiZap, FiTrash } from "react-icons/fi";
import { Popover, Button, SimpleGrid } from '@mantine/core';
import { DatePicker } from '@mantine/dates';

import { UsersContext } from "../../../Context/UsersContext";

import { SubscriptionResumeProps } from "./SubscriptionResumeProps";
import {
  StyledActiveSubscription,
  StyledDetailsContainer,
  StyledOptionContainer,
  StyledTitleContainer,
  StyledSeparator, ActiveBadge, ExpiredBadge, StyledDropdownMenuTrigger, StyledDropdownMenuArrow,
} from './Styles'


import Text from "../../../../Shared/Components/Text";
import DropdownMenu from "../../../../Shared/Components/DropdownMenu";
import { StringHelper } from "../../../../Shared/Services/StringHelper";

import useDateFormatter from "../../../../Shared/Hooks/useDateFormatter";

const SubscriptionResume = ({
  name,
  price,
  validTo,
  duration,
  expired,
  pricingId,
  clientId
}: SubscriptionResumeProps) => {
  const { format } = useDateFormatter();
  const { t, notify, renewSubscription, fetchClientProfile } = useContext(UsersContext);

  const [ open, setOpen ] = useState(false);
  const [ paymentDate, setPaymentDate ] = useState<Date | null>(new Date());

  const handleRenewSubscription = () => {
    setOpen(false);

    if (!paymentDate) {
      notify.error(t('profile:subscription_renewed_error_date'));
      return;
    }

    renewSubscription({ clientId, pricingId, paymentDate: paymentDate.toString() })
      .then(() => notify.success('profile:subscription_renewed_success'))
      .catch((error: any) => notify.error(`profile:${error.key}`));

    fetchClientProfile({ clientId })
      .catch((error: any) => notify.error(`profile:${error.key}`));
  }

  return (
    <Popover
      opened={open}
      withArrow
      position="bottom"
      placement="end"
      withinPortal={false}
      closeOnClickOutside
      title={t('profile:subscription_action_renew')}
      withCloseButton
      onClose={() => setOpen(false)}
      target={
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
                  <DropdownMenu.Item
                    onClick={() => setOpen(!open)}><FiZap/>
                    {t('profile:subscription_action_renew')}
                  </DropdownMenu.Item>
                  <DropdownMenu.Item disabled><FiArchive/> {t('profile:subscription_action_pause')}</DropdownMenu.Item>
                  <DropdownMenu.Separator/>
                  <DropdownMenu.Item disabled><FiTrash/> {t('profile:cancel')}</DropdownMenu.Item>
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
      }
    >
      <SimpleGrid cols={1}>
        <DatePicker
          placeholder={t('profile:pick_date_placeholder')}
          label={t('profile:pick_date')}
          withinPortal={false}
          value={paymentDate}
          onChange={setPaymentDate}
          required
        />
        <Button
          leftIcon={<FiZap/>}
          size={'sm'}
          onClick={handleRenewSubscription}
        >
          {t('profile:subscription_action_renew')}
        </Button>
      </SimpleGrid>
    </Popover>
  )
}

export default SubscriptionResume;