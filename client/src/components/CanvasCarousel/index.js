import React, { useEffect } from "react"

const CanvasCarousel = (props) => {


  const canvasStyle = {
    height: "215px",
    maxWidth: "215px",
    margin: "5px",
    border: "solid black 1px"

  };

  return (

    <div>

      <div className="row d-flex justify-content-center mt-5">
        <div>
          <div className="row mx-auto d-flex justify-content-center">
            <h3 className="text-center">{props.carouselName}</h3>
            <a className="ml-3 pt-2" href="/mycanvases">show all</a>
          </div>
          <div id="carousel" className="carousel slide" data-ride="carousel" style={{ height: "300px", width: "1000px" }}>
            <div className="carousel-inner mx-auto" style={{ width: "900px" }}>
              {/* first fill this group */}
              <div className="carousel-item active">
                <div className="container">
                  <div className="row" >
                    <div className="col" style={canvasStyle}>

                    </div>

                  </div>
                </div>
              </div>
              {/* 
              if there are more canvases create another carousel item 
              <div className="carousel-item">
                <div className="container">
                  <div className="row" >
                    empty carousel

                  </div>
                </div>
              </div> 
*/}

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
    </div>
  )


}

export default CanvasCarousel;