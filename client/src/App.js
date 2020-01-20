import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import FrontPage from './pages/FrontPage';
import AccountPage from './pages/AccountPage';
import Account from './pages/Account';
import Artists from './pages/Aritists';
import AuctionHouse from './pages/AuctionHouse';
import Easel from './pages/Easel';
import Gallery from './pages/Gallery';
import Leaderboard from './pages/Leaderboard';

const perfectImageStyle = {
  backgroundImage: `url(./images/backgrounds/home.jpg)`,
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
  backgroundSize: 'cover',
  minHeight: '100vh',
};

export default () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log('user:', user);
    if (!user) {
      const storedUser = sessionStorage.getItem('user');
      if (storedUser) setUser(storedUser);
    } else {
      sessionStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  return (
    <div style={perfectImageStyle}>
      <Router>
        <Switch>
          <Route exact path="/">
            {!user ? <FrontPage setUser={setUser} /> : <AccountPage setUser={setUser} />}
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
};
