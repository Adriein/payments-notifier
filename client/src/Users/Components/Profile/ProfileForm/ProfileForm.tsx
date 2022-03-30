import Form from "../../../../Shared/Components/Form";
import { StyledFormActions, StyledFormInput, StyledUserProfileForm, StyledFormRow } from "../Styles";
import Button from "../../../../Shared/Components/Button";
import Text from "../../../../Shared/Components/Text";
import React, { useContext } from "react";
import { ProfileFormProps } from "./ProfileFormProps";
import { FiChevronDown } from "react-icons/fi";
import Select from "../../../../Shared/Components/Select";
import { UsersContext } from "../../../Context/UsersContext";

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
  const { t, notify } = useContext(UsersContext);
  const { updateClient, fetchClientProfile } = useContext(UsersContext);

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
      onSubmit={async ({ username, email, role, language, sendNotifications, sendWarnings }: FormProps) => {
        try {
          await updateClient({
            language,
            email,
            username,
            clientId: user.id,
            rol: role,
            notifications: sendNotifications,
            warnings: sendWarnings
          });

          await fetchClientProfile({ clientId: user.id })
        } catch (error) {
          notify(error);
        }
      }}
    >
      <StyledUserProfileForm>
        <Text type={"h3"}>{t('profile:details')}</Text>
        <StyledFormInput name="username" label={t('profile:username')}/>
        <StyledFormInput name="email" label={t('profile:email')}/>
        <Text type={"h3"}>{t('profile:billing_details')}</Text>
        <StyledFormRow>
          <StyledFormInput name="address" label={t('profile:address')}/>
          <StyledFormInput name="city" label={t('profile:city')}/>
        </StyledFormRow>
        <StyledFormRow>
          <StyledFormInput name="dni" label={t('profile:dni')}/>
          <StyledFormInput name="phone" label={t('profile:phone')}/>
        </StyledFormRow>
        <Text type={"h3"}>{t('profile:config')}</Text>
        <StyledFormRow>
          <Form.Field.Select name="sendNotifications" label={t('profile:notifications')}>
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
          <Form.Field.Select name="sendWarnings" label={t('profile:warnings')}>
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
          <StyledFormInput name="language" label={t('profile:config_language')}/>
          <Form.Field.Select name="role" label={t('profile:role')}>
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
          <Button
            size={'xs'}
            type={"submit"}
            variant={'filled'}
            color={'blue'}
            radius={'xs'}
          >
            {t('profile:save')}
          </Button>
          <Button
            size={'xs'}
            type={"submit"}
            onClick={toggleEdit}
            variant={'filled'}
            color={'blue'}
            radius={'xs'}
            isLoading={true}
          >
            {t('profile:cancel')}
          </Button>
        </StyledFormActions>
      </StyledUserProfileForm>
    </Form>
  );
}

export default ProfileForm;