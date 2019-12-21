

// react
import React, { useState } from 'react';
// material ui
// import CssBaseline from "@material-ui/core/CssBaseline"
// import { MuiThemeProvider } from "@material-ui/core/styles"
// import Grid from "@material-ui/core/Grid"

// components

// pages
import Home from "./pages/Home";
import Store from "./pages/Store";



function App() {

	const [currentPage, setCurrentPage] = useState("Home");

	function handlePageChange(page) {
		setCurrentPage(page)
	}

	function renderPage() {
		switch (currentPage) {
			case "Home":
				return <Home currentPage={currentPage}
					handlePageChange={() => handlePageChange("Store")} />;
			case "Store":
				return <Store currentPage={currentPage}
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
