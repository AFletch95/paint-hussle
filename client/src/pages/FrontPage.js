import React, { useState } from 'react';

import LoginPanel from '../components/LoginPanel';

import api from '../utils/API';

const perfectImageStyle = {
  backgroundImage: `url(./images/backgrounds/home.jpg)`,
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
  backgroundSize: 'cover',
  minHeight: '100vh',
};

function HomePage(props) {
  const { user, setUser } = props;
  const [username, setUsername] = useState('');
  const [loginError, setLoginError] = useState('');

  const submitUsername = async e => {
    e.preventDefault();
    if (!username) return;
    try {
      const res = await api.account.updateInfo({ username });
      if (res.statusText === 'OK') {
        const { error, user } = res.data;
        if (error) setLoginError(error);
        else setUser(user);
      }
    } catch (err) {
      setUser(null);
      setUsername('');
      setLoginError('');
    }
  };

  const renderLoginError = type => {
    switch (loginError) {
      case 'invalid':
        return (
          <small className='form-text text-danger'>
            Username must be at least 3 characters
          </small>
        );
      case 'taken':
        return (
          <small className='form-text text-danger'>
            Username is already taken
          </small>
        );
      default:
        return null;
    }
  };

  const renderLogin = () => {
    if (!user) return <LoginPanel setUser={setUser} />;
    return (
      <div className='d-flex justify-content-center'>
        <form className='text-center m-5' onSubmit={submitUsername}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control position-static'
              aria-describedby='username'
              placeholder='Username'
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            {renderLoginError()}
          </div>
        </form>
      </div>
    );
  };

  return (
    <div style={perfectImageStyle}>
      <div className='container text-center p-auto'>
        <img
          className='img-fluid'
          src='./images/logos/large.png'
          alt='Paint Hustle'
        />
        <h3 className='mb-5' style={{ fontSize: '3vw' }}>
          BUY SELL CREATE TRADE
        </h3>
        {renderLogin()}
      </div>
    </div>
  );
}

export default HomePage;
