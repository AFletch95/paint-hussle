// react
import React, { useState } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";
// material ui
// import CssBaseline from "@material-ui/core/CssBaseline"
// import { MuiThemeProvider } from "@material-ui/core/styles"
// import Grid from "@material-ui/core/Grid"

// components
import Navbar from "./components/NavBarPaintHustle"

// pages
import Home from "./pages/Home";
import LoginPage from './pages/Login';
import Marketplace from "./pages/Store";

import AccountPage from "./pages/AccountPage";
import HomePage from './pages/Home';

function App() {



	return (
		<div>
			{/* 
			<Navbar currentPage={currentPage} handlePageChange={handlePageChange} />
			{renderPage()} */}

			<Router>
				<Switch>
					<Route path="/marketplace">
						<Navbar />
						<Marketplace />
					</Route>
					<Route path="/account">
						<Navbar />
						<AccountPage />
					</Route>
					<Route path="/login">
						<Navbar />
						<LoginPage />
					</Route>
					<Route path="/" >
						<HomePage />
					</Route>
				</Switch>
			</Router>



			{/* <Footer /> */}
		</div>


	)

}

export default App;
