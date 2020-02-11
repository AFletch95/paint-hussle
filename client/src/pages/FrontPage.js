import React, { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';

import LoginPanel from '../components/LoginPanel';

import api from '../utils/API';

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

  const renderLoginError = () => {
    switch (loginError) {
      case 'invalid':
        return (
          <Form.Text className='text-danger'>
            Username must be at least 3 characters
          </Form.Text>
        );
      case 'taken':
        return (
          <Form.Text className='text-danger'>
            Username is already taken
          </Form.Text>
        );
      default:
        return null;
    }
  };

  const renderLogin = () => {
    if (!user) return <LoginPanel setUser={setUser} />;
    return (
      <Container className='justify-content-center'>
        <Form className='text-center m-5' onSubmit={submitUsername}>
          <Form.Group className='form-group'>
            <Form.Control
              type='text'
              className='position-static'
              aria-describedby='username'
              placeholder='Username'
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            {renderLoginError()}
          </Form.Group>
        </Form>
      </Container>
    );
  };

  return (
    <Container className='text-center p-auto'>
      <Image src='./images/logos/large.png' alt='Paint Hustle' fluid />
      <h3 className='mb-5' style={{ fontSize: '3vw' }}>
        BUY SELL CREATE TRADE
      </h3>
      {renderLogin()}
    </Container>
  );
}

export default HomePage;
