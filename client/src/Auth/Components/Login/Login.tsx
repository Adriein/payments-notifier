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
import { LoginProps } from "./LoginProps";
import { useNavigate } from "react-router-dom";

const Login = ({ onSubmit }: LoginProps) => {
  const { signIn, t, notify } = useContext(AuthContext);
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
        } catch (error: any) {
          notify.error(t(`common:${error.key}`));
        }
      }}
    >
      <StyledFormElement>
        <StyledFormHeading>
          {t('login:title')}<StyledFormTitleSpan>{t('login:span')}</StyledFormTitleSpan>
        </StyledFormHeading>
        <StyledFormSubHeading>
          {t('login:subtitle')} <StyledLink to={'/?modal-register=true'}>{t('login:create_account')}</StyledLink>
        </StyledFormSubHeading>
        <StyledFormInput name="email" label="Email"/>
        <StyledFormInput name="password" label="Password" type="password"/>
        <Button size={'sm'} variant={'filled'} type={"submit"} color={'blue'} radius={'xs'}>{t('login:button')}</Button>
      </StyledFormElement>
    </Form>
  );

}

export default Login;