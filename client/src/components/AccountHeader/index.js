import React from 'react';

const AccountHeader = (props) => {

  const profileImage = props.profileImage;

  return (
    <div className="container container-fluid" style={{
      height: "300px",
      padding: "0"
    }}>
      <div id="favImg" style={{
        height: "200px",
        width: "200px",
        background: profileImage || "darkGreen",
        zIndex: "6",
        position: "relative",
        top: "5%",
        left: "15%"
      }}>
      </div>
      <div className="container container-fluid rounded-top" style={{
        height: "200px",
        display: "flex",
        position: "relative",
        bottom: "34%",
        background: "rgba(255, 248, 220, 0.6)"
      }}>
      </div>


    </div>


  )
}

export default AccountHeader;