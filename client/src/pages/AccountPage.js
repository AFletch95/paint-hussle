import React from "react";

const AccountPage = (props) => {

  return (
    <div>
      {/* new navbar */}
      <div className="navbar navbar-light bg-light">
        <a className="navbar-brand h1 mb-0" href="/">Paint-Hustle</a>
        <a className="nav-item text-dark" href={props.username ? ("/myaccount/" + props.username) : ("/signin")}>{props.username || "Sign in / Sign Up"}</a>
        <a className="nav-item text-dark" href="/market">Marketplace</a>
      </div>

      {/* AccountPage */}
      <div className="container container-fluid" style={{ border: "solid black 1px" }}>
        <div className="row">

          {/* favorite canvas img */}
          <div className="col-xs-12 col-md-3 mx-auto" style={{ width: "200px", height: "200px", border: "solid black 1px", background: "red" }}>
            {/* TODO: WHEN CLICKED OPEN LARGER IMAGE */}
          </div>

          {/* user stats / info */}
          <div className="col-xs-12 col-md-9 text-center">
            <div className="" style={{ paddingTop: "1.5rem" }}>
              <p>Owned canvases: {props.totalUserCanvasCount || "0"}</p>
              <p>Blank canvases: {props.uneditedUserCanvasCount || "0"}</p>
              <p>Avaliable currency: {props.userCurrency || "0"} <span role="img" aria-label="canvasCurrency">🍪</span></p>
              <p>Lifetime canvases: {props.userLifetimeCanvasCount || "0"}</p>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default AccountPage;