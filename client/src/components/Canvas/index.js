import React, { useState, useRef, useEffect } from 'react';

import LC from 'literallycanvas';
import './literallycanvas.css';

const Canvas = props => {
  const canvas = useRef(null);
  const [lc, setLC] = useState(null);

  useEffect(() => {
    const aspect = props.aspect || { width: 16, height: 9 };
    const setGetSVG = props.setGetSVG || (s => {});

    LC.setDefaultImageURLPrefix('lib/img');
    const element = canvas.current;
    const width = element.offsetWidth;
    const _lc = LC.init(element, {
      imageSize: { width: width, height: (width * aspect.height) / aspect.width },
      toolbarPosition: 'top',
      backgroundColor: '#fff',
      tools: [
        LC.tools.Pencil,
        LC.tools.Eraser,
        LC.tools.Line,
        LC.tools.Rectangle,
        LC.tools.Ellipse,
        LC.tools.Polygon,
        LC.tools.Pan,
        LC.tools.Eyedropper,
      ],
      minzoom: 1,
    });
    setGetSVG(() => () => _lc.getSVGString());
    setLC(_lc);
    return () => {
      setGetSVG(null);
    };
  }, []);

  return (
    <div className="container">
      <div className="border border-dark" ref={canvas}></div>
    </div>
  );
};

export default Canvas;
