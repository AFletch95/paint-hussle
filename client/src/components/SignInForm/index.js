import React from "react";
import database from "../../utils/API";

const SignInForm = () => {

  const userLogin = (username, password) => {
    let userData = {
      indentifier: username,
      password,
    }

    database.userLogin(userData)
      .then(res => console.log(res.json()))
      .catch(err => console.error("USER LOGIN ERROR", err))
  }

  return (
    <form style={{ maxWidth: "25rem" }} className="mx-auto">
      <div className="form-group" >
        <label htmlFor="userEmailSignIn">Username</label>
        <input type="text" className="form-control" id="userEmailSignIn" aria-describedby="username" placeholder="Username or Email" />
      </div>
      <div className="form-group">
        <label htmlFor="userPasswordSignIn">Password</label>
        <input type="password" className="form-control" id="userPasswordSignIn"></input>
      </div>
      <div className="form-check">
        <input type="checkbox" className="form-check-input" id="rememberMeCheckBox" />
        <label className="form-check-label" htmlFor="rememberMeCheckBox">Remember Me</label>
      </div>
      <div className="text-center">
        <div type="submit" className="btn btn-success" onClick={userLogin}>Login</div>
        <br />
        <a href="/Forgot Passwords">Forgot Password?</a>
      </div>
    </form>
  )
}

export default SignInForm;