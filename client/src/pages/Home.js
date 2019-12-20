import React from "react";
import About from "./About";
function Home(props) {
  const perfectImageStyle = {
    backgroundImage: `url(./images/background_concept2.jpg)`,
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    minHeight: "100vh",
  }


  return (
    <div>
      <div style={perfectImageStyle} className="homePageImage text-center">
        <div style={{ display: "flex", flexDirection: "column", height: "100vh", justifyContent: "space-between", alignItems: "center" }}>

          <div style={{ paddingTop: "10rem" }} className="name-and-logo">

            <div className="paintHustleLogo mx-auto">
              <img src="./logo192.png" style={{ height: "250px", width: "250px", }}></img>
            </div>

            <h1 style={{ fontFamily: "Montserrat, sans-serif" }} className="">PAINT HUSTLE</h1>
            <h3 style={{ fontFamily: "Montserrat, sans-serif" }}>BUY, SELL, CREATE, AND TRADE</h3>

          </div>

          <div style={{ height: "auto", width: "fit-content", border: "solid lightgray 1px", background: "black", opacity: "0.5", }} onClick={() => props.handlePageChange("Store")} className="btn pb-2 pt-2 pr-4 pl-4">
            <h2 className="text-light mb-0">CREATE ACCOUNT</h2>
            <h2 className="text-light">------></h2>
          </div>

          <div className="btn" id="arrowButton">
            <img src="./logos/downarrow3.png" alt="down arrow" className="flex-bottom" style={{ height: "50px", width: "80px" }}></img>
          </div>

        </div>
        <About />
      </div>
    </div>
  );
}

export default Home;