import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Navbar from './components/Navbar';

import Home from './pages/Home';
import Account from './pages/AccountPage';
import Artists from './pages/Aritists';
import AuctionHouse from './pages/AuctionHouse';
import Easel from './pages/Easel';
import Gallery from './pages/Gallery';
import Leaderboard from './pages/Leaderboard';

function App() {
  // components

  const perfectImageStyle = {
    backgroundImage: `url(./images/backgrounds/home.jpg)`,
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    minHeight: '100vh',
  };

  return (
    <div style={perfectImageStyle}>

      <Navbar />
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/account">
            <Account />
          </Route>
          <Route exact path="/artists">
            <Artists />
          </Route>
          <Route exact path="/auctionhouse">
            <AuctionHouse />
          </Route>
          <Route exact path="/easel">
            <Easel />
          </Route>
          <Route exact path="/gallery">
            <Gallery />
          </Route>
          <Route exact path="/leaderboard">
            <Leaderboard />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
