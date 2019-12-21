

// react
import React, { useState } from 'react';
// material ui
// import CssBaseline from "@material-ui/core/CssBaseline"
// import { MuiThemeProvider } from "@material-ui/core/styles"
// import Grid from "@material-ui/core/Grid"

// components
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";

// pages
import Home from "./pages/Home";
import Store from "./pages/Store";
import Login from "./pages/Login";



function App() {

	const [currentPage, setCurrentPage] = useState("Home");

	function handlePageChange(page) {
		setCurrentPage(page)
	}

	function renderPage() {
		switch (currentPage) {
			case "Home":
				return <Home currentPage={currentPage}
					handlePageChange={() => handlePageChange("Login")} />;
			case "Login":
				return <Login currentPage={currentPage}
					handlePageChange={() => handlePageChange("Home")} />

			default:
				return <Home currentPage={currentPage}
					handlePageChange={() => handlePageChange("Store")} />;
		}
	}


	return (
		<div>


			{renderPage()}



			{/* <Footer /> */}
		</div>


	)

}

export default App;
