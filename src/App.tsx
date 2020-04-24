import React, { FunctionComponent } from 'react';
import { useMount } from 'react-use';
import { RouteComponentProps, Router } from '@reach/router';

import { Layout } from './components/Layout';
import { Auth } from './pages/Auth';
import { useOvermind } from './store';

export const Temp: FunctionComponent<RouteComponentProps> = () => (
  <div>Hello World </div>
);

export const App = () => {
  const { actions } = useOvermind();
  useMount(() => {
    actions.login({
      email: 'username@fmail.com',
      password: 'password',
    });
  });
  return (
    <Layout>
      <Router>
        <Auth path='/login' auth='login'></Auth>
        <Auth path='/register' auth='register'></Auth>
        <Temp default></Temp>
      </Router>
    </Layout>
  );
};
