import React from 'react';
import EditButton from '../Buttons/EditButton';

const CanvasSquare = props => {
  const squareStyle = {
    height: '215px',
    maxHeight: '215px',
    width: '215px',
    maxWidth: '215px',
    border: 'solid black 1px',
  };
  return (
    <div className="canvasSquare" key={props.key}>
      <div className="mt-2 mr-2 ml-2 mb-0" style={squareStyle}>
        <div style={props.canvas}>
          <EditButton />
        </div>
      </div>
      <p className="float-right pr-4">{props.canvasTitle}</p>
    </div>
  );
};
export default CanvasSquare;
