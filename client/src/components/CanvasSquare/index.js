import React from 'react';
import CanvasSVG from '../CanvasSVG';

const CanvasSquare = props => {
  return (
    <div className="canvasSquare mx-3">
      <div>
        <CanvasSVG svgString={props.canvas.image} width={215} height={215} />
        <div className="float-left pl-1 pr-1">{props.editButton}</div>
        <div className="float-left">{props.sellButton}</div>
      </div>
      <p className="float-right pr-2">{props.canvas.title}</p>
    </div>
  );
};
export default CanvasSquare;
