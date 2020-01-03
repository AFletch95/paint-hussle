import React, { useState } from 'react';
import database from '../../utils/API';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const MIN_AGE = 13 * 365.2422 * 24 * 60 * 60 * 1000;

const SignUpForm = () => {
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date(Date.now() - MIN_AGE).toLocaleDateString());

  const createUser = () => {
    if (!fName || !lName) return;
    if (!username || !password) return;
    if (!email || !dateOfBirth) return;

    let userData = {
      username,
      password,
      name: {
        first: fName,
        last: lName,
      },
      email,
      dateOfBirth,
    };
    database
      .createNewUser(userData)
      .then(res => console.log(res))
      .catch(err => console.error('CREATE NEW USER ERROR', err));
  };

  return (
    <form style={{ maxWidth: '25rem' }} className="mx-auto">
      <div className="form-group text-center">
        <label htmlFor="dateOfBirthBar">Date of Birth</label>
        <br />
        <DatePicker selected={dateOfBirth} onChange={setDateOfBirth} id="dateOfBirthBar" />
      </div>

      <div className="form-row">
        <div className="col">
          <label htmlFor="userFirstName">First Name</label>
          <input
            className="form-control"
            value={fName}
            onChange={event => setFName(event.target.value)}
            id="userFirstName"
            type="text"
            aria-describedby="First Name"
            placeholder="First Name"
          />
        </div>
        <div className="col">
          <label htmlFor="userLastName">Last Name</label>
          <input
            className="form-control"
            value={lName}
            onChange={event => setLName(event.target.value)}
            id="userLastName"
            type="text"
            aria-describedby="Last Name"
            placeholder="Last Name"
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="usernameSignUp">Username</label>
        <input
          className="form-control"
          value={username}
          onChange={event => setUsername(event.target.value)}
          id="usernameSignUp"
          type="text"
        />
      </div>
      <div className="form-group">
        <label htmlFor="userEmailSignUp">Email</label>
        <input
          className="form-control"
          value={email}
          onChange={event => setEmail(event.target.value)}
          id="userEmailSignUp"
          type="email"
        ></input>
      </div>
      <div className="form-group">
        <label htmlFor="userPasswordSignUp">Password</label>
        <input
          className="form-control"
          value={password}
          onChange={event => setPassword(event.target.value)}
          id="userPasswordSignUp"
          type="password"
        ></input>
        <div className="form-check">
          <input type="checkbox" className="form-check-input" id="showPasswordCheckBox" />
          <label className="form-check-label" htmlFor="showPasswordCheckBox">
            Show Password
          </label>
        </div>
      </div>
      <div className="text-center">
        <div className="btn btn-success mb-4 " type="submit" onClick={createUser}>
          Create Account
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
