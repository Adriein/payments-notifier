import Form from "../../../Shared/Components/Form";
import { StyledFormActions, StyledFormInput, StyledUserProfileForm } from "./Styles";
import Button from "../../../Shared/Components/Button";
import React from "react";
import { useTranslation } from "react-i18next";
import { ProfileFormProps } from "./ProfileFormProps";

interface FormProps {
  username: string;
  email: string;
  billingEmail: string;
}

const ProfileForm = ({ user }: ProfileFormProps) => {
  const { t } = useTranslation('profile');

  return (
    <Form
      enableReinitialize
      initialValues={{
        username: '',
        email: '',
        billingEmail: '',
      }}
      validations={{
        email: [ Form.is.email(), Form.is.required() ],
        username: Form.is.required(),
      }}
      onSubmit={async ({ username, email, billingEmail }: FormProps) => {

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
  );
}

export default ProfileForm;