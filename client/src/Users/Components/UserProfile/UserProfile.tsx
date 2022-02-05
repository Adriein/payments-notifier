import {
  StyledDetailsTag,
  StyledEdit,
  StyledEditableUserInfoTitle,
  StyledPersonalInfoContainer,
  StyledProfileContainer,
  StyledUserName,
  StyledUserProfileForm,
  StyledUserResume,
  StyledUserResumeContainer,
  StyledFormInput,
  StyledFormActions,
  StyledPersonalSubscriptionInfo,
  StyledPersonalSubscriptionInfoNavigation,
  NavigationItem
} from "./Styles";
import { FiChevronDown } from "react-icons/fi";
import Avatar from "../../../Shared/Components/Avatar";
import { UserProfileProps } from "./UserProfileProps";
import Form from "../../../Shared/Components/Form";
import Button from "../../../Shared/Components/Button";
import React from "react";
import { useTranslation } from "react-i18next";

const UserProfile = ({ user }: UserProfileProps) => {
  const { t } = useTranslation('profile');
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
              <StyledEdit>{t('edit')}</StyledEdit>
            </StyledEditableUserInfoTitle>
            <Form
              enableReinitialize
              initialValues={{
                username: '',
                email: '',
              }}
              validations={{
                email: [ Form.is.email(), Form.is.required() ],
                username: Form.is.required(),
              }}
              onSubmit={async ({ username, email }: any) => {

              }}
            >
              <StyledUserProfileForm>
                <StyledFormInput name="username" label={t('username')} value={user.username}/>
                <StyledFormInput name="email" label={t('email')} value={user.email}/>
                <StyledFormActions>
                  <Button size={'small'} variant={'fill'} type={"submit"}>{t('save')}</Button>
                  <Button size={'small'} variant={'fill'} type={"submit"}>{t('cancel')}</Button>
                </StyledFormActions>
              </StyledUserProfileForm>
            </Form>
          </StyledPersonalInfoContainer>
          <StyledPersonalSubscriptionInfo>
            <StyledPersonalSubscriptionInfoNavigation>
              <Button size={'small'} variant={'fill'}>
                Overview
              </Button>
            </StyledPersonalSubscriptionInfoNavigation>

          </StyledPersonalSubscriptionInfo>
        </>
      )}
    </StyledProfileContainer>
  );
}

export default UserProfile;