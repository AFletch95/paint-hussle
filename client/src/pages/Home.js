import React from "react";
function HomePage(props) {
  const perfectImageStyle = {
    backgroundImage: `url(./images/backgroundcanvas2.jpg)`,
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    minHeight: "100vh",
  }


  return (
    <div>
      <div style={perfectImageStyle} className="homePageImage text-center">
        <div style={{ display: "flex", flexDirection: "column", height: "100vh", justifyContent: "space-evenly", alignItems: "center" }}>

          <div className="name-and-logo">

            <div className="paintHustleLogo mx-auto">
              <img src="./logos/pnthustle.png" style={{ height: "600px", width: "1080px", }} alt="paint hustle"></img>
            </div>
            <h3 style={{ fontFamily: "Lexend Exa, sans-serif" }}>BUY, SELL, CREATE, AND TRADE</h3>

          </div>

          <div onClick={() => props.handlePageChange("Store")} className="btn pb-2 pt-2 pr-4 pl-4">
            <img src="./logos/create_account_button.png" style={{ height: "144px", width: "260px", }} alt="create account"></img>
          </div>

        </div>
      </div>
    </div>
  );
}

export default HomePage;