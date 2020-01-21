import React, { useState, useEffect } from 'react';
//import BuyCanvases from '../components/BuyCanvasesModal';

import CanvasList from '../components/CanvasList';

import api from '../utils/API';

const backgroundSyle = {
  background: 'rgba(255, 248, 220, 0.6)',
};

const AccountPage = props => {
  const { user, setUser } = props;
  const [activeTab, setActiveTab] = useState('Canvases');

  const [canvases, setCanvases] = useState([]);
  const [lastLoadedCanvasPage, setLastLoadedCanvasPage] = useState(-1);
  const [totalCanvasPages, setTotalCanvasPages] = useState(0);
  const [awaitingCanvases, setAwaitingCanvases] = useState(false);

  const loadCanvases = () => {
    if (awaitingCanvases) return;
    if (lastLoadedCanvasPage >= totalCanvasPages) return;
    setAwaitingCanvases(true);
    api.account.getCanvases({ page: lastLoadedCanvasPage + 1 }).then(res => {
      if (res.statusText === 'OK') {
        console.log(res.data);
        setCanvases(canvases.concat(res.data.canvases));
        setLastLoadedCanvasPage(res.data.page);
        setTotalCanvasPages(res.data.totalPages);
        setAwaitingCanvases(false);
      }
    });
  };

  const [auctions, setAuctions] = useState([]);
  const [lastLoadedAuctionPage, setLastLoadedAuctionPage] = useState(-1);
  const [totalAuctionPages, setTotalAuctionPages] = useState(0);
  const [awaitingAuctions, setAwaitingAuctions] = useState(false);

  const loadAuctions = () => {
    if (awaitingAuctions) return;
    if (lastLoadedAuctionPage >= totalAuctionPages) return;
    setAwaitingAuctions(true);
    api.account.getAuctions({ page: lastLoadedAuctionPage + 1 }).then(res => {
      if (res.statusText === 'OK') {
        console.log(res.data);
        setAuctions(auctions.concat(res.data.auctions));
        setLastLoadedAuctionPage(res.data.page);
        setTotalAuctionPages(res.data.totalPages);
        setAwaitingAuctions(false);
      }
    });
  };
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized) {
      loadCanvases();
      loadAuctions();
      setInitialized(true);
    }
  }, [initialized, loadCanvases, loadAuctions]);

  const renderTabHeader = () => {
    return (
      <ul className='nav nav-pills justify-content-center m-5'>
        {['Canvases', 'Auctions'].map(tab => {
          if (activeTab === tab) {
            return (
              <li className='nav-item' key={tab}>
                <div className='nav-link active'>{tab}</div>
              </li>
            );
          } else {
            return (
              <li
                className='nav-item'
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{ cursor: 'pointer' }}
              >
                <div className='nav-link'>{tab}</div>
              </li>
            );
          }
        })}
      </ul>
    );
  };
  const renderTabContent = () => {
    switch (activeTab) {
      case 'Canvases':
        return (
          <CanvasList
            canvases={canvases}
            loadCanvases={loadCanvases}
            canLoadMore={lastLoadedCanvasPage < totalCanvasPages}
          />
        );
      case 'Auctions':
        return null;
      default:
        setActiveTab('Canvases');
    }
  };

  return (
    <div>
      {/* new navbar */}

      <div className='container py-auto mx-auto' style={backgroundSyle}>
        <div className='text-center mx-3'>
          <img
            className='mx-auto my-4'
            src='./images/dummyProfile.png'
            alt='Profile'
            style={{ borderRadius: '3rem' }}
          />
          <h1 className='mx-auto my-4'>{user.username}</h1>
          <div className='row mx-auto my-5'>
            <div className='col-md-2 col-lg-3' />
            <div className='col-md-3 col-lg-2'>
              <h3>Currency</h3>
              350🍪
            </div>
            <div className='col-md-2' />
            <div className='col-md-3 col-lg-2'>
              <h3>Currency</h3>
              350🍪
            </div>
            <div className='col-md-2 col-lg-3' />
          </div>
        </div>
        {renderTabHeader()}
        {renderTabContent()}
      </div>
    </div>
  );
};

export default AccountPage;
