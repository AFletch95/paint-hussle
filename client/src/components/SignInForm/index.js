import React, { useState, useEffect } from 'react';
import database from '../../utils/API';

const SignInForm = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleFormSubmit = () => {
    localStorage.setItem("rememberMe", rememberMe);
    localStorage.setItem("identifier", rememberMe ? identifier : "")
  }

  const handleRememberMe = () => {
    setRememberMe(!rememberMe)
  }

  useEffect(() => {
    let remember = localStorage.getItem("rememberMe") === "true"
    setIdentifier(remember ? localStorage.getItem("user") : "")

  })

  const userLogin = () => {
    console.log('Login');
    if (!identifier || !password) return;
    const userData = {
      identifier,
      password,
    };
    console.log(userData);
    database
      .userLogin(userData)
      .then(res => console.log(res))
      .catch(err => console.error('USER LOGIN ERROR', err));
  };

  return (
    <form style={{ maxWidth: '25rem' }} className="mx-auto">
      <div className="form-group">
        <label htmlFor="userEmailSignIn">Username</label>
        <input
          type="text"
          className="form-control"
          value={identifier}
          onChange={event => setIdentifier(event.target.value)}
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
          value={password}
          onChange={event => setPassword(event.target.value)}
          id="userPasswordSignIn"
        ></input>
      </div>
      <div className="form-check">
        <input type="checkbox" onChange={handleRememberMe} className="form-check-input" id="rememberMeCheckBox" />
        <label className="form-check-label" htmlFor="rememberMeCheckBox">
          Remember Me
        </label>
      </div>
      <div className="text-center">
        <div type="submit" className="btn btn-success" onClick={userLogin, handleFormSubmit}>
          Login
        </div>
        <br />
        <a href="/Forgot Passwords">Forgot Password?</a>
      </div>
    </form>
  );
};

export default SignInForm;
