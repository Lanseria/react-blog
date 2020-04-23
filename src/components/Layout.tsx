import React, { FunctionComponent } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';

export const Layout: FunctionComponent = ({ children }) => (
  <div>
    <Header></Header>
    {children}
    <Footer></Footer>
  </div>
);
