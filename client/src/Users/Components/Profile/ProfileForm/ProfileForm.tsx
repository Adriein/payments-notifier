import Form from "../../../../Shared/Components/Form";
import { StyledFormActions, StyledFormInput, StyledUserProfileForm, StyledFormRow } from "../Styles";
import Button from "../../../../Shared/Components/Button";
import Text from "../../../../Shared/Components/Text";
import React from "react";
import { useTranslation } from "react-i18next";
import { ProfileFormProps } from "./ProfileFormProps";
import { FiChevronDown } from "react-icons/fi";
import Select from "../../../../Shared/Components/Select";

interface FormProps {
  username: string;
  email: string;
  address: string;
  city: string;
  dni: string;
  phone: string;
  language: string;
  sendNotifications: string,
  sendWarnings: string
  role: string,
}

const ProfileForm = ({ user, toggleEdit }: ProfileFormProps) => {
  const { t } = useTranslation('profile');

  return (
    <Form
      enableReinitialize
      initialValues={{
        username: user.username,
        email: user.email,
        address: '',
        city: '',
        dni: '',
        phone: '',
        language: user.config.language,
        sendNotifications: 'true',
        sendWarnings: 'false',
        role: 'user',
      }}
      onSubmit={async ({ username, email, address, role }: FormProps) => {
        console.log(role, username)
      }}
    >
      <StyledUserProfileForm>
        <Text type={"h3"}>{t('details')}</Text>
        <StyledFormInput name="username" label={t('username')}/>
        <StyledFormInput name="email" label={t('email')}/>
        <Text type={"h3"}>{t('billing_details')}</Text>
        <StyledFormRow>
          <StyledFormInput name="address" label={t('address')}/>
          <StyledFormInput name="city" label={t('city')}/>
        </StyledFormRow>
        <StyledFormRow>
          <StyledFormInput name="dni" label={t('dni')}/>
          <StyledFormInput name="phone" label={t('phone')}/>
        </StyledFormRow>
        <Text type={"h3"}>{t('config')}</Text>
        <StyledFormRow>
          <Form.Field.Select name="sendNotifications" label={t('notifications')}>
            <Select.Trigger>
              <Select.Value/>
              <Select.Icon><FiChevronDown/></Select.Icon>
            </Select.Trigger>
            <Select.Content>
              <Select.ScrollUpButton/>
              <Select.Viewport>
                <Select.Item value="true">
                  <Select.ItemText>Active</Select.ItemText>
                </Select.Item>
                <Select.Item value="false">
                  <Select.ItemText>Inactive</Select.ItemText>
                </Select.Item>
              </Select.Viewport>
              <Select.ScrollDownButton/>
            </Select.Content>
          </Form.Field.Select>
          <Form.Field.Select name="sendWarnings" label={t('warnings')}>
            <Select.Trigger>
              <Select.Value/>
              <Select.Icon><FiChevronDown/></Select.Icon>
            </Select.Trigger>
            <Select.Content>
              <Select.ScrollUpButton/>
              <Select.Viewport>
                <Select.Item value="true">
                  <Select.ItemText>Active</Select.ItemText>
                </Select.Item>
                <Select.Item value="false">
                  <Select.ItemText>Inactive</Select.ItemText>
                </Select.Item>
              </Select.Viewport>
              <Select.ScrollDownButton/>
            </Select.Content>
          </Form.Field.Select>
        </StyledFormRow>
        <StyledFormRow isLast>
          <StyledFormInput name="language" label={t('config_language')}/>
          <Form.Field.Select name="role" label={t('role')}>
            <Select.Trigger>
              <Select.Value/>
              <Select.Icon><FiChevronDown/></Select.Icon>
            </Select.Trigger>
            <Select.Content>
              <Select.ScrollUpButton/>
              <Select.Viewport>
                <Select.Item value="user">
                  <Select.ItemText>User</Select.ItemText>
                </Select.Item>
                <Select.Item value="moderator">
                  <Select.ItemText>Moderator</Select.ItemText>
                </Select.Item>
              </Select.Viewport>
              <Select.ScrollDownButton/>
            </Select.Content>
          </Form.Field.Select>
        </StyledFormRow>
        <StyledFormActions>
          <Button size={'small'} variant={'fill'} type={"submit"}>{t('save')}</Button>
          <Button size={'small'} variant={'fill'} type={"submit"} onClick={toggleEdit}>{t('cancel')}</Button>
        </StyledFormActions>
      </StyledUserProfileForm>
    </Form>
  );
}

export default ProfileForm;