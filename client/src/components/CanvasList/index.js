import React, { useState } from 'react';
import CanvasSquare from '../CanvasSquare';
import EditButton from '../Buttons/EditButton';
import SellButton from '../Buttons/SellButton';

const CanvasList = props => {
  const { canvases, loadMore, canLoadMore } = props;
  const [loadMoreButtonDisabled, setLoadMoreButtonDisabled] = useState(true);
  const renderLoadMoreButton = () => {
    if (!canLoadMore) return null;
    return (
      <div className='d-flex justify-content-center'>
        <div
          className='btn btn-lg btn-primary mb-5'
          type='button'
          onClick={loadMore}
        >
          Load More
        </div>
      </div>
    );
  };
  return (
    <div>
      <div className='row d-flex justify-content-center'>
        {canvases.map(canvas => (
          <img
            className='img-thumbnail d-block mx-auto mb-2'
            src='./images/dummyProfile.png'
            alt='Canvas'
          />
        ))}
      </div>
      {renderLoadMoreButton()}
    </div>
  );
};

export default CanvasList;
