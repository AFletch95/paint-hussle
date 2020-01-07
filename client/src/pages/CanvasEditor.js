import React, { useState } from "react";
const CanvasEditor = (props) => {


  props.setCurrentPage("CanvasEditor")

  return (
    <div className="container pt-3">
      <div className="row">
        <div className="col-1">
          <div className="btn btn-primary btn-sm" type="button" onClick={() => window.location.pathname = "/myaccount"}>Back</div>
        </div>
        <div className="col-11">
          <h3 className="text-center"> Canvas Editor</h3>
        </div>
      </div>

      <div className="mx-auto" style={{ height: "60vh", width: "60vw", border: "solid black 1px" }}>
        <h1 className="mx-auto">DUMMY BOX</h1>
      </div>
    </div>
  )
}
export default CanvasEditor;
