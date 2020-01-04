import React from "react";

const AccountPage = (props) => {

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

        <div className="row d-flex justify-content-center mt-5">
          <div>
            <div className="row mx-auto d-flex justify-content-center">
              <h3 className="text-center">MY CANVASES</h3>
              <a className="ml-3 pt-2" href="/mycanvases">show all</a>
            </div>
            <div id="carousel" className="carousel slide" data-ride="carousel" style={{ height: "300px", width: "1000px" }}>
              <div className="carousel-inner mx-auto" style={{ width: "900px" }}>
                <div className="carousel-item active">
                  <div className="container">
                    <div className="row" >
                      <div className="col" style={{ background: "red", height: "215px", margin: "5px" }}>col 1</div>
                      <div className="col" style={{ background: "blue", height: "215px", margin: "5px" }}>col 2</div>
                      <div className="col" style={{ background: "green", height: "215px", margin: "5px" }}>col 3</div>
                      <div className="col" style={{ background: "purple", height: "215px", margin: "5px" }}>col 4</div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="container">
                    <div className="row" >
                      <div className="col" style={{ background: "blue", height: "215px", margin: "5px" }}>col 2</div>
                      <div className="col" style={{ background: "red", height: "215px", margin: "5px" }}>col 1</div>
                      <div className="col" style={{ background: "purple", height: "215px", margin: "5px" }}>col 4</div>
                      <div className="col" style={{ background: "green", height: "215px", margin: "5px" }}>col 3</div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="container">
                    <div className="row" >
                      <div className="col" style={{ background: "green", height: "215px", margin: "5px" }}>col 3</div>
                      <div className="col" style={{ background: "red", height: "215px", margin: "5px" }}>col 1</div>
                      <div className="col" style={{ background: "purple", height: "215px", margin: "5px" }}>col 4</div>
                      <div className="col" style={{ background: "blue", height: "215px", margin: "5px" }}>col 2</div>
                    </div>
                  </div>

                </div>
              </div>
              <a className="carousel-control-prev" href="#carousel" role="button" data-slide="prev" style={{ background: "rgba(0,0,0,0.3)", width: "50px", height: "230px" }}>
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
              </a>
              <a className="carousel-control-next" href="#carousel" role="button" data-slide="next" style={{ background: "rgba(0,0,0,0.3)", width: "50px", height: "230px" }}>
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
        </div>




        {/* ending div */}
      </div>
    </div>
  )
}

export default AccountPage;