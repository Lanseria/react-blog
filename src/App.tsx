import React, { FunctionComponent } from 'react';
import { useMount } from 'react-use';
import { RouteComponentProps, Router } from '@reach/router';

import { Layout } from './components/Layout';
import { Auth } from './pages/Auth';
import { useOvermind } from './store';
import { Settings } from './pages/Settings';
import { Profile } from './pages/Profile';

export const Temp: FunctionComponent<RouteComponentProps> = () => (
  <div>Hello World </div>
);

export const App = () => {
  const {
    actions: {
      auth: { initializeUser },
    },
  } = useOvermind();
  useMount(initializeUser);
  return (
    <Layout>
      <Router>
        <Temp path='/'></Temp>
        <Auth path='/login' auth='login'></Auth>
        <Auth path='/register' auth='register'></Auth>
        <Settings path='/settings'></Settings>
        <Profile path='/:username'></Profile>
      </Router>
    </Layout>
  );
};
