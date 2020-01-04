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
    username: '',
    password: '',
    name: {
      first: '',
      last: '',
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = e => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const createUser = () => {
    if (!userData.dateOfBirth) return alert('No date of birth');
    if (userData.dateOfBirth.getTime() > MIN_AGE_DATE.getTime()) return alert('Must be at least 13 years old');
    if (!userData.username) return alert('No username');
    if (!userData.passowrd) return alert('No password');
    if (!userData.email) return alert('No email');
    if (!userData.name || !userData.name.first || !userData.name.last) return alert('No name');

    database
      .createNewUser(userData)
      .then(res => {
        if (res.statusText === 'OK') setUserData({});
        console.log(res);
      })
      .catch(err => console.error('CREATE NEW USER ERROR', err));
  };

  function render() {
    switch (creationState) {
      case 'dob':
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
      case 'full':
        return (
          <form className="text-left mx-auto my-0" style={{ maxWidth: '25rem' }}>
            <div className="form-group form-row">
              <div className="col">
                <label htmlFor="userFirstName">First Name</label>
                <input
                  id="userFirstName"
                  className="form-control"
                  name="name.first"
                  value={userData.name.first}
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
                  name="name.last"
                  value={userData.name.last}
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
    }
  }

  return <div>{render()}</div>;
};

export default SignUpForm;
