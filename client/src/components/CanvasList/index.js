import React, { useState } from "react";
import CanvasSquare from "../CanvasSquare";
import EditButton from '../Buttons/EditButton';
import SellButton from '../Buttons/SellButton';

const CanvasList = (props) => {

  const [userCanvases] = useState(new Array(12).fill("canvasImg"))

  const [loadMoreButtonDisabled, setLoadMoreButtonDisabled] = useState(true)
  const [loadNextPage, setLoadNextPage] = useState(false)

  const allCanvases = canvas => {
    return <CanvasSquare canvas={canvas} editButton={<EditButton />} sellButton={<SellButton />} />;
  };

  const handleLoadMore = () => {
    props.setUserCanvases(props.userCanvases.join(new Array(3).fill("Canvas img")))
    // setLoadNextPage(true)
  }


  return (
    <div className="container pb-4">
      <h3 className="text-center mt-4" >{props.listTitle}</h3>
      <div className="container mx-auto rounded-top" style={{ height: "auto", border: "solid black 1px", background: "rgba(255, 248, 220, 0.6)" }}>
        <div className="row d-flex justify-content-center">
          {userCanvases.map(() => (<div style={{ border: "dashed red 1px", height: "215px", width: "215px", margin: "1rem" }}></div>))}
          {/* <div hidden={loadNextPage? false : true}>
        {userCanvases.slice(12,24).map(() => (<div style={{border: "dashed red 1px", height: "215px", width: "215px", margin: "1rem"}}></div>))}

        </div> */}
        </div>
        <div className="row d-flex justify-content-center">
          <div className="btn btn-lg btn-primary mb-1" type="button" onClick={handleLoadMore} hidden={loadMoreButtonDisabled ? false : true}>Load More</div>
        </div>


      </div>
    </div>
  )
}

export default CanvasList