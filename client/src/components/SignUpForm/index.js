import React from "react";
import database from "../../utils/API";

const SignUpForm = () => {

  const createUser = (username, password, first, last, email, DOB) => {

    let name = {
      first,
      last,
    };

    let userData = {
      username,
      password,
      name,
      email,
      // dateOfBirth: DOB,
    };
    database.createNewUser(userData)
      .then(res => console.log(res.json()))
      .catch(err => console.error("CREATE NEW USER ERROR", err))
  }

  return (
    <form style={{ maxWidth: "25rem" }} className="mx-auto">
      <div className="form-row" >
        <div className="col">
          <label htmlFor="userFirstName">First Name</label>
          <input className="form-control" id="userFirstName" type="text" aria-describedby="First Name" placeholder="First Name" />
        </div>
        <div className="col">
          <label htmlFor="userLastName">Last Name</label>
          <input className="form-control" id="userLastName" type="text" aria-describedby="Last Name" placeholder="Last Name" />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="userEmailSignUp">Email</label>
        <input className="form-control" id="userEmailSignUp" type="email"></input>
      </div>
      <div className="form-group">
        <label htmlFor="userPasswordSignUp">Password</label>
        <input className="form-control" id="userPasswordSignUp" type="password"></input>
        <div className="form-check">
          <input type="checkbox" className="form-check-input" id="showPasswordCheckBox" />
          <label className="form-check-label" htmlFor="showPasswordCheckBox">Show Password</label>
        </div>
      </div>
      <div className="text-center">
        <div className="btn btn-success mb-4 " type="submit" onClick={createUser}>Create Account</div>
      </div>
    </form>
  )
}

export default SignUpForm;