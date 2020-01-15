import React, { useState } from 'react';
import Canvas from '../components/Canvas';
import CanvasSVG from '../components/CanvasSVG';

import SVG from '../utils/SVG';
import database from '../utils/API';

export default props => {
  props.setCurrentPage('CanvasEditor');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [canvas, setCanvas] = useState(null);
  const [lc, setLC] = useState(null);

  const saveCanvas = () => {
    const svgString = lc.getSVGString();
    const svg = new DOMParser().parseFromString(svgString, 'text/html').body.firstChild;
    const scale = {
      x: 1 / Number(svg.getAttribute('width')),
      y: 1 / Number(svg.getAttribute('height')),
    };
    SVG.scale(svg, scale);

    const tmp = document.createElement('div');
    tmp.appendChild(svg);
    const image = tmp.innerHTML;
    database
      .createCanvas({
        image,
        title,
        description,
      })
      .then(result => {
        setCanvas(result.data.canvas);
      });
  };

  const renderEditor = () => {
    if (canvas && canvas.image) return <CanvasSVG svgString={canvas.image} width={800} height={1000} />;
    return (
      <form className="text-left my-0">
        <div className="form-group m-3">
          <div className="row">
            <div className="col-md-4">
              <input
                id="title"
                className="form-control"
                type="text"
                placeholder="Title"
                aria-describedby="title"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>
          </div>
        </div>
        <Canvas setLC={setLC} />
        <div className="form-group m-3">
          <textarea
            id="description"
            className="form-control"
            type="text"
            rows="3"
            placeholder="Description"
            aria-describedby="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            style={{ minHeight: '2.5rem' }}
          />
        </div>
        <div className="text-center">
          <div type="submit" className="btn btn-success" onClick={saveCanvas}>
            Save
          </div>
        </div>
      </form>
    );
  };

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
          <h3 className="text-center"> Canvas Editor</h3>
        </div>
      </div>
      {renderEditor()}
    </div>
  );
};
