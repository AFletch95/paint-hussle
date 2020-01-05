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
import LoginPage from './pages/Login';
import Marketplace from "./pages/Market";

import AccountPage from "./pages/AccountPage";
import HomePage from './pages/Home';

function App() {

	const [currentUsername, setCurrentUsername] = useState()



	return (
		<div>
			{/* 
			<Navbar currentPage={currentPage} handlePageChange={handlePageChange} />
			{renderPage()} */}

			<Router>
				<Switch>
					<Route path="/marketplace">
						<Navbar currentUsername={currentUsername} />
						<Marketplace />
					</Route>
					<Route path="/account">
						<Navbar currentUsername={currentUsername} />
						<AccountPage />
					</Route>
					<Route path="/login">
						<Navbar currentUsername={currentUsername} />
						<LoginPage setCurrentUsername={setCurrentUsername} />
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
