import React, { useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';

import api from '../utils/API';

function HomePage(props) {
  const perfectImageStyle = {
    backgroundImage: `url(./images/backgroundcanvas2.jpg)`,
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
    console.log(response);
    api
      .authenticate({ provider: 'google', accessToken: response.accessToken })
      .then(res => {
        console.log(res);
      });
  };

  const onFailure = error => {
    alert(JSON.stringify(error));
  };

  return (
    <div>
      <div className='container text-center p-auto'>
        <img
          className='img-fluid'
          src='./logos/pnthustle.png'
          alt='Paint Hustle'
        />
        <h3 className='mb-5' style={{ fontSize: '3vw' }}>
          BUY SELL CREATE TRADE
        </h3>
        <div className='row'>
          <div className='col-md-4' />
          <div className='col-md-4'>
            <div className='m-5'>
              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}
                buttonText='Sign in with Google'
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
