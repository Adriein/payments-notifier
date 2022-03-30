import React, { useContext } from "react";
import { ProfileClientInfoProps } from "./ProfileClientInfoProps";
import { FiChevronDown } from "react-icons/fi";
import {
  StyledAccordionContent,
  StyledAccordionHeader, StyledAccordionRoot, StyledAccordionTrigger, StyledContent, StyledContentTitle,
} from "./Styles";

import useBooleanBeautifier from "../../../../Shared/Hooks/useBooleanBeautifier";
import Accordion from "../../../../Shared/Components/Accordion";
import { StringHelper } from "../../../../Shared/Services/StringHelper";
import { UsersContext } from "../../../Context/UsersContext";

const ProfileClientInfo = ({ client }: ProfileClientInfoProps) => {
  const { t } = useContext(UsersContext);
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
            <span>{t('profile:details')}</span>
          </StyledAccordionTrigger>
        </StyledAccordionHeader>
        <StyledAccordionContent>
          <StyledContentTitle type={"subtitle"}>{t('profile:username')}</StyledContentTitle>
          <StyledContent>{client.username}</StyledContent>
          <StyledContentTitle type={"subtitle"}>{t('profile:email')}</StyledContentTitle>
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
            <span>{t('profile:config')}</span>
          </StyledAccordionTrigger>
        </StyledAccordionHeader>
        <StyledAccordionContent>
          <StyledContentTitle type={"subtitle"}>{t('profile:config_language')}</StyledContentTitle>
          <StyledContent>{client.config.language}</StyledContent>
          <StyledContentTitle type={"subtitle"}>{t('profile:config_notifications')}</StyledContentTitle>
          <StyledContent>{StringHelper.firstLetterToUpperCase(beautify(client.config.sendNotifications))}</StyledContent>
        </StyledAccordionContent>
      </Accordion.Item>
    </StyledAccordionRoot>
  );
}

export default ProfileClientInfo;