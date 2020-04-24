import React, { FunctionComponent } from 'react';
import { Link } from '@reach/router';

export interface Props {
  to: string;
  icon?: string;
  label: string;
}
export const NavLink: FunctionComponent<Props> = ({ to, icon, label }) => (
  <li className='nav-item'>
    <Link
      to={to}
      getProps={({ isCurrent }) => ({
        className: `nav-link ${isCurrent && 'active'}`,
      })}
    >
      {icon && <i className={icon}></i>}&nbsp;{label}
    </Link>
  </li>
);
