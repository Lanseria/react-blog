import React, { FunctionComponent } from 'react';
import { RouteComponentProps, Router } from '@reach/router';

import { Layout } from './components/Layout';

export const Temp: FunctionComponent<RouteComponentProps> = () => (
  <div>Hello World </div>
);

export const App = () => (
  <Layout>
    <Router>
      <Temp default></Temp>
    </Router>
  </Layout>
);
