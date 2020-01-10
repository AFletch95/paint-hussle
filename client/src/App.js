// react
import React, { useState } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
	Link
} from "react-router-dom";


// components
import Navbar from "./components/NavBarPaintHustle"

// pages
import LoginPage from './pages/Login';
import Marketplace from "./pages/Market";
import ShowAllCanvases from "./pages/ListUserCanvases";
import AccountPage from "./pages/AccountPage";
import HomePage from './pages/Home';
import CanvasEditor from './pages/CanvasEditor';

function App() {

	const [currentUsername, setCurrentUsername] = useState()
	const [currentPage, setCurrentPage] = useState("Home")



	return (
		<div>

			<Navbar currentUsername={currentUsername} currentPage={currentPage} />
			<Router>
				<Switch>
					<Route exact path="/marketplace">
						<Marketplace setCurrentPage={setCurrentPage} />
					</Route>
					<Route exact path="/myaccount">
						<AccountPage setCurrentPage={setCurrentPage} currentUsername={currentUsername} />
					</Route>
					<Route exact path="/login">
						<LoginPage setCurrentUsername={setCurrentUsername} setCurrentPage={setCurrentPage} />
					</Route>
					<Route exact path="/allcanvases-onsale">
						<ShowAllCanvases pageTitle={"My Canvases on sale"} setCurrentPage={setCurrentPage} />
					</Route>
					<Route exact path="/allcanvases">
						<ShowAllCanvases pageTitle={"My Canvases"} setCurrentPage={setCurrentPage} />
					</Route>
					<Route  exact path="/canvaseditor">
						<CanvasEditor setCurrentPage={setCurrentPage} />
					</Route>
					<Route exact path="/" >
						<HomePage setCurrentPage={setCurrentPage} />
					</Route>
					<Redirect from="/" to="/" />
				</Switch>
			</Router>



			{/* <Footer /> */}
		</div>


	)

}

export default App;
