import React, { useContext } from 'react';
import Form from "../../../Shared/Components/Form";
import {
  StyledFormElement,
  StyledFormHeading,
  StyledFormTitleSpan,
  StyledFormSubHeading,
  StyledLink, StyledFormInput
} from './Styles';
import Button from "../../../Shared/Components/Button";
import { AuthContext } from "../../Context/AuthContext";
import { useTranslation } from "react-i18next";
import useToastError from "../../../Shared/Hooks/useToastError";
import { LoginProps } from "./LoginProps";
import { useNavigate } from "react-router-dom";

const Login = ({ onSubmit }: LoginProps) => {
  const { notify } = useToastError('login');
  const { t } = useTranslation('login');
  const { signIn } = useContext(AuthContext);
  let navigate = useNavigate();

  return (
    <Form
      enableReinitialize
      initialValues={{
        email: '',
        password: '',
      }}
      validations={{
        email: [ Form.is.email(), Form.is.required() ],
        password: Form.is.required(),
      }}
      onSubmit={async ({ email, password }: any) => {
        try {
          await signIn({ email, password });
          onSubmit();
          navigate('/clients', { replace: true });
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
          {t('subtitle')} <StyledLink to={'/?modal-register=true'}>{t('create_account')}</StyledLink>
        </StyledFormSubHeading>
        <StyledFormInput name="email" label="Email"/>
        <StyledFormInput name="password" label="Password" type="password"/>
        <Button size={'medium'} variant={'fill'} type={"submit"}>{t('button')}</Button>
      </StyledFormElement>
    </Form>
  );

}

export default Login;