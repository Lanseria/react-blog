import React, { FunctionComponent } from 'react';
import { Link } from '@reach/router';

export interface Props {
  to: string;
  icon?: string;
  label: string;
}
export const NavLink: FunctionComponent<Props> = ({ to, icon, label }) => (
  <li className='nav-item'>
    <Link className='nav-link active' to={to}>
      {icon && <i className={icon}></i>}&nbsp;{label}
    </Link>
  </li>
);
