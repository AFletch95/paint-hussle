import React, { useState, useEffect } from 'react';
import API from "../../utils/API";

const Navbar = props => {
  let currentUsername = sessionStorage.getItem('currentUsername');

  useEffect(() => { });

  const [isOpen, setIsOpen] = useState(false);
  const menuClass = isOpen ? "show" : "";

  const toggleIsOpen = (event) => {
    setIsOpen(!isOpen)
  }

  const handleLogOut = () => {
    sessionStorage.clear();
    API.userLogOut()

  }

  const changeLinkColorHover = (event) => {
    event.target.style.color = "lightgray"
  }

  const changeLinkColor = (event) => {
    event.target.style.color = "white"
  }

  const linkItem = {
    color: "white",
    fontSize: "1.2rem"

  }

  const activeLinkItem = {
    color: "white",
    fontSize: "1.2rem",
    textDecoration: "underline",

  }

  return (

    <ul className="nav justify-content-center" style={{ background: "rgba(32,32,32,0.85)" }}>
      <li className="nav-item pr-5">
        <a className="nav-link " href="/"
          style={props.currentPage === "home" ? activeLinkItem : linkItem}
          onMouseOut={changeLinkColor} onMouseOver={changeLinkColorHover}>PAINT HUSTLE</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/auctionhouse"
          style={props.currentPage === "auctionhouse" ? activeLinkItem : linkItem} onMouseOut={changeLinkColor} onMouseOver={changeLinkColorHover}
        >Auction House</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/artists"
          style={props.currentPage === "artists" ? activeLinkItem : linkItem} onMouseOut={changeLinkColor} onMouseOver={changeLinkColorHover}
        >Artists</a>
      </li>
      <li className="nav-item">
        <a className="nav-link " href="/gallery"
          style={props.currentPage === "gallery" ? activeLinkItem : linkItem} onMouseOut={changeLinkColor} onMouseOver={changeLinkColorHover}
        >Gallery</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/leaderboards"
          style={props.currentPage === "" ? activeLinkItem : linkItem} onMouseOut={changeLinkColor} onMouseOver={changeLinkColorHover}
        >Leaderboards</a>
      </li>
      <li className="nav-item dropdown " onClick={toggleIsOpen} >
        <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button"
          aria-haspopup="true" aria-expanded="false" style={props.currentPage === "" ? activeLinkItem : linkItem}
          onMouseOut={changeLinkColor} onMouseOver={changeLinkColorHover}>My Account</a>
        <div className={"dropdown-menu" + menuClass}>
          <a className="nav-link" href="#" style={props.currentPage === "" ? activeLinkItem : linkItem}
            onMouseOut={changeLinkColor} onMouseOver={changeLinkColorHover}>Account Page</a>
          <a className="nav-link disabled" href="#">Account Settings</a>
          <div className="dropdown-divider"></div>
          <a className="nav-link" href="/" onClick={handleLogOut} style={props.currentPage === "" ? activeLinkItem : linkItem}
            onMouseOut={changeLinkColor} onMouseOver={changeLinkColorHover}>Log Out</a>
        </div>
      </li>
    </ul>



    // <nav className="navbar navbar-dark bg-dark">
    //   <a className="navbar-brand h1 mb-0" href="/">
    //     Paint-Hustle
    //   </a>
    //   <a className="nav-item text-light" href={currentUsername ? '/myaccount/' : '/login'}>
    //     {currentUsername ? 'My Account' : 'Sign in / Sign Up'}
    //   </a>
    //   <a className="nav-item text-light" onClick={() => props.handlePageChange('Market')} href="/marketplace">
    //     Marketplace
    //   </a>
    // </nav>
  );
};

export default Navbar;
