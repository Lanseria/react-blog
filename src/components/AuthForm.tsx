import React, { FunctionComponent } from 'react';
import { Formik, Form, Field } from 'formik';
import { useOvermind } from '../store';

interface Props {
  auth: 'login' | 'register';
}

export const AuthForm: FunctionComponent<Props> = ({ auth }) => {
  const {
    actions: {
      auth: { login, register },
    },
  } = useOvermind();
  const handleSubmit = auth === 'login' ? login : register;
  return (
    <Formik
      initialValues={{ email: '', username: '', password: '' }}
      onSubmit={handleSubmit}
    >
      <Form>
        {auth === 'register' && (
          <fieldset className='form-group'>
            <Field
              type='text'
              name='username'
              placeholder='Username'
              className='form-control form-control-lg'
            ></Field>
          </fieldset>
        )}
        <fieldset className='form-group'>
          <Field
            type='email'
            name='email'
            placeholder='Email'
            className='form-control form-control-lg'
          ></Field>
        </fieldset>
        <fieldset className='form-group'>
          <Field
            type='password'
            name='password'
            placeholder='Password'
            className='form-control form-control-lg'
          ></Field>
        </fieldset>
        <button className='btn btn-lg btn-primary pull-xs-right' type='submit'>
          {auth === 'login' ? 'Sign in' : 'Sign up'}
        </button>
      </Form>
    </Formik>
  );
};
