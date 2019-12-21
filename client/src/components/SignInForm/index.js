import React from "react";

const SignInForm = () => {


  return (
    <div>
      <form>
        <div className="form-group">
          <label htmlFor="userEmail">Username</label>
          <input type="text" className="form-control" id="userEmail" aria-describeby="username" placeholder="Username or Email" />
        </div>
        <div className="form-group">
          <label htmlFor="userPassword">Password</label>
          <input type="password" className="form-control" id="userPassword"></input>
        </div>
        <div className="form-check">
          <input type="checkbox" className="form-check-input" id="rememberMeCheckBox" />
          <label className="form-check-label" htmlFor="rememberMeCheckBox">Remember Me</label>
        </div>
        <div type="submit" className="btn btn-success">Login</div>
        <p className="text-link">Forgot Password?</p>
      </form>
    </div>
  )
}

export default SignInForm;