import Form from "../../../Shared/Components/Form";
import { StyledFormActions, StyledFormInput, StyledUserProfileForm, StyledFormRow } from "./Styles";
import Button from "../../../Shared/Components/Button";
import Text from "../../../Shared/Components/Text";
import React from "react";
import { useTranslation } from "react-i18next";
import { ProfileFormProps } from "./ProfileFormProps";
import useBooleanBeautifier from "../../../Shared/Hooks/useBooleanBeautifier";

interface FormProps {
  username: string;
  email: string;
  billingEmail: string;
}

const ProfileForm = ({ user }: ProfileFormProps) => {
  const { t } = useTranslation('profile');
  const { beautify } = useBooleanBeautifier({
    isTrue: 'active',
    isFalse: 'inactive'
  });

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
        <Text type={"h2"}>{t('details')}</Text>
        <StyledFormInput name="username" label={t('username')} value={user.username}/>
        <StyledFormInput name="email" label={t('email')} value={user.email}/>
        <StyledFormRow>
          <StyledFormInput name="address" label={t('address')} value={user.email}/>
          <StyledFormInput name="city" label={t('city')} value={user.email}/>
        </StyledFormRow>
        <StyledFormRow>
          <StyledFormInput name="dni" label={t('dni')} value={user.email}/>
          <StyledFormInput name="phone" label={t('phone')} value={user.email}/>
        </StyledFormRow>
        <Text type={"h2"}>{t('config')}</Text>
        <StyledFormRow>
          <StyledFormInput name="language" label={t('config_language')} value={user.config.language}/>
        </StyledFormRow>
        <StyledFormRow isLast>
          <StyledFormInput
            name="role" label={t('role')}
            value={user.config.role}
          />
        </StyledFormRow>
        <StyledFormActions>
          <Button size={'small'} variant={'fill'} type={"submit"}>{t('save')}</Button>
          <Button size={'small'} variant={'fill'} type={"submit"}>{t('cancel')}</Button>
        </StyledFormActions>
      </StyledUserProfileForm>
    </Form>
  );
}

export default ProfileForm;