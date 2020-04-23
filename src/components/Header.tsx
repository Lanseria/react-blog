import React from 'react';
import { Link } from '@reach/router';
import { Props as NavLinkProps, NavLink } from './NavLink';

const pageLinks: NavLinkProps[] = [
  {
    to: '/',
    label: 'Home',
  },
  {
    to: '/new',
    icon: 'ion-compose',
    label: 'New Post',
  },
  {
    to: '/settings',
    icon: 'ion-gear-a',
    label: 'Settings',
  },
  {
    to: '/signup',
    label: ' Sign up',
  },
  {
    to: '/signin',
    label: ' Sign in',
  },
];

export const Header = () => (
  <nav className='navbar navbar-light'>
    <div className='container'>
      <Link className='navbar-brand' to='index.html'>
        conduit
      </Link>
      <ul className='nav navbar-nav pull-xs-right'>
        {pageLinks.map((page) => (
          <NavLink {...page}></NavLink>
        ))}
      </ul>
    </div>
  </nav>
);
