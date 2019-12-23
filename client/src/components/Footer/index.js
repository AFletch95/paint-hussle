import React from "react";

function Footer() {
  const myStyle = {
    lineHeight: "2rem",
    backgroundColor: "#32a8a4",



  };
  return (
    <nav style={
      myStyle
    }
      className="navbar text-light" >

      <a className="text-dark h3 text-left"
        href="/" > Urban Organics </a>

      <ul className="text-center list-inline pt-2" >
        <li className="list-inline-item" > Created by: </li>
        <li className="list-inline-item" > Austin Fletcher </li>
        <li className="list-inline-item" > Lisa Ebner </li>
        <li className="list-inline-item" > Wesley Clements </li>
      </ul>
    </nav>
  );
};

export default Footer;