import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Home from './pages/Home';
import Account from './pages/Account';
import Artists from './pages/Aritists';
import AuctionHouse from './pages/AuctionHouse';
import Easel from './pages/Easel';
import Gallery from './pages/Gallery';
import Leaderboard from './pages/Leaderboard';

function App() {
  return (
    <div>
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
