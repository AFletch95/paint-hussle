import React, { useState, useEffect } from 'react';
import FilterDropdown from '../components/FilterDropdown';
import AuctionPanel from '../components/AuctionPanel';

import database from '../utils/API';

function StorePage() {
  const [auctions, setAuctions] = useState([]);
  useEffect(() => {
    database
      .getAuctions()
      .then(res => {
        if (res.statusText === 'OK') {
          return res.data.result.auctions;
        }
        return [];
      })
      .then(auctions => {
        console.log(auctions);
        setAuctions(auctions);
      });
  }, []);
  const [canvasCreatorPage, setCanvasCreatorPage] = useState('/publicUserPage');

  return (
    <div className="container-fluid ">
      <div className="row">
        <FilterDropdown />
      </div>
      <div className="container mx-auto">
        <div className="list-group-flush">
          {auctions.length > 0 ? (
            auctions.map(auction => <AuctionPanel auction={auction} canvasCreatorPage={canvasCreatorPage} />)
          ) : (
            <div className="text-center">'No Auctions'</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StorePage;
