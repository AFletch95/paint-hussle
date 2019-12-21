import React from "react";

function FilterDropdown() {
  return (
    <div className="dropdown">
      <button className="btn btn-danger dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
        Filter
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <div className="dropdown-item">
          <input type="checkbox" className="form-check-input" id="filterItem1CheckBox"></input>
          <label className="form-check-label" htmlFor="filterItem1CheckBox">filter one</label>
        </div>
        <div className="dropdown-item">
          <input type="checkbox" className="form-check-input" id="filterItem2CheckBox"></input>
          <label className="form-check-label" htmlFor="filterItem2CheckBox">filter two</label>
        </div>
        <div className="dropdown-item">
          <input type="checkbox" className="form-check-input" id="filterItem3CheckBox"></input>
          <label className="form-check-label" htmlFor="filterItem3CheckBox">filter three</label>
        </div>

      </div>
    </div>
  )
}

export default FilterDropdown;