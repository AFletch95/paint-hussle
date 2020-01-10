import React, { useState, useEffect } from 'react';
import SigninForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';

const LoginPage = (props) => {
  const [currentForm, setCurrentForm] = useState('login');

  const bgStyle = {
    backgroundImage: `url(./images/backgroundcanvas2.jpg)`,
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    minHeight: "100vh",
  }
  const divStyle = { width: '30rem', background: 'rgba(0,0,0,0.5)' };

  useEffect(() => {
    props.setCurrentPage("Login")
  })

  function renderForm() {
    switch (currentForm) {
      case 'login':
        return (
          <div id="login" className="mx-auto py-5" style={divStyle}>
            <h2 className="text-center pt-3">Sign In</h2>
            <hr />
            <SigninForm setCurrentUsername={props.setCurrentUsername} />
            <hr className="mb-0" />
            <div className="text-center py-4">
              <div type="submit" className="btn btn-success rounded" onClick={() => setCurrentForm('create')}>
                Create Account
              </div>
            </div>
          </div>
        );
      case 'create':
        return (
          <div id="create" className="mx-auto pt-5" style={divStyle}>
            <h2 className="text-center pt-3">Create Account</h2>
            <hr className="mb-0 pb-0" />
            <div className="text-center py-4">
              <SignUpForm setCurrentUsername={props.setCurrentUsername} setCurrentForm={setCurrentForm}/>
              <br />
              <div style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }} href="#" onClick={() => setCurrentForm('login')}>
                Sign-in
              </div>
            </div>
          </div>
        );
      default:
        break;
    }
  }
  return <div style={bgStyle}>{renderForm()}</div>;
};

export default LoginPage;
