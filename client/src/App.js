// react
import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

// components
import Navbar from './components/NavBar';

// pages
import Marketplace from './pages/Market';
import ShowAllCanvases from './pages/ListUserCanvases';
import AccountPage from './pages/AccountPage';
import HomePage from './pages/Home';
import CanvasEditor from './pages/CanvasEditor';

function App() {
  const [currentPage, setCurrentPage] = useState('Home');

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <HomePage setCurrentPage={setCurrentPage} />
          </Route>
          <Route path="/">
            <Navbar currentPage={currentPage} />
            <Switch>
              <Route exact path="/marketplace">
                <Marketplace setCurrentPage={setCurrentPage} />
              </Route>
              <Route exact path="/myaccount">
                <AccountPage setCurrentPage={setCurrentPage} />
              </Route>
              <Route exact path="/allcanvases-onsale">
                <ShowAllCanvases pageTitle={'My Canvases on sale'} />
              </Route>
              <Route exact path="/allcanvases">
                <ShowAllCanvases pageTitle={'My Canvases'} />
              </Route>
              <Route exact path="/canvaseditor">
                <CanvasEditor setCurrentPage={setCurrentPage} />
              </Route>
              <Redirect to="/" />
            </Switch>
          </Route>
        </Switch>
      </Router>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
