import React from "react";
import { ProfileClientInfoProps } from "./ProfileClientInfoProps";
import { FiChevronDown } from "react-icons/fi";
import { StyledEdit } from "../Styles";
import {
  StyledAccordionContent,
  StyledAccordionHeader, StyledAccordionRoot, StyledAccordionTrigger, StyledContent, StyledContentTitle,
} from "./Styles";
import { useTranslation } from "react-i18next";
import { useToggle } from "../../../../Shared/Hooks/useToggle";
import useBooleanBeautifier from "../../../../Shared/Hooks/useBooleanBeautifier";
import Accordion from "../../../../Shared/Components/Accordion";

const ProfileClientInfo = ({ client }: ProfileClientInfoProps) => {
  const { t } = useTranslation('profile');
  const [ edit, toggleEdit ] = useToggle();
  const { beautify } = useBooleanBeautifier({
    isTrue: 'enabled',
    isFalse: 'disabled'
  });

  return (
    <StyledAccordionRoot type="multiple" defaultValue={[ "item-1", "item-2" ]}>
      <Accordion.Item value="item-1">
        <StyledAccordionHeader>
          <StyledAccordionTrigger>
            <FiChevronDown/>
            <span>{t('details')}</span>
          </StyledAccordionTrigger>
          <StyledEdit onClick={toggleEdit}>{t('edit')}</StyledEdit>
        </StyledAccordionHeader>
        <StyledAccordionContent>
          <StyledContentTitle type={"subtitle"} bold>{t('account_details')}</StyledContentTitle>
          <StyledContent>{client.username}</StyledContent>
          <StyledContent>{client.email}</StyledContent>
        </StyledAccordionContent>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <StyledAccordionHeader>
          <StyledAccordionTrigger>
            <FiChevronDown/>
            <span>{t('config')}</span>
          </StyledAccordionTrigger>
          <StyledEdit onClick={toggleEdit}>{t('edit')}</StyledEdit>
        </StyledAccordionHeader>
        <StyledAccordionContent>
          <StyledContentTitle type={"subtitle"} bold>{t('config_language')}</StyledContentTitle>
          <StyledContent>{client.config.language}</StyledContent>
          <StyledContentTitle type={"subtitle"} bold>{t('config_notifications')}</StyledContentTitle>
          <StyledContent>{beautify(client.config.sendNotifications)}</StyledContent>
        </StyledAccordionContent>
      </Accordion.Item>
    </StyledAccordionRoot>
  );
}

export default ProfileClientInfo;