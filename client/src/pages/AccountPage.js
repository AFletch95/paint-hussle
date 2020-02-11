import React, { useEffect, useState } from 'react';
import BuyCanvases from '../components/BuyCanvasesModal';
import CanvasTabs from "../components/CanvasTabs";
import CanvasList from "../components/CanvasList";

import database from '../utils/API';
import AccountHeader from '../components/AccountHeader';

const AccountPage = props => {

  const [userCanvases, setUserCanvases] = useState(new Array(12).fill("Canvas img"));
  const [userAuctions, setUserAuctions] = useState([]);


  useEffect(() => {

    // database.getUserCanvases().then(result => {
    //   if (result.statusText === 'OK') {
    //     setUserCanvases(result.data.canvases);
    //     props.setUserCanvasCount(userCanvases.length)
    //   }
    // });
    // database.getUserAuctions().then(result => {
    //   if (result.statusText === 'OK') {
    //     setUserAuctions(result.data.auctions);
    //   }
    // });
  }, []);

  return (
    <div>
      {/* new navbar */}


      <div className="container-fluid pt-4">
        <AccountHeader />
        <CanvasTabs />

      </div>
      {/* ending div */}

    </div>
  );
};

export default AccountPage;
