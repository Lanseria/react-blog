import React, { FunctionComponent } from 'react';
import { useOvermind } from '../store';
import { useNavigate } from '@reach/router';

export enum ProfileButtonType {
  follow = 'follow',
  unfollow = 'unfollow',
  settings = 'settings',
}

interface Props {
  type: ProfileButtonType;
  username?: string;
}

export const ProfileButton: FunctionComponent<Props> = ({ type, username }) => {
  const {
    actions: {
      profile: { followUser, unfollowUser },
    },
  } = useOvermind();
  const navigate = useNavigate();
  const onClick = () => {
    if (username) {
      switch (type) {
        case ProfileButtonType.settings:
          return navigate('/settings');
        case ProfileButtonType.follow:
          return followUser(username);
        case ProfileButtonType.unfollow:
          return unfollowUser(username);
        default:
          break;
      }
    }
  };
  const text =
    type === ProfileButtonType.settings
      ? 'Edit Profile Settings'
      : `${type[0].toUpperCase()}${type.substr(1)} ${username}`;
  const icon =
    type === ProfileButtonType.settings
      ? 'ion-gear-a'
      : type === ProfileButtonType.follow
      ? 'ion-plus-round'
      : 'ion-minus-round';
  return (
    <button
      className='btn btn-sm btn-outline-secondary action-btn'
      onClick={onClick}
    >
      <i className={icon}></i>
      &nbsp; {text}
    </button>
  );
};
