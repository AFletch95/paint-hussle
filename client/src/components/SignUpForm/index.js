import React from "react";

const SignUpForm = () => {

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
        <label htmlFor="userEmail">Email</label>
        <input className="form-control" id="userEmail" type="email"></input>
      </div>
      <div className="form-group">
        <label htmlFor="userPassword">Password</label>
        <input className="form-control" id="userPassword" type="password"></input>
        <div className="form-check">
          <input type="checkbox" className="form-check-input" id="showPasswordCheckBox" />
          <label className="form-check-label" htmlFor="showPasswordCheckBox">Show Password</label>
        </div>
      </div>
      <div className="text-center">
        <div className="btn btn-success mb-4 " type="submit">Create Account</div>
      </div>
    </form>
  )
}

export default SignUpForm;