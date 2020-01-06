// react
import React, { useState } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";


// components
import Navbar from "./components/NavBarPaintHustle"

// pages
import LoginPage from './pages/Login';
import Marketplace from "./pages/Market";

import AccountPage from "./pages/AccountPage";
import HomePage from './pages/Home';

function App() {

	const [currentUsername, setCurrentUsername] = useState()
	const [currentPage, setCurrentPage] = useState("Home")



	return (
		<div>

			<Navbar currentUsername={currentUsername} currentPage={currentPage} />
			<Router>
				<Switch>
					<Route path="/marketplace">
						<Marketplace setCurrentPage={setCurrentPage} />
					</Route>
					<Route path="/myaccount">
						<AccountPage setCurrentPage={setCurrentPage} currentUsername={currentUsername} />
					</Route>
					<Route path="/login">
						<LoginPage setCurrentUsername={setCurrentUsername} setCurrentPage={setCurrentPage} />
					</Route>
					<Route path="/" >
						<HomePage setCurrentPage={setCurrentPage} />
					</Route>
				</Switch>
			</Router>



			{/* <Footer /> */}
		</div>


	)

}

export default App;
