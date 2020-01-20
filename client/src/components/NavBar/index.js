import React, { useState, useEffect } from 'react';
import API from "../../utils/API";

const Navbar = props => {
  let currentUsername = sessionStorage.getItem('currentUsername');
  // variable to store current page displayed
  const [currentPage, setCurrentPage] = useState("home");

  // variables for account dropdown
  const [isOpen, setIsOpen] = useState(false);
  const menuClass = isOpen ? "show" : "";

  useEffect(() => {
    getCurrentRoute()
    console.log(currentPage)
  }, []);

  // get the current route, if at home page do not display the navbar
  const getCurrentRoute = () => {
    let route = window.location.pathname;
    console.log(route)
    switch (route) {
      case "/account":
        setCurrentPage("account");
        break;
      case "/":
        setCurrentPage("home");
        break;
      case "/auctionhouse":
        setCurrentPage("auctionhouse");
        break;
      case "/easel":
        setCurrentPage("easel");
        break;
      case "/artists":
        setCurrentPage("artists");
        break;
      case "/gallery":
        setCurrentPage("gallery");
        break;
      case "/leaderboards":
        setCurrentPage("leaderboards");
        break;
      default:
        setCurrentPage("/")
        break;
    }
  }
  //toggle function for dropdown
  const toggleIsOpen = (event) => {
    setIsOpen(!isOpen)
  }

  //handle request for user logout
  const handleLogOut = () => {
    sessionStorage.clear();
    API.userLogOut()
  }

  // handle the style changes for the links
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

    <ul className="nav justify-content-center" hidden={currentPage === "home" ? true : false} style={{ background: "rgba(32,32,32,0.85)" }}>
      <li className="nav-item pr-5">
        <a className="nav-link " href="/"
          style={props.currentPage === "home" ? activeLinkItem : linkItem}
          onMouseOut={changeLinkColor} onMouseOver={changeLinkColorHover} onClick={() => setCurrentPage("home")}
        >PAINT HUSTLE</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/auctionhouse"
          style={currentPage === "auctionhouse" ? activeLinkItem : linkItem}
          onMouseOut={changeLinkColor} onMouseOver={changeLinkColorHover} onClick={() => setCurrentPage("auctionhouse")}
        >Auction House</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/artists"
          style={currentPage === "artists" ? activeLinkItem : linkItem}
          onMouseOut={changeLinkColor} onMouseOver={changeLinkColorHover} onClick={() => setCurrentPage("artists")}
        >Artists</a>
      </li>
      <li className="nav-item">
        <a className="nav-link " href="/gallery"
          style={currentPage === "gallery" ? activeLinkItem : linkItem}
          onMouseOut={changeLinkColor} onMouseOver={changeLinkColorHover} onClick={() => setCurrentPage("gallery")}
        >Gallery</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/leaderboards"
          style={currentPage === "" ? activeLinkItem : linkItem}
          onMouseOut={changeLinkColor} onMouseOver={changeLinkColorHover} onClick={() => setCurrentPage("leaderboards")}
        >Leaderboards</a>
      </li>
      <li className="nav-item dropdown " onClick={toggleIsOpen} >
        <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button"
          aria-haspopup="true" aria-expanded="false" style={currentPage === "account" ? activeLinkItem : linkItem}
          onMouseOut={changeLinkColor} onMouseOver={changeLinkColorHover}>My Account</a>
        <div className={"dropdown-menu" + menuClass}>
          <a className="nav-link" href="/account" style={currentPage === "" ? activeLinkItem : linkItem}
            onMouseOut={changeLinkColor} onMouseOver={changeLinkColorHover}>Account Page</a>
          <a className="nav-link" href="/account">Account Settings</a>
          <div className="dropdown-divider"></div>
          <a className="nav-link" href="/" onClick={handleLogOut} style={currentPage === "" ? activeLinkItem : linkItem}
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
