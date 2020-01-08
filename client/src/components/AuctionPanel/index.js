import React from 'react';
import CanvasSVG from '../CanvasSVG';

const AuctionPanel = props => {
  const { auction } = props;
  return (
    <div className="list-group-item">
      <div className="row">
        <div className="col-md-4">
          <CanvasSVG
            svgString={auction.canvas.image}
            width={215}
            height={215}
            data-toggle="modal"
            data-target="#canvasModal"
            style={{ cursor: 'pointer' }}
          />
        </div>
        <div className="col-md-8">
          <h5 className="card-title">{auction.canvas.title || 'Untitled'}</h5>
          <p className="card-text">{auction.canvas.description || ''}</p>
          <p className="card-text">
            Current owner:
            <span>
              <a href={props.canvasCreatorPage}>{auction.seller.username}</a>
            </span>
          </p>
          <div className="text-right">
            <div className="btn btn-info text-light h1 float-right" href="#">
              {auction.price.buyout || auction.price.starting}
              <span role="img" aria-label="canvasCurrency">
                🍪
              </span>
            </div>
            <div className="col-sm-6"></div>
          </div>
        </div>
      </div>
      <div
        id="canvasModal"
        className="modal fade"
        tab-index="-1"
        role="dialog"
        aria-labelledby="storeCardModalTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <img className="pb-2" src="./placeHolders/572x360.svg" alt="bigCanvasImage"></img>
              {auction.canvas.title ? (
                <div className="text-center">
                  <h2>{auction.canvas.title}</h2>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionPanel;
