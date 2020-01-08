
import React, { useEffect, useState } from 'react';
import CanvasCarousel from '../components/CanvasCarousel';
import BuyCanvases from '../components/BuyCanvasesModal';
import CanvasSquare from '../components/CanvasSquare';
import EditButton from '../components/Buttons/EditButton';
import SellButton from '../components/Buttons/SellButton';

import database from '../utils/API';

const AccountPage = props => {
  const [avalibleCurrency, setAvaliableCurrency] = useState(2000);
  const [userCanvasCount, setUserCanvasCount] = useState(3);
  const [uneditedUserCanvasCount, setUneditedUserCanvasCount] = useState(3);
  const [userCanvases, setUserCanvases] = useState([]);
  const [userAuctions, setUserAuctions] = useState([]);

  const allCanvases = canvas => {
    return <CanvasSquare canvas={canvas} editButton={<EditButton />} sellButton={<SellButton />} />;
  };

  useEffect(() => {
    props.setCurrentPage('Account');
    database.getUserCanvases().then(result => {
      if (result.statusText === 'OK') {
        setUserCanvases(result.data.canvases);
      }
    });
    database.getUserAuctions().then(result => {
      if (result.statusText === 'OK') {
        setUserAuctions(result.data.auctions);
      }
    });
  });

  return (
    <div style={{ background: 'lightgray' }}>
      {/* new navbar */}

      <div className="container-fluid pt-4">
        {/* AccountPage */}
        <div>
          <h3 className="text-center">My Account ~ {sessionStorage.getItem('currentUsername') || 'Account'}</h3>
          <div className="container container-fluid" style={{ border: 'solid black 1px' }}>
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
                      <p>Owned canvases: {userCanvasCount || '~'}</p>
                      <p>Blank canvases: {uneditedUserCanvasCount || '~'}</p>
                      <p>
                        Avaliable currency: {avalibleCurrency || '~'}
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
                        avalibleCurrency={avalibleCurrency}
                        setAvaliableCurrency={setAvaliableCurrency}
                        userCanvasCount={userCanvasCount}
                        setUserCanvasCount={setUserCanvasCount}
                        uneditedUserCanvasCount={uneditedUserCanvasCount}
                        setUneditedUserCanvasCount={setUneditedUserCanvasCount}
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

        <CanvasCarousel
          carouselName={'My Canvases'}
          carouselNameLink={'/allcanvases'}
          canvases={userCanvases}
          createCanvasElement={allCanvases}
        />
        <CanvasCarousel
          carouselName={'On Sale'}
          carouselNameLink={'/allcanvases-onsale'}
          canvases={userAuctions.map(auction => {
            console.log(auction.canvas);
            return auction.canvas;
          })}
          createCanvasElement={allCanvases}
        />

        {/* ending div */}
      </div>
    </div>
  );
};

export default AccountPage;
