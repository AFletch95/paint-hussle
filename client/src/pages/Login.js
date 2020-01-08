import React, { Component, useState } from 'react';
import { HashRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import SignInForm from '../components/SignInForm/index';
import SignUpForm from '../components/SignUpForm/index';
import Logo from '../components/Assets/pnthustle.png'

import '../Login.css';

class App extends Component {
  render() {
    return (
      <Router basename="/react-auth-ui/">
        <div className="App">
          <div className="App__Aside"></div>
          <div className="App__Form">
            <div className="PageSwitcher">
                <NavLink to="/sign-in" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign In</NavLink>
                <NavLink exact to="/" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up</NavLink>
              </div>

              <div className="FormTitle">
                  <NavLink to="/sign-in" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign In</NavLink> or <NavLink exact to="/" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign Up</NavLink>
              </div>
              <Route exact path="/" component={SignUpForm}>
              </Route>
              <Route path="/sign-in" component={SignInForm}>
              </Route>
          </div>
        <div className="Logo">
        <img src={Logo} style={{ height: "360px", width: "600px"}} alt="logo"/>  
        </div>
        </div>
      </Router>
    );
  }
}

export default App;
