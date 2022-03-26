import React from "react";
import { ProfileClientInfoProps } from "./ProfileClientInfoProps";
import { FiChevronDown } from "react-icons/fi";
import {
  StyledAccordionContent,
  StyledAccordionHeader, StyledAccordionRoot, StyledAccordionTrigger, StyledContent, StyledContentTitle,
} from "./Styles";
import { useTranslation } from "react-i18next";
import useBooleanBeautifier from "../../../../Shared/Hooks/useBooleanBeautifier";
import Accordion from "../../../../Shared/Components/Accordion";
import { StringHelper } from "../../../../Shared/Services/StringHelper";

const ProfileClientInfo = ({ client }: ProfileClientInfoProps) => {
  const { t } = useTranslation('profile');
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
        </StyledAccordionHeader>
        <StyledAccordionContent>
          <StyledContentTitle type={"subtitle"} bold>{t('username')}</StyledContentTitle>
          <StyledContent>{client.username}</StyledContent>
          <StyledContentTitle type={"subtitle"} bold>{t('email')}</StyledContentTitle>
          <StyledContent>{client.email}</StyledContent>
          {/*<StyledContentTitle type={"subtitle"} bold>{t('address')}</StyledContentTitle>
           <StyledContentTitle type={"subtitle"} bold>{t('city')}</StyledContentTitle>
           <StyledContentTitle type={"subtitle"} bold>{t('dni')}</StyledContentTitle>
           <StyledContentTitle type={"subtitle"} bold>{t('phone')}</StyledContentTitle>*/}
        </StyledAccordionContent>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <StyledAccordionHeader>
          <StyledAccordionTrigger>
            <FiChevronDown/>
            <span>{t('config')}</span>
          </StyledAccordionTrigger>
        </StyledAccordionHeader>
        <StyledAccordionContent>
          <StyledContentTitle type={"subtitle"} bold>{t('config_language')}</StyledContentTitle>
          <StyledContent>{client.config.language}</StyledContent>
          <StyledContentTitle type={"subtitle"} bold>{t('config_notifications')}</StyledContentTitle>
          <StyledContent>{StringHelper.firstLetterToUpperCase(beautify(client.config.sendNotifications))}</StyledContent>
        </StyledAccordionContent>
      </Accordion.Item>
    </StyledAccordionRoot>
  );
}

export default ProfileClientInfo;