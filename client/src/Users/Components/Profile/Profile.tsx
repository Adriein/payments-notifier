import React from "react";
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

const Profile = ({ user }: UserProfileProps) => {
  const { t } = useTranslation('profile');
  const [ edit, toggleEdit ] = useToggle();
  return (
    <StyledProfileContainer>
      {user && (
        <>
          <StyledPersonalInfoContainer>
            <StyledUserResumeContainer>
              <Avatar name={user.username} size={50}/>
              <StyledUserName>{user.username}</StyledUserName>
              {user.email}
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
            {edit ? <ProfileForm user={user}/> : (
              <StyledUserDetailsInfoContainer>
                <StyledUserDetailTitle type={"subtitle"} bold>{t('account_details')}</StyledUserDetailTitle>
                <StyledUserDetailInfo>{user.username}</StyledUserDetailInfo>
                <StyledUserDetailInfo>{user.email}</StyledUserDetailInfo>
                <StyledUserDetailTitle type={"subtitle"} bold>{t('billing_email')}</StyledUserDetailTitle>
                <StyledUserDetailInfo>{user.email}</StyledUserDetailInfo>
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
              <StyledUserDetailInfo>{user.config.language}</StyledUserDetailInfo>
              <StyledUserDetailInfo>{user.config.role}</StyledUserDetailInfo>
              <StyledUserDetailInfo>{user.config.sendWarnings}</StyledUserDetailInfo>
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