import React, { useState } from 'react';

import { GoogleLogin } from 'react-google-login';

import api from '../../utils/API';

import config from '../../config';

function HomePage(props) {
  const { setUser } = props;
  const [authError, setAuthError] = useState({});

  const auth = {
    google: {
      onSuccess: async response => {
        try {
          const res = await api.account.authenticate({
            provider: 'google',
            accessToken: response.accessToken,
          });
          if (res.statusText === 'OK') {
            const {
              data: { user },
            } = res;
            setUser(user);
          } else setAuthError({ provider: 'google' });
        } catch (err) {
          setAuthError({ provider: 'google' });
        }
      },
      onFailure: error => {
        if (!error) return;
        if (error.error === 'popup_closed_by_user') return;
        setAuthError({ provider: 'google', message: JSON.stringify(error) });
      },
    },
  };

  const renderAuthError = provider => {
    // TODO add error reporting
    switch (authError.provider) {
      case 'google':
        if (authError.message) alert(authError.message);
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
