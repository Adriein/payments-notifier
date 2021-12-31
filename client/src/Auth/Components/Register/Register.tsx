import React, { useContext } from 'react';
import Form from "../../../Shared/Components/Form";
import { StyledFormHeading, StyledFormSubHeading, StyledLink, StyledFormElement, StyledFormTitleSpan } from './Styles';
import Button from "../../../Shared/Components/Button";
import { AuthContext } from "../../Context/AuthContext";
import { useTranslation } from "react-i18next";
import useToastError from "../../../Shared/Hooks/useToastError";

const Register = () => {
  const { notify } = useToastError('login');
  const { t } = useTranslation('login');
  const { signIn } = useContext(AuthContext);

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
          {t('subtitle')} <StyledLink to={'/'}>{t('create_account')}</StyledLink>
        </StyledFormSubHeading>
        <Form.Field.Input name="email" label="Email"/>
        <Form.Field.Input name="password" label="Password"/>
        <Button size={'medium'} variant={'fill'} type={"submit"}>{t('button')}</Button>
      </StyledFormElement>
    </Form>
  );

}

export default Register;