import React, { useState } from "react";
import CanvasList from "../CanvasList";


const CanvasTabs = () => {

  const [activeListTab, setActiveListTab] = useState("allCanvases");




  const handleOnMouseOver = (event) => {
    event.target.style.cursor = "pointer";
    event.target.style.color = "dimgray"
  }

  const handleOnMouseOut = (event) => {
    event.target.style.color = "black"
  }

  const renderCanvasList = () => {
    switch (activeListTab) {
      case "allCanvases":
        return (
          <CanvasList listTitle={"All Canvases"}
          />)
      case "myAuctions":
        return (
          <CanvasList listTitle={"My Auctions"}
          />);
      default:
        return (
          <CanvasList listTitle={"All Canvases"}
          />);
    }
  }



  const handleRenderCanvasList = (tab) => {
    setActiveListTab(tab);
  }

  const tabTextStyle = {
    color: "black",
  }
  const activeTabTextStyle = {
    textDecoration: "underline",
  }

  return (
    <div className="container mt-4" style={{ border: 'solid black 1px', background: "rgba(255, 248, 220, 0.6)" }}>
      <ul className="nav justify-content-center">
        <li className="nav-item">
          <div className="nav-link" onClick={() => handleRenderCanvasList("allCanvases")}
            onMouseOut={handleOnMouseOut} onMouseOver={handleOnMouseOver}
            style={activeListTab === "allCanvases" ? activeTabTextStyle : tabTextStyle}>All Canvases</div>
        </li>
        <li className="nav-item">
          <div className="nav-link" onClick={() => handleRenderCanvasList("myAuctions")}
            onMouseOut={handleOnMouseOut} onMouseOver={handleOnMouseOver}
            style={activeListTab === "myAuctions" ? activeTabTextStyle : tabTextStyle}>My Acutions</div>
        </li>
      </ul>

      {renderCanvasList()}
    </div>



  )
}
export default CanvasTabs;