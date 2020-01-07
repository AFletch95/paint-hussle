import React, { useState } from "react";

const BuyCanvases = (props) => {

  const [quantity, setQuantity] = useState(0);
  const [redTextFlag, setRedTextFlag] = useState(true);
  const [greenTextFlag, setGreenTextFlag] = useState(true);

  const handlePurchaseButton = () => {
    if (props.avalibleCurrency - quantity * 50 > 0) {
      props.setAvaliableCurrency(props.avalibleCurrency - quantity * 50);
      props.setUserCanvasCount(parseInt(props.userCanvasCount) + parseInt(quantity));
      props.setUneditedUserCanvasCount(parseInt(props.uneditedUserCanvasCount) + parseInt(quantity))
      setGreenTextFlag(false);
      setRedTextFlag(true);
    }
    else {
      setRedTextFlag(false);
      setGreenTextFlag(true);
    }
  }

  return (
    <div className="mb-2" >

      <div className="btn btn-primary btn-sm" data-toggle="modal" data-target="#BuyCanvasModal">Buy Canvases</div>

      <div className="modal fade" id="BuyCanvasModal" tabIndex="-1" role="dialog" aria-labelledby="BuyCanvasModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="BuyCanvasModalLabel">Buy New Canvases</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="container">
                <div className="row">
                  <div className="col">
                    <p>New canvases cost 50<span role="img" aria-label="canvasCurrency">🍪</span>'s each.</p>
                    <hr />
                  </div>
                  <div className="row">
                    <div className="col">
                      <p>You have {props.avalibleCurrency}<span role="img" aria-label="canvasCurrency">🍪</span> avaliable</p>
                      <p>How many canvases would you like to buy?</p>
                      <input type="number" min="1" style={{ width: "45px" }} onChange={event => setQuantity(event.target.value)} placeholder="1" />
                    </div>
                    <div className="col">
                      <p>CHECKOUT</p>
                      <p>{quantity} Canvases</p>
                      <hr />
                      <p>TOTAL: {quantity * 50}<span role="img" aria-label="canvasCurrency">🍪</span></p>

                      <p>{props.avalibleCurrency - quantity * 50}<span role="img" aria-label="canvasCurrency">🍪</span> After purchase</p>
                      <p hidden={redTextFlag ? true : false} style={{ color: "red" }}>Not enough funds!</p>

                      <p hidden={greenTextFlag ? true : false} style={{ color: "green" }}>Thanks for your purchase!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handlePurchaseButton}>Purchase</button>
            </div>
          </div>
        </div>
      </div>



    </div>

  )
}

export default BuyCanvases;