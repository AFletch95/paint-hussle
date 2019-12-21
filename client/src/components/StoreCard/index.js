import React from "react";

function StoreCard(props) {

  return (
    <div>


      <div className="card" style={{ width: "18rem", border: "solid 1px black", margin: "2rem" }}>
        <img className="card-img-top" src={props.canvasImage} alt="canvas"></img>
        <div className="card-body">
          <h5 className="card-title">{props.canvasName}</h5>
          <p className="card-text">{props.canvasDescription}</p>
          <p className="card-text">Current owner:
          <span>
              <a href={props.canvasCreatorPage}>
                {props.canvasCreator}
              </a>
            </span>
          </p>
          <div className="row">
            <div className="col-sm-12">
              <div className="btn btn-info text-light h1" data-toggle="modal" data-target="#storeCardModal"><span role="img" aria-label="down arrow emoji">🔽</span></div>
              <div className="btn btn-info text-light h1 float-right" href="#">{props.canvasPrice}<span role="img" aria-label="canvasCurrency">🍪</span></div>
            </div>
            <div className="col-sm-6">
            </div>
          </div>

        </div>
      </div>


      {/* Modal */}
      <div className="modal fade" id="storeCardModal" tab-index="-1" role="dialog" aria-labelledby="storeCardModalTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalCanvasTitle">{props.canvasName}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <img className="pb-2" src="./placeHolders/572x360.svg" alt="bigCanvasImage"></img>

              <p className="card-text">Description: {props.canvasDescription}</p>

            </div>
            <div className="modal-footer">
              <div className="">
                <p className="card-text">Current owner:
                <span>
                    <a href={props.canvasCreatorPage}>
                      {props.canvasCreator}
                    </a>
                  </span>
                </p>
              </div>
              <div className="">
                <div type="button" className="btn btn-secondary" data-dismiss="modal">Close</div>
                <div className="btn btn-info text-light h1 float-right" href="#">{props.canvasPrice}<span role="img" aria-label="canvasCurrency">🍪</span></div>
              </div>

            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default StoreCard;