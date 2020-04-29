import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useOvermind } from '../store';

interface Props extends RouteComponentProps {}

const settingsValidationSchema = Yup.object().shape({
  bio: Yup.string(),
  image: Yup.string(),
  username: Yup.string(),
  email: Yup.string(),
  password: Yup.string().required(),
});

export const SettingForm: FunctionComponent<Props> = () => {
  const {
    state: {
      auth: { currentUser },
    },
    actions: {
      profile: { updateCurrentUser },
    },
  } = useOvermind();
  const initialValues = {
    bio: currentUser?.bio || '',
    image: currentUser?.image || '',
    username: currentUser?.username || '',
    email: currentUser?.email || '',
    password: '',
  };
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={updateCurrentUser}
      validationSchema={settingsValidationSchema}
    >
      {({ isValid }) => (
        <Form>
          <fieldset>
            <fieldset className='form-group'>
              <Field
                className='form-control'
                type='text'
                placeholder='URL of profile picture'
                name='image'
              />
            </fieldset>
            <fieldset className='form-group'>
              <Field
                className='form-control form-control-lg'
                type='text'
                placeholder='Your Name'
                name='username'
              />
            </fieldset>
            <fieldset className='form-group'>
              <Field
                className='form-control form-control-lg'
                rows='8'
                as='textarea'
                placeholder='Short bio about you'
                name='bio'
              ></Field>
            </fieldset>
            <fieldset className='form-group'>
              <Field
                className='form-control form-control-lg'
                type='text'
                placeholder='Email'
                name='email'
              />
            </fieldset>
            <fieldset className='form-group'>
              <Field
                className='form-control form-control-lg'
                type='password'
                placeholder='Password'
                name='password'
              />
            </fieldset>
            <button
              className='btn btn-lg btn-primary pull-xs-right'
              type='submit'
              disabled={!isValid}
            >
              Update Settings
            </button>
          </fieldset>
        </Form>
      )}
    </Formik>
  );
};
