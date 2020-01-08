import React from 'react';
import CanvasSVG from '../CanvasSVG';

const CanvasSquare = props => {
  const squareStyle = {
    height: '215px',
    maxHeight: '215px',
    width: '215px',
    maxWidth: '215px',
    border: 'solid black 1px',
  };
  return (
    <div className="canvasSquare">
      <div className="mt-2 mr-2 ml-2 mb-0" style={squareStyle}>
        <CanvasSVG svgString={props.canvas.image} width={215} height={215} />
        <div className="float-left">{props.editButton}</div>
        <div className="float-right">{props.sellButton}</div>
      </div>
      <p className="float-right pr-4">{props.canvas.title}</p>
    </div>
  );
};
export default CanvasSquare;
