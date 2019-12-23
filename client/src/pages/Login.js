import React from "react";
import BirthdateBar from "../components/BirthdateBar"
import SigninForm from "../components/SignInForm"
import SignUpForm from "../components/SignUpForm";

const LoginPage = () => {

  return (
    <div>

      <div id="login" className="mx-auto mt-5"
        style={{ width: "30rem", background: "rgba(0,0,0,0.5)" }}>
        <h2 className="text-center pt-3">Sign In</h2>
        <hr />
        <SigninForm />

        <div className="text-center mt-5">
          <p style={{ fontSize: "1rem", fontWeight: "200", color: "blue" }}>Create Account</p>
          <hr />
        </div>

        <div className="text-center">
          <BirthdateBar />
        </div>

        <hr />

        <SignUpForm />
      </div>

    </div>
  )
}

export default LoginPage;