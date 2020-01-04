import React, { useState, useEffect } from "react"


const Navbar = (props) => {





  return (
    <nav className="navbar navbar-dark bg-dark" hidden={props.currentPage === "Home"}>
      <a className="navbar-brand h1 mb-0" href="/">Paint-Hustle</a>
      <a className="nav-item text-light" href={props.username ? ("/myaccount/" + props.username) : ("/login")}>{props.username || "Sign in / Sign Up"}</a>
      <a className="nav-item text-light" onClick={() => props.handlePageChange("Market")} href="/marketplace">Marketplace</a>
    </nav>

  )
}

export default Navbar;