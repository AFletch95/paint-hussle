import React, { useEffect, useState } from 'react';
import BuyCanvases from '../components/BuyCanvasesModal';

import CanvasList from "../components/CanvasList";

import database from '../utils/API';

const AccountPage = props => {

  const [userCanvases, setUserCanvases] = useState(new Array(12).fill("Canvas img"));
  const [userAuctions, setUserAuctions] = useState([]);


  useEffect(() => {
    props.setCurrentPage('Account');

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
        {/* AccountPage */}
        <div>
          <h3 className="text-center">My Account ~ {sessionStorage.getItem('currentUsername') || 'Account'}</h3>
          <div className="container container-fluid rounded-top" style={{ border: 'solid black 1px', background: "rgba(255, 248, 220, 0.6)" }}>
            <div className="row pb-1 pt-1">
              {/* favorite canvas img */}
              <div className="col-xs-12 col-md-3" style={{ borderRight: 'solid black 1px' }}>
                <div className="mx-auto" style={{ width: '200px', height: '200px', background: 'red' }}>
                  {/* TODO: WHEN CLICKED OPEN LARGER IMAGE */}
                </div>
              </div>
              {/* user stats / info */}
              <div className="col-xs-12 col-md-9">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col text-center" style={{ paddingTop: '1.5rem' }}>
                      <p>Owned canvases: {props.userCanvasCount || '~'}</p>
                      <p>
                        Avaliable currency: {props.avalibleCurrency || '~'}
                        <span role="img" aria-label="canvasCurrency">
                          🍪
                        </span>
                      </p>
                    </div>
                    <div className="col text-center" style={{ paddingTop: '1rem' }}>
                      <h5 className="mb-3">Quick Links</h5>
                      <p className="mb-2">
                        <span>
                          <a href="/market">Marketplace</a>
                        </span>
                      </p>
                      <BuyCanvases
                        avalibleCurrency={props.avalibleCurrency}
                        setAvaliableCurrency={props.setAvaliableCurrency}
                        userCanvasCount={props.userCanvasCount}
                        setUserCanvasCount={props.setUserCanvasCount}
                      />
                      <p className="mb-2">
                        <span>
                          <a href="/canvaseditor">Edit a canvas</a>
                        </span>
                      </p>
                      <p className="mb-2">
                        <span>
                          <a href="/sell">Sell a canvas</a>
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <CanvasList userCanvases={userCanvases} setUserCanvases={setUserCanvases} />


        {/* ending div */}
      </div>
    </div>
  );
};

export default AccountPage;
