import React, { useContext, useEffect } from "react";
import {
  StyledDetailsTag,
  StyledEdit,
  StyledEditableUserInfoTitle,
  StyledPersonalInfoContainer,
  StyledProfileContainer,
  StyledUserName,
  StyledUserResume,
  StyledUserResumeContainer,
  StyledPersonalSubscriptionInfo,
  StyledPersonalSubscriptionInfoNavigation, StyledUserDetailsInfoContainer, StyledUserDetailTitle, StyledUserDetailInfo,
} from "./Styles";

import { FiChevronDown } from "react-icons/fi";
import Avatar from "../../../Shared/Components/Avatar";
import { UserProfileProps } from "./UserProfileProps";
import Button from "../../../Shared/Components/Button";
import { useTranslation } from "react-i18next";
import ProfileForm from "./ProfileForm";
import { useToggle } from "../../../Shared/Hooks/useToggle";
import { UsersContext } from "../../Context/UsersContext";

const Profile = ({ id }: UserProfileProps) => {
  const { state, fetchClientProfile } = useContext(UsersContext);
  const { t } = useTranslation('profile');
  const [ edit, toggleEdit ] = useToggle();

  useEffect(() => {
    (async () => {
      await fetchClientProfile({ clientId: id });
    })();
  }, []);

  return (
    <StyledProfileContainer>
      {state.clientProfile && (
        <>
          <StyledPersonalInfoContainer>
            <StyledUserResumeContainer>
              <Avatar name={state.clientProfile.username} size={50}/>
              <StyledUserName>{state.clientProfile.username}</StyledUserName>
              {state.clientProfile.email}
              <StyledUserResume>

              </StyledUserResume>
            </StyledUserResumeContainer>
            <StyledEditableUserInfoTitle>
              <StyledDetailsTag>
                <FiChevronDown/>
                <p>{t('details')}</p>
              </StyledDetailsTag>
              <StyledEdit onClick={toggleEdit}>{t('edit')}</StyledEdit>
            </StyledEditableUserInfoTitle>
            {edit ? <ProfileForm user={state.clientProfile}/> : (
              <StyledUserDetailsInfoContainer>
                <StyledUserDetailTitle type={"subtitle"} bold>{t('account_details')}</StyledUserDetailTitle>
                <StyledUserDetailInfo>{state.clientProfile.username}</StyledUserDetailInfo>
                <StyledUserDetailInfo>{state.clientProfile.email}</StyledUserDetailInfo>
                <StyledUserDetailTitle type={"subtitle"} bold>{t('billing_email')}</StyledUserDetailTitle>
                <StyledUserDetailInfo>{state.clientProfile.email}</StyledUserDetailInfo>
              </StyledUserDetailsInfoContainer>
            )}
            <StyledEditableUserInfoTitle>
              <StyledDetailsTag>
                <FiChevronDown/>
                <p>Configuración</p>
              </StyledDetailsTag>
              <StyledEdit onClick={toggleEdit}>{t('edit')}</StyledEdit>
            </StyledEditableUserInfoTitle>
            <StyledUserDetailsInfoContainer>
              <StyledUserDetailTitle type={"subtitle"} bold>Detalles de la configuración</StyledUserDetailTitle>
              <StyledUserDetailInfo>{state.clientProfile.config.language}</StyledUserDetailInfo>
              <StyledUserDetailInfo>{state.clientProfile.config.role}</StyledUserDetailInfo>
              <StyledUserDetailInfo>{state.clientProfile.config.sendWarnings}</StyledUserDetailInfo>
            </StyledUserDetailsInfoContainer>
          </StyledPersonalInfoContainer>
          <StyledPersonalSubscriptionInfo>
            <StyledPersonalSubscriptionInfoNavigation>
              <Button size={'small'} variant={'fill'}>Overview</Button>
              <Button size={'small'} variant={'fill'}>Actions <FiChevronDown/></Button>
            </StyledPersonalSubscriptionInfoNavigation>
          </StyledPersonalSubscriptionInfo>
        </>
      )}
    </StyledProfileContainer>
  );
}

export default Profile;