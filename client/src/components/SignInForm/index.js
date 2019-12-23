import React from "react";

const SignInForm = () => {


  return (
    <form style={{ maxWidth: "25rem" }} className="mx-auto">
      <div className="form-group" >
        <label htmlFor="userEmail">Username</label>
        <input type="text" className="form-control" id="userEmail" aria-describedby="username" placeholder="Username or Email" />
      </div>
      <div className="form-group">
        <label htmlFor="userPassword">Password</label>
        <input type="password" className="form-control" id="userPassword"></input>
      </div>
      <div className="form-check">
        <input type="checkbox" className="form-check-input" id="rememberMeCheckBox" />
        <label className="form-check-label" htmlFor="rememberMeCheckBox">Remember Me</label>
      </div>
      <div className="text-center">
        <div type="submit" className="btn btn-success">Login</div>
        <br />
        <a href="/Forgot Passwords">Forgot Password?</a>
      </div>
    </form>
  )
}

export default SignInForm;