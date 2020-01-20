import React, { useState, useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';

import api from '../utils/API';

import config from '../config';

const perfectImageStyle = {
  backgroundImage: `url(./images/backgrounds/home.jpg)`,
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
  backgroundSize: 'cover',
  minHeight: '100vh',
};

function HomePage(props) {
  const { setUser } = props;

  const auth = {
    google: {
      onSuccess: response => {
        api.authenticate({ provider: 'google', accessToken: response.accessToken }).then(res => {
          if (res.statusText === 'OK') {
          } else {
            //TODO notify user of login failure
          }
        });
      },
      onFailure: error => {
        if (!error) return;
        if (error.error === 'popup_closed_by_user') return;
        alert(JSON.stringify(error));
      },
    },
  };

  return (
    <div style={perfectImageStyle}>
      <div className="container text-center p-auto">
        <img className="img-fluid" src="./images/logos/large.png" alt="Paint Hustle" />
        <h3 className="mb-5" style={{ fontSize: '3vw' }}>
          BUY SELL CREATE TRADE
        </h3>
        <div className="row">
          <div className="col-lg-4" />
          <div className="col-lg-4">
            <div className="m-5">
              <GoogleLogin
                clientId={config.auth.google.clientId}
                buttonText="Sign in with Google"
                onSuccess={auth.google.onSuccess}
                onFailure={auth.google.onFailure}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
