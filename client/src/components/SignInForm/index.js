import React, { useState, useEffect } from 'react';

import database from '../../utils/API';

const SignInForm = props => {
  const [rememberMe, setRememberMe] = useState(false);

  const [userData, setUserData] = useState({
    identifier: '',
    password: '',
  });

  const handleChange = e => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    let remember = localStorage.getItem('rememberMe') === 'true';
    setRememberMe(remember);
    setUserData({
      identifier: remember ? localStorage.getItem('identifier') : '',
      password: '',
    });
  }, []);

  const userLogin = () => {
    if (!userData.identifier) return alert('No username or email');
    if (!userData.password) return alert('No password');
    database
      .userLogin(userData)
      .then(res => {
        if (res.statusText === 'OK') {
          console.log('Saving', rememberMe);
          localStorage.setItem('rememberMe', rememberMe);
          localStorage.setItem('identifier', rememberMe ? userData.identifier : '');
          sessionStorage.setItem('currentUsername', res.data.user.username);
          window.location.pathname = '/myaccount';
        }
      })
      .catch(err => console.error('USER LOGIN ERROR', err));
  };

  return (
    <form className="mx-auto" style={{ maxWidth: '25rem' }}>
      <div className="form-group">
        <label htmlFor="userEmailSignIn">Username</label>
        <input
          type="text"
          className="form-control"
          name="identifier"
          value={userData.identifier}
          onChange={handleChange}
          id="userEmailSignIn"
          aria-describedby="username"
          placeholder="Username or Email"
        />
      </div>
      <div className="form-group">
        <label htmlFor="userPasswordSignIn">Password</label>
        <input
          type="password"
          className="form-control"
          name="password"
          value={userData.password}
          onChange={handleChange}
          id="userPasswordSignIn"
        ></input>
      </div>
      <div className="form-check">
        <input
          type="checkbox"
          onChange={e => setRememberMe(!rememberMe)}
          checked={rememberMe ? true : false}
          className="form-check-input"
          id="rememberMeCheckBox"
        />
        <label className="form-check-label" htmlFor="rememberMeCheckBox">
          Remember Me
        </label>
      </div>
      <div className="text-center">
        <div type="submit" className="btn btn-success" onClick={userLogin}>
          Login
        </div>
        <br />
        <a href="/Forgot Passwords">Forgot Password?</a>
      </div>
    </form>
  );
};

export default SignInForm;
