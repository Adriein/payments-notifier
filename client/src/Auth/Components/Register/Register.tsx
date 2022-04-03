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

const Register = () => {
  const { signUp, t, notify } = useContext(AuthContext);

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
        } catch (error: any) {
          notify.error(t(`common:${error.key}`));
        }
      }}
    >
      <StyledFormElement>
        <StyledFormHeading>
          {t('register:title')}<StyledFormTitleSpan>{t('register:span')}</StyledFormTitleSpan>
        </StyledFormHeading>
        <StyledFormSubHeading>
          {t('register:subtitle')} <StyledLink to={'/?modal-login=true'}>{t('register:create_account')}</StyledLink>
        </StyledFormSubHeading>
        <StyledFormInput name="name" label={t('register:username_label')}/>
        <StyledFormInput name="email" label="Email"/>
        <StyledFormInput name="password" label="Password" type="password"/>
        <Button size={'sm'} variant={'filled'} type={"submit"} color={'blue'}
                radius={'xs'}>{t('register:button')}</Button>
      </StyledFormElement>
    </Form>
  );

}

export default Register;