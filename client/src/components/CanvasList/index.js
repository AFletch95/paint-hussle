import React from 'react';

const CanvasList = props => {
  const { canvases, loadCanvases, canLoadMore } = props;

  const renderLoadButton = () => {
    if (!canLoadMore) return null;
    return (
      <div className='d-flex justify-content-center'>
        <div
          className='btn btn-lg btn-primary mb-5'
          type='button'
          onClick={loadCanvases}
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
      {renderLoadButton()}
    </div>
  );
};

export default CanvasList;
