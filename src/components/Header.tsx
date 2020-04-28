import React from 'react';
import { Link } from '@reach/router';
import { Props as NavLinkProps, NavLink } from './NavLink';
import { useOvermind } from '../store';

const unauthenticatedPageLinks: NavLinkProps[] = [
  {
    to: '/',
    label: 'Home',
  },
  {
    to: '/register',
    label: ' Sign up',
  },
  {
    to: '/login',
    label: ' Sign in',
  },
];

const authenticatedPageLinks: NavLinkProps[] = [
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
];

export const Header = () => {
  const {
    state: { auth: authenticated },
  } = useOvermind();
  const pageLinks = authenticated
    ? authenticatedPageLinks
    : unauthenticatedPageLinks;
  return (
    <nav className='navbar navbar-light'>
      <div className='container'>
        <Link className='navbar-brand' to='index.html'>
          conduit
        </Link>
        <ul className='nav navbar-nav pull-xs-right'>
          {pageLinks.map((page) => (
            <NavLink {...page} key={page.to}></NavLink>
          ))}
        </ul>
      </div>
    </nav>
  );
};
