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

const Login = () => {
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
          Accede a Nutri<StyledFormTitleSpan>log</StyledFormTitleSpan>
        </StyledFormHeading>
        <Form.Field.Input name="email" label="Email"/>
        <Form.Field.Input name="password" label="Password"/>
        <Button size={'medium'} variant={'fill'} onClick={() => console.log('submit')}>Enter</Button>
      </StyledFormElement>
    </Form>
  );

}

export default Login;