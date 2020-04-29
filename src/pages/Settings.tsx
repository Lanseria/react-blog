import React, { FunctionComponent } from 'react';
import { RouteComponentProps, Redirect } from '@reach/router';
import { useOvermind } from '../store';
import { SettingForm } from '../components/SettingsForm';

export const Settings: FunctionComponent<RouteComponentProps> = () => {
  const {
    state: {
      auth: { authenticating, authenticated },
      profile: { errors },
    },
    actions: {
      auth: { logout },
    },
  } = useOvermind();

  if (!authenticated && !authenticating) {
    return <Redirect to='/' noThrow={true}></Redirect>;
  }
  return (
    <div className='settings-page'>
      <div className='container page'>
        <div className='row'>
          <div className='col-md-6 offset-md-3 col-xs-12'>
            <h1 className='text-xs-center'>Your Settings</h1>
            {Boolean(errors.length) && (
              <ul className='error-messages'>
                {errors.map((err) => (
                  <li key={err}>{err}</li>
                ))}
              </ul>
            )}
            <SettingForm></SettingForm>
            <button
              className='btn btn-outline-danger  pull-xs-right'
              style={{ marginTop: '10px' }}
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
