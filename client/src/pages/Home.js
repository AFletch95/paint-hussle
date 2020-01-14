import React, { useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';

import api from '../utils/API';

import config from '../config';

function HomePage(props) {
  const perfectImageStyle = {
    backgroundImage: `url(./images/backgrounds/home.jpg)`,
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    minHeight: '100vh',
  };

  useEffect(() => {
    props.setCurrentPage('Home');
  });

  const googleResponse = response => {
    api.authenticate({ provider: 'google', accessToken: response.accessToken }).then(res => {
      if (res.statusText === 'OK') {
        console.log(res);
        sessionStorage.setItem('currentUsername', res.data.user.username);
        window.location.pathname = '/myaccount';
      } else {
        //TODO notify user of login failure
      }
    });
  };

  const onFailure = error => {
    alert(JSON.stringify(error));
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
                clientId={config.googleAuth.clientId}
                buttonText="Sign in with Google"
                onSuccess={googleResponse}
                onFailure={onFailure}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
