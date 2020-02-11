import React, { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Canvas from '../components/Canvas';
import CanvasSVG from '../components/CanvasSVG';

import SVG from '../utils/SVG';
import database from '../utils/API';

export default props => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [canvas, setCanvas] = useState(null);
  const [lc, setLC] = useState(null);

  const saveCanvas = () => {
    const svgString = lc.getSVGString();
    const svg = new DOMParser().parseFromString(svgString, 'text/html').body
      .firstChild;
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
    if (canvas && canvas.image)
      return <CanvasSVG svgString={canvas.image} width={800} height={1000} />;
    return (
      <Form className='text-left my-0' onSubmit={saveCanvas}>
        <Form.Group className='m-3'>
          <Row>
            <Col md={4}>
              <Form.Control
                type='text'
                aria-describedby='title'
                placeholder='Title'
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </Col>
          </Row>
        </Form.Group>
        <Canvas setLC={setLC} />
        <Form.Group className='m-3'>
          <Form.Control
            as='textarea'
            rows='3'
            aria-describedby='description'
            placeholder='Description'
            value={description}
            onChange={e => setDescription(e.target.value)}
            style={{ minHeight: '2.5rem' }}
          />
        </Form.Group>
        <div className='text-center'>
          <Button variant='success' type='submit'>
            Save
          </Button>
        </div>
      </Form>
    );
  };

  return (
    <Container className='pt-3'>
      <Row>
        <Col xs={1}>
          <Button
            variant='primary'
            size='sm'
            type='button'
            onClick={() => (window.location.pathname = '/')}
          >
            Back
          </Button>
        </Col>
        <Col xs={11} className='text-center'>
          <h3> Canvas Editor</h3>
        </Col>
      </Row>
      {renderEditor()}
    </Container>
  );
};
