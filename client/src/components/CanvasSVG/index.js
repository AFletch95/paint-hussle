import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

import SVG from '../../utils/SVG';

const CanvasSVG = props => {
  const div = useRef(null);
  useEffect(() => {
    const { svgString, width, height } = props;
    const scale = { x: width, y: height };
    const svg = new DOMParser().parseFromString(svgString, 'text/html').body.firstChild;
    SVG.scale(svg, scale);
    div.current.appendChild(svg);
  }, []);
  return <div className="border border-secondary" ref={div}></div>;
};
export default CanvasSVG;
