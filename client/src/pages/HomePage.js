import React, { useEffect, useState } from 'react';
//import BuyCanvases from '../components/BuyCanvasesModal';

import CanvasList from '../components/CanvasList';

//import database from '../utils/API';

const backgroundSyle = {
  background: 'rgba(255, 248, 220, 0.6)',
};

const AccountPage = props => {
  const { user, setUser } = props;
  const [activeTab, setActiveTab] = useState('Canvases');
  const [userCanvases, setUserCanvases] = useState(
    new Array(12).fill('Canvas img'),
  );
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

  const tabs = ['Canvases', 'Auctions'];
  const renderTabHeader = () => {
    return (
      <ul className='nav nav-pills justify-content-center m-5'>
        {tabs.map(tab => {
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
            canvases={userCanvases}
            loadMore={() => {
              const canvases = userCanvases.concat(
                new Array(12).fill('Canvas img'),
              );
              setUserCanvases(canvases);
            }}
            canLoadMore={userCanvases.length < 40}
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
