import React, { useState } from "react"

const SellButton = () => {

  const [buyoutPrice, setBuyoutPrice] = useState(51)

  const [sellPrice, setSellPrice] = useState(50)

  return (
    <div>
      <div>
        <p style={{ cursor: "pointer", opacity: "0.3" }} data-toggle="modal" data-target="#exampleModal"><span role="img" aria-label="SellButton">💲</span></p>
      </div>

      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Sell Canvas</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">

              <form>
                <div className="form-group">
                  <label className="pr-3" htmlFor="startingPrice">Starting Price</label>
                  <input style={{ width: "75px" }} type="number" id="startingPrice" min="50" placeholder="50" onChange={event => setSellPrice(Math.ceil(event.target.value))} />
                </div>
                <div className="form-group">
                  <label className="pr-3" htmlFor="buyoutPrice">Buyout Price</label>
                  <input style={{ width: "75px" }} type="number" id="buyoutPrice" min={sellPrice} placeholder="51" onChange={event => setBuyoutPrice(Math.ceil(event.target.value))} />
                </div>
              </form>

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Sell for {sellPrice}<span role="img" aria-label="canvasCurrency">🍪</span></button>
            </div>
          </div>
        </div>
      </div>
    </div>


  )
}
export default SellButton;