function scaleChildren(children, scaleX, scaleY) {
  for (let stroke of children) {
    switch (stroke.tagName) {
      case 'line':
        {
          const x1 = stroke.getAttribute('x1');
          const y1 = stroke.getAttribute('y1');
          const x2 = stroke.getAttribute('x2');
          const y2 = stroke.getAttribute('y2');
          stroke.setAttribute('x1', Number(x1) * scaleX);
          stroke.setAttribute('y1', Number(y1) * scaleY);
          stroke.setAttribute('x2', Number(x2) * scaleX);
          stroke.setAttribute('y2', Number(y2) * scaleY);
        }
        break;
      case 'polyline':
      case 'polygon':
        {
          const points = stroke.getAttribute('points').split(' ');
          stroke.setAttribute(
            'points',
            points
              .map(point => {
                let [x, y] = point.split(',');
                return `${Number(x) * scaleX},${Number(y) * scaleY}`;
              })
              .join(' '),
          );
        }
        break;
      case 'rect':
        {
          const x = stroke.getAttribute('x');
          const y = stroke.getAttribute('y');
          const width = stroke.getAttribute('width');
          const height = stroke.getAttribute('height');
          stroke.setAttribute('x', Number(x) * scaleX);
          stroke.setAttribute('y', Number(y) * scaleY);
          stroke.setAttribute('width', Number(width) * scaleX);
          stroke.setAttribute('height', Number(height) * scaleY);
        }
        break;
      case 'ellipse':
        const cx = stroke.getAttribute('cx');
        const cy = stroke.getAttribute('y1');
        const rx = stroke.getAttribute('x2');
        const ry = stroke.getAttribute('y2');
        stroke.setAttribute('cx', Number(cx) * scaleX);
        stroke.setAttribute('cy', Number(cy) * scaleY);
        stroke.setAttribute('rx', Number(rx) * scaleX);
        stroke.setAttribute('ry', Number(ry) * scaleY);
        break;
      case 'g':
        scaleChildren(stroke.children, scaleX, scaleY);
        break;
      default:
        console.log(stroke.tagName);
        break;
    }
    if (stroke.hasAttribute('stroke-width')) {
      const strokeWidth = stroke.getAttribute('stroke-width');
      stroke.setAttribute('stroke-width', Number(strokeWidth) * Math.sqrt(Math.pow(scaleX, 2) + Math.pow(scaleY, 2)));
    }
  }
}

export default {
  scale: (svg, { x, y }) => {
    const width = Number(svg.getAttribute('width')) * x;
    const height = Number(svg.getAttribute('height')) * y;
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    const [background, g] = svg.children;
    background.setAttribute('width', width);
    background.setAttribute('height', height);
    scaleChildren(g.children, x, y);
  },
};
