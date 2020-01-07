import React from "react"

const EditButton = () => {

  return (
    <div>
      <p onClick={() => window.location.pathname = "/canvaseditor"} style={{ cursor: "pointer", opacity: "0.3" }}><span role="img" aria-label="canvasCurrency">📝</span></p>
    </div>
  )
}
export default EditButton;