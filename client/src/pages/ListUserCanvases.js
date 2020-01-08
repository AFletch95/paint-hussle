import React, { useState, useEffect } from 'react';
import CanvasSquare from '../components/CanvasSquare';

import database from '../utils/API';

const ListUserCanvases = props => {
  props.setCurrentPage('ListUserCanvases');
  const [canvases, setCanvases] = useState([]);

  useEffect(() => {
    database.getUserCanvases().then(result => {
      if (result.statusText === 'OK') {
        setCanvases(result.data.canvases);
      }
    });
    return () => {
      cleanup;
    };
  }, [input]);

  return (
    <div className="container pt-3">
      <div className="row">
        <div className="col-1">
          <div
            className="btn btn-primary btn-sm"
            type="button"
            onClick={() => (window.location.pathname = '/myaccount')}
          >
            Back
          </div>
        </div>
        <div className="col-11">
          <h3 className="text-center">
            {' '}
            {props.pageTitle} ~ {sessionStorage.getItem('currentUsername')}
          </h3>
        </div>
      </div>

      <div className="row pr-4 pl-4 pt-5 d-flex justify-content-center">
        {canvases.map((canvas, index) => (
          <CanvasSquare key={index} canvas={canvas} />
        ))}
      </div>
    </div>
  );
};
export default ListUserCanvases;
