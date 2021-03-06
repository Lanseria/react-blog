import React, { FunctionComponent, useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';
import { useOvermind } from '../store';
import { ProfileButton, ProfileButtonType } from '../components/ProfileButton';
import { ProfileResponse } from '../api/models';

type Props = RouteComponentProps<{ username: string }>;

export const Profile: FunctionComponent<Props> = ({ username }) => {
  const {
    actions: {
      profile: { getUser },
    },
    state: {
      auth: { currentUser },
      profile: { users, loading },
    },
  } = useOvermind();
  useEffect(() => {
    if (username && username !== currentUser?.username && !users[username]) {
      getUser(username);
    }
  }, [currentUser, getUser, username, users]);
  let user: ProfileResponse | null = null;
  let isCurrentUser = false;
  if (username && currentUser?.username === username) {
    user = currentUser as ProfileResponse;
    isCurrentUser = true;
  } else if (username) {
    user = users[username];
  }
  const type = isCurrentUser
    ? ProfileButtonType.settings
    : user?.following
    ? ProfileButtonType.unfollow
    : ProfileButtonType.follow;
  return (
    <div className='profile-page'>
      <div className='user-info'>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12 col-md-10 offset-md-1'>
              {loading && !user ? (
                <h4>Loading...</h4>
              ) : (
                <>
                  {user?.image && (
                    <img
                      src={user.image}
                      className='user-img'
                      alt={user.image}
                    />
                  )}
                  <h4>{user?.username}</h4>
                  <p>{user?.bio}</p>
                  <ProfileButton
                    type={type}
                    username={user?.username}
                  ></ProfileButton>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className='container'>
        <div className='row'>
          <div className='col-xs-12 col-md-10 offset-md-1'>
            <div className='articles-toggle'>
              <ul className='nav nav-pills outline-active'>
                <li className='nav-item'>
                  <a className='nav-link active' href=''>
                    My Articles
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' href=''>
                    Favorited Articles
                  </a>
                </li>
              </ul>
            </div>

            <div className='article-preview'>
              <div className='article-meta'>
                <a href=''>
                  <img src='http://i.imgur.com/Qr71crq.jpg' />
                </a>
                <div className='info'>
                  <a href='' className='author'>
                    Eric Simons
                  </a>
                  <span className='date'>January 20th</span>
                </div>
                <button className='btn btn-outline-primary btn-sm pull-xs-right'>
                  <i className='ion-heart'></i> 29
                </button>
              </div>
              <a href='' className='preview-link'>
                <h1>How to build webapps that scale</h1>
                <p>This is the description for the post.</p>
                <span>Read more...</span>
              </a>
            </div>

            <div className='article-preview'>
              <div className='article-meta'>
                <a href=''>
                  <img src='http://i.imgur.com/N4VcUeJ.jpg' />
                </a>
                <div className='info'>
                  <a href='' className='author'>
                    Albert Pai
                  </a>
                  <span className='date'>January 20th</span>
                </div>
                <button className='btn btn-outline-primary btn-sm pull-xs-right'>
                  <i className='ion-heart'></i> 32
                </button>
              </div>
              <a href='' className='preview-link'>
                <h1>
                  The song you won't ever stop singing. No matter how hard you
                  try.
                </h1>
                <p>This is the description for the post.</p>
                <span>Read more...</span>
                <ul className='tag-list'>
                  <li className='tag-default tag-pill tag-outline'>Music</li>
                  <li className='tag-default tag-pill tag-outline'>Song</li>
                </ul>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
