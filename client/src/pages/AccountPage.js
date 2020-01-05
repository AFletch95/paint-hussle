import React, { useEffect } from "react";
import CanvasCarousel from "../components/CanvasCarousel";

const AccountPage = (props) => {


  useEffect(() => {
    props.setCurrentPage("Account")
  }, [])


  return (
    <div style={{ background: "lightgray", height: "100vh" }}>
      {/* new navbar */}

      <div className="container-fluid">
        {/* AccountPage */}
        <div>
          <h3 className="text-center">{props.username || "Account"} Stats</h3>
          <div className="container container-fluid" style={{ border: "solid black 1px" }}>
            <div className="row pb-1 pt-1">

              {/* favorite canvas img */}
              <div className="col-xs-12 col-md-3" style={{ borderRight: "solid black 1px" }} >
                <div className="mx-auto" style={{ width: "200px", height: "200px", background: "red" }}>
                  {/* TODO: WHEN CLICKED OPEN LARGER IMAGE */}
                </div>
              </div>
              {/* user stats / info */}
              <div className="col-xs-12 col-md-9">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col text-center" style={{ paddingTop: "1.5rem" }}>
                      <p>Owned canvases: {props.totalUserCanvasCount || "~"}</p>
                      <p>Blank canvases: {props.uneditedUserCanvasCount || "~"}</p>
                      <p>Avaliable currency: {props.userCurrency || "~"}<span role="img" aria-label="canvasCurrency">🍪</span></p>
                      <p>Lifetime canvases: {props.userLifetimeCanvasCount || "~"}</p>
                    </div>
                    <div className="col text-center" style={{ paddingTop: "1rem" }}>
                      <h5 className="mb-3">Quick Links</h5>
                      <p className="mb-2"><span><a href="/market">Marketplace</a></span></p>
                      <p className="mb-2"><span><a href="/store">Buy canvases</a></span></p>
                      <p className="mb-2"><span><a href="/create">Edit a canvas</a></span></p>
                      <p className="mb-2"><span><a href="/sell">Sell a canvas</a></span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <CanvasCarousel />


        {/* ending div */}
      </div>
    </div>
  )
}

export default AccountPage;