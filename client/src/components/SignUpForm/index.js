import React, { useState } from 'react';
import database from '../../utils/API';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const MIN_AGE_MILL = 13 * 365.2422 * 24 * 60 * 60 * 1000;

const SignUpForm = () => {
  const MIN_AGE_DATE = new Date(Date.now() - MIN_AGE_MILL);

  const [creationState, setCreationState] = useState('dob');

  const [userData, setUserData] = useState({
    dateOfBirth: MIN_AGE_DATE,
    email: '',
    username: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = e => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const createUser = () => {
    let newUser = {
      dateOfBirth: userData.dateOfBirth,
      username: userData.username,
      password: userData.password,
      email: userData.email,
      name: {
        first: userData.firstName,
        last: userData.lastName,
      },

    }
    if (!newUser.dateOfBirth) return alert('No date of birth');
    if (newUser.dateOfBirth.getTime() > MIN_AGE_DATE.getTime()) return alert('Must be at least 13 years old');
    if (!newUser.username) return alert('No username');
    if (!newUser.password) return alert('No password');
    if (!newUser.email) return alert('No email');
    if (!newUser.name || !newUser.name.first || !newUser.name.last) return alert('No name');

    database
      .createNewUser(newUser)
      .then(res => {
        if (res.statusText === 'OK') setUserData({});
        console.log(res)
        sessionStorage.setItem('currentUsername', newUser.username);
        window.location.pathname = '/myaccount';
      })
      .catch(err => console.error('CREATE NEW USER ERROR', err));
  };

  function render() {
    switch (creationState) {
      case 'full':
        return (
          <form className="text-left mx-auto my-0" style={{ maxWidth: '25rem' }}>
            <div className="form-group form-row">
              <div className="col">
                <label htmlFor="userFirstName">First Name</label>
                <input
                  id="userFirstName"
                  className="form-control"
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleChange}
                  type="text"
                  aria-describedby="First Name"
                  placeholder="First Name"
                />
              </div>
              <div className="col">
                <label htmlFor="userLastName">Last Name</label>
                <input
                  id="userLastName"
                  className="form-control"
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleChange}
                  type="text"
                  aria-describedby="Last Name"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="usernameSignUp">Username</label>
              <input
                id="username"
                className="form-control"
                name="username"
                value={userData.username}
                onChange={handleChange}
                type="text"
              />
            </div>
            <div className="form-group">
              <label htmlFor="userEmailSignUp">Email</label>
              <input
                id="userEmailSignUp"
                className="form-control"
                name="email"
                value={userData.email}
                onChange={handleChange}
                type="email"
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="userPasswordSignUp">Password</label>
              <input
                id="userPasswordSignUp"
                className="form-control"
                name="password"
                value={userData.password}
                onChange={handleChange}
                type={showPassword ? 'text' : 'password'}
              ></input>
              <div className="form-check">
                <input
                  id="showPasswordCheckBox"
                  type="checkbox"
                  className="form-check-input"
                  checked={showPassword}
                  onChange={e => setShowPassword(!showPassword)}
                />
                <label className="form-check-label" htmlFor="showPasswordCheckBox">
                  Show Password
                </label>
              </div>
            </div>
            <div className="text-center">
              <div className="btn btn-success " type="submit" onClick={createUser}>
                Create Account
              </div>
            </div>
          </form>
        );

      case 'dob':
      default:
        return (
          <form className="text-center mx-auto my-0" style={{ maxWidth: '25rem' }}>
            <div className="form-group">
              <label htmlFor="dateOfBirthBar">Date of Birth</label>
              <br />
              <DatePicker
                id="dateOfBirthBar"
                selected={userData.dateOfBirth}
                onChange={value => {
                  setUserData({
                    ...userData,
                    dateOfBirth: value,
                  });
                }}
              />
              <br />
            </div>
            <div
              type="submit"
              className="btn btn-success"
              onClick={() => {
                if (!userData.dateOfBirth) return alert('No date of birth');
                if (userData.dateOfBirth.getTime() > MIN_AGE_DATE.getTime())
                  return alert('Must be at least 13 years old');
                setCreationState('full');
              }}
            >
              Continue
            </div>
          </form>
        );
    }
  }

  return <div>{render()}</div>;
};

export default SignUpForm;
