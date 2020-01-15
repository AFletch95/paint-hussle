import React, { useRef, useEffect } from 'react';

import LC from 'literallycanvas';
import './literallycanvas.css';

const Canvas = props => {
  const canvas = useRef(null);

  useEffect(() => {
    const aspect = props.aspect || { width: 19, height: 18 };

    LC.setDefaultImageURLPrefix('lib/img');
    const element = canvas.current;
    const width = element.offsetWidth;
    const lc = LC.init(element, {
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
    props.setLC(lc);
    return () => {
      props.setLC(null);
    };
  }, [props, props.aspect]);

  return (
    <div className="container">
      <div className="border border-dark" ref={canvas}></div>
    </div>
  );
};

export default Canvas;
