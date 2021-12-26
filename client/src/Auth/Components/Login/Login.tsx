import React from 'react';
import Form from "../../../Shared/Components/Form";
import {
  StyledFormElement,
  StyledFormHeading,
  StyledFormTitleSpan,
  StyledFormActions,
  StyledFormActionButton
} from './Styles';
import Button from "../../../Shared/Components/Button";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

const Login = () => {
  const { t } = useTranslation('login');
  console.log(t('button'));
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
      onSubmit={() => console.log('submit')}
    >
      <StyledFormElement>
        <StyledFormHeading>
          {t('title')}<StyledFormTitleSpan>{t('span')}</StyledFormTitleSpan>
        </StyledFormHeading>
        <Form.Field.Input name="email" label="Email"/>
        <Form.Field.Input name="password" label="Password"/>
        <Button size={'medium'} variant={'fill'} onClick={() => console.log('submit')}>{t('button')}</Button>
      </StyledFormElement>
    </Form>
  );

}

export default Login;