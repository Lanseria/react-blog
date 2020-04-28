import React, { FunctionComponent } from 'react';
import { RouteComponentProps, Link, Redirect } from '@reach/router';
import { AuthForm } from '../components/AuthForm';
import { useOvermind } from '../store';

interface Props extends RouteComponentProps {
  auth: 'login' | 'register';
}

export const Auth: FunctionComponent<Props> = ({ auth }) => {
  const {
    state: {
      auth: { errors, authenticated, authenticating },
    },
  } = useOvermind();
  const mixinsMap = {
    login: {
      header: 'Sign in',
      link: '/register',
      linkText: 'Have an account?',
    },
    register: {
      header: 'Sign up',
      link: '/login',
      linkText: 'Need an account?',
    },
  };
  const header = mixinsMap[auth].header;
  const link = mixinsMap[auth].link;
  const linkText = mixinsMap[auth].linkText;
  if (authenticated && !authenticating) {
    return <Redirect to='/' noThrow={true}></Redirect>;
  }
  return (
    <div className='auth-page'>
      <div className='container page'>
        <div className='row'>
          <div className='col-md-6 offset-md-3 col-xs-12'>
            <h1 className='text-xs-center'>{header}</h1>
            <p className='text-xs-center'>
              <Link to={link}>{linkText}</Link>
            </p>
            {Boolean(errors.length) && (
              <ul className='error-messages'>
                {errors.map((err) => (
                  <li key={err}>{err}</li>
                ))}
              </ul>
            )}
            <AuthForm auth={auth}></AuthForm>
          </div>
        </div>
      </div>
    </div>
  );
};
