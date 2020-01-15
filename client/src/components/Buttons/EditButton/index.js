import React from "react"

const EditButton = () => {

  return (
    <div>
      <p onClick={() => window.location.pathname = "/canvaseditor"} style={{ cursor: "pointer",}}><span role="img" aria-label="EditButton">📝</span></p>
    </div>
  )
}
export default EditButton;