import React, { useState } from "react";
import EditButton from "../components/Buttons/EditButton";
import CanvasSquare from "../components/CanvasSquare";
import SellButton from "../components/Buttons/SellButton";
const ListUserCanvases = (props) => {

  const canvases = props.userCanvases || new Array(15).fill("Canvas Title")

  props.setCurrentPage("ListUserCanvases")

  return (
    <div className="container pt-3">
      <div className="row">
        <div className="col-1">
          <div className="btn btn-primary btn-sm" type="button" onClick={() => window.location.pathname = "/myaccount"}>Back</div>
        </div>
        <div className="col-11">
          <h3 className="text-center"> {props.pageTitle} ~ {sessionStorage.getItem("currentUsername")}</h3>
        </div>
      </div>

      <div className="row pr-4 pl-4 pt-5 d-flex justify-content-center">
        {canvases.map((canvas, index) => (<CanvasSquare key={index} canvasTitle={canvas} sellButton={<SellButton />} editButton={<EditButton />} />
        ))}
      </div>


    </div>


  )
}
export default ListUserCanvases;