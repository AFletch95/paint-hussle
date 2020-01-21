import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';

import api from '../../utils/API';

import config from '../../config';

function HomePage(props) {
  const { setUser } = props;
  const [authError, setAuthError] = useState('');

  const auth = {
    google: {
      onSuccess: async response => {
        const res = await api.account.authenticate({
          provider: 'google',
          accessToken: response.accessToken,
        });
        if (res.statusText === 'OK') {
          const {
            data: { user },
          } = res;
          setUser(user);
        } else setAuthError('google');
      },
      onFailure: error => {
        if (!error) return;
        if (error.error === 'popup_closed_by_user') return;
        alert(JSON.stringify(error));
      },
    },
  };

  const renderAuthError = provider => {
    // TODO add error reporting
    switch (authError) {
      case 'google':
        break;
      default:
        return null;
    }
  };

  return (
    <div className='d-flex justify-content-center'>
      <div className='m-5' key='googleAuth'>
        <GoogleLogin
          clientId={config.auth.google.clientId}
          buttonText='Sign in with Google'
          onSuccess={auth.google.onSuccess}
          onFailure={auth.google.onFailure}
        />
        {renderAuthError('google')}
      </div>
    </div>
  );
}

export default HomePage;
