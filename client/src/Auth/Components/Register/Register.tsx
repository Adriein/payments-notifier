import React, { useContext } from 'react';
import Form from "../../../Shared/Components/Form";
import {
  StyledFormHeading,
  StyledFormSubHeading,
  StyledLink,
  StyledFormElement,
  StyledFormTitleSpan,
  StyledFormInput
} from './Styles';
import Button from "../../../Shared/Components/Button";
import { AuthContext } from "../../Context/AuthContext";
import { useTranslation } from "react-i18next";
import useToastError from "../../../Shared/Hooks/useToastError";

const Register = () => {
  const { notify } = useToastError('login');
  const { t } = useTranslation('register');
  const { signUp } = useContext(AuthContext);

  return (
    <Form
      enableReinitialize
      initialValues={{
        name: '',
        email: '',
        password: '',
      }}
      validations={{
        name: Form.is.required(),
        email: [ Form.is.email(), Form.is.required() ],
        password: Form.is.required(),
      }}
      onSubmit={async ({ name, email, password }: any) => {
        try {
          await signUp({ name, email, password });
        } catch (error: unknown) {
          notify(error);
        }
      }}
    >
      <StyledFormElement>
        <StyledFormHeading>
          {t('title')}<StyledFormTitleSpan>{t('span')}</StyledFormTitleSpan>
        </StyledFormHeading>
        <StyledFormSubHeading>
          {t('subtitle')} <StyledLink to={'/?modal-login=true'}>{t('create_account')}</StyledLink>
        </StyledFormSubHeading>
        <StyledFormInput name="name" label={t('username_label')}/>
        <StyledFormInput name="email" label="Email"/>
        <StyledFormInput name="password" label="Password" type="password"/>
        <Button size={'medium'} variant={'fill'} type={"submit"}>{t('button')}</Button>
      </StyledFormElement>
    </Form>
  );

}

export default Register;