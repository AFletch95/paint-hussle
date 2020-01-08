import React from "react"
import EditButton from "../Buttons/EditButton";

const CanvasCarousel = (props) => {

  const canvases = props.canvases || new Array(15);
  const createCanvasElement = props.createCanvasElement || ((canvas) => { "1" })

  const createCarouselRows = () => {
    if (!canvases) return null;

    const rowCount = Math.ceil(canvases.length / 4);
    const rows = [];

    for (let i = 0; i < rowCount; i++) {
      const items = [];
      for (let j = 0; j < 4 && j + i * 4 < canvases.length; j++) {
        let canvas = canvases[j + i * 4];
        items.push(
          <div className="col" style={canvasStyle} key={j}>

            {createCanvasElement(canvas)}
          </div>
        )
      }
      rows.push(
        <div className={i === 0 ? "carousel-item active" : "carousel-item"} key={i}>
          <div className="container">
            <div className="row" >
              {items}
            </div>
          </div>
        </div>

      )
    }
    return rows

  }


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
            <a className="ml-3 pt-2" href={props.carouselNameLink}>show all</a>
          </div>
          <div id="carousel" className="carousel slide" data-ride="carousel" style={{ height: "300px", width: "1000px" }}>
            <div className="carousel-inner mx-auto" style={{ width: "900px" }}>
              {createCarouselRows()}

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